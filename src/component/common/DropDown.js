import { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import { IoMdCloseCircle } from "react-icons/io";
import Panel from "./Panel";

function Dropdown({
  label,
  options,
  value,
  onChange,
  className,
  parentDivClasses,
  dropDownDivClasses,
  disable,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }
      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
      // console.log(event.target);
    };

    document.addEventListener("click", handler, true);

    // cleanup when the component is removed from the dom
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  const renderedOptions = options.map((option) => {
    return (
      <div
        className="hover:bg-blue-300 rounded cursor-pointer py-2 px-3 text-white font-semibold"
        onClick={() => handleOptionClick(option)}
        key={option.id}
      >
        {option.name}
      </div>
    );
  });

  return (
    <div ref={divEl} className={`${parentDivClasses} relative inline-block`}>
      <Panel
        className={`flex justify-between items-center ${className} ${
          disable ? "bg-gray-200" : "bg-white"
        } cursor-pointer ${isOpen ? "ring-0 border-blue-300" : ""}`}
        onClick={handleClick}
      >
        {value}
        <GoChevronDown className="text-lg" />
      </Panel>
      {isOpen && !disable && (
        <Panel
          className={`w-full absolute z-10 top-full overflow-hidden overflow-y-auto max-h-32 bg-gray-600 ${dropDownDivClasses}`}
        >
          {renderedOptions}
        </Panel>
      )}
    </div>
  );
}

export default Dropdown;
