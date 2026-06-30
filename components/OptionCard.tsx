'use client';

interface OptionCardProps {
  label: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
}

export default function OptionCard({ label, icon, selected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-5 py-4 border transition-all flex items-center gap-4 ${
        selected
          ? 'border-[#c9a84c] bg-[#fdf8ee] text-[#1a1a1a]'
          : 'border-[#e8e0d5] bg-white text-[#1a1a1a] hover:border-[#c9a84c]/40 hover:bg-[#faf9f7]'
      }`}
    >
      {icon && <span className="text-base shrink-0 opacity-70">{icon}</span>}
      <span className="text-sm leading-snug flex-1">{label}</span>
      <span className={`shrink-0 w-4 h-4 border flex items-center justify-center transition-colors ${
        selected ? 'border-[#c9a84c] bg-[#c9a84c]' : 'border-[#d0c8be]'
      }`}>
        {selected && <span className="w-1.5 h-1.5 bg-white" />}
      </span>
    </button>
  );
}
