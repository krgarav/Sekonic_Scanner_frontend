import React from "react";
const DataContext = React.createContext({
  allTemplates: [],
  setAllTemplates: () => {},
  modifyAllTemplate: () => {},
  deleteTemplate:()=>{}
});

export default DataContext;
