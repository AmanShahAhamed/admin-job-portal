import { API_ROUTES } from "../../api";
import { useCategoryCreate, useCategoryList, useCategoryUpdate } from "./base-category.service";
import { IListParam } from "./job-category";

const createServiceHooks = (route: string, resourceKey: string) => ({
    useList: (params?: IListParam) =>
        useCategoryList(route, resourceKey, params),

    useCreate: () => useCategoryCreate(route, resourceKey),

    useUpdate: () => useCategoryUpdate(route, resourceKey),
});

export const {
    useCreate: useStateCreate,
    useUpdate: useStateUpdate,
    useList: useStateList,
} = createServiceHooks(API_ROUTES.States, "state");

export const {
    useCreate: useDesignationCreate,
    useUpdate: useDesignationUpdate,
    useList: useDesignationList,
} = createServiceHooks(API_ROUTES.Designations, "designation");

export const {
    useCreate: useEducationCreate,
    useUpdate: useEducationUpdate,
    useList: useEducationList,
} = createServiceHooks(API_ROUTES.Educations, "education");
