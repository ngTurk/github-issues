import { GithubIssue } from "@/common/types/issues";

async function getRepoIssuesData(): Promise<GithubIssue[]> {
  const url = process.env.GITHUB_ISSUES_URL;

  if (!url) {
    throw new Error("API URL is not defined in the environment variables");
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export { getRepoIssuesData };
