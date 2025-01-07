import axiosFactory from '@/shared/config/axios-interceptor';
import { UPLOAD_API_URL } from '@/shared/config/constants';
import { AxiosResponse } from 'axios';

export interface IFileUpload {
  url: string[];
}

export const uploadFile = async (files: File) => {
  try {
    const formData = new FormData();
    formData.append('file_url', files);

    const { data }: AxiosResponse<IFileUpload> = await axiosFactory.post(`${UPLOAD_API_URL}file/upload`, formData);
    return data.url[0];
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const uploadMultipleFile = async (files: File[]) => {
  try {
    const formData = new FormData();
    files.forEach((item) => {
      formData.append('file_url', item);
    });
    const { data }: AxiosResponse<IFileUpload> = await axiosFactory.post(`${UPLOAD_API_URL}file/upload`, formData);
    return data.url;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
