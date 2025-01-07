import { IParams, ISelectValue } from "@shared/shared-interfaces";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { pickBy } from "lodash";
dayjs.extend(isBetween);

export const checkIsLocalhost = (): boolean => {
  const isLocalHost =
    window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    Boolean(
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );
  return isLocalHost;
};

export const createIndexes = <T, G extends IParams>(data: T[], filter: G) => {
  const { page, size } = filter;
  return data.map((element, index) => ({
    ...element,
    index: page * size + index + 1,
  }));
};

export const calculateIndex = <G extends IParams>(
  index: number,
  filter: G
): number => {
  const { page, size } = filter;
  const newIdx = page * size + index + 1;
  return newIdx;
};

const noMoreThanOneCommas = (input: number | string) => {
  const str = input.toString();
  let commasCount = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ".") commasCount++;
    if (commasCount > 1) break;
  }
  return commasCount <= 1;
};

export const insertCommas = (
  input: number | undefined | string | null,
  decimals: number = 4
) => {
  if (typeof input !== "number" && !input) return "";
  if (!noMoreThanOneCommas(input)) return "";
  const parts = input.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (parts[1]) parts[1] = parts[1].substring(0, decimals); // Only take the first 4 decimals
  return parts.join(".");
};
export const insertDotCommas = (
  input: number | undefined | string | null,
  decimals: number = 4
) => {
  if (typeof input !== "number" && !input) return "";
  if (!noMoreThanOneCommas(input)) return "";
  const parts = input.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  if (parts[1]) parts[1] = parts[1].substring(0, decimals); // Only take the first 4 decimals
  return parts.join(".");
};
export const insertSpaceCommas = (
  input: number | undefined | string | null,
  decimals: number = 4
) => {
  if (typeof input !== "number" && !input) return "";
  if (!noMoreThanOneCommas(input)) return "";
  const parts = input.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  if (parts[1]) parts[1] = parts[1].substring(0, decimals); // Only take the first 4 decimals
  return parts.join(".");
};
export const unInsertCommas = (input: string) => {
  const parts = input.split(".");
  parts[0] = parts[0].replaceAll(",", "");
  if (parts[1]) parts[1] = parts[1].substring(0, 4); // Only take the first 4 decimals
  return parts.join(".");
};

export const getEllipsisTxt = (str: string, n = 5) => {
  if (str) {
    return str.length > n
      ? `${str.slice(0, n)}...${str.slice(str.length - n)}`
      : str;
  }
  return "";
};

export const formatBytes = (bytes: number, decimals: number = 2) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const returnPercentageOfX = (x: number, percentage: number) => {
  return ((percentage * x) / 100).toFixed(4);
};

export const xIsWhatPercentOfY = (x: number, y: number) => {
  if (y === 0) return "0.00";
  return ((x / y) * 100).toFixed(2);
};

export const paramsPickby = <T extends Object>(body: T) => {
  const params = pickBy(body, (value) => {
    const codition = value !== null && value !== undefined && value !== "";
    return codition;
  });
  return params;
};

export const checkIsDateBefore = (startDate: Dayjs, endDate: Dayjs) => {
  if (startDate.isBefore(endDate)) return true;
  return false;
};

export const checkIsDateAfter = (startDate: Dayjs, endDate: Dayjs) => {
  if (startDate.isAfter(endDate)) return true;
  return false;
};

export const checkIsDateBetween = (
  currDate: Dayjs,
  startDate: Dayjs,
  endDate: Dayjs
) => {
  if (currDate.isBetween(startDate, endDate, "day", "[]")) return true;
  return false;
};

export const returnReactSelectSingleOption = <
  T extends ISelectValue<string | number>
>(
  optionValue: string | number,
  array: T[]
) => {
  if (!optionValue) return null;
  if (!array.length) return null;
  return array.find(({ value }) => value === optionValue);
};

export const returnSelectOptionsItem = <
  T extends { id: string | number; [key: string]: any },
  R extends T & ISelectValue<string | number>
>(
  arrayItem: T[],
  labelKey: keyof T,
  selectItem?: T
): R[] => {
  if (!arrayItem) return [];
  if (selectItem) {
    const selectedItem = arrayItem.find((item) => item.id === selectItem.id);
    const selectedList: any = arrayItem.map((item) => {
      return {
        ...item,
        value: item.id,
        label: item[labelKey] || "",
      };
    });
    const result: any = !selectedItem
      ? [
          {
            ...selectItem,
            value: selectItem.id,
            label: selectItem[labelKey] || "",
          },
          ...selectedList,
        ]
      : selectedList;
    return result as any;
  }
  return arrayItem.map((item) => {
    return {
      ...item,
      value: item.id,
      label: item[labelKey] || "",
    };
  }) as any;
};
