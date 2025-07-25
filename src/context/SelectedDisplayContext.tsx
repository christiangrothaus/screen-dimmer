import { createContext } from 'react';

interface SelectedDisplayContextModel {
  display: Electron.Display | null
  setSelectedDisplay: (display: Electron.Display | null) => void
}

export const SelectedDisplayContext = createContext<SelectedDisplayContextModel>({
  display: null,
  setSelectedDisplay: () => {},
});

interface FormProviderProps {
  children: React.ReactNode
  value: SelectedDisplayContextModel
};

export const SelectedDisplayProvider = ({ children, value }: FormProviderProps) => {
  return (
    <SelectedDisplayContext.Provider value={value}>
      {children}
    </SelectedDisplayContext.Provider>
  );
};
