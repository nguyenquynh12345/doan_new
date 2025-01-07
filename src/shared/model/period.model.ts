export interface INewPeriod {
  name: string;
  startDate: string;
  endDate: string;
  tokenPrice: number;
}

export interface IPeriod extends INewPeriod {
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  id: string;
}
