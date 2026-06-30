'use client';
import { useRef } from 'react';
import { Camera, X } from 'lucide-react';

interface PhotoUploadProps {
  label: string;
  required?: boolean;
  file: File | null;
  onChange: (file: File | null) => void;
}

export default function PhotoUpload({ label, required, file, onChange }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = file ? URL.createObjectURL(file) : null;

  return (
    <div>
      <p className="text-[9px] tracking-[0.18em] uppercase text-[#8a8078] font-medium mb-2">
        {label}{required && <span className="text-[#c9a84c] ml-1">*</span>}
      </p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full h-28 border border-dashed border-[#d0c8be] hover:border-[#c9a84c] bg-white overflow-hidden flex items-center justify-center transition-colors group"
      >
        {preview ? (
          <img src={preview} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-[#b8b0a8] group-hover:text-[#c9a84c] transition-colors">
            <Camera className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[10px] tracking-wider uppercase">Tap to upload</span>
          </div>
        )}
      </button>
      {file && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="mt-1.5 flex items-center gap-1 text-[10px] tracking-wide uppercase text-[#8a8078] hover:text-red-500 transition-colors"
        >
          <X className="w-3 h-3" /> Remove
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
