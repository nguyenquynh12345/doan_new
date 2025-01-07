export enum PostStatus {
  APPROVED = 1,
  UNDER_BROWSING = 2,
  DRAFT = 3,
}

export const postStatusArray: PostStatus[] = [
  PostStatus.APPROVED,
  PostStatus.UNDER_BROWSING,
  PostStatus.DRAFT,
];

export const mapPostStatus: { [key in PostStatus]: string } = {
  [PostStatus.APPROVED]: "Đã duyệt",
  [PostStatus.UNDER_BROWSING]: "Đang duyệt",
  [PostStatus.DRAFT]: "Bản nháp",
};
// secondary' | 'success' | 'danger' | 'warning' | 'info';
export const mapPostStatusColor: { [key in PostStatus]: string } = {
  [PostStatus.APPROVED]: 'success',
  [PostStatus.UNDER_BROWSING]: 'info',
  [PostStatus.DRAFT]: 'secondary',
};
