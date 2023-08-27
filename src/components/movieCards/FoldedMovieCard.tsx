import { Movie } from "@api/commonTypes/movie";

type FoldedMovie = {
  reviewCount: number;
} & Pick<Movie, "id" | "title" | "posterUrl">;

export default function FoldedMovieCard({ reviewCount, id, title, posterUrl }: FoldedMovie) {
  return (
    <a class="flex flex-col p-1 bg-nord-1 m-1 rounded w-1/5 hover:bg-nord-2 min-w-min" key={id} href={`/movie/${id}`}>
      <img class="rounded shadow-sm" src={posterUrl} alt={`${title} постер`} width="100%" height="auto" />
      <p class="min-w-min text-center">{title}</p>
      <p class="text-center">Оценило: {reviewCount}</p>
    </a>
  );
}
