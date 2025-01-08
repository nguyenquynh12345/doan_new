import { ToastError } from '@/components/shared/toast/Toast';

export const imageExtension = ['jpeg', 'jpg', 'png', 'webp', 'bitmap'];

export const checkErrorInputFile = (filesArr: File[]) => {
  let isValid = true;
  for (let i = 0; i < filesArr.length; i++) {
    const { type, size } = filesArr[i];
    const isValidImgExtension = !imageExtension.filter((e) => type.indexOf(e) !== -1).length;
    const maximumSizeBytes = 1024 * 1024 * 10;

    if (isValidImgExtension) {
      ToastError(`File tải lên phải có định dạng (${imageExtension.join(', ')})`);
      isValid = false;
      break;
    }
    if (size > maximumSizeBytes) {
      ToastError('File tải lên vượt quá dung lượng cho phép 10MB');
      isValid = false;
      break;
    }
  }
  return isValid;
};
