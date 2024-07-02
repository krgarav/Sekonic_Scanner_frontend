

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
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Inject, Toolbar, ToolbarItems, FilterSettingsModel, EditSettingsModel, Filter, Edit } from '@syncfusion/ej2-react-grids';
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
    const filterSettings = { type: 'Excel' };
    const toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const customeridRule = { required: true, minLength: 5 };
    const orderidRules = { required: true, number: true };
    const freightRules = { required: true, min: 0 };

    const getScanData = async () => {
        try {
            const data = await fetchProcessData();
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
        const intervalId = setInterval(() => {
            if (scanning) {
                getScanData();
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [scanning]);

    const handleStart = async () => {
        try {
            setScanning(true);
            const result = await scanFiles();
        } catch (error) {
            console.log(error);
            toast.error("Error in starting");
        } finally {
            setScanning(false);
        }
    };


    const handleRefresh = () => {
        try {
            refreshScanner();
        } catch (error) {
            console.log(error)
            toast.error("Error in Refresh")
        }
    }

    return (
        <>
            <NormalHeader />


            <Container className="mt--7" fluid>

                {/* <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <div className="d-flex justify-content-between">
                                    <h1 className="mt-2">32 Page Booklet</h1>
                                </div>
                            </CardHeader>
                            <div className=" head">
                                <div className="table-main">
                                    <table className=" ">
                                        <thead>
                                            <tr className="JobQueueTableTr">
                                                <th className="JobQueueTableTh">Index Number</th>
                                                <th className="JobQueueTableTh">Graph 1</th>
                                                <th className="JobQueueTableTh">Graph 2</th>
                                                <th className="JobQueueTableTh">Graph 3</th>
                                                <th className="JobQueueTableTh">Graph 4</th>
                                                <th className="JobQueueTableTh">Exam Type</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.map((item, index) => (
                                                <tr className="JobQueueTableTr" key={index}>
                                                    {Object.values(item).map((value, i) => (
                                                        <td key={i}>{value}</td>
                                                    ))}
                                                </tr>
                                            ))}

                                            {[...Array(20).keys()].map(i => (
                                                <tr className="JobQueueTableTr" key={i}>
                                                    {[...Array(6).keys()].map(i => (
                                                        <td key={i}>  </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="functions mt-2 d-flex justify-content-end">
                                    <Button className="" color="success" type="button" onClick={handleStart}>
                                        Start
                                    </Button>
                                    <Button className="" color="warning" type="button" onClick={handleRefresh}>
                                        Refresh
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Row> */}

                <div className='control-pane'>
                    <div className='control-section'>
                        <GridComponent dataSource={dataSet} height='350' allowSorting={true} editSettings={editSettings} allowFiltering={true} filterSettings={filterSettings} toolbar={toolbar}>
                            <ColumnsDirective>
                                <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
                                <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={customeridRule}></ColumnDirective>
                                <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right' editType='datepickeredit' />
                                <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' validationRules={freightRules} editType='numericedit' />
                                <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format='yMd' textAlign='Right' editType='datepickeredit'></ColumnDirective>
                                <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit'></ColumnDirective>
                            </ColumnsDirective>
                            <Inject services={[Sort, Toolbar, Filter, Edit]} />
                        </GridComponent>
                    </div>
                </div>

            </Container>





        </>
    );
};

export default Booklet32Page;


