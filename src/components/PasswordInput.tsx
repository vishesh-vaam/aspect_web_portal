import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ViewIcon, ViewOffSlashIcon } from '@hugeicons/core-free-icons';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  error?: string;
  label?: string;
  validatePassword?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = "Enter your password",
  className = "",
  disabled = false,
  required = false,
  name = "password",
  error,
  label,
  validatePassword = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  const validatePasswordRequirements = (password: string) => {
    const minLength = password.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    if (!minLength) return 'Password must be at least 8 characters long';
    if (!hasLetter) return 'Password must contain at least 1 letter';
    if (!hasNumber) return 'Password must contain at least 1 number';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (validatePassword && newValue) {
      const validationResult = validatePasswordRequirements(newValue);
      setValidationError(validationResult);
    } else {
      setValidationError('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pr-10 border rounded-md ${
            error 
              ? 'border-red-300 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-blue-500'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
          disabled={disabled}
          required={required}
          name={name}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <HugeiconsIcon icon={ViewIcon} />
          ) : (
            <HugeiconsIcon icon={ViewOffSlashIcon} />
          )}
        </button>
      </div>
      {(error || validationError) && (
        <p className="mt-1 text-sm text-red-600">{error || validationError}</p>
      )}
    </div>
  );
};

export default PasswordInput;
