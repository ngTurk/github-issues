import { Avatar, Chip, Tooltip } from "@nextui-org/react";
import DottedCircle from "@/components/icons/dotted-circle";
import { cn } from "@/common/utils/cn";
import { GithubIssue } from "@/common/types/issues";
import { formatDistanceToNow } from "date-fns";
import { hexToRgba } from "@/common/utils/hex-to-rgba";

type Props = {
  itemIndex: number;
  itemsLength: number;
  issue: GithubIssue;
};

export default function IssueItem({ itemIndex, itemsLength, issue }: Props) {
  const {
    title,
    number,
    user,
    created_at,
    labels,
    html_url,
    state,
    assignees,
  } = issue;
  const { login: username } = user;

  const formattedDate = formatDistanceToNow(new Date(created_at), {
    addSuffix: true,
  });

  return (
    <a href={html_url} target="_blank">
      <div
        className={cn(
          "flex place-items-start bg-[#161b22] p-4 border border-[#30363d] hover:bg-[#2c3543]",
          "border-t-[#30363d] border-b-0",
          itemIndex === itemsLength - 1 &&
            "rounded-b-md border-b-1 border-b-[#30363d]"
        )}
      >
        <DottedCircle fill={state === "open" ? "#1a7f37" : "#A371F7"} />
        <div className="ml-2 flex flex-col">
          <h3 className="text-base font-semibold leading-none text-white">
            {title}{" "}
            {labels.map((label) => (
              <span key={label.id} className="mr-1">
                <Tooltip
                  disableAnimation
                  isDisabled={!label.description}
                  content={label.description}
                >
                  <Chip
                    className="h-5"
                    size="sm"
                    variant="bordered"
                    style={{
                      background: hexToRgba(label.color, 0.24),
                      color: `#${label.color}`,
                      borderColor: hexToRgba(label.color, 0.24),
                    }}
                  >
                    {label.name}
                  </Chip>
                </Tooltip>
              </span>
            ))}
          </h3>
          <p className="text-xs text-gray-400">
            {`#${number}`} {state === "open" ? "opened" : "closed"}{" "}
            {formattedDate} by {username}
          </p>
        </div>
        <div className="ml-auto">
          {assignees.map((assignee) => (
            <a target="_blank" href={assignee.html_url} key={assignee.id}>
              <Tooltip content={assignee.login}>
                <Avatar
                  src={assignee.avatar_url}
                  className="w-6 h-6 text-tiny"
                />
              </Tooltip>
            </a>
          ))}
        </div>
      </div>
    </a>
  );
}
