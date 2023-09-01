import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType, Params } from "@api/base/apiRequest";
import { PageParams } from "@api/commonParams/page";
import { Error } from "@api/commonTypes/error";
import { Movie } from "@api/commonTypes/movie";
import { Pages } from "@api/commonTypes/pages";

type FavoriteParams = {
  userId: number,
} & PageParams;

type SuccessResponse = {
  movies: Array<Movie>,
} & Pages;

type FailResponse = Error;

export default function useGetFavoriteMoviesRequest(params: FavoriteParams, onSuccess: onSuccessFn<SuccessResponse> = null, onFail: onFailFn<FailResponse> = null) {
  return useApi(
    new ApiRequest("/api/movie/favorites", ApiRequestType.GET, params as unknown as Params),
    onSuccess,
    onFail
  );
}
