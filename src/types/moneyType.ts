export interface IMoney {
  id: number;
  userId: number;
  name: string;
  status: string;
  date: string;
  amount: number;
}

interface ISummarySection {
  count: number;
  data: IMoney[];
}

export interface IMoneyResponse {
  data: IMoney[];
}

export interface IMoneySummaryResponse {
  daily: ISummarySection;
  monthly: ISummarySection;
  yearly: ISummarySection;
}
