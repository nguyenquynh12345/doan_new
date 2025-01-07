import { RootState } from "@/reducers";
import { IUser } from "@/shared/model/user.model";
import { useRouter } from "@/shared/utils/hooks/useRouter";
import { AppDispatch } from "@/store";
import ChevronDown from "@assets/img/sidebar/chevron-down.svg?react";
import Logout from "@assets/img/sidebar/log-out-01-alt.svg?react";
import { toggleSidebar } from "@components/containers/container.reducer";
import {
  CNavGroup,
  CNavGroupItems,
  CNavItem,
  CNavLink,
  CNavTitle,
  CSidebar,
  CSidebarNav,
} from "@coreui/react-pro";
import { useDisconnect } from "@web3modal/ethers/react";
import { TFunction } from "i18next";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, matchPath } from "react-router-dom";
import { logout } from "../modules/auth/auth.reducer";
import {
  SidebarItem,
  adminSidebarItems,
} from "../shared/sidebarItem/sidebarItem";

// const handleItemVisibilityDependsPermission = (requiredPerms: Permission[], user?: IUser | null) => {
//   if (!user) return 'd-none';
//   if (requiredPerms.length === 0) return 'd-block-inline';
//   const { permissions } = user;
//   const isAuthorized = checkOverlapBetweenPerms(permissions, requiredPerms);
//   return isAuthorized ? 'd-block-inline' : 'd-none';
// };

// const renderUserRoles = (userInfo: IUser | null) => {
//   if (!userInfo) return "";
//   return userInfo?.roles
//     ?.filter((roles) => RolessArray.includes(roles))
//     ?.map((role) => mapRolesToString[role])
//     .join(", ");
// };
const renderSidebarItems = (
  itemArr: SidebarItem[],
  pathname: string,
  t: TFunction<"translation", undefined>,
  user?: IUser | null
) => {
  return itemArr.map((item, idx) => {
    const isActive = matchPath({ path: item.to, end: false }, pathname);
    // const className = handleItemVisibilityDependsPermission(item.permissions || [], user);
    const className = "";
    if (item.isTitle) {
      return (
        <CNavTitle className={className} key={idx}>
          {t(`app.assetSidebar.${item.name}`)}
        </CNavTitle>
      );
    }

    if (item?.subItems && item?.subItems?.length > 0) {
      return (
        <CNavGroup
          key={idx}
          className={className}
          toggler={
            <>
              {/* {item.icon} {t(`app.assetSidebar.${item.name}`)} */}
              {item.icon} {item.name}
              <ChevronDown className="nav-icon nav-group-icon ms-auto" />
            </>
          }
        >
          <CNavGroupItems>
            {renderSidebarItems(item.subItems, pathname, t, user)}
          </CNavGroupItems>
        </CNavGroup>
      );
    }
    return (
      <CNavItem key={idx} className={className}>
        <CNavLink active={Boolean(isActive)} to={item.to} as={Link}>
          {item.icon}
          {/* {t(`app.assetSidebar.${item.name}`)} */}
          {item.name}
        </CNavLink>
      </CNavItem>
    );
  });
};

const TheSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { location } = useRouter();
  const { disconnect } = useDisconnect();
  const { pathname } = location;
  const containerState = useSelector((state: RootState) => state.container);
  const { userInfo } = useSelector((state: RootState) => state.authentication);
  const { unfoldable, sidebarShow, hiddenSidebar } = containerState;

  const [sidebarItems, setSidebarItems] = React.useState<SidebarItem[]>([]);

  useEffect(() => {
    setSidebarItems(adminSidebarItems);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLogout = () => {
    dispatch(logout());
    disconnect();
  };

  return (
    <CSidebar
      className="custom-sidebar"
      colorScheme="dark"
      position="fixed"
      visible={hiddenSidebar ? !hiddenSidebar : sidebarShow}
      unfoldable={unfoldable}
      onVisibleChange={(val: boolean) => {
        if (!hiddenSidebar) {
          dispatch(toggleSidebar(val));
        }
      }}
    >
      <CSidebarNav>
        <CNavItem className="mb-xl">
          {/* <CNavLink className="user-wrapper" to="/profile" as={Link}>
            <div className="user-content">
              <Avatar
                name={`${userInfo?.lastName} ${userInfo?.firstName}`}
                round
                size="40px"
              />
              <div className="d-flex flex-column">
                <p className="text-sm-semibold text-gray-25 m-0">{`${userInfo?.lastName} ${userInfo?.firstName}`}</p>
                <p className="text-sm text-gray-300 m-0 text-wrap">
                  {t(renderUserRoles(userInfo))}
                </p>
              </div>
            </div>
            <CTooltip content="Copy to clipboard" placement="bottom">
              <div
                className="user-id cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  navigator.clipboard
                    .writeText(String(userInfo?.id || ""))
                    .then(() =>
                      ToastCopy(
                        t("app.global.text.copyToClipboard"),
                        "copy-uid"
                      )
                    );
                }}
              >
                <p className="m-0">UID: {userInfo?.id}</p>
                <CopyIcon className="copy-icon" />
              </div>
            </CTooltip>
          </CNavLink> */}
        </CNavItem>
        {/* <CNavTitle>Nav Title</CNavTitle> */}
        {renderSidebarItems(sidebarItems, pathname, t, userInfo)}
      </CSidebarNav>
      <div className="">
        <CSidebarNav>
          <CNavItem>
            <CNavLink onClick={handleLogout} className="cursor-pointer">
              <Logout className="nav-icon" />
              Đăng xuất
              <ChevronDown className="nav-icon ms-auto" />
            </CNavLink>
          </CNavItem>
        </CSidebarNav> 
      </div>
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
