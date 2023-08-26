import { Post } from "./types";

export function extractGameInfo(snippet: string): {
  genres: string[];
  companies: string[];
} {
  const genresRegex = /Genres\/Tags: (.*?) (Companies|Company):/;
  const companiesRegex = /(Companies|Company): (.*?)( Language| Original Size)/;

  const genresMatch = snippet.match(genresRegex);
  const companiesMatch = snippet.match(companiesRegex);

  const genres = genresMatch ? genresMatch[1].trim().split(", ") : [];
  const companies = companiesMatch ? companiesMatch[2].trim().split(",") : [];

  return {
    genres,
    companies,
  };
}

export function extractGameImage(snippet: string): string {
  const imgTagRegex = /<img[^>]+src="([^">]+)"/;
  const imgTagMatch = snippet.match(imgTagRegex);

  if (imgTagMatch) {
    return imgTagMatch[1];
  }

  return "";
}

export function getDifference(array1: Post[], array2: Post[]) {
  return array1.filter((object1) => !array2.some((object2) => object1.title === object2.title));
}
