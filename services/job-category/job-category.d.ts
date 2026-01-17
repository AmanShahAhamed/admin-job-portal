export enum Status {
    ACTIVE,
    INACTIVE,
    PENDING,
}

interface IListParam {
    status?: Status
}

interface ICreateCategory {
    name: string;
}

export interface IUpdateCategory extends PartialType(ICreateCategory) {
    id: number;
    status?: Status
}


export interface ICategoryList {
    id: number;
    name: string;
    status: Status;
}