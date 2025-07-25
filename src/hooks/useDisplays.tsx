import { useEffect, useState } from 'react';

const useDisplays = () => {
  const [displays, setDisplays] = useState<Electron.Display[]>([]);

  useEffect(() => {
    const fetchDisplays = async () => {
      const displays = await window.api.getDisplays();
      setDisplays(displays);
    };

    fetchDisplays();
  }, []);

  return { displays };
};

export default useDisplays;
