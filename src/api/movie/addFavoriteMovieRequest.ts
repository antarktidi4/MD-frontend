import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType, Params } from "@api/base/apiRequest";
import { Error } from "@api/commonTypes/error";
import { Movie } from "@api/commonTypes/movie";

type FavoriteParams = {
  movieId: number,
};

type SuccessResponse = Movie;

type FailResponse = Error;

export default function useAddFavoriteMovieRequest(params: FavoriteParams, onSuccess: onSuccessFn<SuccessResponse> = null, onFail: onFailFn<FailResponse> = null) {
  return useApi(
    new ApiRequest("/api/movie/favorites", ApiRequestType.POST, params as unknown as Params),
    onSuccess,
    onFail,
    false
  );
}
