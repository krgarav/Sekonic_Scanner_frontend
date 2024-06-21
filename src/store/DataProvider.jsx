import React, { useState, useEffect } from "react";
import DataContext from "./DataContext"; // Assuming you have a DataContext

const initialData = { allTemplates: [] }; // Initial data if localStorage is empty

const DataProvider = (props) => {
  // Initialize dataState from localStorage if it exists, otherwise use initialData
  const [dataState, setDataState] = useState(() => {
    const savedData = localStorage.getItem("Template");
    let updateData;
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      console.log(parsedData);
      updateData = parsedData.map((item) => {
        const templateData = item.templateData;
        const formFieldWindowParameters = item?.formFieldWindowParameters;
        const questionsWindowParameters = item?.questionsWindowParameters;
        const skewMarksWindowParameters = item?.skewMarksWindowParameters;
        const idWindowParameters = item?.idWindowParameters;
        return {
          ...templateData,
          formFieldWindowParameters,
          questionsWindowParameters,
          skewMarksWindowParameters,
          idWindowParameters,
        };
      });
      console.log(updateData);
      return { allTemplates: updateData };
    } else {
      return initialData;
    }
  });
  console.log(dataState);

  // Save dataState to localStorage whenever it changes

  useEffect(() => {
    console.log("dataState changed:", dataState.allTemplates);

    const mappedTemp = dataState.allTemplates.map((item) => {
      const templateData = item;
      const formFieldWindowParameters = item?.formFieldWindowParameters;
      const questionsWindowParameters = item?.questionsWindowParameters;
      const skewMarksWindowParameters = item?.skewMarksWindowParameters;
      const idWindowParameters = item?.idWindowParameters;
      return {
        templateData,
        formFieldWindowParameters,
        questionsWindowParameters,
        skewMarksWindowParameters,
        idWindowParameters,
      };
    });
    const stringifiedTemdata = JSON.stringify(mappedTemp);
    console.log("stringifuied data : ", stringifiedTemdata);
    localStorage.setItem("Template", stringifiedTemdata);
  }, [dataState]);

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
    setDataState((item) => {
      const copiedData = [...item.allTemplates];
      const currentTemplate = copiedData[index];

      switch (fieldType) {
        case "skewMarkField":
          currentTemplate.skewMarksWindowParameters =
            currentTemplate.skewMarksWindowParameters
              ? [...currentTemplate.skewMarksWindowParameters, regionData]
              : [regionData];
          break;
        case "formField":
          currentTemplate.formFieldWindowParameters =
            currentTemplate.formFieldWindowParameters
              ? [...currentTemplate.formFieldWindowParameters, regionData]
              : [regionData];
          break;
        case "questionField":
          currentTemplate.questionsWindowParameters =
            currentTemplate.questionsWindowParameters
              ? [...currentTemplate.questionsWindowParameters, regionData]
              : [regionData];
          break;
        default:
          currentTemplate.idWindowParameters =
            currentTemplate.idWindowParameters
              ? [...currentTemplate.idWindowParameters, regionData]
              : [regionData];
          break;
      }

      return {
        ...item,
        allTemplates: copiedData,
      };
    });
  };
  const deleteTemplateHandler = (index) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (isConfirmed) {
      setDataState((prevState) => {
        const updatedTemplates = prevState.allTemplates.filter(
          (_, i) => i !== index
        );
        return {
          ...prevState,
          allTemplates: updatedTemplates,
        };
      });
    }
  };

  const dataContext = {
    allTemplates: dataState.allTemplates,
    setAllTemplates: templateHandler,
    modifyAllTemplate: modifyTemplateHandler,
    deleteTemplate: deleteTemplateHandler,
  };

  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
