import { useRouteError } from 'react-router-dom';
import Page500 from '../../modules/Page500';

const ErrorElement = () => {
  const error: any = useRouteError();
  return <Page500 errorMessage={error?.message || ''} />;
};

export default ErrorElement;
