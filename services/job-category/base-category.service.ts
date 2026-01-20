import { useQuery, useMutation } from "@tanstack/react-query";
import { axios } from "../../api";
import {
    ICategoryList,
    ICreateCategory,
    IListParam,
    IUpdateCategory,
} from "./job-category";

export const useCategoryList = (
    url: string,
    key: string,
    params?: IListParam
) =>
    useQuery<ICategoryList[]>({
        queryKey: [key, params],
        queryFn: async () => {
            const { data } = await axios.get(url, { params });
            return data;
        },
    });

export const useCategoryCreate = (url: string, key: string) =>
    useMutation({
        mutationKey: [key],
        mutationFn: async (payload: ICreateCategory) => {
            const { data } = await axios.post(url, payload);
            return data;
        },
    });

export const useCategoryUpdate = (url: string, key: string) =>
    useMutation({
        mutationKey: [key],
        mutationFn: async (payload: IUpdateCategory) => {
            const { data } = await axios.patch(url, payload);
            return data;
        },
    });
