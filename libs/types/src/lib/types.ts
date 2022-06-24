export enum Status {
  Enabled = 1,
  Disabled,
}
export enum OperateType {
  Preview = 1,
  Create,
  Edit,
}

export enum OrderTypes {
  DESC = 'DESC',
  ASC = 'ASC',
}

export interface Result<T> {
  code: number;
  message: string;
  data: T;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  pageNum: number;
  pageSize: number;
  maxPage: number;
}
