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
   *
   * @param {string} label - The label that was clicked.
   */
  const handleLabelClick = (label: string) => {
    const newSelectedLabels = selectedLabels.includes(label)
      ? selectedLabels.filter((l) => l !== label)
      : [...selectedLabels, label];

    setSelectedLabels(newSelectedLabels);

    const newQueryParams = new URLSearchParams(searchParams);

    if (newSelectedLabels.length > 0) {
      newQueryParams.set("labels", newSelectedLabels.join(","));
    } else {
      newQueryParams.delete("labels");
    }

    router.push(`${pathname}?${newQueryParams}`, { scroll: false });
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
