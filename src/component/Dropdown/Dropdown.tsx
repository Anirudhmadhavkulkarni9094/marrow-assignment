import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  name: string;  // Add a name prop to receive specific names for each dropdown
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string; // optional, to make it a controlled component
  isLabelVisible?: boolean; // optional, to control label visibility
}

function Dropdown({ label, name, options, onChange, value, isLabelVisible=true }: DropdownProps) {
  return (
    <div className="flex flex-col gap-2">
      {isLabelVisible && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <select
        name={name}  // Use the received name prop for the select element
        value={value}
        onChange={onChange}
        className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
