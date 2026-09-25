import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { getAdminSession } from '@/lib/auth';

/**
 * POST /api/upload-image
 *
 * Generic Cloudinary signed upload handler.
 * Accepts multipart/form-data with fields:
 *   file       – the image File
 *   folder     – Cloudinary folder (e.g. "gallery", "fixed-departure-events", "monthly-spotlight")
 *   publicId   – (optional) explicit public_id; if omitted a timestamp-based id is used
 *   titleHint  – (optional) slug hint to build a readable public_id
 *
 * Signing rule (Cloudinary docs):
 *   SHA-1( sorted_key=value&... + api_secret )   ← plain SHA-1, NOT HMAC-SHA-1
 *
 * CRITICAL: public_id must NEVER include the folder prefix.
 *   ✓  folder="gallery"          public_id="1790342397159"
 *   ✗  folder="gallery"          public_id="gallery/1790342397159"
 *
 * The values used to sign MUST be identical to those sent in the upload request.
 */
export async function POST(request: NextRequest) {
  // ── Auth guard ────────────────────────────────────────────────────────────────
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── Cloudinary credentials (server-only) ─────────────────────────────────────
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey    = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('[upload-image] Cloudinary env vars missing');
    return NextResponse.json(
      { error: 'Cloudinary is not configured on the server.' },
      { status: 500 }
    );
  }

  // ── Parse form data ───────────────────────────────────────────────────────────
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (err) {
    console.error('[upload-image] Failed to parse form data:', err);
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }

  // ── File validation ───────────────────────────────────────────────────────────
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: `Invalid file type "${file.type}". Only JPG, PNG, WEBP accepted.` },
      { status: 400 }
    );
  }

  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: `File is ${(file.size / 1024 / 1024).toFixed(1)} MB. Max 5 MB.` },
      { status: 400 }
    );
  }

  // ── Resolve folder ────────────────────────────────────────────────────────────
  const folder = (formData.get('folder') as string | null)?.trim() || 'uploads';

  // ── Resolve public_id (NEVER prefix with folder) ──────────────────────────────
  const explicitPublicId = (formData.get('publicId') as string | null)?.trim();
  const titleHint        = (formData.get('titleHint') as string | null) ?? '';
  const ts               = Date.now();

  let publicId: string;
  if (explicitPublicId) {
    publicId = explicitPublicId;
  } else if (titleHint) {
    const slug = titleHint
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60);
    publicId = slug ? `${slug}-${ts}` : String(ts);
  } else {
    publicId = String(ts);
  }

  // ── Sign upload params (plain SHA-1) ─────────────────────────────────────────
  const uploadTimestamp = Math.round(Date.now() / 1000);

  const paramsToSign: Record<string, string> = {
    folder,
    public_id: publicId,
    timestamp: String(uploadTimestamp),
  };

  const stringToSign = Object.keys(paramsToSign)
    .sort()
    .filter((k) => paramsToSign[k] !== undefined && paramsToSign[k] !== null && paramsToSign[k] !== '')
    .map((k) => `${k}=${paramsToSign[k]}`)
    .join('&');

  const signature = createHash('sha1')
    .update(stringToSign + apiSecret)
    .digest('hex');

  console.log(`[upload-image] folder="${folder}" public_id="${publicId}"`);
  console.log(`[upload-image] string_to_sign: ${stringToSign}`);
  console.log(`[upload-image] signature (first 8): ${signature.slice(0, 8)}…`);

  // ── Build Cloudinary upload request ──────────────────────────────────────────
  const cloudinaryForm = new FormData();
  cloudinaryForm.append('file',      file);
  cloudinaryForm.append('api_key',   apiKey);
  cloudinaryForm.append('timestamp', String(uploadTimestamp));
  cloudinaryForm.append('signature', signature);
  cloudinaryForm.append('folder',    folder);
  cloudinaryForm.append('public_id', publicId);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  let cloudinaryResponse: Response;
  try {
    cloudinaryResponse = await fetch(uploadUrl, {
      method: 'POST',
      body:   cloudinaryForm,
    });
  } catch (err) {
    console.error('[upload-image] Network error reaching Cloudinary:', err);
    return NextResponse.json(
      { error: 'Network error while connecting to Cloudinary.' },
      { status: 502 }
    );
  }

  // ── Handle Cloudinary error ───────────────────────────────────────────────────
  if (!cloudinaryResponse.ok) {
    const rawBody = await cloudinaryResponse.text();
    console.error(`[upload-image] Cloudinary HTTP ${cloudinaryResponse.status}:`, rawBody);

    let cloudinaryError = rawBody;
    try {
      const parsed = JSON.parse(rawBody) as { error?: { message?: string } };
      if (parsed?.error?.message) cloudinaryError = parsed.error.message;
    } catch { /* not JSON */ }

    return NextResponse.json(
      { error: `Cloudinary upload failed: ${cloudinaryError}`, details: rawBody },
      { status: 502 }
    );
  }

  // ── Success ───────────────────────────────────────────────────────────────────
  const result = (await cloudinaryResponse.json()) as {
    secure_url: string;
    public_id:  string;
    width?:     number;
    height?:    number;
    format?:    string;
    bytes?:     number;
  };

  console.log('[upload-image] ✅ Success:', {
    folder,
    public_id:  result.public_id,
    secure_url: result.secure_url,
  });

  return NextResponse.json({
    success:    true,
    secure_url: result.secure_url,
    public_id:  result.public_id,
  });
}
