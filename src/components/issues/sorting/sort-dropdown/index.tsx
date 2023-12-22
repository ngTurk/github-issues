import { useIssuesStore } from "@/store/store";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { ArrowDown2 } from "iconsax-react";

export default function SortDropdown() {
  const sortIssues = useIssuesStore((state) => state.sortIssues);

  /**
   * Handles the selection of a sorting criterion from a dropdown or similar UI element.
   */
  const handleSortSelection = (sortKey: string) => {
    sortIssues(sortKey);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button color="default" variant="light" className="text-gray-300 gap-1">
          Sort <ArrowDown2 size="12" color="#d1d5db" variant="Bold" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Labels"
        color="default"
        variant="light"
        className="max-h-[400px] overflow-y-scroll"
      >
        <DropdownItem onClick={() => handleSortSelection("creationDate")}>
          Creation Date
        </DropdownItem>
        <DropdownItem onClick={() => handleSortSelection("comments")}>
          Number of Comments
        </DropdownItem>
        <DropdownItem onClick={() => handleSortSelection("modifiedDate")}>
          Modified Date
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
