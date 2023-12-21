import { create } from "zustand";
import { GithubIssue } from "@/common/types/issues";

interface IssuesState {
  issues: GithubIssue[];
  setIssues: (issues: GithubIssue[]) => void;
}

export const useIssuesStore = create<IssuesState>((set) => ({
  issues: [],
  setIssues: (issues) => set({ issues }),
}));
