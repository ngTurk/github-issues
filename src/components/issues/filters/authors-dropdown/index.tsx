import { useIssuesStore } from "@/store/store";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { ArrowDown2, TickCircle } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthorsDropdown() {
  const { contributors } = useIssuesStore();
  const path = usePathname();
  const userId = path.split("/")[3];

  if (!contributors) {
    return null;
  }

  /**
   * Creates a URL by appending, replacing, or removing the last segment of the current path.
   * If the clicked author is the same as the last segment, it removes the last segment, effectively going back one level.
   * If the last segment is a different author, it replaces it.
   * Otherwise, it appends the new author's login to the path.
   *
   * @param {string} contributorLogin - The login of the clicked contributor.
   * @returns {string} The constructed URL.
   */
  const createHref = (contributorLogin: string) => {
    const pathSegments = path.split("/");

    const isLastSegmentAuthor = contributors.some(
      ({ login }) => login === pathSegments[pathSegments.length - 1]
    );

    if (pathSegments[pathSegments.length - 1] === contributorLogin) {
      pathSegments.pop();
    } else if (isLastSegmentAuthor) {
      pathSegments[pathSegments.length - 1] = contributorLogin;
    } else {
      pathSegments.push(contributorLogin);
    }

    return pathSegments.join("/");
  };

  return (
    <Dropdown isDisabled={contributors.length === 0}>
      <DropdownTrigger>
        <Button color="default" variant="light" className="text-gray-300 gap-1">
          Authors <ArrowDown2 size="12" color="#d1d5db" variant="Bold" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown Variants"
        color="default"
        variant="light"
        className="max-h-[400px] overflow-y-scroll"
      >
        {contributors.map((contributor) => (
          <DropdownItem key={contributor.id}>
            <Link
              className="h-full w-full flex items-center gap-2"
              href={createHref(contributor.login)}
            >
              {contributor.login}
              {userId === contributor.login ? (
                <TickCircle size="14" color="#000" />
              ) : null}
            </Link>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
