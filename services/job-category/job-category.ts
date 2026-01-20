export enum Status {
    ACTIVE,
    INACTIVE,
    PENDING,
}

export interface IListParam {
    status?: Status
}

export interface ICreateCategory {
    name: string;
}

export interface IUpdateCategory extends Partial<ICreateCategory> {
    id: number;
    status?: Status
}


export interface ICategoryList {
    id: number;
    name: string;
    status: Status;
}