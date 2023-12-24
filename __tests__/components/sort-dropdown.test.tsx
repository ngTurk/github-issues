import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SortDropdown from "../../src/components/issues/sorting/sort-dropdown";
import { useIssuesStore } from "../../src/store/store";
import { mockIssues, mockLabel, mockUser } from "../../__mocks__/issues";
import IssuesContainer from "../../src/containers/issues";
import { issuesTestIds } from "@/common/constants/test-ids";
import { sortingLabels } from "../../src/components/issues/sorting/sort-dropdown";

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

describe("SortDropdown", () => {
  beforeEach(() => {
    jest.mock("../../src/store/store", () => ({
      useIssuesStore: jest.fn(() => ({
        issues: mockIssues,
        contributors: [mockUser],
        labels: [mockLabel],
        setIssues: jest.fn(),
        setContributors: jest.fn(),
        setLabels: jest.fn(),
        sortIssues: jest.fn(),
      })),
    }));
  });

  test("renders dropdown with correct options", () => {
    render(<SortDropdown />);

    fireEvent.click(screen.getByTestId(issuesTestIds.sortingDropdownButton));

    expect(
      screen.getByTestId(issuesTestIds.sortingDropdown)
    ).toBeInTheDocument();
  });

  test("calls sortIssues when a sort option is selected", () => {
    render(
      <IssuesContainer
        repoIssues={mockIssues}
        repoContributors={[mockUser]}
        repoLabels={[mockLabel]}
      />
    );

    fireEvent.click(screen.getByTestId(issuesTestIds.sortingDropdownButton));
    fireEvent.click(screen.getByText(sortingLabels["creationDate"].label));

    expect(screen.getAllByTestId(issuesTestIds.issueItem)[0]).toHaveTextContent(
      "[Possible bug] Sibling tree blocked during PPR resume CLA SignedReact"
    );
  });
});
