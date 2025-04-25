export type DropdownProps = {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  containerClassName?: string;
};

export const Dropdown = ({
  id,
  label,
  value,
  onChange,
  options,
  containerClassName = "flex-1",
}: DropdownProps) => {
  return (
    <div className={`relative ${containerClassName}`}>
      <div className="relative">
        <label
          htmlFor={id}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none"
        >
          {label}
        </label>
        <select
          id={id}
          className={`w-full h-10 appearance-none border border-gray-300 rounded-md text-right pl pr-8 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
