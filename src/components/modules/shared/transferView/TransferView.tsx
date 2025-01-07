import { useRouter } from '@/shared/utils/hooks/useRouter';
import { useEffect } from 'react';

const TransferView = ({ route }: { route: string }) => {
  const { navigate } = useRouter();

  useEffect(() => {
    navigate(route, { replace: true });
  }, []);

  return <></>;
};

export default TransferView;
