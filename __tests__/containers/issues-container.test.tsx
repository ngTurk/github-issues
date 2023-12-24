import React from "react";
import { render, screen } from "@testing-library/react";
import IssuesContainer from "../../src/containers/issues";
import { mockUser, mockIssues, mockLabel } from "../../__mocks__/issues";
import { issuesTestIds } from "@/common/constants/test-ids";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathname: "/facebook/react/acdlite",
    query: { author: "facebook", repo: "react", createdBy: "acdlite" },
    push: jest.fn(),
  })),
}));
jest.mock("next/navigation", () => {
  return {
    __esModule: true,
    usePathname: jest.fn().mockReturnValue("/facebook/react/acdlite"),
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
      get: () => {},
    }),
  };
});
jest.mock("date-fns", () => ({
  ...jest.requireActual("date-fns"),
  formatDistanceToNow: jest.fn(() => "some time ago"),
}));

describe("IssuesContainer", () => {
  test("renders no results state when there are no issues", () => {
    jest.mock("../../src/store/store", () => ({
      useIssuesStore: jest.fn(() => ({
        issues: [],
        contributors: [],
        labels: [],
        setIssues: jest.fn(),
        setContributors: jest.fn(),
        setLabels: jest.fn(),
      })),
    }));

    render(
      <IssuesContainer repoIssues={[]} repoContributors={[]} repoLabels={[]} />
    );
    expect(screen.getByTestId(issuesTestIds.noResult)).toBeInTheDocument();
  });

  test("renders issues table when there are issues", () => {
    jest.mock("../../src/store/store", () => ({
      useIssuesStore: jest.fn(() => ({
        issues: mockIssues,
        contributors: [mockUser],
        labels: [mockLabel],
        setIssues: jest.fn(),
        setContributors: jest.fn(),
        setLabels: jest.fn(),
      })),
    }));

    render(
      <IssuesContainer
        repoIssues={mockIssues}
        repoContributors={[mockUser]}
        repoLabels={[mockLabel]}
      />
    );
    expect(screen.getByTestId(issuesTestIds.issuesTable)).toBeInTheDocument();
    expect(screen.getAllByTestId(issuesTestIds.issueItem)).toHaveLength(
      mockIssues.length
    );
  });
});
