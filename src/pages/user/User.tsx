import useGetFavoriteMoviesRequest from "@api/movie/getFavoriteMoviesRequest";
import useUserMoviesRequest from "@api/movie/userMoviesRequest";
import useGetUserRequest from "@api/user/getUserRequest";
import Paginator from "@components/atomic/Paginator";
import FoldedMovieCard from "@components/movieCards/FoldedMovieCard";
import MovieCard from "@components/movieCards/MovieCard";
import ExpandedReviewCard from "@components/reviewCards/ExpandedReviewCard";
import ExpandedUserCard from "@components/userCards/ExpandedUserCard";
import Error from "@pages/Error";
import Loading from "@pages/Loading";
import { userStore } from "@stores/userStore";
import { useEffect, useState } from "preact/hooks";
import { toast } from "react-toastify";


interface UserProps {
  id: number;
}

export default function User({ id }: UserProps) {
  const currentUserId = userStore(state => state?.user?.id);
  const [isReviewState, setReviewState] = useState(true);
  const { call, response, isLoading, isError } = useGetUserRequest(
    id, () => { }, () => { },
  );

  useEffect(() => call(), [id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error message={response?.fail?.message} />;

  return (
    <div>
      {currentUserId === Number(id) ? <a class="flex rounded bg-nord1 hover:bg-nord2 w-full p-1 mb-1 justify-center" href={`/userSettings/${id}`}>Редактировать профиль</a> : null}
      <ExpandedUserCard {...response.success} />
      <div class="flex flex-row my-1 gap-1">
        <button class="px-1 bg-nord1 hover:bg-nord2 disabled:bg-nord0 disabled:text-nord1 w-1/2 rounded" disabled={isReviewState} onClick={() => setReviewState(true)}>
          Отзывы
        </button>
        <button class="px-1 bg-nord1 hover:bg-nord2 disabled:bg-nord0 disabled:text-nord1 w-1/2 rounded" disabled={!isReviewState} onClick={() => setReviewState(false)}>
          Избранное
        </button>
      </div>
      {isReviewState ?
        <UserReviews id={id} /> :
        <UserFavorites id={id} />
      }
    </div>
  );
}

function UserReviews({ id }: UserProps) {
  const [page, setPage] = useState(1);
  const { call, response, isLoading, isError } = useUserMoviesRequest(
    id, { page }, () => { },
    error => toast.error(error.message)
  );

  useEffect(() => call(), [page, id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error message={response?.fail?.message} />;

  return (
    <div>
      {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
      {response.success.movies.map(m => <ExpandedReviewCard {...m} />)}
      {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
    </div>
  );
}

function UserFavorites({ id }: UserProps) {
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
