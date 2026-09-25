'use client';

import { useRef, useState } from 'react';
import { Upload, X, ImageIcon, Loader2, AlertCircle } from 'lucide-react';

interface AdminImageUploadProps {
  /** Current image URL (Cloudinary or legacy) */
  value: string;
  /** Label displayed above the upload zone */
  label?: string;
  /**
   * Cloudinary folder to upload into.
   * Each section must use its own folder:
   *   Gallery          → "gallery"
   *   Events / Expiry  → "fixed-departure-events"
   *   Monthly Spotlight → "monthly-spotlight"
   */
  folder?: string;
  /** Hint sent to the server to derive a meaningful Cloudinary public_id */
  titleHint?: string;
  onChange: (url: string, publicId?: string) => void;
}

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_MB = 5;
const MAX_BYTES = MAX_MB * 1024 * 1024;

export default function AdminImageUpload({
  value,
  label = 'Image',
  folder = 'uploads',
  titleHint = '',
  onChange,
}: AdminImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const reset = () => {
    setError(null);
    setLocalPreview(null);
    onChange('', '');
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleFile = async (file: File) => {
    setError(null);

    if (!ACCEPTED.includes(file.type)) {
      setError('Invalid file type. Please upload a JPG, PNG, or WEBP image.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError(`File is too large. Maximum allowed size is ${MAX_MB} MB.`);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);
    setUploading(true);

    try {
      const form = new FormData();
      form.append('file', file);
      form.append('folder', folder);
      if (titleHint) form.append('titleHint', titleHint);

      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: form,
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
        console.error('[AdminImageUpload] Upload failed — server response:', data);
        throw new Error(data.error ?? `Upload failed (HTTP ${res.status}). Check the browser console for details.`);
      }

      if (!data.secure_url) {
        console.error('[AdminImageUpload] Unexpected response — no secure_url:', data);
        throw new Error('Upload succeeded but no image URL was returned. Check browser console.');
      }

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
        {label}
      </label>

      {/* Preview / drop zone */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden border transition-colors ${
          hasImage
            ? 'border-slate-200 bg-slate-100/60'
            : 'border-dashed border-slate-300 hover:border-[#D4AF37] cursor-pointer bg-slate-50/80 hover:bg-slate-100/50'
        }`}
        style={{ minHeight: hasImage ? 180 : 110 }}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => !hasImage && inputRef.current?.click()}
      >
        {hasImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewSrc!}
              alt="Image preview"
              className="w-full object-cover"
              style={{ maxHeight: 240, minHeight: 140 }}
            />
            {/* Overlay when uploading */}
            {uploading && (
              <div className="absolute inset-0 bg-[#26345C]/75 backdrop-blur-xs flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-[#F9B82E] animate-spin" />
                <span className="text-xs text-white tracking-wider uppercase font-semibold">
                  Uploading to Cloudinary&hellip;
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
          <div className="flex flex-col items-center justify-center gap-3 py-8 px-4 text-center">
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
                <span className="text-xs text-slate-500 tracking-wider uppercase font-medium">
                  Uploading&hellip;
                </span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                  <ImageIcon className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">
                    <span className="text-[#B38F1E] font-bold">Click to upload</span>{' '}
                    or drag &amp; drop
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    JPG, PNG, WEBP &bull; Max {MAX_MB} MB
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

      <p className="text-[10px] text-slate-400 tracking-wide">
        JPG, PNG, WEBP &bull; Max {MAX_MB} MB &bull; Stored securely in Cloudinary
      </p>

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
        aria-label={`Upload ${label.toLowerCase()}`}
      />
    </div>
  );
}
