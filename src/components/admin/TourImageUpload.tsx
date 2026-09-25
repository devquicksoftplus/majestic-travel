'use client';

import { useRef, useState } from 'react';
import { Upload, X, ImageIcon, Loader2, AlertCircle } from 'lucide-react';

interface TourImageUploadProps {
  /** Current image URL (Cloudinary or legacy) */
  value: string;
  /** Tour title — used to build a meaningful Cloudinary public_id */
  titleHint?: string;
  onChange: (url: string, publicId?: string) => void;
}

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_MB = 5;
const MAX_BYTES = MAX_MB * 1024 * 1024;

export default function TourImageUpload({
  value,
  titleHint = '',
  onChange,
}: TourImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** Local object URL created immediately on file pick for instant preview */
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const reset = () => {
    setError(null);
    setLocalPreview(null);
    onChange('', '');
    // reset the file input so the same file can be re-selected
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleFile = async (file: File) => {
    setError(null);

    // Client-side validation (mirrors server validation)
    if (!ACCEPTED.includes(file.type)) {
      setError('Invalid file type. Please upload a JPG, PNG, or WEBP image.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError(`File is too large. Maximum allowed size is ${MAX_MB} MB.`);
      return;
    }

    // Show instant local preview
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);
    setUploading(true);

    try {
      const form = new FormData();
      form.append('file', file);
      if (titleHint) form.append('titleHint', titleHint);

      const res = await fetch('/api/upload-tour-image', {
        method: 'POST',
        body: form,
        // Do NOT set Content-Type — browser sets it with boundary automatically
      });

      const data = await res.json() as {
        success?: boolean;
        secure_url?: string;
        public_id?: string;
        error?: string;
        details?: string;
        status?: number;
      };

      if (!res.ok) {
        // Log the full server response so the REAL error is visible in dev tools
        console.error('[TourImageUpload] Upload failed — server response:', data);
        throw new Error(data.error ?? `Upload failed (HTTP ${res.status}). Check the browser console for details.`);
      }

      if (!data.secure_url) {
        console.error('[TourImageUpload] Unexpected response — no secure_url:', data);
        throw new Error('Upload succeeded but no image URL was returned. Check browser console.');
      }

      // Replace local preview with confirmed Cloudinary URL
      URL.revokeObjectURL(objectUrl);
      setLocalPreview(null);
      onChange(data.secure_url, data.public_id);
    } catch (err: unknown) {
      URL.revokeObjectURL(objectUrl);
      setLocalPreview(null);
      const message = err instanceof Error ? err.message : 'Upload failed. Check the browser console.';
      setError(message);

    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const previewSrc = localPreview || value || null;
  const hasImage = Boolean(previewSrc);

  return (
    <div className="space-y-2">
      <label className="text-slate-700 font-semibold uppercase tracking-wider text-xs block">
        Tour Image
      </label>

      {/* Preview / drop zone */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden border transition-colors ${
          hasImage
            ? 'border-slate-200 bg-slate-100/60'
            : 'border-dashed border-slate-300 hover:border-[#D4AF37] cursor-pointer bg-slate-50/80 hover:bg-slate-100/50'
        }`}
        style={{ minHeight: hasImage ? 200 : 120 }}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => !hasImage && inputRef.current?.click()}
      >
        {hasImage ? (
          /* Image preview */
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewSrc!}
              alt="Tour image preview"
              className="w-full object-cover"
              style={{ maxHeight: 260, minHeight: 160 }}
            />
            {/* Overlay when uploading */}
            {uploading && (
              <div className="absolute inset-0 bg-[#26345C]/75 backdrop-blur-xs flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-[#F9B82E] animate-spin" />
                <span className="text-xs text-white tracking-wider uppercase font-semibold">
                  Uploading to Cloudinary…
                </span>
              </div>
            )}
            {/* Cloudinary badge */}
            {!uploading && value && value.includes('res.cloudinary.com') && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md rounded-full px-2.5 py-1 border border-slate-200/80 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-700 font-bold tracking-widest uppercase">
                  Cloudinary
                </span>
              </div>
            )}
          </>
        ) : (
          /* Empty state / drop zone */
          <div className="flex flex-col items-center justify-center gap-3 py-8 px-4 text-center">
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
                <span className="text-xs text-slate-500 tracking-wider uppercase font-medium">
                  Uploading…
                </span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                  <ImageIcon className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">
                    <span className="text-[#B38F1E] font-bold">
                      Click to upload
                    </span>{' '}
                    or drag & drop
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    JPG, PNG, WEBP • Max {MAX_MB} MB
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200/70 text-[#B38F1E] text-[11px] font-bold uppercase tracking-wider hover:bg-amber-100/70 transition-colors disabled:opacity-50"
        >
          <Upload className="w-3.5 h-3.5" />
          {hasImage ? 'Change Image' : 'Upload Image'}
        </button>

        {hasImage && !uploading && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200/70 text-rose-600 text-[11px] font-bold uppercase tracking-wider hover:bg-rose-100/70 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Remove
          </button>
        )}
      </div>

      {/* Hint: accepted formats */}
      <p className="text-[10px] text-slate-400 tracking-wide">
        JPG, PNG, WEBP • Max {MAX_MB} MB • Stored in Cloudinary: tour-packages/
      </p>

      {/* Error message */}
      {error && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[11px]">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(',')}
        onChange={onInputChange}
        className="sr-only"
        aria-label="Upload tour image"
      />
    </div>
  );
}
