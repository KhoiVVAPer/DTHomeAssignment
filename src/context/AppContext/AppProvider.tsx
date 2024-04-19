import React, {ReactNode} from 'react';
import {useAppContextValue, AppContext} from './AppContext';

export type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = (props: AppProviderProps) => {
  const {children} = props;
  const AppContextData = useAppContextValue();

  return (
    <AppContext.Provider value={AppContextData}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
