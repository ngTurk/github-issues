import { create } from "zustand";
import { GithubIssue, GithubLabel, GithubUser } from "@/common/types/issues";

interface IssuesState {
  issues: GithubIssue[];
  setIssues: (issues: GithubIssue[]) => void;
  contributors: GithubUser[];
  setContributors: (contributors: GithubUser[]) => void;
  labels: GithubLabel[];
  setLabels: (labels: GithubLabel[]) => void;
}

export const useIssuesStore = create<IssuesState>((set) => ({
  issues: [],
  setIssues: (issues) => set({ issues }),

  contributors: [],
  setContributors: (contributors) => set({ contributors }),

  labels: [],
  setLabels: (labels) => set({ labels }),
}));
