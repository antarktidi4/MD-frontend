import useMovieRequest from "@api/movie/movieRequest";
import MovieCard from "@components/movieCards/MovieCard";
import MovieReviewForm from "@components/reviewCards/MovieReviewForm";
import MovieReviewList from "@components/reviewCards/MovieReviewList";
import Error from "@pages/Error";
import Loading from "@pages/Loading";
import { useState, useEffect } from "preact/hooks";

interface MovieProps {
  id: number;
}

export default function Movie({ id }: MovieProps) {
  const [changed, setChanged] = useState(false);
  const [findKp, setFindKp] = useState(false);
  const { call, response, isLoading, isError } = useMovieRequest(id, { findKp });

  useEffect(() => call(), [id, findKp]);

  if (isLoading) return <Loading />;
  if (isError && !findKp && response.fail.statusCode === 422) setFindKp(true);
  if (isError) return <Error message={response.fail.message} />;

  return (
    <div class="flex flex-col">
      <MovieCard {...response.success} />
      <MovieReviewForm id={id} toggleChanged={() => setChanged(!changed)} />
      <MovieReviewList id={id} changed={changed} />
    </div>
  );
}

