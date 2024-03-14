import React, { createContext, FC, PropsWithChildren, useContext } from 'react';

const generateContext = <T,>(useContextValue: () => T): [() => T, FC<PropsWithChildren>] => {
  const context = createContext<T | null>(null);

  const useSafeContext = () => {
    const contextValue = useContext(context);

    if (!contextValue) {
      throw new Error('useSafeContext must be used within a Provider');
    }

    return contextValue;
  };

  const Provider: FC<PropsWithChildren> = ({ children }) => <context.Provider value={useContextValue()}>{children}</context.Provider>;

  return [useSafeContext, Provider];
};

export default generateContext;
