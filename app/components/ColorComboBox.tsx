import React, { ReactNode } from "react";
import { TextInput, InputBase, Combobox, useCombobox } from "@mantine/core";

const colors = [
  "red",
  "bule",
  "yellow",
  "green",
  "white",
  "black",
  "indigo",
  "khaki",
  "orange",
  "coral",
  "fuchsia",
  "dodgerblue",
];
type Props = {
  label: string;
  value: any;
  updateValue: any;
};

const ColorComboBox = ({ label, value, updateValue }: Props) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = colors.map((item) => (
    <Combobox.Option value={item} key={item} className="custom-option">
      {item}
    </Combobox.Option>
  ));
  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        updateValue(val);
        combobox.closeDropdown();
      }}
      withinPortal={false}
    >
      <Combobox.Target>
        <TextInput
          label={label}
          className="flex mt-3 "
          value={value}
          onChange={(event) => {
            updateValue(event.currentTarget.value);
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default ColorComboBox;
