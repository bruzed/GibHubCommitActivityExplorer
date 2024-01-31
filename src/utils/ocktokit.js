import { Octokit } from "@octokit/rest";

export const octokit = new Octokit({
  auth: import.meta.env.VITE_GH_KEY,
  userAgent: "Github Commit Activity Explorer v1",
});
