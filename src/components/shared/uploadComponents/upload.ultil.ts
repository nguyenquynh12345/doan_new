import i18n from '@/i18n/config';
import dayjs from 'dayjs';
import React from 'react';
import { ToastWarning } from '../toast/Toast';
import { OnFileChangeValue } from './UploadWrapper';
import { uploadFile, uploadMultipleFile } from './upload.api';

export interface IFileType {
  id?: string;
  url: string;
  file: File | undefined;
  fileName: string;
  size: number;
  createdTime: string;
  contentType: string;
}

const mapMiMEtoFileType: { [key in string]: string } = {
  ['image/jpeg']: 'jpg',
  ['image/png']: 'png',
  ['video/quicktime']: 'mov',
  ['video/mp4']: 'mp4',
  ['application/msword']: 'doc',
  ['application/vnd.openxmlformats-officedocument.wordprocessingml.document']: 'docx',
  ['application/pdf']: 'pdf',
  ['application/vnd.openxmlformats-officedocument.presentationml.slideshow']: 'ppsx',
  ['application/vnd.ms-powerpoint']: 'ppt',
  ['application/vnd.openxmlformats-officedocument.presentationml.presentation']: 'pptx',
  ['application/vnd.ms-excel']: 'xls',
  ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']: 'xlsx',
  ['application/vnd.oasis.opendocument.text']: 'odt',
  ['application/vnd.oasis.opendocument.spreadsheet']: 'ods',
};

const fileExtension = [
  'jpg',
  'jpeg',
  'png',
  'mov',
  'mp4',
  'doc',
  'docx',
  'pdf',
  'ppsx',
  'ppt',
  'pptx',
  'xls',
  'xlsx',
  'odt',
  'ods',
];

/**
 * Check file type by declared aray
 */
export const checkErrorInputFile = (files: File[]) => {
  let isValid = true;
  for (let i = 0; i < files.length; i++) {
    const { type } = files[i];
    const convertMimeType = mapMiMEtoFileType[type];
    const isValidExtension = !fileExtension.filter((e) => convertMimeType.indexOf(e) !== -1).length;

    if (isValidExtension) {
      ToastWarning(i18n.t('app.global.eror.fileExtensionError'));
      isValid = false;
      break;
    }
  }

  return isValid;
};

/**
 * Check file type by accept array
 */
export const checkValidFileType = (files: File[], accept: string[]) => {
  let isValid = true;
  for (let i = 0; i < files.length; i++) {
    const { type } = files[i];
    const convertMimeType = mapMiMEtoFileType[type];
    const isValidExtension = !accept.filter((e) => convertMimeType.indexOf(e) !== -1).length;

    if (isValidExtension) {
      ToastWarning(i18n.t('app.global.eror.fileExtensionError'));
      isValid = false;
      break;
    }
  }

  return isValid;
};

/**
 * Check total file size, total size, total file
 */
export const checkTotalDataSizeValid = (newFiles: File[], currentFile: IFileType[], maxFile = 50, maxSize = 100) => {
  const fileList: File[] = Array.from(newFiles);
  // Total 100 mb and 50 files
  const maxTotalSizeInBytes = maxSize * 1024 * 1024;
  const totalSize = currentFile.reduce((total, file) => total + file.size, 0);
  const totalNewSize = fileList.reduce((total, file) => total + file.size, 0);

  if (fileList.length + currentFile.length > maxFile) {
    ToastWarning(i18n.t('app.global.eror.totalFileLengthMaximum', { max: maxFile }));
    return false;
  }
  if (totalSize + totalNewSize > maxTotalSizeInBytes) {
    ToastWarning(i18n.t('app.global.eror.totalFileSizeMaximum', { max: maxSize, unit: 'MB' }));
    return false;
  }

  return true;
};

/**
 * Check single file size
 */
export const checkDataSizeValid = (newFiles: File[], maxSize = 2) => {
  const fileList: File[] = Array.from(newFiles);
  // Total convert mb to byte
  const maxTotalSizeInBytes = maxSize * 1024 * 1024;
  const result = fileList.every((file) => file.size <= maxTotalSizeInBytes);

  return result;
};

/**
 * moderate file object before saved
 */

export const fileToDataURI = (file: File): Promise<IFileType> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileObj: IFileType = {
        file: file,
        url: e.target?.result as string,
        fileName: file.name,
        size: file.size,
        createdTime: dayjs().toISOString(),
        contentType: file.type,
      };
      resolve(fileObj);
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Handle file type upload
 */

export const handleFileUpload = async <IsMulti extends boolean>(
  e: React.ChangeEvent<HTMLInputElement> | any,
  currentFile: IFileType[],
  multiple?: IsMulti,
  validateFile?: (inputFile: File[], currentFile: IFileType[]) => boolean
): Promise<OnFileChangeValue<IsMulti>> => {
  const inputFile: File[] = e.target.files as File[];
  const emptyFile: IFileType[] = [];

  if (validateFile && !validateFile(inputFile, currentFile))
    return (multiple ? emptyFile : null) as OnFileChangeValue<IsMulti>;

  if (inputFile && inputFile.length > 0) {
    const newImagesPromise: Promise<IFileType>[] = [];
    Array.from(inputFile).forEach((item) => {
      newImagesPromise.push(fileToDataURI(item));
    });

    const newImages = await Promise.all(newImagesPromise);
    return (multiple ? [...currentFile, ...newImages] : newImages[0] || null) as OnFileChangeValue<IsMulti>;
  } else {
    return (multiple ? emptyFile : null) as OnFileChangeValue<IsMulti>;
  }
};

/**
 * Calling the api
 */

// export const handleUploadImage = async (file: File | undefined) => {
//     if (!file) return '';
//     try {
//       const newImagePromies: IFileUpload = await uploadFile([file]);
//       const newImageUrlArr = newImagePromies.photo_url.map((item) => item.image_url);
//       return newImageUrlArr[0];
//     } catch (e) {
//       throw Error('Error upload file');
//     }
//   };

const handleRemapingFile = (fileArray: IFileType[], urlArr: string[]) => {
  const resultArr = fileArray.map((file, index) => {
    const fileObj: IFileType = {
      ...file,
      file: undefined,
      url: urlArr[index],
    };
    return fileObj;
  });
  return resultArr;
};

export const handleUploadMultipleFile = async (fileArray: IFileType[]) => {
  if (fileArray.length === 0) return '';
  try {
    // split old file that already upload
    const prevFile = fileArray.filter((item) => item.file === undefined);

    // get the new file that need to upload
    const newFileArr: IFileType[] = fileArray.filter((item) => item.file !== undefined);

    // upload new file
    const newFilePromies = await uploadMultipleFile(newFileArr.map((item) => item.file!));

    // mapping the new file url with the file object
    const newMappingFileArr = handleRemapingFile(newFileArr, newFilePromies);

    // concat the old file with the new file
    const newFileArrResult = [...prevFile, ...newMappingFileArr];

    // return json format
    const formatFilesUrl = JSON.stringify(newFileArrResult);
    return formatFilesUrl;
  } catch (e) {
    throw Error('Error upload file');
  }
};

export const handleUploadFileType = async (fileType: IFileType) => {
  if (!fileType) return '';
  if (fileType.file === undefined) return JSON.stringify(fileType.url);
  try {
    const newImagePromies = await uploadFile(fileType.file);
    const fileTypeResult: IFileType = { ...fileType, file: undefined, url: newImagePromies };
    const formatFilesUrl = JSON.stringify(fileTypeResult);
    return formatFilesUrl;
  } catch (e) {
    throw Error('Error upload file');
  }
};
