"use client";

import React, { useEffect } from "react";
import { useIssuesStore } from "@/store/store";
import IssueItem from "@/components/issues/issue-item";
import { GithubIssue, GithubLabel, GithubUser } from "@/common/types/issues";
import { cn } from "@/common/utils/cn";

import AuthorsDropdown from "@/components/issues/filters/authors-dropdown";
import LabelsDropdown from "@/components/issues/filters/labels-dropdown";
import SortDropdown from "@/components/issues/sorting/sort-dropdown";

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
            flex bg-[#161b22] p-4 border border-[#30363d]
            hover:bg-[#2c3543] border-t-[#30363d] border-b-0 rounded-t-md
          `
        )}
      >
        <span className="pr-1">
          <AuthorsDropdown />
        </span>
        <span className="pr-1">
          <LabelsDropdown />
        </span>
        <span className="border-l border-l-gray-600 pl-1">
          <SortDropdown />
        </span>
      </div>
      {issues.length > 0 ? (
        issues.map((issue, i) => (
          <IssueItem
            issue={issue}
            itemIndex={i}
            itemsLength={issues.length}
            key={issue.id}
          />
        ))
      ) : (
        <div className="bg-[#161b22] p-4 border border-[#30363d] text-white">
          No results matched your search.
        </div>
      )}
    </section>
  );
}

export default IssuesContainer;
