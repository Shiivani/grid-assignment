import {useEffect, useState} from "react";
import OutsideClickHandler from "ReComponents/OutsideClickHandler";
import "./styles.scss";

interface Ioptions {
  label: string;
  value: string;
}

interface IsubOptions {
  label: string;
  options: Ioptions[];
}

interface Props {
  label: string;
  options: Ioptions[] | IsubOptions[];
  mode?: "single" | "multiple";
  filterSort?: (
    optionA: Ioptions | IsubOptions,
    optionB: Ioptions | IsubOptions,
  ) => number;
  onChange: (option: Ioptions | Ioptions[]) => void;
  defaultValue?: string;
}

const Search = ({
  handleChange,
  value,
}: {
  handleChange: (searchText: string) => void;
  value: string;
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        className="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

const Dropdown = ({
  label,
  options,
  filterSort,
  mode = "single",
  onChange,
  defaultValue,
}: Props) => {
  const getSelectedOption = () => {
    let selected: Ioptions[] = [];
    options.forEach((op) => {
      if ("options" in op) {
        op.options.forEach((subOp) => {
          if (subOp.value === defaultValue) {
            selected.push(subOp);
          }
        });
      } else {
        if (op.value === defaultValue) {
          selected.push(op);
        }
      }
    });
    return selected.length ? selected : null;
  };
  const [searchValue, setSearchValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Ioptions[] | null>(
    getSelectedOption,
  );

  useEffect(() => {
    let filterOp = [];
    for (let op of options) {
      if ("options" in op) {
        let subOptions: Ioptions[] = [];
        op.options.forEach((subOp) => {
          if (
            subOp.label.toLowerCase().includes(searchValue.toLocaleLowerCase())
          ) {
            subOptions.push(subOp);
          }
        });
        subOptions.length &&
          filterOp.push({label: op.label, options: subOptions});
      } else {
        if (op.label.toLowerCase().includes(searchValue.toLowerCase())) {
          filterOp.push(op);
        }
      }
    }
    if (filterSort) {
      filterOp.sort(filterSort);
    }
    setFilteredOptions(filterOp as Props["options"]);
  }, [searchValue]);

  useEffect(() => {
    if (selectedOption?.length || selectedOption?.length === 0) {
      if (mode === "single") {
        onChange(selectedOption[0]);
      } else {
        onChange(selectedOption);
      }
    }
  }, [selectedOption]);

  const checkValueExists = (value: string, options: Ioptions[]) => {
    return options.some((so) => so.value === value);
  };

  const handleClick = (op: Ioptions) => {
    if (!checkValueExists(op.value, selectedOption ?? [])) {
      if (mode === "single") {
        setSelectedOption([op]);
      } else {
        setSelectedOption((prev) => [...(prev ?? []), op]);
      }
    } else if (mode === "multiple") {
      setSelectedOption(
        (prev) => prev?.filter((so) => so.value !== op.value) ?? [],
      );
    }
  };

  return (
    <div className="dropdown-wrapper">
      <OutsideClickHandler
        onOutsideClick={() => {
          setSearchValue("");
          setFilteredOptions(options);
          setShowOptions(false);
        }}
      >
        <div
          className="label-wrapper"
          onClick={() => setShowOptions((prev) => !prev)}
        >
          {mode === "single" ? (
            <label htmlFor="dropdown">
              {selectedOption?.length ? selectedOption[0].label : label || ""}
            </label>
          ) : (
            <label className="multi-label" htmlFor="dropdown">
              {selectedOption?.length
                ? selectedOption.map((op) => (
                    <div
                      className="selected-options"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <span>{op.label}</span>
                      <span
                        className="rm-icon"
                        onClick={() =>
                          setSelectedOption(
                            (prev) =>
                              prev?.filter((so) => so.value !== op.value) ?? [],
                          )
                        }
                      >
                        x
                      </span>
                    </div>
                  ))
                : label || ""}
            </label>
          )}

          <div className={`icon ${showOptions ? "open" : "close"}`}>{">"}</div>
        </div>
        {showOptions && (
          <div className="options-wrapper">
            <Search
              value={searchValue}
              handleChange={(searchText) => setSearchValue(searchText)}
            />
            {filteredOptions.map((option, i) =>
              "options" in option ? (
                <div className="option" key={`op-${i}`}>
                  <label>{option.label}</label>
                  {option.options.map((op, index) => (
                    <div
                      className={`option-label suboption ${
                        checkValueExists(op.value, selectedOption ?? [])
                          ? "selected"
                          : ""
                      }`}
                      key={`sub-op-${index}`}
                      onClick={() => {
                        handleClick(op);
                      }}
                    >
                      {op.label}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`option-label ${
                    checkValueExists(option.value, selectedOption ?? [])
                      ? "selected"
                      : ""
                  }`}
                  key={`op-${i}`}
                  onClick={() => {
                    handleClick(option);
                  }}
                >
                  {option.label}
                </div>
              ),
            )}
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default Dropdown;
