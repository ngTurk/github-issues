import IssuesContainer from "@/containers/issues";
import type { Metadata } from "next";
import {
  getRepoIssuesData,
  getRepoContributors,
  getRepoLabels,
} from "@/common/api/issues";

type Params = {
  author: string;
  repo: string;
};
type SearchParams = {
  labels: string;
};
type PageParams = {
  params: Params;
  searchParams: SearchParams;
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  return {
    title: `${params.author}/${params.repo} issues`,
  };
}

export default async function Home({ params, searchParams }: PageParams) {
  const { author, repo } = params;
  const { labels } = searchParams;

  const [repoIssues, repoContributors, repoLabels] = await Promise.all([
    getRepoIssuesData({ author, repo, labels }),
    getRepoContributors(author, repo),
    getRepoLabels(author, repo),
  ]);

  return (
    <IssuesContainer
      repoContributors={repoContributors}
      repoIssues={repoIssues}
      repoLabels={repoLabels}
    />
  );
}
