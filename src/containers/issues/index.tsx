"use client";

import React, { useEffect } from "react";
import { useIssuesStore } from "@/store/store";
import IssueItem from "@/components/issues/issue-item";
import { GithubIssue, GithubUser } from "@/common/types/issues";
import { cn } from "@/common/utils/cn";

import AuthorsDropdown from "@/components/issues/filters/authors-dropdown";

type Props = {
  repoIssues: GithubIssue[];
  repoContributors: GithubUser[];
};

function IssuesContainer({ repoIssues, repoContributors }: Props) {
  const { issues, setIssues, setContributors } = useIssuesStore();

  useEffect(() => {
    setIssues(repoIssues);
    setContributors(repoContributors);
  }, [repoContributors, repoIssues, setContributors, setIssues]);

  return (
    <section className="py-7 max-w-[1280px] mx-auto">
      <div
        className={cn(
          `
            flex justify-end bg-[#161b22] p-4 border border-[#30363d]
            hover:bg-[#2c3543] border-t-[#30363d] border-b-0 rounded-t-md
          `
        )}
      >
        <AuthorsDropdown />
      </div>
      {issues.map((issue, i) => (
        <IssueItem
          issue={issue}
          itemIndex={i}
          itemsLength={issues.length}
          key={issue.id}
        />
      ))}
    </section>
  );
}

export default IssuesContainer;
