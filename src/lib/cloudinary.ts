import { createHash } from 'crypto';

/**
 * Extracts the Cloudinary public_id from a Cloudinary image URL if present.
 * Example URL:
 *   https://res.cloudinary.com/utdl8qrw/image/upload/v1727250000/tour-packages/assam-wildlife-123.jpg
 * Returns:
 *   tour-packages/assam-wildlife-123
 */
export function extractCloudinaryPublicId(url?: string | null): string | null {
  if (!url || typeof url !== 'string') return null;
  if (!url.includes('res.cloudinary.com')) return null;

  const match = url.match(/\/image\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/);
  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }
  return null;
}

/**
 * Deletes an image asset from Cloudinary using server-side signed destroy API.
 * Uses SHA-1 signing with CLOUDINARY_API_SECRET (never exposed to browser).
 * Returns { success: true } if destroyed OR already missing ('not found').
 */
export async function deleteCloudinaryImage(publicId: string): Promise<{ success: boolean; error?: string }> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey    = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    const err = 'Cloudinary server credentials missing (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, or CLOUDINARY_API_SECRET).';
    console.error('[deleteCloudinaryImage]', err);
    return { success: false, error: err };
  }

  const timestamp = Math.round(Date.now() / 1000);
  const signatureBase = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = createHash('sha1').update(signatureBase).digest('hex');

  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('api_key', apiKey);
  formData.append('timestamp', String(timestamp));
  formData.append('signature', signature);

  const destroyUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  try {
    const res = await fetch(destroyUrl, {
      method: 'POST',
      body: formData,
    });

    const data = (await res.json()) as { result?: string; error?: { message?: string } };

    // 'ok' means destroyed. 'not found' means it was already removed. Both mean it is gone!
    if (data.result === 'ok' || data.result === 'not found') {
      console.log(`[deleteCloudinaryImage] Successfully deleted/verified missing: ${publicId} (result: ${data.result})`);
      return { success: true };
    }

    const errorMsg = data.error?.message || `Cloudinary returned result: ${data.result}`;
    console.error(`[deleteCloudinaryImage] Deletion failed for ${publicId}:`, errorMsg);
    return { success: false, error: errorMsg };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Network error reaching Cloudinary.';
    console.error(`[deleteCloudinaryImage] Network error for ${publicId}:`, err);
    return { success: false, error: errorMsg };
  }
}
