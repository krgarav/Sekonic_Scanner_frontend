import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal, Button, Col } from "react-bootstrap";
import { Row } from "reactstrap";
import { useLocation } from "react-router-dom";
import classes from "./DesignTemplate.module.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Draggable from 'react-draggable';
import { Rnd } from 'react-rnd';
import DataContext from "store/DataContext";

const DesignTemplate = () => {
    const [selected, setSelected] = useState({});
    const [selection, setSelection] = useState(null);
    const [dragStart, setDragStart] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [selectedClass, setSelectedClass] = useState("circle")
    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [selectedCoordinates, setSelectedCoordinates] = useState([]);

    const [name, setName] = useState();
    const [frameType, setFrameType] = useState({});
    const [frameUnit, setFrameUnit] = useState({});
    const [outputDataSetting, setOutputDataSetting] = useState({});
    const [developementDirection, setDevelopementDirection] = useState({});
    const [outputOrderDirection, setOutputOrderDirection] = useState({});
    const [lineInterval, setLineinterval] = useState(0);
    const [columnInterval, setColumnInterval] = useState(0);
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [skewoption, setSkewOption] = useState("none");
    const [windowNgOption, setWindowNgOption] = useState("")
    const [readingDirectionOption, setReadingDirectionOption] = useState("")
    const [minimumMark, setMinimumMark] = useState();
    const [maximumMark, setMaximumMark] = useState();
    const [noInRow, setNoInRow] = useState();
    const [noOfStepInRow, setNoOfStepInRow] = useState();
    const [noInCol, setNoInCol] = useState();
    const [noOfStepInCol, setNoOfStepInCol] = useState();
    const [option, setOption] = useState("")
    const [type, setType] = useState("")
    const [selectedFieldType, setSelectedFieldType] = useState('formField');
    const [fieldType, setFieldType] = useState();
    const [numberOfField, setNumberOfField] = useState();
    const dataCtx = useContext(DataContext);
    const {
        numberOfFrontSideColumn,
        numberOfLines,
        imgsrc,
        selectedBubble,
        templateIndex,
        sensitivity,
        difference,
        barCount,
        reject,
        face,
        arr
    } = useLocation().state;
    const numRows = numberOfLines;
    const numCols = numberOfFrontSideColumn;

    const toggleSelection = (row, col) => {
        const key = `${row},${col}`;
        setSelected((prev) => {
            const newState = { ...prev, [key]: !prev[key] };

            return newState;
        });
    }
   const coordinateData =[];
    const formFieldData = arr?.formFieldWindowParameters;
    const questionField = arr?.questionsWindowParameters;
    const skewField = arr?.skewMarksWindowParameters;
    const idFeild = arr?.idWindowParameters;
 
    useEffect(() => {
        switch (selectedBubble) {
            case "rounded rectangle":
                setSelectedClass("rounded-rectangle")
                break;
            case "rectangle":
                setSelectedClass("rectangle")
                break;
            case "circle":
                setSelectedClass("circle")
                break;

            case "oval":
                setSelectedClass("oval")
                break;

            default:
                setSelectedClass("circle")
                break;
        }
    }, [])
    {/* useEffect for toggling image overlapping over coordinate selection area*/ }
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (modalShow) return; // Ignore keyboard events when modal is shown
            if (event.altKey && event.shiftKey) {
                // Toggle z-index when Alt + Enter is pressed
                const imgDiv = document.getElementById("imagecontainer");
                imgDiv.style.zIndex = imgDiv.style.zIndex === "999" ? "-1" : "999";
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [modalShow]);
    // const handleMouseDown = (e) => {
    //     const boundingRect = imageRef.current.getBoundingClientRect();
    //     const col = Math.floor((e.clientX - boundingRect.left) / (boundingRect.width / numCols));
    //     const row = Math.floor((e.clientY - boundingRect.top) / (boundingRect.height / numRows));
    //     setDragStart({ row, col });
    // };
    const handleMouseDown = (e) => {
        const boundingRect = imageRef.current.getBoundingClientRect();
        const col = Math.floor(
            (e.clientX - boundingRect.left) / (boundingRect.width / numCols)
        );
        const row = Math.floor(
            (e.clientY - boundingRect.top) / (boundingRect.height / numRows)
        );

        // Check if the clicked cell is a timing mark or already selected (a circle)
        if (col === 0 || selected[`${row},${col}`]) return;

        setDragStart({ row, col });
    };

    // const handleMouseMove = (e) => {
    //     if (!e.buttons || !dragStart) return;
    //     const boundingRect = imageRef.current.getBoundingClientRect();
    //     const col = Math.floor((e.clientX - boundingRect.left) / (boundingRect.width / numCols));
    //     const row = Math.floor((e.clientY - boundingRect.top) / (boundingRect.height / numRows));
    //     setSelection({
    //         startRow: Math.min(dragStart.row, row),
    //         startCol: Math.min(dragStart.col, col),
    //         endRow: Math.max(dragStart.row, row),
    //         endCol: Math.max(dragStart.col, col),
    //     });

    //     console.log(selection);
    // };

    const handleMouseMove = (e) => {
        if (!e.buttons || !dragStart) return;
        const boundingRect = imageRef.current.getBoundingClientRect();
        const col = Math.floor(
            (e.clientX - boundingRect.left) / (boundingRect.width / numCols)
        );
        const row = Math.floor(
            (e.clientY - boundingRect.top) / (boundingRect.height / numRows)
        );
        setSelection((prevSelection) => {
            const startRow = Math.min(dragStart.row, row);
            const startCol = Math.min(dragStart.col, col);
            const endRow = Math.max(dragStart.row, row);
            const endCol = Math.max(dragStart.col, col);

            const newSelection = {
                startRow: Math.max(0, startRow), // Ensure startRow is not negative
                startCol: Math.max(1, startCol), // Ensure startCol is not negative
                endRow: Math.min(numRows - 1, endRow), // Ensure endRow is within grid bounds
                endCol: Math.min(numCols, endCol), // Ensure endCol is within grid bounds
            };

            return newSelection;
        });
        console.log(selection)
        console.log(selection?.endRow + 1, " ", selection?.startRow + 1, " ", selection?.endCol, " ", selection?.startCol,);
    };

    const handleMouseUp = () => {
        if (dragStart) {
            setDragStart(null);
            setModalShow(true);
        }
    };

    const handleCancel = () => {
        setDragStart(null);
        setSelection(null);
        setModalShow(false);
    };
    const handleSave = () => {

        // if (!name || !windowNgOption || !noInRow || !noOfStepInRow || !noInCol || !noOfStepInCol || !minimumMark) {
        //     return
        // }
        let newData = {}

        if (selectedFieldType === "idField") {
            newData = {
                "sensitivity": sensitivity,
                "difference": difference,
                "barcodeCount": barCount,
                "isReject": reject,
                "windowName": name,
                "Coordinate": {
                    "Start Row": selection?.startRow + 1,
                    "Start Col": selection?.startCol,
                    "End Row": selection?.endRow + 1,
                    "End Col": selection?.endCol
                },
                "iDirection": readingDirectionOption,
                "rowStart": selection?.startRow + 1,
                "timingMarks": numRows,
                "windowNG": windowNgOption,
                "totalNoInRow": noInRow,
                "totalStepInRow": noOfStepInRow,
                "columnStart": selection?.startCol,
                "totalNoInColumn": noInCol,
                "totalStepInColumn": noOfStepInCol,
                "minimumMark": minimumMark,
                "maximumMark": maximumMark,
                "skewMark": skewoption,
                "type": type,
                "option": option,
                "face": face
            };

        } else if (selectedFieldType === "skewMarkField") {
            newData = {
                "sensitivity": sensitivity,
                "difference": difference,
                "barcodeCount": barCount,
                "isReject": reject,
                "windowName": name,
                "Coordinate": {
                    "Start Row": selection?.startRow + 1,
                    "Start Col": selection?.startCol,
                    "End Row": selection?.endRow + 1,
                    "End Col": selection?.endCol
                },
                "readingDirection": readingDirectionOption,
                "rowStart": selection?.startRow + 1,
                "timingMarks": numRows,
                "windowNG": windowNgOption,
                "totalNoInRow": noInRow,
                "totalStepInRow": noOfStepInRow,
                "columnStart": selection?.startCol,
                "totalNoInColumn": noInCol,
                "totalStepInColumn": noOfStepInCol,
                "minimumMark": minimumMark,
                "maximumMark": maximumMark,
                "skewMark": skewoption,
                "type": type,
                "option": option,
                "face": face
            };


        } else {
            newData = {
                "sensitivity": sensitivity,
                "difference": difference,
                "barcodeCount": barCount,
                "isReject": reject,
                "windowName": name,
                "Coordinate": {
                    "Start Row": selection?.startRow + 1,
                    "Start Col": selection?.startCol,
                    "End Row": selection?.endRow + 1,
                    "End Col": selection?.endCol
                },
                "readingDirection": readingDirectionOption,
                "rowStart": selection?.startRow + 1,
                "timingMarks": numRows,
                "windowNG": windowNgOption,
                "totalNoInRow": noInRow,
                "totalStepInRow": noOfStepInRow,
                "columnStart": selection?.startCol,
                "totalNoInColumn": noInCol,
                "totalStepInColumn": noOfStepInCol,
                "minimumMark": minimumMark,
                "maximumMark": maximumMark,
                "skewMark": skewoption,
                "type": type,
                "option": option,
                "face": face,
                "totalNumberOfFields": numberOfField,
                "numericOrAlphabets": fieldType
            };

        }
        setSelectedCoordinates((prev) => [...prev, selection]);
        setSelection(null);
        setModalShow(false);
        dataCtx.modifyAllTemplate(templateIndex, newData, selectedFieldType);
    };
    const handleSkewMarkOptionChange = (event) => {
        setSkewOption(event.target.value);
    };
    const handleWindowNgOptionChange = (event) => {
        setWindowNgOption(event.target.value)
    }
    const handleRadioChange = (e) => {
        setSelectedFieldType(e.target.value);
    };
    return (
        <>
            <div className="container">
                <div id="imagecontainer" className={classes.img} >
                    <Rnd
                        default={{
                            x: 0,
                            y: 0,
                            width: 400,
                            height: 400,
                        }}
                        minWidth={100}
                        minHeight={100}
                        bounds={null}
                        style={{
                            border: '1px solid #ddd',
                        }}

                    >
                        <img
                            src={imgsrc}
                            className={`${classes["object-contain"]} ${classes["draggable-resizable-image"]} rounded`}
                            alt="omr sheet"

                        />
                    </Rnd>
                </div>
                <div className="d-flex">
                    <div style={{ marginRight: "1rem" }}>
                        <div className="top"></div>
                        {Array.from({ length: numRows }).map((_, rowIndex) => (
                            <div key={rowIndex} className="row">
                                <div className="left-nums">{rowIndex + 1}</div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="top-row">
                            <div className="corner"></div>
                            {Array.from({ length: numCols }).map((_, index) => (
                                <div key={index} className="top-num">{index + 1}</div>
                            ))}
                        </div>
                        <div style={{ border: "2px solid black", paddingTop: "2.0rem", padding: "1rem", paddingLeft: ".5rem" }}>
                            <div className="grid"
                                ref={imageRef}
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                                onMouseMove={handleMouseMove}
                            >
                                {Array.from({ length: numRows }).map((_, rowIndex) => (
                                    <div key={rowIndex} className="row">
                                        <div className="left-num" sty><div className="timing-mark "></div></div>
                                        {Array.from({ length: numCols }).map((_, colIndex) => (
                                            <div key={colIndex} className={`${selectedBubble} ${selected[`${rowIndex},${colIndex}`] ? 'selected' : ''}`}></div>
                                        ))}

                                    </div>
                                ))}

                                {selectedCoordinates.map((data, index) => (
                                    <div
                                        key={index}
                                        className="border-blue-500"
                                        style={{
                                            border: "2px solid #007bff",
                                            position: "absolute",
                                            left: `${(data.startCol * (imageRef.current.getBoundingClientRect().width / numCols)) - 4}px`,
                                            top: `${(data.startRow * (imageRef.current.getBoundingClientRect().height / numRows)) - 3}px`,
                                            width: `${((data.endCol - data.startCol + 1) * (imageRef.current.getBoundingClientRect().width / numCols))}px`,
                                            height: `${((data.endRow - data.startRow + 1) * (imageRef.current.getBoundingClientRect().height / numRows))}px`
                                        }}
                                    ></div>
                                ))}
                                {selection && (
                                    <div
                                        className="border-green-500"
                                        style={{
                                            border: "2px solid green",
                                            position: "absolute",
                                            left: `${(selection.startCol * (imageRef.current.getBoundingClientRect().width / numCols)) - 4}px`,
                                            top: `${(selection.startRow * (imageRef.current.getBoundingClientRect().height / numRows)) - 3}px`,
                                            width: `${(selection.endCol - selection.startCol + 1) * (imageRef.current.getBoundingClientRect().width / numCols)}px`,
                                            height: `${(selection.endRow - selection.startRow + 1) * (imageRef.current.getBoundingClientRect().height / numRows)}px`
                                        }}
                                    ></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter" style={{ width: "100vw" }} >
                        <h2 className="text-center">DEFINE REGION</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row className="mb-2">
                        <label htmlFor="example-text-input" className="col-md-2 col-form-label">
                            Field Type
                        </label>
                        <Col md={2} className="d-flex align-items-center">
                            <label htmlFor="formField" className="mr-2 mb-0 field-label" >Form : </label>
                            <input
                                id="formField"
                                type="radio"
                                name="fieldType"
                                value="formField"
                                checked={selectedFieldType === 'formField'}
                                onChange={handleRadioChange}
                                className=" field-label"
                            />
                        </Col>
                        <Col md={2} className="d-flex align-items-center">
                            <label htmlFor="fieldType" className="mr-2 mb-0 field-label" >Question : </label>
                            <input
                                id="fieldType"
                                type="radio"
                                name="fieldType"
                                value="questionField"
                                checked={selectedFieldType === 'questionField'}
                                onChange={handleRadioChange}
                                className=" field-label"
                            />
                        </Col>
                        <Col md={3} className="d-flex align-items-center">
                            <label htmlFor="skewMarkField" className="mr-2 mb-0 field-label">Skew Mark:</label>
                            <input
                                id="skewMarkField"
                                type="radio"
                                name="fieldType"
                                value="skewMarkField"
                                checked={selectedFieldType === 'skewMarkField'}
                                onChange={handleRadioChange}
                                className=" field-label"
                            />
                        </Col>
                        <Col md={2} className="d-flex align-items-center  ">
                            <label htmlFor="idField" className="mr-2 mb-0 field-label">ID Mark :</label>
                            <input
                                id="idField"
                                type="radio"
                                name="fieldType"
                                value="idField"
                                checked={selectedFieldType === 'idField'}
                                onChange={handleRadioChange}
                                className=" field-label"
                            />
                        </Col>
                    </Row>
                    {selectedFieldType !== 'idField' && <Row >
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 "
                        >
                            Window Name
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter Window Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            {!name && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}

                        </div>
                    </Row>}
                    <Row className="mb-2">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Window NG
                        </label>
                        <div className="col-md-10">
                            <select
                                className="form-control"
                                value={windowNgOption}
                                onChange={handleWindowNgOptionChange}
                                defaultValue={""}
                            >
                                <option value="">Select an option</option>
                                <option value="0x00000001">Paper ejection to select stacker</option>
                                <option value="0x00000002">Stop reading</option>
                                <option value="0x00000004">Do not print</option>

                            </select>

                        </div>
                    </Row>
                    <Row >
                        <label htmlFor="example-select-input" className="col-md-2" >
                            Minimum Mark
                        </label>
                        <div className="col-md-4">
                            <input type="number" className='form-control' placeholder="Enter the minimum mark" value={minimumMark}
                                onChange={(e) => setMinimumMark(e.target.value)}
                                required />
                        </div>
                        <label htmlFor="example-select-input" className="col-md-2 ">
                            Maximum Mark
                        </label>
                        <div className="col-md-4">
                            <input type="number" className='form-control' placeholder="Enter the maximum mark" value={maximumMark}
                                onChange={(e) => setMaximumMark(e.target.value)}
                                required />
                        </div>
                    </Row>
                    {selectedFieldType === 'skewMarkField' && <Row className="mb-2">
                        <label htmlFor="example-select-input" className="col-md-2 col-form-label">
                            Skew Mark
                        </label>
                        <div className="col-md-10">
                            <select
                                className="form-control"
                                value={skewoption}
                                onChange={handleSkewMarkOptionChange}
                                defaultValue={"none"}
                            >
                                <option value="">Select an option</option>
                                <option value="rear">Top Skew Mark</option>
                                <option value="front">Bottom Skew Mark</option>
                            </select>
                        </div>
                    </Row>}

                    <Row className="mb-2">
                        <label htmlFor="example-select-input" className="col-2 col-form-label">
                            Start Row
                        </label>
                        <div className="col-2 ">
                            <input value={selection?.startRow + 1} readOnly className="form-control" />
                        </div>
                        <label htmlFor="example-select-input" className="col-2 col-form-label">
                            End Row
                        </label>
                        <div className="col-2">
                            <input value={selection?.endRow + 1} readOnly className="form-control" />
                        </div>
                        <label htmlFor="example-select-input" className="col-2 col-form-label">
                            Total Row
                        </label>
                        <div className="col-2">
                            <input value={numRows} readOnly className="form-control" />
                        </div>
                    </Row>
                    <Row className="">
                        <label htmlFor="example-select-input" className="col-2 ">
                            Total No In Row
                        </label>
                        <div className="col-4">
                            <input type="number" className="form-control" value={noInRow}
                                onChange={(e) => setNoInRow(e.target.value)}
                                required />
                        </div>
                        <label htmlFor="example-select-input" className="col-2 ">
                            Total Step In A Row
                        </label>
                        <div className="col-4">
                            <input type="number" className="form-control" value={noOfStepInRow}
                                onChange={(e) => setNoOfStepInRow(e.target.value)}
                                required />
                        </div>
                    </Row>
                    <Row className="mb-2">
                        <label htmlFor="example-select-input" className="col-2  col-form-label">
                            Start Col
                        </label>
                        <div className="col-2">
                            <input value={selection?.startCol} readOnly className="form-control" />
                        </div>

                        <label htmlFor="example-select-input" className="col-2 col-form-label">
                            End Col
                        </label>
                        <div className="col-2">
                            <input value={selection?.endCol} readOnly className="form-control" />
                        </div>
                        <label htmlFor="example-select-input" className="col-2 col-form-label">
                            Total Col
                        </label>
                        <div className="col-2">
                            <input value={numCols} readOnly className="form-control" />
                        </div>
                    </Row>
                    <Row className="mb-2">
                        <label htmlFor="example-select-input" className="col-2 ">
                            Total No In Col
                        </label>
                        <div className="col-4">
                            <input type="number" className="form-control" value={noInCol}
                                onChange={(e) => setNoInCol(e.target.value)}
                                required />
                        </div>
                        <label htmlFor="example-select-input" className="col-2 ">
                            Total Step In A Col
                        </label>
                        <div className="col-4">
                            <input type="number" className="form-control"
                                value={noOfStepInCol}
                                onChange={(e) => setNoOfStepInCol(e.target.value)}
                                required />
                        </div>
                    </Row>

                    <Row className="mb-2">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 "
                        >
                            Reading Direction :
                        </label>
                        <div className="col-md-10">
                            <select
                                className="form-control"
                                value={readingDirectionOption}
                                onChange={(e) => { setReadingDirectionOption(e.target.value) }}
                                defaultValue={""}
                            >
                                <option value="">Select reading direction... </option>
                                <option value="0">From the upper left to the bottom</option>
                                <option value="1">From the upper right to the bottom </option>
                                <option value="2">From the lower left to a top
                                </option>
                                <option value="3">From the lower right to a top
                                </option>
                                <option value="4">From the upper left to right
                                </option>
                                <option value="5">From the upper right to the left
                                </option>
                                <option value="6">From the lower left to right
                                </option>
                                <option value="7">From the lower right to the left  </option>
                            </select>
                        </div>
                    </Row>
                    {/* {selectedFieldType === 'idField' && <Row>
                        <label htmlFor="example-text-input"
                            className="col-md-2 ">
                            Page Position :
                        </label>
                        <div className="col-md-10">
                            <select
                                className="form-control"
                                value={readingDirectionOption}
                                onChange={(e) => { setReadingDirectionOption(e.target.value) }}
                                defaultValue={""}
                            >
                                <option value="">Select Page position... </option>
                                <option value="Linear">Linear </option>
                                <option value="Horizontal"> Horizontal </option>
                            </select>
                        </div>
                    </Row>} */}
                    <Row className="mb-2">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2  col-form-label"
                        >
                            Type :
                        </label>
                        <div className="col-md-5">
                            <select
                                className="form-control"
                                value={type}
                                onChange={(e) => { setType(e.target.value) }}
                                defaultValue={""}
                            >
                                <option value="">Select reading direction... </option>
                                <option value="0x01">Mask (at the time set window) about a mark </option>
                                <option value="0x02">Fixed mark </option>
                                <option value="0x03">Checkdigits </option>
                                <option value="0x04">Range checking (ascending order)</option>
                                <option value="0x05">Range checking (descending order)</option>
                                <option value="0x06">Range checking (not order) </option>
                                <option value="0x07">Mask setting(common to partition)
                                </option>
                            </select>
                        </div>
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label "
                        >
                            Option :
                        </label>
                        <div className="col-3 ">
                            <input type="number" className="form-control"
                                value={option}
                                onChange={(e) => setOption(e.target.value)}
                                required />
                        </div>
                    </Row>
                    {(selectedFieldType === "questionField" || selectedFieldType === 'formField') && (<Row>
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label "
                        >

                            Total Fields :
                        </label>
                        <div className="col-3 ">
                            <input type="number" className="form-control"
                                value={numberOfField}
                                onChange={(e) => setNumberOfField(e.target.value)}
                                required />
                        </div>
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label "
                        >

                            Field Type :
                        </label>
                        <div className="col-3 ">
                            <select
                                className="form-control"
                                value={fieldType}
                                onChange={(e) => { setFieldType(e.target.value) }}
                                defaultValue={""}
                            >
                                <option value="">Select field type... </option>
                                <option value="numeric">Numeric </option>
                                <option value="alphabet">Alphabet </option>

                            </select>
                        </div>
                    </Row>)}
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={handleCancel} className="waves-effect waves-light">Cancel</Button>{" "}
                    <Button type="button" color="success" onClick={handleSave} className="waves-effect waves-light">Save</Button>{" "}
                </Modal.Footer>
            </Modal >
        </>
    );
};

export default DesignTemplate;
