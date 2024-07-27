export type SuccessResponseData<T> = {
    status: number;
    data: T;
    [key: string]: unknown;
};
