export interface IMoney{
    id: number,
    userId: number,
    name: string,
    status: string,
    date: string,
    amount: number
}

export interface IResponseMoney{
    data: Array<IMoney>
}