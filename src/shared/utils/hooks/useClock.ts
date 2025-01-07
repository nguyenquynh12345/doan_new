import { useEffect, useState } from 'react';

const useClock = () => {
  const [currrentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { currrentDate };
};

export default useClock;
