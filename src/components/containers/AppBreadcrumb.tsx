import { publicRoutes } from '@/routes';
import HomeIcon from '@assets/img/HomeIcon.svg?react';
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react-pro';
import { useRouter } from '@shared/utils/hooks/useRouter';
import { startCase, toLower } from 'lodash';
import React from 'react';
import { RouteObject, matchPath, matchRoutes } from 'react-router-dom';

interface IBreadCrumbs {
  pathname: string;
  name: string;
  active: boolean;
}

const AppBreadcrumb = () => {
  const { location } = useRouter();
  const currentLocation = location.pathname;

  /**
   * Since pathname comes in the format of {parent / children / grandchildren } and we only want to take the substring after
   * the last slash
   *
   * getSubstringAfterLastSlash(input: string) : string
   * Input: "/BO/base/collapses"
   * Output: "/collapses"
   */
  const getSubstringAfterLastSlash = (input: string | undefined): string => {
    if (!input) return '';
    const lastSlashIndex = input.lastIndexOf('/');
    return input.slice(lastSlashIndex);
  };

  const getRouteName = (pathname: string, routes: RouteObject[]) => {
    // const currentRoute = routes.find((route) => matchPath(route.path, pathname));
    // if (!currentRoute) return '';
    // return currentRoute.name;
    const currentRoutes = matchRoutes(routes, pathname);
    const currentRoute = currentRoutes?.find((route) => matchPath(pathname, route.pathname));
    // https://stackoverflow.com/questions/38084396/lodash-title-case-uppercase-first-letter-of-every-word
    // transform {/BO/ BO abc / BO abc xyz} into {Back Office / Abc / Xyz}
    const result = startCase(toLower(getSubstringAfterLastSlash(currentRoute?.pathname).replace('/BO', 'Back Office')));
    return result;
  };

  const getBreadcrumbs = (location: string) => {
    const breadcrumbs: IBreadCrumbs[] = [];
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      breadcrumbs.push({
        pathname: currentPathname,
        name: getRouteName(currentPathname, publicRoutes),
        active: index + 1 === array.length ? true : false,
      });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  // return (
  //   <CBreadcrumb className="m-0 ms-2">
  //     {breadcrumbs.map((breadcrumb, index) => {
  //       return (
  //         breadcrumb.name && (
  //           <CBreadcrumbItem
  //             {...(breadcrumb.active ? { active: true } : { href: `#${breadcrumb.pathname}` })}
  //             key={index}
  //           >
  //             {breadcrumb.name}
  //           </CBreadcrumbItem>
  //         )
  //       );
  //     })}
  //   </CBreadcrumb>
  // );
  return (
    <CBreadcrumb className=" ms-2 custom-breadcrumb">
      <CBreadcrumbItem href="/">
        <HomeIcon className="solid-home-svg" />
        {/* <CImage src={HomeIcon} width={16.67} height={17.28} style={{ verticalAlign: 'text-top' }} /> */}
      </CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          breadcrumb.name && (
            <CBreadcrumbItem
              {...(breadcrumb.active
                ? { href: `${breadcrumb.pathname}`, className: 'breadcrumb-active' }
                : { href: `${breadcrumb.pathname}` })}
              key={index}
            >
              {breadcrumb.name}
            </CBreadcrumbItem>
          )
        );
      })}
    </CBreadcrumb>
  );
};

export default React.memo(AppBreadcrumb);
