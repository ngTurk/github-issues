import IssuesContainer from "@/containers/issues";

import { getRepoIssuesData } from "@/common/api/issues";

export default async function Home() {
  const repoIssues = await getRepoIssuesData();

  return <IssuesContainer repoIssues={repoIssues} />;
}
