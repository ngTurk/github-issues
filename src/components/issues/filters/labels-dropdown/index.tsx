import { useIssuesStore } from "@/store/store";
import React, { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { ArrowDown2, TickCircle } from "iconsax-react";
import updateQueryParameter from "@/common/utils/update-query-parameter";

export default function LabelsDropdown() {
  const { labels } = useIssuesStore();
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const decodedParams = decodeURIComponent(
    searchParams.get("labels") as string
  );

  if (!labels) {
    return null;
  }

  /**
   * Handles the click event on a label item in the dropdown.
   */
  const handleLabelClick = (filterValue: string) => {
    updateQueryParameter(
      "labels",
      filterValue,
      selectedLabels,
      setSelectedLabels,
      pathname,
      searchParams,
      router.push
    );
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button color="default" variant="light" className="text-gray-300 gap-1">
          Labels <ArrowDown2 size="12" color="#d1d5db" variant="Bold" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Labels"
        color="default"
        variant="light"
        className="max-h-[400px] overflow-y-scroll"
      >
        {labels.map((label) => (
          <DropdownItem
            key={label.id}
            onClick={() => handleLabelClick(label.name)}
          >
            <span
              className={`h-full w-full flex items-center gap-2 ${
                selectedLabels.includes(label.name) ? "text-blue-500" : ""
              }`}
            >
              {label.name}
              {decodedParams.includes(label.name) ? (
                <TickCircle size="14" color="#000" />
              ) : null}
            </span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
