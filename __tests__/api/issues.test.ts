import { getRepoIssuesData } from "@/common/api/issues";
import { getRepoContributors } from "@/common/api/issues";

process.env.GITHUB_ISSUES_URL = "http://example.com/issues/{AUTHOR}/{REPO}";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("getRepoIssuesData", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("fetches issues data successfully", async () => {
    const mockIssues = [{ id: 1, title: "Issue 1" }];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockIssues),
    });

    const issues = await getRepoIssuesData({
      author: "testAuthor",
      repo: "testRepo",
    });
    expect(issues).toEqual(mockIssues);
    expect(fetch).toHaveBeenCalledWith(
      "http://example.com/issues/testAuthor/testRepo?"
    );
  });

  it("throws an error when environment variable is not set", async () => {
    const originalEnv = process.env.GITHUB_ISSUES_URL;
    process.env.GITHUB_ISSUES_URL = "";

    await expect(
      getRepoIssuesData({ author: "testAuthor", repo: "testRepo" })
    ).rejects.toThrow("API URL is not defined in the environment variables");

    process.env.GITHUB_ISSUES_URL = originalEnv;
  });
});

describe("getRepoContributors", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("fetches contributors data successfully", async () => {
    const mockContributors = [{ id: 1, name: "Contributor 1" }];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockContributors),
    });

    const contributors = await getRepoContributors("testAuthor", "testRepo");
    expect(contributors).toEqual(mockContributors);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/testAuthor/testRepo/contributors"
    );
  });

  it("throws an error when fetching contributors fails", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getRepoContributors("testAuthor", "testRepo")).rejects.toThrow(
      "Failed to fetch contributors"
    );
  });

  it("throws an error when environment variable is not set", async () => {
    process.env.GITHUB_CONTRIBUTORS_URL = "";

    await expect(getRepoContributors("testAuthor", "testRepo")).rejects.toThrow(
      "GITHUB_CONTRIBUTORS_URL is not defined in the environment variables"
    );
  });
});
