import { GithubIssue } from "@/common/types/issues";

async function getRepoIssuesData(
  author: string,
  repo: string
): Promise<GithubIssue[]> {
  if (!process.env.GITHUB_ISSUES_URL) {
    throw new Error("API URL is not defined in the environment variables");
  }

  const url = process.env.GITHUB_ISSUES_URL.replace("{AUTHOR}", author).replace(
    "{REPO}",
    repo
  );

  const res = await fetch(url + "?assignee=hoxyq");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export { getRepoIssuesData };
