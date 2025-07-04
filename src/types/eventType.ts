export interface IEvent {
  id: number;
  userId: number;
  name: string;
  type: string;
  location: number;
  date: string;
}

interface ISummarySection {
  count: number;
  data: IEvent[];
}

export interface IEventResponse {
  data: IEvent[];
}

export interface IEventSummaryResponse {
  daily: ISummarySection;
  monthly: ISummarySection;
  yearly: ISummarySection;
}
