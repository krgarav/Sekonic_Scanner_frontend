import { useState } from "react";
import DataContext from "./DataContext";

const initialData = { allTemplates: [] };

const DataProvider = (props) => {
  const [dataState, setDataState] = useState(initialData);
  const templateHandler = (template) => {
    let newIndex;
    setDataState((item) => {
      newIndex = item.allTemplates.length; // Calculate the new index
      return {
        ...item,
        allTemplates: [...item.allTemplates, template],
      };
    });
    return newIndex; // Return the new index
  };

  const modifyTemplateHandler = (index, regionData) => {
    setDataState((item) => {
      const copiedData = [...item.allTemplates];

      const currentTemplate = copiedData[index];
      if (currentTemplate.Regions) {
        currentTemplate.Regions = [...currentTemplate.Regions, regionData];
      } else {
        currentTemplate.Regions = [regionData];
      }

      return {
        ...item,
        allTemplates: copiedData,
      };
    });
  };
  const dataContext = {
    allTemplates: dataState.allTemplates,
    setAllTemplates: templateHandler,
    modifyAllTemplate: modifyTemplateHandler,
  };

  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
