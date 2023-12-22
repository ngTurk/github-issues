import IssuesContainer from "@/containers/issues";

import {
  getRepoIssuesData,
  getRepoContributors,
  getRepoLabels,
} from "@/common/api/issues";

type Params = {
  author: string;
  repo: string;
  createdBy: string;
};
type SearchParams = {
  labels: string;
};
type PageParams = {
  params: Params;
  searchParams: SearchParams;
};

export default async function Home({ params, searchParams }: PageParams) {
  const { author, repo, createdBy } = params;
  const { labels } = searchParams;

  const [repoIssues, repoContributors, repoLabels] = await Promise.all([
    getRepoIssuesData({ author, repo, labels, createdBy }),
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
