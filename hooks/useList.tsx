import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { API_ROUTES, axios } from "../api";

type Id = number | `${number}`;
type Slug = string;
type TRoutes = typeof API_ROUTES;
type TRouteKey = TRoutes[keyof TRoutes] extends `/${infer T}` ? T : never;
type TValidRoute =
  | `${TRouteKey}/${Id}`
  | `${TRouteKey}/${Slug}`
  | `${Id}/${TRouteKey}`
  | `${Slug}/${TRouteKey}`;

export type TQueryParams = Record<string, string | number | boolean>;
type UseListOptions<TData, TError> = {
  params?: TQueryParams;
  enabled?: boolean;
  queryKey?: QueryKey;
} & Omit<
  UseQueryOptions<TData, TError, TData, QueryKey>,
  "queryKey" | "queryFn" | "enabled"
>;

export function useList<TData, TError = unknown>(
  route: TValidRoute,
  options?: UseListOptions<TData, TError>,
) {
  const {
    params,
    enabled = true,
    queryKey,
    ...reactQueryOptions
  } = options ?? {};

  const finalQueryKey: QueryKey = queryKey ?? [route, params ?? {}];

  return useQuery<TData, TError>({
    queryKey: finalQueryKey,
    queryFn: async () => {
      const { data } = await axios.get<TData>(route, {
        params,
      });
      return data;
    },
    enabled,
    ...reactQueryOptions,
  });
}

export const useDetails = <TData, TError>(
  route: TValidRoute,
  params?: TQueryParams,
) => {
  return useList<TData, TError>(route, {
    params,
    enabled: false,
  });
};
