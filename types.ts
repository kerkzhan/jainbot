export type Post = {
  link: string;
  title: string;
  contentSnippet: string;
  "content:encoded": string;
};

export type FormattedPost = {
  title: string;
  link: string;
  companies: string[];
  genres: string[];
  imageUrl: string;
};
