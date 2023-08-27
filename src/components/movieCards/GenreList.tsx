import { Genre } from "@api/commonTypes/genre";

interface GenreListProps {
  genres: Array<Genre>;
}

export default function GenreList({ genres }: GenreListProps) {
  return (
    <div class="flex flex-row flex-wrap gap-1">
      {genres.map((g, i) =>
        <a class="p-0.5 pb-1 px-2 rounded bg-nord2 hover:bg-nord3 hover:cursor-default shadow-sm" href={`/genre/${g.name}`} key={i}>
          {g.name}
        </a>
      )}
    </div>
  );
}
