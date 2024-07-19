import React, { useContext, useEffect, useState } from 'react';
import {
    Modal,
    Button,
    Nav,
    Form,
    Tab,
    Row,
    Col,
} from "react-bootstrap";


import { useNavigate } from "react-router-dom";

import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-react-dropdowns/styles/material.css';
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import ImageSelection from './imageSelection';
import { getScannedImage } from 'helper/TemplateHelper';
import { toast } from 'react-toastify';
import { fetchAllTemplate } from 'helper/TemplateHelper';
import Select, { components } from "react-select";
const JobModal = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [allTemplateOptions, setAllTemplateOptions] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState()
    const [fileNames, setFileNames] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files).map(file => file.webkitRelativePath || file.name);
        setFileNames(fileArray);
    };

    useEffect(() => {
        if (props.show) {
            setModalShow(true);
        } else {
            setModalShow(false);
        }
    }, [props.show]);

    useEffect(() => {
        const getTemplates = async () => {
            const template = await fetchAllTemplate();
            const structuredTemplate = template.map((item) => ({ id: item.id, name: item.layoutName }))
            console.log(structuredTemplate)
            setAllTemplateOptions(structuredTemplate);
        };
        getTemplates();
    }, []);

    const createTemplateHandler = async () => {

    }


    return (
        <>
            <Modal
                show={modalShow}
                onHide={props.onHide}
                size="lg"
                aria-labelledby="modal-custom-navbar"
                centered
                dialogClassName="modal-90w"
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title id="modal-custom-navbar">Assign Job</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ height: '65dvh' }}>
                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-3 "
                            style={{ fontSize: ".9rem" }}
                        >
                            Select Template:
                        </label>
                        <div className="col-md-9">
                            <Select
                                value={selectedTemplate}
                                onChange={(selectedValue) =>
                                    setSelectedTemplate(selectedValue)
                                }
                                options={allTemplateOptions}
                                getOptionLabel={(option) => option?.name || ""}
                                getOptionValue={(option) =>
                                    option?.id?.toString() || ""
                                }
                                placeholder="Select color type..."
                            />

                        </div>
                    </Row>
                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-3  col-form-label"
                            style={{ fontSize: ".9rem" }}
                        >
                            Data Path:
                        </label>
                        <div className="col-md-9">
                            <input type='text' className="form-control" placeholder='Enter the data path' />
                        </div>
                    </Row>
                    <Row className='mb-3'>
                                
                    </Row>

                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-3 "
                            style={{ fontSize: ".9rem" }}
                        >
                            Select Template:
                        </label>
                        <div className="col-md-9">
                            {/* <Select
                                value={colorType}
                                onChange={(selectedValue) =>
                                    setColorType(selectedValue)
                                }
                                options={colorTypeData}
                                getOptionLabel={(option) => option?.name || ""}
                                getOptionValue={(option) =>
                                    option?.id?.toString() || ""
                                }
                                placeholder="Select color type..."
                            /> */}

                        </div>
                    </Row>
                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-3 "
                            style={{ fontSize: ".9rem" }}
                        >
                            Choose Operator:
                        </label>
                        <div className="col-md-9">
                            {/* <Select
                                value={colorType}
                                onChange={(selectedValue) =>
                                    setColorType(selectedValue)
                                }
                                options={colorTypeData}
                                getOptionLabel={(option) => option?.name || ""}
                                getOptionValue={(option) =>
                                    option?.id?.toString() || ""
                                }
                                placeholder="Select color type..."
                            /> */}

                        </div>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{ width: "50%" }}>
                        {/* <div class="mb-4" >
                        <label for="formFile" class="form-label">Upload OMR Image</label>
                        <input class="form-control" type="file" id="formFile" onChange={handleImageUpload} accept="image/*" />
                    </div> */}

                    </div>

                    <div className="w-20 flex-shrink-0" style={{
                        content: "", width: "12%"
                    }}></div> {/* Spacer div */}
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button
                        variant="success"
                        onClick={createTemplateHandler}
                    >

                        Assign Job
                    </Button>
                </Modal.Footer>
            </Modal >

        </>

    )
}

export default JobModal;