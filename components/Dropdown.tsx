import { ListProps } from "@/models/pokemon";
import { useState } from "react";

interface DropdownProps {
  text: string;
  items: ListProps[];
  onChooseType?: (type: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ text, items, onChooseType }) => {
  const [selectedType, setSelectedType] = useState(text);

  return (
    <details className="dropdown grow border-gray-300 bg-white hover:bg-gray-100">
      <summary className="ml-4">{selectedType}</summary>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a
            onClick={() => {
              setSelectedType("Type");
              if (onChooseType) onChooseType("All");
            }}
          >
            All
          </a>
        </li>
        {items.map((item) => {
          return (
            <li key={item.name}>
              <a
                onClick={() => {
                  setSelectedType(item.name);
                  if (onChooseType) onChooseType(item.name);
                }}
              >
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
};

export default Dropdown;
