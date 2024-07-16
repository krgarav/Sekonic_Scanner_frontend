
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
import axios from "axios";
import { fetchAllTemplate } from "helper/TemplateHelper";
// import Select, { components } from "react-select";
const dataSet = [
    { OrderID: 10248, CustomerName: 'Paul Henriot', OrderDate: new Date(2020, 5, 20), Freight: 32.38, ShippedDate: new Date(2020, 5, 23), ShipCountry: 'France' },
    { OrderID: 10249, CustomerName: 'Karin Josephs', OrderDate: new Date(2020, 6, 19), Freight: 11.61, ShippedDate: new Date(2020, 6, 22), ShipCountry: 'Germany' },
    { OrderID: 10250, CustomerName: 'Mario Pontes', OrderDate: new Date(2020, 7, 18), Freight: 65.83, ShippedDate: new Date(2020, 7, 21), ShipCountry: 'Brazil' },
    { OrderID: 10251, CustomerName: 'Mary Saveley', OrderDate: new Date(2020, 8, 17), Freight: 41.34, ShippedDate: new Date(2020, 8, 20), ShipCountry: 'UK' },
    { OrderID: 10252, CustomerName: 'Victoria Ashworth', OrderDate: new Date(2020, 9, 16), Freight: 51.3, ShippedDate: new Date(2020, 9, 19), ShipCountry: 'USA' },
    { OrderID: 10253, CustomerName: 'Hanna Moos', OrderDate: new Date(2020, 10, 15), Freight: 12.76, ShippedDate: new Date(2020, 10, 18), ShipCountry: 'Germany' },
    { OrderID: 10254, CustomerName: 'Frédérique Citeaux', OrderDate: new Date(2020, 11, 14), Freight: 24.32, ShippedDate: new Date(2020, 11, 17), ShipCountry: 'France' },
    { OrderID: 10255, CustomerName: 'Martin Sommer', OrderDate: new Date(2021, 0, 13), Freight: 32.02, ShippedDate: new Date(2021, 0, 16), ShipCountry: 'Spain' },
    { OrderID: 10256, CustomerName: 'Laurence Lebihan', OrderDate: new Date(2021, 1, 12), Freight: 23.55, ShippedDate: new Date(2021, 1, 15), ShipCountry: 'France' },
    { OrderID: 10257, CustomerName: 'Elizabeth Lincoln', OrderDate: new Date(2021, 2, 11), Freight: 15.67, ShippedDate: new Date(2021, 2, 14), ShipCountry: 'Canada' }
];


const Booklet32Page = () => {
    const [count, setCount] = useState(true)
    const [data, setData] = useState([
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
            const data = await fetchProcessData(1009);
            if (data?.result?.success) {
                setData(data?.result?.data);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
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
    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         if (scanning) {
    //             getScanData();
    //         }
    //     }, 1000);

    //     return () => clearInterval(intervalId);
    // }, [scanning]);

    const handleStart = async () => {
        if (!selectedValue) {
            alert("Choose Template");
            return
        }
        try {
            setScanning(true);
            const result = await fetchProcessData(selectedValue.id);
            console.log(result.result.data)
            const newData = Object.keys(result.result.data[0])
            setHeadData(newData);
            setData(result.result.data);
            const interval = setInterval(() => {
                setItems(prevItems => {
                    const nextIndex = prevItems.length;
                    if (nextIndex < result.result.data.length) {
                        return [...prevItems, result.result.data[nextIndex]];
                    } else {
                        clearInterval(interval);
                        return prevItems;
                    }
                });
            }, 1000);

        } catch (error) {
            console.log(error);
            toast.error("Error in starting");
        } finally {
            setScanning(false);
        }
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
                        onChange={(selectedValue) => setSelectedValue(selectedValue)}
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
                        <GridComponent actionComplete={handleSave} dataSource={items} height='350' allowSorting={false} editSettings={editSettings} allowFiltering={false} filterSettings={filterSettings} toolbar={toolbar}>
                            <ColumnsDirective>
                                {columnsDirective}
                            </ColumnsDirective>
                            <Inject services={[Sort, Toolbar, Filter, Edit]} />

                        </GridComponent>
                        <div className="m-2" style={{ float: "right" }}>
                            <Button className="" color="success" type="button" onClick={handleStart} >Start</Button>
                            <Button className="" color="warning" type="button" onClick={handleStart} >Refresh</Button>
                        </div>

                    </div>

                </div>

            </Container>

        </>
    );
};

export default Booklet32Page;


