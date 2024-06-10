import React from "react";
const DataContext = React.createContext({
  allTemplates: [],
  setAllTemplates: () => {},
  modifyAllTemplate: () => {},
});

export default DataContext;
