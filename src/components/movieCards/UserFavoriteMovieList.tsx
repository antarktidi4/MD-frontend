import useGetFavoriteMoviesRequest from "@api/movie/getFavoriteMoviesRequest";
import Paginator from "@components/atomic/Paginator";
import Error from "@pages/Error";
import Loading from "@pages/Loading";
import { useEffect, useState } from "preact/hooks";
import { toast } from "react-toastify";
import MovieCard from "./MovieCard";
import { User } from "@api/commonTypes/user";

interface UserFavoriteMovieList extends Pick<User, "id"> { }

export default function UserFavoriteMovieList({ id }: UserFavoriteMovieList) {
  const [page, setPage] = useState(1);
  const { call, response, isLoading, isError } = useGetFavoriteMoviesRequest(
    { userId: id, page }, () => { },
    error => toast.error(error.message)
  );

  useEffect(() => call(), [id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error message={response?.fail?.message} />;

  return (
    <div>
      {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
      {response.success.movies.map(m => <MovieCard {...m} />)}
      {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
    </div>
  );
}
