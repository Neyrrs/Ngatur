export interface ITask{
    id: number,
    userId: number,
    name: string,
    status: string,
    type: string,
    date: string,
    description: string
}

export interface IResponseMoney{
    data: Array<ITask>
}