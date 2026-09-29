import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto'; // Node.js built-in — runs server-side only
import { getAdminSession } from '@/lib/auth';

/**
 * POST /api/upload-tour-image
 *
 * Accepts multipart/form-data with fields:
 *   file      – the image File
 *   titleHint – (optional) tour title used to build a readable Cloudinary public_id
 *
 * Signs the upload server-side with CLOUDINARY_API_SECRET (never sent to browser).
 * Returns { secure_url, public_id } on success.
 *
 * ROOT CAUSE OF PREVIOUS FAILURE:
 *   The old code used HMAC-SHA1 (keyed hash) to sign upload params.
 *   Cloudinary requires a plain SHA1 of "{sorted_params}{api_secret}".
 *   That mismatch caused Cloudinary to reject every request with an
 *   authentication error, which was swallowed by a generic catch message.
 *   This version uses Node's crypto.createHash('sha1') — the correct algorithm.
 */
export async function POST(request: NextRequest) {
  // ── Auth guard ──────────────────────────────────────────────────────────────
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── Cloudinary credentials (server-only env vars) ───────────────────────────
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey    = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('[upload-tour-image] Cloudinary env vars missing:', {
      cloudName: !!cloudName,
      apiKey:    !!apiKey,
      apiSecret: !!apiSecret,
    });
    return NextResponse.json(
      { error: 'Cloudinary is not configured on the server. Check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.' },
      { status: 500 }
    );
  }

  // ── Parse form data ──────────────────────────────────────────────────────────
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (err) {
    console.error('[upload-tour-image] Failed to parse form data:', err);
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided in the "file" field.' }, { status: 400 });
  }

  // ── File validation ──────────────────────────────────────────────────────────
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: `Invalid file type "${file.type}". Only JPG, PNG, and WEBP are accepted.` },
      { status: 400 }
    );
  }

  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: `File is ${(file.size / 1024 / 1024).toFixed(1)} MB. Maximum allowed size is 5 MB.` },
      { status: 400 }
    );
  }

  // ── Build a readable public_id from the tour title ──────────────────────────
  const titleHint = (formData.get('titleHint') as string | null) ?? '';
  const slug = titleHint
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
  const ts        = Date.now();
  // IMPORTANT: public_id must NOT include the folder prefix.
  // folder is sent separately; Cloudinary combines them internally.
  // ✓  folder="tour-packages"  public_id="bali-1790341610034"
  // ✗  folder="tour-packages"  public_id="tour-packages/bali-1790341610034"
  const publicId  = slug ? `${slug}-${ts}` : String(ts);
  const folder    = 'tour-packages';

  // ── Cloudinary signed upload signature ──────────────────────────────────────
  //
  // Cloudinary signing algorithm (https://cloudinary.com/documentation/upload_images#generating_authentication_signatures):
  //   1. Collect all upload params EXCEPT file, url, api_key, resource_type, cloud_name.
  //   2. Sort them alphabetically by key.
  //   3. Join as "key=value&key2=value2…"
  //   4. Append the api_secret directly (no separator).
  //   5. Take SHA-1 of that entire string.
  //
  // NOTE: This is plain SHA-1, NOT HMAC-SHA-1.
  // The previous implementation used HMAC-SHA-1 (wrong algorithm), which
  // caused Cloudinary to reject every upload with an authentication error.
  //
  const uploadTimestamp = Math.round(Date.now() / 1000);
  const paramsToSign: Record<string, string> = {
    folder,
    public_id: publicId,
    timestamp: String(uploadTimestamp),
  };

  // Sort keys alphabetically, filter empty values, join as key=value, append secret
  // Uses plain SHA-1 (NOT HMAC-SHA-1)
  const stringToSign = Object.keys(paramsToSign)
    .sort()
    .filter((k) => paramsToSign[k] !== undefined && paramsToSign[k] !== null && paramsToSign[k] !== '')
    .map((k) => `${k}=${paramsToSign[k]}`)
    .join('&');

  const signature = createHash('sha1').update(stringToSign + apiSecret).digest('hex');

  console.log('[upload-tour-image] string_to_sign:', stringToSign);
  console.log('[upload-tour-image] Signature computed (first 8 chars):', signature.slice(0, 8) + '…');

  // ── Build the upload request to Cloudinary ──────────────────────────────────
  const cloudinaryForm = new FormData();
  cloudinaryForm.append('file',      file);
  cloudinaryForm.append('api_key',   apiKey);
  cloudinaryForm.append('timestamp', String(uploadTimestamp));
  cloudinaryForm.append('signature', signature);
  cloudinaryForm.append('folder',    folder);
  cloudinaryForm.append('public_id', publicId);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  console.log('[upload-tour-image] Uploading to:', uploadUrl);

  // ── POST to Cloudinary ───────────────────────────────────────────────────────
  let cloudinaryResponse: Response;
  try {
    cloudinaryResponse = await fetch(uploadUrl, {
      method: 'POST',
      body:   cloudinaryForm,
    });
  } catch (err) {
    console.error('[upload-tour-image] Network error reaching Cloudinary:', err);
    return NextResponse.json(
      { error: 'Network error while connecting to Cloudinary. Check your server connectivity.' },
      { status: 502 }
    );
  }

  // ── Handle Cloudinary error response (passthrough real error) ───────────────
  if (!cloudinaryResponse.ok) {
    const rawBody = await cloudinaryResponse.text();
    console.error(
      `[upload-tour-image] Cloudinary returned HTTP ${cloudinaryResponse.status}:`,
      rawBody
    );

    // Try to parse Cloudinary's JSON error for a readable message
    let cloudinaryError = rawBody;
    try {
      const parsed = JSON.parse(rawBody) as { error?: { message?: string } };
      if (parsed?.error?.message) {
        cloudinaryError = parsed.error.message;
      }
    } catch {
      // raw body was not JSON — keep as-is
    }

    return NextResponse.json(
      {
        error:   `Cloudinary upload failed: ${cloudinaryError}`,
        details: rawBody,
        status:  cloudinaryResponse.status,
      },
      { status: 502 }
    );
  }

  // ── Success ──────────────────────────────────────────────────────────────────
  const result = (await cloudinaryResponse.json()) as {
    secure_url: string;
    public_id:  string;
    width?:     number;
    height?:    number;
    format?:    string;
    bytes?:     number;
  };

  console.log('[upload-tour-image] ✅ Upload success:', {
    public_id:  result.public_id,
    format:     result.format,
    bytes:      result.bytes,
    secure_url: result.secure_url,
  });

  return NextResponse.json({
    success:    true,
    secure_url: result.secure_url,
    public_id:  result.public_id,
  });
}
