export interface ITask {
  id: number;
  userId: number;
  name: string;
  status: string;
  type: string;
  date: string;
  description: string;
}

interface ISummarySection {
  count: number;
  data: ITask[];
}

export interface ITaskResponse {
  data: ITask[];
}

export interface ITaskSummaryResponse {
  daily: ISummarySection;
  monthly: ISummarySection;
  yearly: ISummarySection;
}
