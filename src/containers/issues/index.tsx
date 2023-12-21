"use client";

import React, { useEffect } from "react";
import { useIssuesStore } from "@/store/store";
import IssueItem from "@/components/issues/issue-item";
import { GithubIssue } from "@/common/types/issues";

type Props = {
  repoIssues: GithubIssue[];
};

function IssuesContainer({ repoIssues }: Props) {
  const { issues, setIssues } = useIssuesStore();

  useEffect(() => {
    setIssues(repoIssues);
  }, [repoIssues, setIssues]);

  return (
    <section className="py-7 max-w-[1280px] mx-auto">
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
