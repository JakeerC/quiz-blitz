type SliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function Slider({
  value,
  onChange,
  min = 1,
  max = 50,
  step = 1,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="relative h-6 border-[4px] border-black bg-white">
        {/* Track Fill */}
        <div
          className="absolute top-0 left-0 h-full bg-[#FFE500] transition-all"
          style={{width: `${percentage}%`}}
        />

        {/* Slider Handle */}
        <div
          className="absolute top-1/2 h-8 w-8 -translate-y-1/2 cursor-grab border-[4px] border-white bg-black active:cursor-grabbing"
          style={{left: `calc(${percentage}% - 16px)`}}
        />

        {/* Input Range */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>

      {/* Min/Max Labels */}
      <div className="mt-2 flex justify-between">
        <span className="text-sm tracking-wide text-gray-600 uppercase">
          {min}
        </span>
        <span className="text-sm tracking-wide text-gray-600 uppercase">
          {max}
        </span>
      </div>
    </div>
  );
}
