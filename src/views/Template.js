/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
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
  Nav,
  Form,
  Tab,
  Row,
  Col,
  NavDropdown,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import Select, { components } from "react-select";
import { useNavigate } from "react-router-dom";
import DataContext from "store/DataContext";
import { rejectData, sizeData, bubbleData, timingMethodData, typeOfColumnDisplayData, sensivityDensivityDifferenceData, errorOfTheNumberOfTimingMarksData } from "data/helperData";
import axios from 'axios';
import pako from 'pako';
const Template = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [activeKey, setActiveKey] = useState("general");
  const [spanDisplay, setSpanDisplay] = useState("none");
  const [imageSrc, setImageSrc] = useState('/img.jpg');

  const [name, setName] = useState("");
  const [size, setSize] = useState({ id: 1, name: "A4" });
  const [longitude, setLongitude] = useState("210");
  const [layitude, setLayitude] = useState("297");
  const [numberOfLines, setNumberOfLines] = useState("");
  const [timingMethod, setTimingMethod] = useState({
    id: 1,
    name: "Mark to mark",
  });
  const [sensitivity, setSensitivity] = useState("")
  const [difference, setDifference] = useState("");
  const [barCount, setBarCount] = useState("")
  const [selectedBubble, setSelectedBubble] = useState({})
  const [reject, setReject] = useState()
  const [numberOfFrontSideColumn, setNumberOfFrontSideColumn] = useState("");
  const [numberOfBackSideColumn, setNumberOfBackSideColumn] = useState("");
  const [typeOfColumnDisplay, setTypeOfColumnDisplay] = useState({
    id: 4,
    name: "Type4",
  });
  const [sensivityDensivityDifference, setSensivityDensivityDifference] =
    useState({ id: 1, name: "Effictive the sensitivity of software setup" });

  const [errorOfTheNumberOfTimingMarks, setErrorOfTheNumberOfTimingMarks] =
    useState({ id: 2, name: "Check error, and stop the OMR" });
  const [
    suspendedWhenAnErrorIsDetectedInTheSkewMarksFrame,
    setSuspendedWhenAnErrorIsDetectedInTheSkewMarksFrame,
  ] = useState(true);
  const [
    suspendedWhenAnErrorIsDetectedInTheIdMarksFrame,
    setSuspendedWhenAnErrorIsDetectedInTheIdMarksFrame,
  ] = useState(true);
  const [
    suspendedWhenAnErrorIsDetectedInTheMarksFrame,
    setSuspendedWhenAnErrorIsDetectedInTheMarksFrame,
  ] = useState(true);
  const [
    outputTheDataWhenWarkErrorDetected,
    setOutputTheDataWhenMarkErrorDetected,
  ] = useState(false);
  const [useRejecter, setUseRejecter] = useState(false);
  const [
    editTheDataWhenMarkErrorDetected,
    setEditTheDataWhenMarkErrorDetected,
  ] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [templateDatail, setTemplateDetail] = useState([])
  const dataCtx = useContext(DataContext);


  const handleCreate = () => { };

  const [key, setKey] = useState("general");


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);

      };
      reader.readAsDataURL(file);
    }
  }

  const Option = (props) => {
    return (
      <components.Option {...props}>
        {props.data.icon && <span style={{ marginRight: 8 }}>{props.data.icon}</span>}
        {props.data.name}
      </components.Option>
    );
  };
  const SingleValue = (props) => {
    return (
      <components.SingleValue {...props}>
        {props.data.icon && <span style={{ marginRight: 8 }}>{props.data.icon}</span>}
        {props.data.name}
      </components.SingleValue>
    );
  };

  const showHandler = (arr) => {
    setShowDetailModal(true);
    setTemplateDetail(arr)

  }
  const editHandler = (arr, index) => {
    console.log(arr[0]["Bubble Type"])
    navigate("/admin/design-template", {
      state: {
        templateIndex: index,
        numberOfLines: +arr[0].Rows,
        numberOfFrontSideColumn: +arr[0].Cols,
        imgsrc: arr[0].Image,
        selectedBubble: arr[0]["Bubble Type"]
      },
    });

  }
  const arrayToJsonString = (arr) => {
    return JSON.stringify(arr);
  };

  const compressJsonString = (jsonString) => {
    const compressed = pako.gzip(jsonString);
    return compressed;
  };
  const sendToBackendHandler = async (arr, index) => {
    try {
      // Convert the array to a JSON string
      const jsonString = arrayToJsonString(arr);

      // Compress the JSON string
      const compressedData = compressJsonString(jsonString);

      // Convert the compressed data to a Uint8Array
      const uint8Array = new Uint8Array(compressedData);

      // Send the compressed data to the backend API using axios
      const response = await axios.post('https://rb5xhrfq-5289.inc1.devtunnels.ms/ScanFiles', uint8Array, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Encoding': 'gzip',
        },
        responseType: 'json'
      });

      console.log('Response from backend:', response.data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  const createTemplateHandler = () => {
    console.log(!numberOfLines)
    if (!name || !numberOfLines || !numberOfFrontSideColumn || !selectedBubble.name || !imageSrc || !sensitivity || !difference || !barCount || !reject) {
      return
    }

    const templateData = [{ "Template Name": name, "Rows": numberOfLines, "Cols": numberOfFrontSideColumn, "Bubble Type": selectedBubble.name, "Image": imageSrc }]
    const index = dataCtx.setAllTemplates(templateData);

    setModalShow(false);
    navigate("/admin/design-template", {
      state: {
        templateIndex: index,
        numberOfLines: numberOfLines,
        numberOfFrontSideColumn: numberOfFrontSideColumn,
        imgsrc: imageSrc,
        selectedBubble: selectedBubble.name,
        sensitivity: sensitivity,
        difference: difference,
        barCount: barCount,
        reject: reject
      },
    });
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
                              <DropdownItem href="#pablo">Delete</DropdownItem>
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

      {/* Template Modal*/}

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



      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="modal-custom-navbar"
        centered
      >
        <Modal.Header>
          <Modal.Title id="modal-custom-navbar">Create Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container
            activeKey={activeKey}
            onSelect={(k) => setActiveKey(k)}
          >
            <Row>
              <Col sm={12}>
                {" "}
                {/* Adjusted column span to full width if needed */}
                <Nav
                  variant="pills"
                  className="flex-row justify-content-center"
                >
                  <Nav.Item>
                    <Nav.Link eventKey="general">General</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="sensitivity">Sensitivity</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="errors">Errors</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={12} className="mt-3">
                <Tab.Content>
                  <Tab.Pane eventKey="general">
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-3 "
                        style={{ fontSize: ".9rem" }}
                      >
                        Name:
                      </label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Template Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        {!name && (
                          <span style={{ color: "red", display: spanDisplay }}>
                            This feild is required
                          </span>
                        )}
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-3 "
                        style={{ fontSize: ".9rem" }}
                      >
                        Size:
                      </label>
                      <div className="col-md-9">
                        <Select
                          value={size}
                          onChange={(selectedValue) => setSize(selectedValue)}
                          options={sizeData}
                          getOptionLabel={(option) => option?.name || ""}
                          getOptionValue={(option) =>
                            option?.id?.toString() || ""
                          }
                        />
                        {!size && (
                          <span style={{ color: "red", display: spanDisplay }}>
                            This feild is required
                          </span>
                        )}
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <Col sm={4}>
                        <Row>
                          <label
                            htmlFor="example-text-input"
                            className="col-md-6 col-form-label "
                            style={{ fontSize: ".9rem" }}
                          >
                            Longitude:
                          </label>
                          <div className="col-md-6 d-flex">
                            <input
                              type="number"
                              className="form-control"
                              value={longitude}
                              onChange={(e) => setLongitude(e.target.value)}
                            />
                            <p className="mt-3 ml-1 fw-bolder"> mm</p>
                            {!longitude && (
                              <span
                                style={{ color: "red", display: spanDisplay }}
                              >
                                This feild is required
                              </span>
                            )}
                          </div>
                        </Row>
                      </Col>
                      <Col sm={4}>
                        <Row>
                          <label
                            htmlFor="example-text-input"
                            className="col-md-6 col-form-label"
                            style={{ fontSize: ".9rem" }}
                          >
                            Latitude:
                          </label>
                          <div className="col-md-6 d-flex">
                            <input
                              type="number"
                              className="form-control"
                              value={layitude}
                              onChange={(e) => setLayitude(e.target.value)}
                            />
                            <p className="mt-3 ml-1 fs-5"> mm</p>
                            {!layitude && (
                              <span
                                style={{ color: "red", display: spanDisplay }}
                              >
                                This feild is required
                              </span>
                            )}
                          </div>
                        </Row>
                      </Col>
                      <Col sm={4}>
                        <Row>
                          <label
                            htmlFor="example-text-input"
                            className="col-md-6 col-form-label"
                            style={{ fontSize: ".9rem" }}
                          >
                            Number of Rows:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="number"
                              className="form-control"
                              value={numberOfLines}
                              onChange={(e) => setNumberOfLines(e.target.value)}
                            />
                            {!numberOfLines && (
                              <span
                                style={{ color: "red", display: spanDisplay }}
                              >
                                This feild is required
                              </span>
                            )}
                          </div>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <label
                        htmlFor="bubble-variant-input"
                        className="col-md-3 "
                        style={{ fontSize: ".9rem" }}
                      >
                        Bubble Variant:
                      </label>
                      <div className="col-md-9">
                        <Select
                          value={selectedBubble}
                          onChange={(selectedValue) =>
                            setSelectedBubble(selectedValue)
                          }
                          options={bubbleData}
                          getOptionLabel={(option) => option?.name || ""}
                          getOptionValue={(option) =>
                            option?.id?.toString() || ""
                          }
                          components={{ Option, SingleValue }}
                        />
                        {!selectedBubble && (
                          <span style={{ color: "red", display: spanDisplay }}>
                            This feild is required
                          </span>
                        )}
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label
                        htmlFor="bubble-variant-input"
                        className="col-md-3 "
                        style={{ fontSize: ".9rem" }}
                      >
                        Rejected:
                      </label>
                      <div className="col-md-9">
                        <Select
                          value={reject}
                          onChange={(selectedValue) =>
                            setReject(selectedValue)
                          }
                          options={rejectData}
                          getOptionLabel={(option) => option?.name || ""}
                          getOptionValue={(option) =>
                            option?.id?.toString() || ""
                          }
                        // components={{ Option, SingleValue }}
                        />
                        {!selectedBubble && (
                          <span style={{ color: "red", display: spanDisplay }}>
                            This feild is required
                          </span>
                        )}
                      </div>
                    </Row>
                    {/* <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-3 "
                        style={{ fontSize: ".9rem" }}
                      >
                        Timing method:
                      </label>
                      <div className="col-md-9">
                        <Select
                          value={timingMethod}
                          onChange={(selectedValue) =>
                            setTimingMethod(selectedValue)
                          }
                          options={sizeData}
                          getOptionLabel={(option) => option?.name || ""}
                          getOptionValue={(option) =>
                            option?.id?.toString() || ""
                          }
                        />
                        {!timingMethod && (
                          <span style={{ color: "red", display: spanDisplay }}>
                            This feild is required
                          </span>
                        )}
                      </div>
                    </Row> */}

                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-3 "
                        style={{ fontSize: ".9rem" }}
                      >
                        Barcode Count :
                      </label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          value={barCount}
                          onChange={(e) => setBarCount(e.target.value)}
                        />
                        {!numberOfLines && (
                          <span
                            style={{ color: "red", display: spanDisplay }}
                          >
                            This feild is required
                          </span>
                        )}
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-3 "
                        style={{ fontSize: ".9rem" }}
                      >
                        Timing mark:
                      </label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          value={numberOfLines}
                          onChange={(e) => setNumberOfLines(e.target.value)}
                        />
                        {!numberOfLines && (
                          <span
                            style={{ color: "red", display: spanDisplay }}
                          >
                            This feild is required
                          </span>
                        )}
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <Col sm={6}>
                        <Row>
                          <label
                            htmlFor="example-text-input"
                            className="col-md-6 "
                            style={{ fontSize: ".9rem" }}
                          >
                            Number of front side of column:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="number"
                              className="form-control"
                              value={numberOfFrontSideColumn}
                              onChange={(e) =>
                                setNumberOfFrontSideColumn(e.target.value)
                              }
                            />
                            {!numberOfFrontSideColumn && (
                              <span
                                style={{ color: "red", display: spanDisplay }}
                              >
                                This feild is required
                              </span>
                            )}
                          </div>
                        </Row>
                      </Col>
                      <Col sm={6}>
                        <Row>
                          <label
                            htmlFor="example-text-input"
                            className="col-md-6 "
                            style={{ fontSize: ".9rem" }}
                          >
                            Number of back side column:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="number"
                              className="form-control"
                              value={numberOfBackSideColumn}
                              onChange={(e) =>
                                setNumberOfBackSideColumn(e.target.value)
                              }
                            />
                            {!numberOfBackSideColumn && (
                              <span
                                style={{ color: "red", display: spanDisplay }}
                              >
                                This feild is required
                              </span>
                            )}
                          </div>
                        </Row>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-3 "
                        style={{ fontSize: ".9rem" }}
                      >
                        Type of column display:
                      </label>
                      <div className="col-md-9">
                        <Select
                          value={typeOfColumnDisplay}
                          onChange={(selectedValue) =>
                            setTypeOfColumnDisplay(selectedValue)
                          }
                          options={typeOfColumnDisplayData}
                          getOptionLabel={(option) => option?.name || ""}
                          getOptionValue={(option) =>
                            option?.id?.toString() || ""
                          }
                        />
                        {!typeOfColumnDisplay && (
                          <span style={{ color: "red", display: spanDisplay }}>
                            This feild is required
                          </span>
                        )}
                      </div>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="sensitivity">
                    <Form>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="col-md-3 "
                          style={{ fontSize: ".9rem" }}
                        >
                          Sensitivity
                        </label>
                        <div className="col-md-6">
                          <input
                            type="number"
                            className="form-control"
                            value={sensitivity}
                            onChange={(e) =>
                              setSensitivity(e.target.value)
                            }
                          />
                          {!sensitivity && (
                            <span
                              style={{ color: "red", display: spanDisplay }}
                            >
                              This feild is required
                            </span>
                          )}
                        </div>
                      </Row>
                      <Row>
                        <label
                          htmlFor="example-text-input"
                          className="col-md-3 "
                          style={{ fontSize: ".9rem" }}
                        >
                          Difference
                        </label>
                        <div className="col-md-6">
                          <input
                            type="number"
                            className="form-control"
                            value={difference}
                            onChange={(e) =>
                              setDifference(e.target.value)
                            }
                          />
                          {!difference && (
                            <span
                              style={{ color: "red", display: spanDisplay }}
                            >
                              This feild is required
                            </span>
                          )}
                        </div>
                      </Row>
                    </Form>
                  </Tab.Pane>
                  <Tab.Pane eventKey="errors">
                    <Form>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="col-md-3 "
                          style={{ fontSize: ".9rem" }}
                        >
                          Error of the number of the timing mark error:
                        </label>
                        <div className="col-md-9">
                          <Select
                            value={errorOfTheNumberOfTimingMarks}
                            onChange={(selectedValue) =>
                              setErrorOfTheNumberOfTimingMarks(selectedValue)
                            }
                            options={errorOfTheNumberOfTimingMarksData}
                            getOptionLabel={(option) => option?.name || ""}
                            getOptionValue={(option) =>
                              option?.id?.toString() || ""
                            }
                          />
                          {!errorOfTheNumberOfTimingMarks && (
                            <span
                              style={{ color: "red", display: spanDisplay }}
                            >
                              This feild is required
                            </span>
                          )}
                        </div>
                      </Row>

                      <Row>
                        <label
                          htmlFor="example-text-input"
                          className="col-md-6 "
                          style={{ fontSize: ".9rem" }}
                        >
                          Suspended when an error is detected in the skew mark
                          frame
                        </label>
                        <div className="col-md-1">
                          <input
                            type="checkbox"
                            className=""
                            checked={
                              suspendedWhenAnErrorIsDetectedInTheSkewMarksFrame
                            }
                            onChange={(e) =>
                              setSuspendedWhenAnErrorIsDetectedInTheSkewMarksFrame(
                                e.target.checked
                              )
                            }
                          />
                          {!suspendedWhenAnErrorIsDetectedInTheSkewMarksFrame && (
                            <span
                              style={{ color: "red", display: spanDisplay }}
                            >
                              This feild is required
                            </span>
                          )}
                        </div>
                      </Row>
                      <Row>
                        <label
                          htmlFor="example-text-input"
                          className="col-md-6 "
                          style={{ fontSize: ".9rem" }}
                        >
                          Suspended when an error is detected in the Id mark
                          frame
                        </label>
                        <div className="col-md-1">
                          <input
                            type="checkbox"
                            className=""
                            checked={
                              suspendedWhenAnErrorIsDetectedInTheIdMarksFrame
                            }
                            onChange={(e) =>
                              setSuspendedWhenAnErrorIsDetectedInTheIdMarksFrame(
                                e.target.checked
                              )
                            }
                          />
                          {!suspendedWhenAnErrorIsDetectedInTheIdMarksFrame && (
                            <span
                              style={{ color: "red", display: spanDisplay }}
                            >
                              This feild is required
                            </span>
                          )}
                        </div>
                      </Row>
                      <Row>
                        <label
                          htmlFor="example-text-input"
                          className="col-md-6 "
                          style={{ fontSize: ".9rem" }}
                        >
                          Suspended when an error is detected in the mark frame
                        </label>
                        <div className="col-md-1">
                          <input
                            type="checkbox"
                            className=""
                            checked={
                              suspendedWhenAnErrorIsDetectedInTheMarksFrame
                            }
                            onChange={(e) =>
                              setSuspendedWhenAnErrorIsDetectedInTheIdMarksFrame(
                                e.target.checked
                              )
                            }
                          />
                          {!suspendedWhenAnErrorIsDetectedInTheMarksFrame && (
                            <span
                              style={{ color: "red", display: spanDisplay }}
                            >
                              This feild is required
                            </span>
                          )}
                        </div>
                      </Row>
                      <Row>
                        <label
                          htmlFor="example-text-input"
                          className="col-md-6 "
                          style={{ fontSize: ".9rem" }}
                        >
                          Output the data when mark error detected
                        </label>
                        <div className="col-md-1">
                          <input
                            type="checkbox"
                            className=""
                            checked={outputTheDataWhenWarkErrorDetected}
                            onChange={(e) =>
                              setOutputTheDataWhenMarkErrorDetected(
                                e.target.checked
                              )
                            }
                          />
                          {!outputTheDataWhenWarkErrorDetected && (
                            <span
                              style={{ color: "red", display: spanDisplay }}
                            >
                              This feild is required
                            </span>
                          )}
                        </div>
                      </Row>
                      <Row>
                        <label
                          htmlFor="example-text-input"
                          className="col-md-6 "
                          style={{ fontSize: ".9rem" }}
                        >
                          Use rejecter
                        </label>
                        <div className="col-md-1">
                          <input
                            type="checkbox"
                            className=""
                            checked={useRejecter}
                            onChange={(e) => setUseRejecter(e.target.checked)}
                          />
                          {!useRejecter && (
                            <span
                              style={{ color: "red", display: spanDisplay }}
                            >
                              This feild is required
                            </span>
                          )}
                        </div>
                      </Row>
                      <Row>
                        <label
                          htmlFor="example-text-input"
                          className="col-md-6 "
                          style={{ fontSize: ".9rem" }}
                        >
                          Edit the data when mark error detected
                        </label>
                        <div className="col-md-1">
                          <input
                            type="checkbox"
                            className=""
                            checked={editTheDataWhenMarkErrorDetected}
                            onChange={(e) =>
                              setEditTheDataWhenMarkErrorDetected(
                                e.target.checked
                              )
                            }
                          />
                          {!editTheDataWhenMarkErrorDetected && (
                            <span
                              style={{ color: "red", display: spanDisplay }}
                            >
                              This feild is required
                            </span>
                          )}
                        </div>
                      </Row>
                    </Form>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Modal.Body>
        <Modal.Footer>

          <label>
            Upload Image:
            <input type="file" onChange={handleImageUpload} accept="image/*" />
          </label>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={createTemplateHandler}
          // onClick={() => {

          // }}
          >
            Create Template
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Template;
