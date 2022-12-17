import React, { createContext, useState } from "react";

const StylesContext = createContext(null);

const StylesProvider = ({ children }) => {
  const [prefix, setPrefix] = useState(0);

  const value = {
    prefix: prefix,
    setPrefix: setPrefix,
  };

  return (
    <StylesContext.Provider value={value}>{children}</StylesContext.Provider>
  );
};

export { StylesContext, StylesProvider };
