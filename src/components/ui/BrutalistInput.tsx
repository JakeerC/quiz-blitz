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
      className={`border-box w-full bg-white px-6 py-4 tracking-wide uppercase transition-all placeholder:text-gray-400 placeholder:uppercase focus:bg-[#FFFEF9] focus:outline-none ${className} `}
    />
  );
}
