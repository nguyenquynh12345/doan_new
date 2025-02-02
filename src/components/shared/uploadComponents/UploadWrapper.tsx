import { CFormInput, CFormLabel } from '@coreui/react-pro';
import React, { ReactNode } from 'react';
import { IFileType, handleFileUpload } from './upload.ultil';

export declare type OnFileChangeValue<IsMulti extends boolean> = IsMulti extends true ? IFileType[] : IFileType | null;

interface ISButtonUpload<IsMulti extends boolean> {
  // className for the wrapper label
  className?: string;

  //className for the input file
  fileInputClass?: string;

  // disabled input file
  disabled?: boolean;

  // id for the input file
  id: string;

  // name for the input file
  name?: string;

  // multiple file upload
  multiple: IsMulti;

  // children for the label
  children: ReactNode;

  // accept file type
  accept?: string;

  // current file already upload
  currentFiles?: IFileType[];

  // handle check file error function if needed
  handleCheckFileError?: (newFiles: File[], currentFile: IFileType[]) => boolean;

  // handle file change
  onFileChange: (files: OnFileChangeValue<IsMulti>) => void;
}

const UploadWrapper = <IsMulti extends boolean>(props: ISButtonUpload<IsMulti>) => {
  const {
    className,
    fileInputClass,
    disabled,
    id,
    name,
    multiple,
    children,
    accept,
    handleCheckFileError,
    onFileChange,
    currentFiles,
  } = props;

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const newImages = await handleFileUpload(e, currentFiles || [], multiple, handleCheckFileError);
    const result = newImages as OnFileChangeValue<IsMulti>;
    onFileChange(result);
  };

  return (
    <>
      <CFormLabel style={{ height: '320px' }} className={`upload-wrapper ${className}`} htmlFor={id}>
        {children}
        <CFormInput
          disabled={disabled}
          onClick={(e) => (e.currentTarget.value = '')}
          onChange={handleFileInput}
          name={name || 'upload-input'}
          id={id}
          className={fileInputClass}
          style={{ display: 'none' }}
          type="file"
          multiple={multiple}
          accept={accept}
        />
      </CFormLabel>
    </>
  );
};

export default UploadWrapper;
