import { RootState } from '@/reducers';
import { toggleAside } from '@components/containers/container.reducer';
import { CCloseButton, CNav, CNavItem, CNavLink, CSidebar, CSidebarFooter, CSidebarHeader } from '@coreui/react-pro';
import { useRouter } from '@shared/utils/hooks/useRouter';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// enum NotificationType {
//   ALL = 'ALL',
//   UNREAD = 'UNREAD',
// }

const TheAside = () => {
  // const show = useTypedSelector((state) => state.asideShow)
  const dispatch = useDispatch();
  const { navigate } = useRouter();
  const setState = (state: boolean) => () => dispatch(toggleAside(state));
  // const [activeTab, setActiveTab] = React.useState<NotificationType>(NotificationType.ALL);
  const containerState = useSelector((state: RootState) => state.container);
  const { asideShow } = containerState;
  // const isMobile = useDeviceDetect();
  const handleRedirect = () => {
    dispatch(toggleAside(false));
    navigate('/');
  };

  return (
    <CSidebar
      colorScheme="light"
      size="lg"
      overlaid
      placement="end"
      visible={asideShow}
      className={'aside-custom'}
      onVisibleChange={(val: boolean) => {
        dispatch(toggleAside(val));
      }}
    >
      <CSidebarHeader className="bg-transparent p-0">
        <CNav variant="underline-border" className="aside-navbar">
          {/* {asideShow ? (
            <>
              {' '}
              <CNavItem>
                <CNavLink
                  className="cursor-pointer"
                  onClick={() => setActiveTab(NotificationType.ALL)}
                  active={activeTab === NotificationType.ALL}
                >
                  Tất cả
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  className="cursor-pointer"
                  onClick={() => setActiveTab(NotificationType.UNREAD)}
                  active={activeTab === NotificationType.UNREAD}
                >
                  Chưa đọc
                </CNavLink>
              </CNavItem>
            </>
          ) : (
            ''
          )} */}
          <CNavItem >
            <CNavLink className="cursor-pointer" active={asideShow}>
              Thông báo
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink className="cursor-pointer">Chưa đọc</CNavLink>
          </CNavItem>
          <CNavItem className="ms-auto d-flex align-items-center">
            <CNavLink onClick={setState(false)} className="cursor-pointer close-nav">
              <CCloseButton className="text-danger close-button" />
            </CNavLink>
          </CNavItem>
        </CNav>
      </CSidebarHeader>
      {}
      {/* <CListGroup flush className="side-noti-container">
        {notificationItems.length > 0 ? (
          <>
            {notificationItems.map((item, index) => (
              <CListGroupItem
                key={index}
                className="d-flex justify-content-between align-items-center cursor-pointer notify-item"
                onClick={handleUpdateStatus(item)}
              >
                <div>
                  <CCardTitle className="text-sm fw-bold mb-0 text-break">{item.notify.title}</CCardTitle>
                  <CCardText
                    className={`text-xs mb-0 text-break ${
                      item.status === NotifyUserStatusEnum.SEEN ? 'text-secondary' : 'text-green'
                    }`}
                  >
                    {dayjs(item.notify.createdDate).format(TIME_DATE_FORMAT)}
                  </CCardText>
                </div>
                <div className={`${item.status === NotifyUserStatusEnum.SEEN ? 'd-none' : ''}`}>
                  <CIcon icon={cisCheck} className="text-green d-none" size="sm" />
                  <CIcon icon={cisCircle} className="text-green" size="sm" />
                </div>
              </CListGroupItem>
            ))}
          </>
        ) : (
          <CListGroupItem className="d-flex justify-content-center align-items-center">
            <div>
              <CCardTitle className="text-sm fw-bold mb-0 text-break">Bạn không có thông báo nào</CCardTitle>
            </div>
          </CListGroupItem>
        )}
      </CListGroup>
      {viewDetail && notifyItem ? (
        <ModalNotify visible={viewDetail} onClose={handleCloseModal} notifyItem={notifyItem} />
      ) : (
        ''
      )} */}
      <CSidebarFooter
        className="bg-transparent border-top text-center cursor-pointer text-green readAll-btn"
        onClick={handleRedirect}
      >
        Xem tất cả
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(TheAside);
