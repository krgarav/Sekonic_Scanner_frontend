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

  const modifyTemplateHandler = (index, regionData, fieldType) => {
    if (fieldType === "skewMarkField") {
      setDataState((item) => {
        const copiedData = [...item.allTemplates];

        const currentTemplate = copiedData[index];
        if (currentTemplate.skewMarksWindowParameters) {
          currentTemplate.skewMarksWindowParameters = [
            ...currentTemplate.skewMarksWindowParameters,
            regionData,
          ];
        } else {
          currentTemplate.skewMarksWindowParameters = [regionData];
        }

        return {
          ...item,
          allTemplates: copiedData,
        };
      });
    } else if (fieldType === "formField") {
      setDataState((item) => {
        const copiedData = [...item.allTemplates];

        const currentTemplate = copiedData[index];
        if (currentTemplate.formFieldWindowParameters) {
          currentTemplate.formFieldWindowParameters = [
            ...currentTemplate.formFieldWindowParameters,
            regionData,
          ];
        } else {
          currentTemplate.formFieldWindowParameters = [regionData];
        }

        return {
          ...item,
          allTemplates: copiedData,
        };
      });
    } else if (fieldType === "questionField") {
      setDataState((item) => {
        const copiedData = [...item.allTemplates];

        const currentTemplate = copiedData[index];
        if (currentTemplate.questionsWindowParameters) {
          currentTemplate.questionsWindowParameters = [
            ...currentTemplate.questionsWindowParameters,
            regionData,
          ];
        } else {
          currentTemplate.questionsWindowParameters = [regionData];
        }

        return {
          ...item,
          allTemplates: copiedData,
        };
      });
    } else {
      setDataState((item) => {
        const copiedData = [...item.allTemplates];

        const currentTemplate = copiedData[index];
        if (currentTemplate.idWindowParameters) {
          currentTemplate.idWindowParameters = [
            ...currentTemplate.idWindowParameters,
            regionData,
          ];
        } else {
          currentTemplate.idWindowParameters = [regionData];
        }

        return {
          ...item,
          allTemplates: copiedData,
        };
      });
    }
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
