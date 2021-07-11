import * as React from 'react';
import ApiServiceImpl from '../services/api.service';

const apiService = new ApiServiceImpl('http://localhost:3000/api');

export const ApiContext = React.createContext({} as ApiServiceImpl);

const ApiContextProvider: React.FC = (props) => {
  const { children } = props;
  return (
    <ApiContext.Provider value={apiService}>{children}</ApiContext.Provider>
  );
};

export default ApiContextProvider;
