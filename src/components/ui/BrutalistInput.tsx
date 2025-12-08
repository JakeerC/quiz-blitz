type BrutalistInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function BrutalistInput({
  value,
  onChange,
  placeholder,
  className = '',
}: BrutalistInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`border-box bg-card placeholder:text-muted-foreground focus:bg-card w-full px-6 py-4 tracking-wide uppercase transition-all placeholder:uppercase focus:outline-none ${className} `}
    />
  );
}
