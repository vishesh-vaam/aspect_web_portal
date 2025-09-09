import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";

interface DateProps {
  value?: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  error?: string;
  defaultValue?: Dayjs;
}

const Date: React.FC<DateProps> = ({
  value,
  onChange,
  label,
  placeholder,
  className = "",
  disabled = false,
  required = false,
  name = "date",
  error,
  defaultValue,
}) => {
  return (
    <div className="w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
          disabled={disabled}
          slotProps={{
            textField: {
              required,
              name,
              placeholder,
              className: `w-full ${className}`,
              error: !!error,
              helperText: error,
              size: "small",
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default Date;
