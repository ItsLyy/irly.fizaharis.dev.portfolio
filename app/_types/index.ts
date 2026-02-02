export interface IProject {
  name: string;
  slug: string;
  contentPath: string;
  imagePath: string;
  githubLink?: string;
  websiteLink?: string;
  createdAt: string;
  updatedAt: string;
  stacks: string[];
}
