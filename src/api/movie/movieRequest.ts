import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType, Params } from "@api/base/apiRequest";
import { Error } from "@api/commonTypes/error";
import { Movie } from "@api/commonTypes/movie";

type MovieParams = {
  findKp: boolean;
};

type SuccessResponse = Movie;

type FailResponse = Error;

export default function useMovieRequest(movieId: number, params: MovieParams, onSuccess: onSuccessFn<SuccessResponse> = null, onFail: onFailFn<FailResponse> = null) {
  return useApi(
    new ApiRequest(`/api/movie/${movieId}`, ApiRequestType.GET, params as unknown as Params),
    onSuccess,
    onFail
  );
}
