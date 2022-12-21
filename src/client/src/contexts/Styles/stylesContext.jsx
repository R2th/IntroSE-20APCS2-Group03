import React, { createContext, useState, useMemo } from 'react';

const StylesContext = createContext(null);

function StylesProvider({ children }) {
  const [prefix, setPrefix] = useState(0);

  const value = useMemo(() => ({
    prefix,
    setPrefix,
  }), []);

  return <StylesContext.Provider value={value}>{children}</StylesContext.Provider>;
}

export { StylesContext, StylesProvider };
