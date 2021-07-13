import * as React from 'react';
import ApiServiceImpl from '../services/api.service';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
const apiService = new ApiServiceImpl(apiUrl);

export const ApiContext = React.createContext({} as ApiServiceImpl);

const ApiContextProvider: React.FC = (props) => {
  const { children } = props;
  return (
    <ApiContext.Provider value={apiService}>{children}</ApiContext.Provider>
  );
};

export default ApiContextProvider;
