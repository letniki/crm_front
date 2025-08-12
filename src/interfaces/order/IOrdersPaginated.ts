import { IOrder } from "./IOrder";

export interface IOrdersPaginated {
    total: number;
    perPage: number;
    nextPage: number| null;
    prevPage: number | null;
    data: IOrder[];
}