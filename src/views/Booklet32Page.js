
// core components
import Header from "components/Headers/Header.js";
import NormalHeader from "components/Headers/NormalHeader";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import Select from "react-select"
import { fetchProcessData } from "helper/Booklet32Page_helper";
import { toast } from "react-toastify";
import { Button, Card, CardHeader, Container, Row, Table } from "reactstrap";
import { refreshScanner } from "helper/Booklet32Page_helper";
import { scanFiles } from "helper/Booklet32Page_helper";
// import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Inject, Toolbar, Page, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Inject, Toolbar, ExcelExport, PdfExport, ToolbarItems, Page, FilterSettingsModel, EditSettingsModel, Filter, Edit } from '@syncfusion/ej2-react-grids';

import { fetchAllTemplate } from "helper/TemplateHelper";
// import Select, { components } from "react-select";

const Booklet32Page = () => {
    const [count, setCount] = useState(true)
    const [processedData, setProcessedData] = useState([
        { OrderID: 10248, CustomerID: 'VINET' },
        { OrderID: 10249, CustomerID: 'TOMSP' }]);
    const [scanning, setScanning] = useState(false);
    const [headData, setHeadData] = useState(["OrderID"]);
    const filterSettings = { type: 'Excel' };
    const toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const [items, setItems] = useState([]);
    const [templateOptions, setTemplateOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null)
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setItems(prevItems => {
    //             const nextIndex = prevItems.length;
    //             if (nextIndex < data.length) {
    //                 return [...prevItems, data[nextIndex]];
    //             } else {
    //                 clearInterval(interval);
    //                 return prevItems;
    //             }
    //         });
    //     }, 1000);

    //     return () => clearInterval(interval); // Cleanup on unmount
    // }, [data]);

    const getScanData = async () => {
        try {
            // Fetch data based on selected value ID
            const data = await fetchProcessData(selectedValue.id);
            console.log(data);

            // Check if the data fetch was successful
            if (data?.result?.success) {
                // Extract keys from the first item in the data array
                const newData = Object.keys(data.result.data[0]);
                const updatedData = [...processedData, ...data.result.data]
                // Set headData with the new keys
                setHeadData(newData);
                console.log(updatedData)
                // Update the data state with the fetched data
                setProcessedData(updatedData);
            }
        } catch (error) {
            console.error(error);
            toast.error("something went wrong");

            // Set scanning to false in case of error
            setScanning(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const template = await fetchAllTemplate()
            const optionObject = template?.map((item) => {
                return { id: item.id, value: item.layoutName }
            }
            );
            setTemplateOptions(optionObject)
        }
        fetchData();
    }, [])
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (scanning) {
                getScanData();
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [scanning]);

    const intervalCreation = (data) => {
        const interval = setInterval(() => {

            setItems(prevItems => {
                const nextIndex = prevItems.length;
                if (nextIndex < data.length) {
                    return [...prevItems, data[nextIndex]];
                } else {
                    clearInterval(interval);
                    return prevItems;
                }
            });
        }, 1000);
    }

    const handleStart = async () => {
        if (!selectedValue) {
            alert("Choose Template");
            return
        }
        setScanning(true)
        const response = await scanFiles(selectedValue.id);
        console.log(response)
        if (response) {
            setScanning(false)
        }



        // try {
        //     setScanning(true);
        //     const result = await fetchProcessData(selectedValue.id);
        //     console.log(result.result.data)
        //     const newData = Object.keys(result.result.data[0])
        //     setHeadData(newData);
        //     setData(result.result.data);
        //     const interval = setInterval(() => {
        //         if (items.length === result.result.data.length) {
        //             setScanning(false)
        //         }
        //         setItems(prevItems => {
        //             const nextIndex = prevItems.length;
        //             if (nextIndex < result.result.data.length) {
        //                 return [...prevItems, result.result.data[nextIndex]];
        //             } else {
        //                 clearInterval(interval);
        //                 return prevItems;
        //             }
        //         });
        //     }, 1000);

        // } catch (error) {
        //     console.log(error);
        //     toast.error("Error in starting");
        // } finally {
        //     // setScanning(false);
        // }
    };

    const handleSave = (args) => {
        // const updatedData = data.map((item) => (item.id === args.rowData.id ? args.rowData : item));
        // setData([]);
    };
    const handleRefresh = () => {
        try {
            refreshScanner();
        } catch (error) {
            console.log(error)
            toast.error("Error in Refresh")
        }
    }

    const columnsDirective = headData.map((item, index) => {
        return (
            <ColumnDirective field={item} key={index}
                headerText={item}
                width='120' textAlign='Center'
            >
            </ColumnDirective>)
    })

    return (
        <>
            <NormalHeader />

            <Container className="mt--7" fluid>
                <div className="d-flex">
                    <h2 style={{ color: "white", zIndex: 999 }}>Choose Template : </h2>
                    <Select
                        value={selectedValue}
                        onChange={(selectedValue) => { setSelectedValue(selectedValue); setProcessedData([]) }}
                        options={templateOptions}
                        getOptionLabel={(option) => option?.value || ""}
                        getOptionValue={(option) =>
                            option?.id?.toString() || ""
                        }
                        placeholder="Select Template"
                    />
                </div>

                <br />
                <div className='control-pane'>
                    <div className='control-section'>
                        <GridComponent actionComplete={handleSave} dataSource={processedData} height='350' allowSorting={false} editSettings={editSettings} allowFiltering={false} filterSettings={filterSettings} toolbar={toolbar}>
                            <ColumnsDirective>
                                {columnsDirective}
                            </ColumnsDirective>
                            <Inject services={[Sort, Toolbar, Filter, Edit]} />

                        </GridComponent>
                        <div className="m-2" style={{ float: "right" }}>
                            <Button className="" color={scanning ? "warning" : "success"} type="button" onClick={handleStart}>
                                {scanning ? "Stop" : "Start"}
                            </Button>

                            <Button className="" color="danger" type="button" onClick={handleRefresh} >Refresh</Button>
                        </div>

                    </div>

                </div>

            </Container >

        </>
    );
};

export default Booklet32Page;


