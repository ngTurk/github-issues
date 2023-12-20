import { Chip, Tooltip } from "@nextui-org/react";
import DottedCircle from "@/components/icons/dotted-circle";
import { cn } from "@/common/utils/cn";

type Props = {
  itemIndex: number;
  itemsLength: number;
};

export default function IssueItem({ itemIndex, itemsLength }: Props) {
  return (
    <a href="">
      <div
        className={cn(
          "flex place-items-start bg-[#161b22] p-4 border border-[#30363d] hover:bg-[#2c3543]",
          "border-t-[#30363d] border-b-0",
          itemIndex === 0 && "rounded-t-md",
          itemIndex === itemsLength - 1 &&
            "rounded-b-md border-b-1 border-b-[#30363d]"
        )}
      >
        <DottedCircle fill="#1a7f37" />
        <div className="ml-2 flex flex-col">
          <h3 className="text-base font-semibold leading-none text-white">
            Next 13.4.7 debugger in client code is not getting hit
          </h3>
          <p className="text-xs text-gray-400">
            #52073 opened on Jul 1 by raghavan-s-d
          </p>
        </div>
        <div className="ml-1 flex">
          <Tooltip content="Test">
            <Chip
              // className="text-white h-5"
              size="sm"
              variant="faded"
              // style={{ background: "rgb(141, 172, 241)" }}
            >
              area: app
            </Chip>
          </Tooltip>
        </div>
      </div>
    </a>
  );
}
