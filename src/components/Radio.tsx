import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioProps {
  value?: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  className?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  error?: string;
  label?: string;
}

const Radio: React.FC<RadioProps> = ({
  value,
  onChange,
  options,
  className = "",
  disabled = false,
  required = false,
  name = "radio",
  error,
  label
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className={`flex flex-col md:flex-row gap-3 px-3 py-4 rounded-md ${className}`}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center cursor-pointer ${
              disabled ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              disabled={disabled}
              required={required}
              className={`mr-2 w-4 h-4 ${
                error ? 'border-red-300 focus:ring-red-500' : ''
              } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Radio;
