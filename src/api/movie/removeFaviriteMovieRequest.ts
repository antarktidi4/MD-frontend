import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType, Params } from "@api/base/apiRequest";
import { Error } from "@api/commonTypes/error";

type FavoriteParams = {
  movieId: number,
};

type SuccessResponse = null;

type FailResponse = Error;

export default function useRemoveFavoriteMovieRequest(params: FavoriteParams, onSuccess: onSuccessFn<SuccessResponse> = null, onFail: onFailFn<FailResponse> = null) {
  return useApi(
    new ApiRequest("/api/movie/favorites", ApiRequestType.DELETE, params as unknown as Params),
    onSuccess,
    onFail
  );
}
