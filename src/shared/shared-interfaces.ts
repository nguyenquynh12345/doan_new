import { IFileType } from '@/components/shared/uploadComponents/upload.ultil';
import React from 'react';

export interface IInitialState {
  fetchEntitiesSuccess: boolean;
  fetchEntitySuccess: boolean;
  updateEntitySuccess: boolean;
  deleteEntitySuccess: boolean;
  loading: boolean;
  errorMessage: string | null;
  errorCode?: string | null;
  totalItems: number;
  totalPages: number;
}

export interface IParams {
  size: number;
  page: number;
  sort?: string;
  keyword?: string;
}

export interface ISort {
  empty: true;
  unsorted: true;
  sorted: false;
}

export interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: ISort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface IDataResponse<T> {
  content: T;
  pageable: IPageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: ISort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
export interface IResponseList<T> {
  data: IDataResponse<T>;
  statusCode: number;
  message: string | null;
}

export interface IResponse<T> {
  data: T;
  statusCode: number;
  message: string | null;
}

export interface ISelectValue<T> {
  value: T;
  label: React.ReactNode;
}

export interface IWindowEth extends Window {
  ethereum: any;
  grecaptcha: any;
}

export interface IUploadFile {
  fileUpload?: IFileType | null;
}

export interface IUploadMultipleFile {
  filesUpload?: IFileType[];
}
