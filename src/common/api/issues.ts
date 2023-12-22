import { GithubIssue, GithubLabel, GithubUser } from "@/common/types/issues";

type RepoIssuesDataParams = {
  author: string;
  repo: string;
  createdBy?: string;
  labels?: string;
};

async function getRepoIssuesData({
  author,
  repo,
  createdBy,
  labels,
}: RepoIssuesDataParams): Promise<GithubIssue[]> {
  if (!process.env.GITHUB_ISSUES_URL) {
    throw new Error("API URL is not defined in the environment variables");
  }

  const baseUrl = process.env.GITHUB_ISSUES_URL.replace(
    "{AUTHOR}",
    author
  ).replace("{REPO}", repo);
  const params = new URLSearchParams();

  if (createdBy) {
    params.append("creator", createdBy);
  }

  if (labels) {
    params.append("labels", labels);
  }

  const fullUrl = `${baseUrl}?${params}`;
  const res = await fetch(fullUrl);

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

async function getRepoLabels(
  author: string,
  repo: string
): Promise<GithubLabel[]> {
  if (!process.env.GITHUB_LABELS_URL) {
    throw new Error(
      "GITHUB_LABELS_URL is not defined in the environment variables"
    );
  }

  const url = process.env.GITHUB_LABELS_URL.replace("{AUTHOR}", author).replace(
    "{REPO}",
    repo
  );

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch labels: ${response.status}`);
  }

  return response.json();
}

export { getRepoIssuesData, getRepoContributors, getRepoLabels };
