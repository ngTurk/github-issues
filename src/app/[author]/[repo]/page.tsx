import IssuesContainer from "@/containers/issues";

import { getRepoIssuesData } from "@/common/api/issues";

type Params = {
  author: string;
  repo: string;
};
type PageParams = {
  params: Params;
};

export default async function Home({ params }: PageParams) {
  const { author, repo } = params;
  const repoIssues = await getRepoIssuesData(author, repo);

  console.log(repoIssues);

  return <IssuesContainer repoIssues={repoIssues} />;
}
