import React, { useState } from 'react';

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="space-y-1">
      <label 
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border ${
          error 
            ? 'border-red-500 focus:ring-red-200' 
            : isFocused
              ? 'border-teal-500 focus:ring-teal-200'
              : 'border-gray-300 focus:ring-teal-100'
        } focus:outline-none focus:ring-4 transition-all duration-200`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormInput;