import { GithubIssue, GithubUser } from "@/common/types/issues";

type RepoIssuesDataParams = {
  author: string;
  repo: string;
  createdBy?: string;
};

async function getRepoIssuesData({
  author,
  repo,
  createdBy,
}: RepoIssuesDataParams): Promise<GithubIssue[]> {
  if (!process.env.GITHUB_ISSUES_URL) {
    throw new Error("API URL is not defined in the environment variables");
  }

  const url = process.env.GITHUB_ISSUES_URL.replace("{AUTHOR}", author).replace(
    "{REPO}",
    repo
  );

  const res = await fetch(`${url}?${createdBy ? `creator=${createdBy}` : ""}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getRepoContributors(
  author: string,
  repo: string
): Promise<GithubUser[]> {
  if (!process.env.GITHUB_CONTRIBUTORS_URL) {
    throw new Error(
      "GITHUB_CONTRIBUTORS_URL is not defined in the environment variables"
    );
  }

  const url = process.env.GITHUB_CONTRIBUTORS_URL.replace(
    "{AUTHOR}",
    author
  ).replace("{REPO}", repo);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch contributors: ${response.status}`);
  }

  return response.json();
}

export { getRepoIssuesData, getRepoContributors };
