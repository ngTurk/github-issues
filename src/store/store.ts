import { create } from "zustand";
import { GithubIssue, GithubUser } from "@/common/types/issues";

interface IssuesState {
  issues: GithubIssue[];
  setIssues: (issues: GithubIssue[]) => void;
  contributors: GithubUser[];
  setContributors: (contributors: GithubUser[]) => void;
}

export const useIssuesStore = create<IssuesState>((set) => ({
  issues: [],
  setIssues: (issues) => set({ issues }),

  contributors: [],
  setContributors: (contributors) => set({ contributors }),
}));
