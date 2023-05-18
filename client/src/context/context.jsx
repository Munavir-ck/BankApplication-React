import { useState } from 'react';

import { createContext } from 'react';




export const MyContext = createContext();

const Provider = ({ children }) => {

  const [data, setData] = useState({});

  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <MyContext.Provider value={{ data, updateData }}>
      {children}
    </MyContext.Provider>
  );
};

export {Provider}
