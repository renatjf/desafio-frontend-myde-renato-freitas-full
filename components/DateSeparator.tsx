interface DateSeparatorProps {
  label: string;
}

export function DateSeparator({ label }: DateSeparatorProps) {
  return (
    <div
      className="flex items-center justify-center my-3"
      role="separator"
      aria-label={`Mensagens de ${label}`}
    >
      <span className="bg-[#e1f3fb] text-[#4a7c8e] text-[11px] font-medium px-3 py-1 rounded-full shadow-sm">
        {label}
      </span>
    </div>
  );
}
