import { PathPattern, matchPath, useLocation, useNavigate, useParams } from 'react-router-dom';

export const useRouter = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  //   const match = useMatch;
  const redirectView = (url?: string) => () => {
    if (!url) {
      navigate(-1);
    } else {
      navigate(`${url}`);
    }
  };

  const checkIsMatchPath = <Path extends string>(pattern: PathPattern<Path> | Path, pathname: string): boolean => {
    const isMatch = matchPath(pattern, pathname);
    return Boolean(isMatch);
  };

  return { params, location, navigate, redirectView, checkIsMatchPath };
};
