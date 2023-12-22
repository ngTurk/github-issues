"use client";

import React, { useEffect } from "react";
import { useIssuesStore } from "@/store/store";
import IssueItem from "@/components/issues/issue-item";
import { GithubIssue, GithubLabel, GithubUser } from "@/common/types/issues";
import { cn } from "@/common/utils/cn";

import AuthorsDropdown from "@/components/issues/filters/authors-dropdown";
import LabelsDropdown from "@/components/issues/filters/labels-dropdown";

type Props = {
  repoIssues: GithubIssue[];
  repoContributors: GithubUser[];
  repoLabels: GithubLabel[];
};

function IssuesContainer({ repoIssues, repoContributors, repoLabels }: Props) {
  const { issues, setIssues, setContributors, setLabels } = useIssuesStore();

  useEffect(() => {
    setIssues(repoIssues);
    setContributors(repoContributors);
    setLabels(repoLabels);
  }, [
    repoContributors,
    repoIssues,
    repoLabels,
    setContributors,
    setIssues,
    setLabels,
  ]);

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
        <LabelsDropdown />
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
