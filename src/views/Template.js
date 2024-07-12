
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
  useEffect(() => {
    const fetchAllTemplate = async () => {
      const response = await axios.get("https://rb5xhrfq-5289.inc1.devtunnels.ms/GetAllLayout");
      // response.data

      const mpObj = response.data.map((item) => {
        return [{ layoutParameters: item }]

      })
      console.log(mpObj)
      dataCtx.addToAllTemplate(mpObj)
      console.log(response.data)
    }
    fetchAllTemplate();
  }, []);
  const showHandler = (arr) => {
    setShowDetailModal(true);
    setTemplateDetail(arr)

  }
  const editHandler = (arr, index) => {
    const tempdata = arr[0].layoutParameters;

    navigate("/admin/design-template", {
      state: {
        templateIndex: index,
        timingMarks: +tempdata.timingMarks,
        totalColumns: +tempdata.totalColumns,
        imgsrc: tempdata.imagesrc,
        bubbleType: tempdata.bubbleType,
        iSensitivity: +tempdata.iSensitivity,
        iDifference: +tempdata.iDifference,
        iReject: tempdata.iReject,
        iFace: +tempdata.iFace,
        arr: arr
      }

    });
  };
  console.log(dataCtx.allTemplates)

  const sendToBackendHandler = async (index) => {
    const template = dataCtx.allTemplates[index];
    console.log(template);
    try {
      const response = await axios.post('https://rb5xhrfq-5289.inc1.devtunnels.ms/LayoutSetting', template[0], {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response);
      // alert(`Response : ${JSON.stringify(response.data.message)}`)
    } catch (error) {
      // alert(`Response : ${JSON.stringify(error.response.data)}`)
      console.error('Error sending POST request:', error);
    }
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
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{d[0].layoutParameters.layoutName}</td>
                      <td>{d[0].layoutParameters.timingMarks}</td>
                      <td>{d[0].layoutParameters.totalColumns}</td>
                      <td>{d[0].layoutParameters["bubbleType"]}</td>
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
