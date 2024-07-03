
import {
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import NormalHeader from "components/Headers/NormalHeader";
import {
  Modal,
  Button,
  Row,
  Col,
  NavDropdown,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import DataContext from "store/DataContext";

import axios from 'axios';
import pako from 'pako';
import TemplateModal from "../ui/TemplateModal";
const Template = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [templateDatail, setTemplateDetail] = useState([])

  const dataCtx = useContext(DataContext);

  const showHandler = (arr) => {
    setShowDetailModal(true);
    setTemplateDetail(arr)

  }
  const editHandler = (arr, index) => {
    // if (!arr || !arr.length) return;
    const templateData = arr[0];
    const idField = arr.idWindowParameters || [];

    // if (!templateData || !idField.length) return;

    const tempdata = { ...templateData, ...idField[0] };

    navigate("/admin/design-template", {
      state: {
        templateIndex: index,
        numberOfLines: +tempdata.Rows,
        numberOfFrontSideColumn: +tempdata.Cols,
        imgsrc: tempdata.Image,
        selectedBubble: tempdata["Bubble Type"],
        sensitivity: +tempdata.sensitivity,
        difference: +tempdata.difference,
        barCount: +tempdata.barcodeCount,
        reject: tempdata.isReject,
        face: +tempdata.face,
        arr: arr
      },

    });
  };


  const sendToBackendHandler = async (arr, index) => {

    const templateData = arr[0];
    const formFieldData = arr?.formFieldWindowParameters;
    const questionField = arr?.questionsWindowParameters;
    const skewField = arr?.skewMarksWindowParameters;
    const idFeild = arr?.idWindowParameters;
    const tempdata = { ...templateData, ...idFeild?.[0] }


    // const temstrucData = [tempdata]?.map((item) => {
    //   const layoutName = item["Template Name"];
    //   const timingMarks = +item["Rows"];
    //   const barcodeCount = +item["Bar Count"];
    //   const iFace = +item["face"];
    //   const columnStart = +item["columnStart"];
    //   const columnNumber = +item["totalNoInColumn"];
    //   const columnStep = +item["totalStepInColumn"];
    //   const rowStart = +item["rowStart"];
    //   const rowNumber = +item["totalNoInRow"];
    //   const rowStep = +item["totalStepInRow"];
    //   const iDirection = + item["iDirection"];
    //   const iSensitivity = +item["sensitivity"]
    //   const iDifference = +item["difference"];
    //   const ngAction = item["ngAction"].toString();
    //   const dataReadDirection = item["direction"]
    //   const iReject = +item["iReject"];
    //   const { barcodeSide, barcodeColor, barcodeType, barcodeCheckDigit, barcodeOption,
    //     barcodeRightPos, barcodeLeftPos, barcodeTopPos, barcodeBottomPos, imageEnable, imageColor,
    //     imageType, imageParam, imageRotation, imageResoMode, imageResolution, printEnable, printStartPos,
    //     printDigit, printStartNumber, printOrientation, printFontSize, printFontSpace, printMode
    //   } = item;


    //   return {
    //     layoutName,
    //     timingMarks,
    //     barcodeCount,
    //     iFace,
    //     columnStart,
    //     columnNumber,
    //     columnStep,
    //     rowStart,
    //     rowNumber,
    //     rowStep,
    //     iDirection,
    //     iSensitivity,
    //     iDifference,
    //     ngAction,
    //     dataReadDirection,
    //     iReject,
    //     barcodeSide,
    //     barcodeColor,
    //     barcodeType,
    //     barcodeCheckDigit,
    //     barcodeOption,
    //     barcodeRightPos,
    //     barcodeLeftPos,
    //     barcodeTopPos,
    //     barcodeBottomPos,
    //     imageEnable,
    //     imageColor,
    //     imageType,
    //     imageParam,
    //     imageRotation,
    //     imageResoMode,
    //     imageResolution,
    //     printEnable,
    //     printStartPos,
    //     printDigit,
    //     printStartNumber,
    //     printOrientation,
    //     printFontSize,
    //     printFontSpace,
    //     printMode
    //   }
    // })
    const temstrucData = [tempdata]?.map(item => {
      const {
        "Template Name": layoutName,
        "Rows": timingMarks,
        "Bar Count": barcodeCount,
        "face": iFace,
        "columnStart": columnStart,
        "totalNoInColumn": columnNumber,
        "totalStepInColumn": columnStep,
        "rowStart": rowStart,
        "totalNoInRow": rowNumber,
        "totalStepInRow": rowStep,
        "iDirection": iDirection,
        "sensitivity": iSensitivity,
        "difference": iDifference,
        "ngAction": ngAction,
        "direction": dataReadDirection,
        "iReject": iReject,
        barcodeSide,
        barcodeColor,
        barcodeType,
        barcodeCheckDigit,
        barcodeOption,
        barcodeRightPos,
        barcodeLeftPos,
        barcodeTopPos,
        barcodeBottomPos,
        imageEnable,
        imageColor,
        imageType,
        imageParam,
        imageRotation,
        imageResoMode,
        imageResolution,
        printEnable,
        printStartPos,
        printDigit,
        printStartNumber,
        printOrientation,
        printFontSize,
        printFontSpace,
        printMode
      } = item;

      return {
        layoutName,
        timingMarks: +timingMarks,
        barcodeCount: +barcodeCount,
        iFace: +iFace,
        columnStart: +columnStart,
        columnNumber: +columnNumber,
        columnStep: +columnStep,
        rowStart: +rowStart,
        rowNumber: +rowNumber,
        rowStep: +rowStep,
        iDirection: +iDirection,
        iSensitivity: +iSensitivity,
        iDifference: +iDifference,
        ngAction: ngAction.toString(),
        dataReadDirection,
        iReject: +iReject,
        barcodeSide,
        barcodeColor,
        barcodeType,
        barcodeCheckDigit: +barcodeCheckDigit,
        barcodeOption: +barcodeOption,
        barcodeRightPos: +barcodeRightPos,
        barcodeLeftPos: +barcodeLeftPos,
        barcodeTopPos: +barcodeTopPos,
        barcodeBottomPos: +barcodeBottomPos,
        imageEnable: +imageEnable,
        imageColor,
        imageType,
        imageParam,
        imageRotation,
        imageResoMode,
        imageResolution,
        printEnable,
        printStartPos,
        printDigit,
        printStartNumber,
        printOrientation,
        printFontSize,
        printFontSpace,
        printMode
      };
    });


    // const skewFieldStruc = skewField?.map((item) => {
    //   const iFace = +item["face"];
    //   const columnStart = +item["columnStart"];
    //   const columnNumber = +item["totalNoInColumn"];
    //   const columnStep = +item["totalStepInColumn"];
    //   const rowStart = +item["rowStart"];
    //   const rowNumber = +item["totalNoInRow"];
    //   const rowStep = +item["totalStepInRow"];
    //   const iDirection = +item["readingDirection"];
    //   const iSensitivity = +item["sensitivity"]
    //   const iDifference = +item["difference"];
    //   const ngAction = item["windowNG"];
    //   const iType = item["type"];
    //   const iMaximumMarks = +item["maximumMark"];
    //   const iMinimumMarks = +item["minimumMark"];


    //   return {
    //     iFace,
    //     columnStart,
    //     columnNumber,
    //     columnStep,
    //     rowStart,
    //     rowNumber,
    //     rowStep,
    //     iDirection,
    //     iSensitivity,
    //     iDifference,
    //     iMinimumMarks,
    //     iMaximumMarks,
    //     iType,
    //     ngAction
    //   }
    // });

    const skewFieldStruc = skewField?.map(item => {
      const {
        "face": iFace,
        "columnStart": columnStart,
        "totalNoInColumn": columnNumber,
        "totalStepInColumn": columnStep,
        "rowStart": rowStart,
        "totalNoInRow": rowNumber,
        "totalStepInRow": rowStep,
        "readingDirection": iDirection,
        "sensitivity": iSensitivity,
        "difference": iDifference,
        "windowNG": ngAction,
        "type": iType,
        "maximumMark": iMaximumMarks,
        "minimumMark": iMinimumMarks,
        "colIdPattern": colIdPattern
      } = item;

      return {
        iFace: +iFace,
        columnStart: +columnStart,
        columnNumber: +columnNumber,
        columnStep: +columnStep,
        rowStart: +rowStart,
        rowNumber: +rowNumber,
        rowStep: +rowStep,
        iDirection: +iDirection,
        iSensitivity: +iSensitivity,
        iDifference: +iDifference,
        iMinimumMarks: +iMinimumMarks,
        iMaximumMarks: +iMaximumMarks,
        colIdPattern,
        iType,
        ngAction
      };
    });


    // const formFieldStruc = formFieldData?.map((item) => {
    //   const iFace = +item["face"];
    //   const columnStart = +item["columnStart"];
    //   const columnNumber = +item["totalNoInColumn"];
    //   const columnStep = +item["totalStepInColumn"];
    //   const rowStart = +item["rowStart"];
    //   const rowNumber = +item["totalNoInRow"];
    //   const rowStep = +item["totalStepInRow"];
    //   const iDirection = +item["readingDirection"];
    //   const iSensitivity = +item["sensitivity"]
    //   const iDifference = +item["difference"];
    //   const ngAction = item["windowNG"];
    //   const iType = item["type"];
    //   const iMaximumMarks = +item["maximumMark"];
    //   const iMinimumMarks = +item["minimumMark"];
    //   const windowName = item["windowName"]
    //   const iOption = +item["option"];
    //   const totalNumberOfFileds = item["totalNumberOfFields"];
    //   const numericOrAlphabets = item["numericOrAlphabets"];

    //   return {
    //     iFace,
    //     windowName,
    //     columnStart,
    //     columnNumber,
    //     columnStep,
    //     rowStart,
    //     rowNumber,
    //     rowStep,
    //     iDirection,
    //     iSensitivity,
    //     iDifference,
    //     iOption,
    //     iMinimumMarks,
    //     iMaximumMarks,
    //     iType,
    //     ngAction,
    //     totalNumberOfFileds,
    //     numericOrAlphabets
    //   }
    // });

    const formFieldStruc = formFieldData?.map(item => {
      const {
        "face": iFace,
        "columnStart": columnStart,
        "totalNoInColumn": columnNumber,
        "totalStepInColumn": columnStep,
        "rowStart": rowStart,
        "totalNoInRow": rowNumber,
        "totalStepInRow": rowStep,
        "readingDirection": iDirection,
        "sensitivity": iSensitivity,
        "difference": iDifference,
        "windowNG": ngAction,
        "type": iType,
        "maximumMark": iMaximumMarks,
        "minimumMark": iMinimumMarks,
        "windowName": windowName,
        "option": iOption,
        "totalNumberOfFields": totalNumberOfFileds,
        "numericOrAlphabets": numericOrAlphabets
      } = item;

      return {
        iFace: +iFace,
        windowName,
        columnStart: +columnStart,
        columnNumber: +columnNumber,
        columnStep: +columnStep,
        rowStart: +rowStart,
        rowNumber: +rowNumber,
        rowStep: +rowStep,
        iDirection: +iDirection,
        iSensitivity: +iSensitivity,
        iDifference: +iDifference,
        iOption: +iOption,
        iMinimumMarks: +iMinimumMarks,
        iMaximumMarks: +iMaximumMarks,
        iType,
        ngAction,
        totalNumberOfFileds,
        numericOrAlphabets
      };
    });



    const questionFieldStruc = questionField?.map((item) => {
      const iFace = +item["face"];
      const columnStart = +item["columnStart"];
      const columnNumber = +item["totalNoInColumn"];
      const columnStep = +item["totalStepInColumn"];
      const rowStart = +item["rowStart"];
      const rowNumber = +item["totalNoInRow"];
      const rowStep = +item["totalStepInRow"];
      const iSensitivity = +item["sensitivity"]
      const iDifference = +item["difference"];
      const ngAction = item["windowNG"];
      const iType = item["type"];
      const iMaximumMarks = +item["maximumMark"];
      const iMinimumMarks = +item["minimumMark"];
      const windowName = item["windowName"]
      const iOption = +item["option"];
      const totalNumberOfFileds = item["totalNumberOfFields"];
      const numericOrAlphabets = item["numericOrAlphabets"];

      return {
        iFace,
        windowName,
        columnStart,
        columnNumber,
        columnStep,
        rowStart,
        rowNumber,
        rowStep,
        iSensitivity,
        iDifference,
        iOption,
        iMinimumMarks,
        iMaximumMarks,
        iType,
        ngAction,
        totalNumberOfFileds,
        numericOrAlphabets
      }
    });

    const mainObj = {
      "layoutParameters": { ...temstrucData[0] },
      "skewMarksWindowParameters": skewFieldStruc,
      "formFieldWindowParameters": formFieldStruc,
      "questionsWindowParameters": questionFieldStruc
    };


    // const templateData = arr[0];
    // const formFieldData = arr.formFieldWindowParameters || [];
    // const questionField = arr.questionsWindowParameters || [];
    // const skewField = arr.skewMarksWindowParameters || [];
    // const idField = arr.idWindowParameters || [];

    // const tempdata = { ...templateData, ...idField[0] };

    // const mapCommonFields = (item) => ({
    //   iFace: +item["face"],
    //   columnStart: +item["columnStart"],
    //   columnNumber: +item["totalNoInColumn"],
    //   columnStep: +item["totalStepInColumn"],
    //   rowStart: +item["rowStart"],
    //   rowNumber: +item["totalNoInRow"],
    //   rowStep: +item["totalStepInRow"],
    //   iSensitivity: +item["sensitivity"],
    //   iDifference: +item["difference"],
    //   iMaximumMarks: +item["maximumMark"],
    //   iMinimumMarks: +item["minimumMark"],
    //   iType: item["type"],
    //   ngAction: item["windowNG"],
    // });

    // const temstrucData = [{
    //   layoutName: tempdata["Template Name"],
    //   timingMarks: +tempdata["Rows"],
    //   barcodeCount: +tempdata["Bar Count"],
    //   iFace: +tempdata["face"],
    //   columnStart: +tempdata["columnStart"],
    //   columnNumber: +tempdata["totalNoInColumn"],
    //   columnStep: +tempdata["totalStepInColumn"],
    //   rowStart: +tempdata["rowStart"],
    //   rowNumber: +tempdata["totalNoInRow"],
    //   rowStep: +tempdata["totalStepInRow"],
    //   iDirection: +tempdata["iDirection"],
    //   iSensitivity: +tempdata["sensitivity"],
    //   iDifference: +tempdata["difference"],
    //   ngAction: tempdata["ngAction"].toString(),
    //   dataReadDirection: tempdata["direction"],
    //   iReject: +tempdata["iReject"]
    // }];

    // const skewFieldStruc = skewField.map(item => ({
    //   ...mapCommonFields(item),
    //   iDirection: +item["readingDirection"]
    // }));

    // const formFieldStruc = formFieldData.map(item => ({
    //   ...mapCommonFields(item),
    //   iDirection: +item["readingDirection"],
    //   windowName: item["windowName"],
    //   iOption: +item["option"],
    //   totalNumberOfFields: item["totalNumberOfFields"],
    //   numericOrAlphabets: item["numericOrAlphabets"]
    // }));

    // const questionFieldStruc = questionField.map(item => ({
    //   ...mapCommonFields(item),
    //   windowName: item["windowName"],
    //   iOption: +item["option"],
    //   totalNumberOfFields: item["totalNumberOfFields"],
    //   numericOrAlphabets: item["numericOrAlphabets"]
    // }));

    // const mainObj = {
    //   layoutParameters: { ...temstrucData[0] },
    //   skewMarksWindowParameters: skewFieldStruc,
    //   formFieldWindowParameters: formFieldStruc,
    //   questionsWindowParameters: questionFieldStruc
    // };

    console.log(mainObj)

    // try {
    //   const response = await axios.post('https://rb5xhrfq-5289.inc1.devtunnels.ms/LayoutSetting', mainObj, {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
    //   console.log('Response:', response);
    //   // alert(`Response : ${JSON.stringify(response.data.message)}`)
    // } catch (error) {
    //   // alert(`Response : ${JSON.stringify(error.response.data)}`)
    //   console.error('Error sending POST request:', error);
    // }


  };

  const deleteHandler = (arr, index) => {
    dataCtx.deleteTemplate(index)
  }
  return (
    <>
      <NormalHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between">
                  <h3 className="mt-2">All Templates</h3>

                  <Button
                    className=""
                    color="primary"
                    type="button"
                    onClick={() => setModalShow(true)}
                  >
                    Create Template
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush mb-5" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Sno.</th>
                    <th scope="col">Template Name</th>
                    <th scope="col">Row</th>
                    <th scope="col">Col</th>
                    <th scope="col">Bubble Type</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody style={{ minHeight: "100rem" }}>
                  {dataCtx.allTemplates?.map((d, i) => (
                    <>
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{d[0]["Template Name"]}</td>
                        <td>{d[0].Rows}</td>
                        <td>{d[0].Cols}</td>
                        <td>{d[0]["Bubble Type"]}</td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem onClick={() => showHandler(d)}>Show</DropdownItem>
                              <DropdownItem onClick={() => editHandler(d, i)}>Edit</DropdownItem>
                              <DropdownItem onClick={() => sendToBackendHandler(d, i)}>Send Data</DropdownItem>
                              <DropdownItem onClick={() => deleteHandler(d, i)}>Delete</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>

      {/* Template Detail Modal*/}

      {templateDatail.length !== 0 && (
        <Modal
          show={showDetailModal}
          onHide={() => setShowDetailModal(false)}
          size="lg"
          aria-labelledby="modal-custom-navbar"
          centered
        >
          <Modal.Header>
            <Modal.Title id="modal-custom-navbar">
              Template Name :  {templateDatail[0]["Template Name"]}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3">
              <Col xs={12} md={2}>
                <label htmlFor="example-text-input" style={{ fontSize: ".9rem" }}>
                  Name:
                </label>
              </Col>
              <Col xs={12} md={10}>
                <input
                  type="text"
                  className="form-control"
                  value={templateDatail[0]["Template Name"]}
                  readOnly
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={2}>
                <label htmlFor="example-text-input" style={{ fontSize: ".9rem" }}>
                  Total Row:
                </label>
              </Col>
              <Col xs={12} md={2}>
                <input
                  type="text"
                  className="form-control"
                  value={templateDatail[0]["Rows"]}
                  readOnly
                />
              </Col>
              <Col xs={12} md={2}>
                <label htmlFor="example-text-input" style={{ fontSize: ".9rem" }}>
                  Total Column:
                </label>
              </Col>
              <Col xs={12} md={2}>
                <input
                  type="text"
                  className="form-control"
                  value={templateDatail[0]["Cols"]}
                  readOnly
                />
              </Col>
              <Col xs={12} md={2}>
                <label htmlFor="example-text-input" style={{ fontSize: ".9rem" }}>
                  Bubble Type:
                </label>
              </Col>
              <Col xs={12} md={2}>
                <input
                  type="text"
                  className="form-control"
                  value={templateDatail[0]["Bubble Type"]}
                  readOnly
                />
              </Col>
            </Row>

            {templateDatail.Regions &&
              templateDatail.Regions.map((item, index) => {
                return (
                  <div key={index}>
                    <Row className="mb-3">
                      <Col xs={12} md={2}>
                        <label htmlFor="example-text-input" style={{ fontSize: ".9rem" }}>
                          Region Name:
                        </label>
                      </Col>
                      <Col xs={12} md={10}>
                        <input
                          type="text"
                          className="form-control"
                          value={item["Region name"]}
                          readOnly
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col xs={6} md={3}>
                        <label htmlFor="example-text-input" style={{ fontSize: ".9rem" }}>
                          Start Row:
                        </label>
                        <input className="form-control" value={item["Coordinate"]["Start Row"]} readOnly />
                      </Col>
                      <Col xs={6} md={3}>
                        <label htmlFor="example-text-input" style={{ fontSize: ".9rem" }}>
                          Start Col:
                        </label>
                        <input className="form-control" value={item["Coordinate"]["Start Col"]} readOnly />
                      </Col>
                      <Col xs={6} md={3}>
                        <label htmlFor="example-text-input" style={{ fontSize: ".9rem" }}>
                          End Row:
                        </label>
                        <input className="form-control" value={item["Coordinate"]["End Row"]} readOnly />
                      </Col>
                      <Col xs={6} md={3}>
                        <label htmlFor="example-text-input" style={{ fontSize: ".9rem" }}>
                          End Col:
                        </label>
                        <input className="form-control" value={item["Coordinate"]["End Col"]} readOnly />
                      </Col>
                    </Row>
                  </div>
                );
              })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <TemplateModal show={modalShow} onHide={() => setModalShow(false)} />    {/* Create Template modal */}
    </>
  );
};

export default Template;
