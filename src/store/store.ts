import { create } from "zustand";
import { GithubIssue, GithubLabel, GithubUser } from "@/common/types/issues";

interface IssuesState {
  issues: GithubIssue[];
  setIssues: (issues: GithubIssue[]) => void;
  contributors: GithubUser[];
  setContributors: (contributors: GithubUser[]) => void;
  labels: GithubLabel[];
  setLabels: (labels: GithubLabel[]) => void;
  sortIssues: (sortKey: string) => void;
}

export const useIssuesStore = create<IssuesState>((set) => ({
  issues: [],
  setIssues: (issues) => set({ issues }),
  sortIssues: (sortKey = "creationDate") => {
    set((state) => {
      let sortedIssues = [...state.issues];
      switch (sortKey) {
        case "creationDate":
          sortedIssues.sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          );
          break;
        case "comments":
          sortedIssues.sort((a, b) => a.comments - b.comments);
          break;
        case "modifiedDate":
          sortedIssues.sort(
            (a, b) =>
              new Date(a.updated_at).getTime() -
              new Date(b.updated_at).getTime()
          );
          break;
      }
      return { issues: sortedIssues };
    });
  },

  contributors: [],
  setContributors: (contributors) => set({ contributors }),

  labels: [],
  setLabels: (labels) => set({ labels }),
}));
