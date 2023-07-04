import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  SelectProps,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { CustomFormControl } from "./styles";

export interface ICustomSelectProps extends SelectProps {
  value?: string;
  heading: string;
  data: ISelectElement[];
  onValueChange: (value: string) => void;
  isError?: boolean;
  errorText?: string;
}
export interface ISelectElement {
  id: number;
  name: string;
}

const CustomSelect: React.FC<ICustomSelectProps> = ({
  value,
  heading,
  data,
  onValueChange,
  ...rest
}) => {
  const [currentValue, setCurrentValue] = useState<string>(value ?? "");

  useEffect(() => {
    if (value !== currentValue) setCurrentValue(value ?? "");
  }, [value]);

  return (
    <CustomFormControl variant="standard">
      <InputLabel>{heading}</InputLabel>
      <Select
        {...rest}
        native={false}
        value={currentValue || ""}
        onChange={(event: any) => {
          setCurrentValue(event.target.value);
          onValueChange(event.target.value);
        }}
        variant="standard"
      >
        <MenuItem aria-label="None" value="" style={{ height: 20 }} />
        {data.map((item: ISelectElement) => (
          <MenuItem key={item.id} value={item.name}>
            <ListItemText style={{ textAlign: "left", display: "flex" }}>
              {item.name}
            </ListItemText>
          </MenuItem>
        ))}
      </Select>
    </CustomFormControl>
  );
};

export { CustomSelect };
