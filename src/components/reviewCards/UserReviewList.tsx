import useUserMoviesRequest from "@api/movie/userMoviesRequest";
import Paginator from "@components/atomic/Paginator";
import Error from "@pages/Error";
import Loading from "@pages/Loading";
import { useEffect, useState } from "preact/hooks";
import { toast } from "react-toastify";
import ExpandedReviewCard from "./ExpandedReviewCard";

interface UserReviewListProps {
  id: number;
}

export default function UserReviewList({ id }: UserReviewListProps) {
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
