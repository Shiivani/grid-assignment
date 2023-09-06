import Dropdown from "Dropdown";

const SelectField = () => {
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }
  const handleChange = (selectedval: any) => {
    console.log(
      `selected Label: ${selectedval?.label} & Value: ${selectedval?.value}`,
    );
  };
  const handleMultiChange = (selectedval: any) => {
    console.log(
      `selected Label: ${selectedval?.map(
        (op: any) => op.label,
      )} & Value: ${selectedval?.map((op: any) => op.value)}`,
    );
  };
  return (
    <div className="select-field">
      <Dropdown
        label="Select options"
        options={[
          {
            label: "Manager",
            options: [
              {label: "Jack", value: "jack"},
              {label: "Lucy", value: "lucy"},
            ],
          },
          {
            label: "Engineer",
            options: [{label: "yiminghe", value: "Yiminghe"}],
          },
        ]}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        onChange={handleChange}
        defaultValue="Yiminghe"
      />
      <Dropdown
        label="Select options"
        options={[
          {value: "jack", label: "Jack"},
          {value: "lucy", label: "Lucy"},
          {value: "Yiminghe", label: "yiminghe"},
          {value: "Shivani", label: "Shivani"},
        ]}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        onChange={handleChange}
      />
      <Dropdown
        mode="multiple"
        label="Select multi options"
        options={options}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        onChange={handleMultiChange}
      />
    </div>
  );
};

export default SelectField;
