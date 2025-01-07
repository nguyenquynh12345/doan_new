import { RootState } from "@/reducers";
import BellIcon from "@assets/img/header/bell-02.svg?react";
import SidebarIn from "@assets/img/header/sidebar_in.svg?react";
import SidebarOut from "@assets/img/header/sidebar_out.svg?react";
import TransIcon from "@assets/img/header/translate-01.svg?react";

import { CountryCode } from "@/shared/enumeration/CountryCode";
import { Language } from "@/shared/enumeration/language";
import LogoText from "@assets/img/logo_text.svg?react";
import {
  toggleSidebar,
  toggleUnfoldable,
} from "@components/containers/container.reducer";
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
} from "@coreui/react-pro";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CountryCodeIcon from "../shared/countryIcon/CountryCodeIcon";

interface ITheHeaderProps {
  notAuth?: boolean;
}

// const handleItemVisibilityDependsRoles = (requiredRoles: Roles[], user?: IUser | null) => {
//   if (!user) return 'd-none';
//   if (requiredRoles.length === 0) return 'd-block-inline';
//   const { roles } = user;
//   const isAuthorized = checkOverlapBetweenRoles(roles, requiredRoles);
//   return isAuthorized ? 'd-block-inline' : 'd-none';
// };

const TheHeader = ({ notAuth }: ITheHeaderProps) => {
  const dispatch = useDispatch();
  const { sidebarShow, unfoldable, hiddenSidebar } = useSelector(
    (state: RootState) => state.container
  );
  const { userInfo } = useSelector((state: RootState) => state.authentication);

  const toggleSidebarDesktop = () => {
    if (sidebarShow) {
      dispatch(toggleUnfoldable(!unfoldable));
    } else {
      dispatch(toggleSidebar(!sidebarShow));
    }
  };

  const { t, i18n } = useTranslation();

  const changeLanguageI18n = (lang: Language) => () => {
    i18n.changeLanguage(lang);
  };

  const renderIcon = sidebarShow ? (
    unfoldable ? (
      <SidebarOut className="" fill="currentcolor" />
    ) : (
      <SidebarIn className="" fill="currentcolor" />
    )
  ) : (
    <SidebarOut className="" fill="currentcolor" />
  );

  // const toggleASideDesktop = () => {
  //   dispatch(toggleAside(!asideShow));
  // };

  return (
    <CHeader position="sticky" className="custom-header ">
      <CContainer fluid className="p-0 justify-content-start">
        <div className={`custom-header-brand ${notAuth ? "border-0" : ""}`}>
          <CHeaderBrand>{/* <LogoText /> */}</CHeaderBrand>
          {!notAuth && !hiddenSidebar ? (
            <CHeaderToggler className="ps-1" onClick={toggleSidebarDesktop}>
              {renderIcon}
            </CHeaderToggler>
          ) : (
            ""
          )}
        </div>
        <div className={`custom-header-nav justify-content-end`}>
          {/* {!notAuth ? (
            <CHeaderNav className="custom-header-title">
              {headerTitleArr.map((item, index) => {
                const className = handleItemVisibilityDependsRoles(item.roles, userInfo);
                return (
                  <CNavItem key={index} className={className}>
                    <CNavLink active={checkIsMatchPath({ path: item.to, end: false }, pathname)} as={Link} to={item.to}>
                      {t(`app.assetSidebar.${item.name}`)}
                    </CNavLink>
                  </CNavItem>
                );
              })}
            </CHeaderNav>
          ) : (
            ''
          )} */}

          <CHeaderNav className="custom-header-widget ">
            {!notAuth ? (
              <>
                <CNavItem>
                  <CNavLink className="cursor-pointer">
                    <BellIcon
                      className=""
                      fill="currentcolor"
                      style={{ verticalAlign: "middle" }}
                    />
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink className="cursor-pointer">
                    {/* <FlagIcon  /> */}
                    <CountryCodeIcon
                      countryCode={userInfo?.countryCode}
                      className=""
                      fill="currentcolor"
                      style={{ verticalAlign: "middle" }}
                    />
                  </CNavLink>
                </CNavItem>
              </>
            ) : (
              ""
            )}

            <CNavItem>
              <CNavLink className="cursor-pointer">
                <CDropdown className="lang-dropdown">
                  <CDropdownToggle caret={false} className="lang-toggle">
                    <TransIcon
                      className=""
                      fill="currentcolor"
                      style={{ verticalAlign: "sub" }}
                    />
                  </CDropdownToggle>
                  <CDropdownMenu className="lang-menu">
                    <CDropdownItem
                      as={"button"}
                      active={i18n.language === Language.vi}
                      onClick={changeLanguageI18n(Language.vi)}
                    >
                      <CountryCodeIcon
                        countryCode={CountryCode.VN}
                        className="icon me-3"
                      />
                      {t(`app.global.language.vi`)}
                    </CDropdownItem>
                    <CDropdownItem
                      as={"button"}
                      active={i18n.language === Language.en}
                      onClick={changeLanguageI18n(Language.en)}
                    >
                      <CountryCodeIcon
                        countryCode={CountryCode.US}
                        className="icon me-3"
                      />
                      {t(`app.global.language.en`)}
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
        </div>
      </CContainer>
      {/* <CHeaderDivider /> */}
      {/* <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  );
};

export default TheHeader;
