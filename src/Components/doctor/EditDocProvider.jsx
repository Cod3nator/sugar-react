/* eslint-disable react/prop-types */

import { createContext , useState } from 'react';

export const EditDocContext = createContext();

export const EditDocProvider = ({ children }) => {
  const [docEditData, setDocEditData] = useState(null);

  return (
    <EditDocContext.Provider value={{ docEditData, setDocEditData }}>
      {children}
    </EditDocContext.Provider>
  );
};
