import IssuesContainer from "@/containers/issues";

import { getRepoIssuesData, getRepoContributors } from "@/common/api/issues";

type Params = {
  author: string;
  repo: string;
};
type PageParams = {
  params: Params;
};

export default async function Home({ params }: PageParams) {
  const { author, repo } = params;
  const repoIssues = await getRepoIssuesData({ author, repo });
  const repoContributors = await getRepoContributors(author, repo);

  return (
    <IssuesContainer
      repoContributors={repoContributors}
      repoIssues={repoIssues}
    />
  );
}
