import Card from "@components/atomic/Card"
import GenreList from "./GenreList"
import RatingTable from "@components/atomic/RatingTable"
import { Movie } from "@api/commonTypes/movie";
import useAddFavoriteMovieRequest from "@api/movie/addFavoriteMovieRequest";
import { toast } from "react-toastify";
import { useState } from "preact/hooks";
import useRemoveFavoriteMovieRequest from "@api/movie/removeFaviriteMovieRequest";

export default function MovieCard({ id, title, description, releaseYear, kpRating, imdbRating, averageRating, genres, posterUrl, isFavorite }: Movie) {
  return (
    <Card
      header={<Header title={title} releaseYear={releaseYear} />}
      imageURL={posterUrl}
      imageInfo={<ImageFooter id={id} isFavorite={isFavorite} />}
    >
      <div class="flex flex-col h-full">
        <div class="ps-1">{description}</div>
        <div class="p-1 h-full"><GenreList genres={genres} /></div>
        <RatingTable kpRating={kpRating} kgRating={averageRating} imdbRating={imdbRating} />
      </div>
    </Card>
  );
}

type HeaderProps = Pick<Movie, "title" | "releaseYear">;

function Header({ title, releaseYear }: HeaderProps) {
  return (
    <div class="flex flex-row w-full text-lg">
      <p class="basis-1/2 ms-1">
        {title} ({releaseYear})
      </p>
    </div>
  );
}

type ImageFooterProps = Pick<Movie, "id" | "isFavorite">;

function ImageFooter({ id, isFavorite }: ImageFooterProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const { call: addFavorite } = useAddFavoriteMovieRequest(
    { movieId: id },
    () => { setFavorite(true); toast.success("Фильм добавлен в избранное"); },
    error => toast.error(error.message),
  );

  const { call: removeFavorite } = useRemoveFavoriteMovieRequest(
    { movieId: id },
    () => { setFavorite(false); toast.success("Фильм убран из избранного"); },
    error => toast.error(error.message),
  );

  return (
    <div class="flex flex-row gap-1">
      <button class="min-w-min px-1 rounded shadow-sm bg-nord2 hover:bg-nord3" onClick={() => favorite ? removeFavorite() : addFavorite()}>
        {favorite ? "⭐" : " ✰ "}
      </button>
      <a class="flex justify-center py-1 w-full rounded shadow-sm bg-nord2 hover:bg-nord3" href={`https://4h0y.gitlab.io/#${id}`}>
        yohoho
      </a>
    </div>
  );
}
