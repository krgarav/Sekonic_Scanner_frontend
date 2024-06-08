import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Row } from "reactstrap";
import { useLocation } from "react-router-dom";
import classes from "./DesignTemplate.module.css";
import image1 from "../assets/cropped.jpg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Draggable from 'react-draggable';
import { Rnd } from 'react-rnd';
const DesignTemplate = () => {
    const [selected, setSelected] = useState({});
    const [selection, setSelection] = useState(null);
    const [dragStart, setDragStart] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [selectedClass, setSelectedClass] = useState("circle")
    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [selectedCoordinates, setSelectedCoordinates] = useState([]);

    const [name, setName] = useState("");
    const [frameType, setFrameType] = useState({});
    const [frameUnit, setFrameUnit] = useState({});
    const [outputDataSetting, setOutputDataSetting] = useState({});
    const [developementDirection, setDevelopementDirection] = useState({});
    const [outputOrderDirection, setOutputOrderDirection] = useState({});
    const [lineInterval, setLineinterval] = useState(0);
    const [columnInterval, setColumnInterval] = useState(0);
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [savedData, setSavedData] = useState([]);
    const { numberOfFrontSideColumn, numberOfLines, imgsrc, selectedBubble } = useLocation().state;
    const numRows = numberOfLines;
    const numCols = numberOfFrontSideColumn;

    const toggleSelection = (row, col) => {
        const key = `${row},${col}`;
        console.log("Toggling:", key);
        setSelected((prev) => {
            const newState = { ...prev, [key]: !prev[key] };
            console.log(newState);
            return newState;
        });
    };

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
                setSelectedClass("rectangle")
                break;

            default:
                setSelectedClass("circle")
                break;
        }
        // console.log(selectedBubble)
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
        console.log(selection?.endRow + 1, " ", selection?.startRow + 1, " ", selection?.endCol, " ", selection?.startCol);
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
        setSelectedCoordinates((prev) => [...prev, selection]);
        setSelection(null);
        setModalShow(false);
        setSavedData((prev) => {
            const newData = {
                "Region name": name,
                "Coordinate": {
                    "Start Row": selection?.startRow + 1,
                    "Start Col": selection?.startCol,
                    "End Row": selection?.endRow + 1,
                    "End Col": selection?.endCol
                }
            };
            // Making a deep copy of the previous state
            const prevCopy = JSON.parse(JSON.stringify(prev));
            prevCopy.push(newData);
            return prevCopy;
        });

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
                        // lockAspectRatio  
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
                        <div style={{ border: "2px solid black", paddingTop: "1.2rem", padding: "1rem", paddingLeft: ".5rem" }}>
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
                                            <div key={colIndex} className={`${selectedClass} ${selected[`${rowIndex},${colIndex}`] ? 'selected' : ''}`}></div>
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
                                            left: `${(data.startCol * (imageRef.current.getBoundingClientRect().width / numCols)) - 6}px`,
                                            top: `${(data.startRow * (imageRef.current.getBoundingClientRect().height / numRows))}px`,
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
                                            left: `${(selection.startCol * (imageRef.current.getBoundingClientRect().width / numCols)) - 6}px`,
                                            top: `${(selection.startRow * (imageRef.current.getBoundingClientRect().height / numRows))}px`,
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
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Name
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter Area Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {!name && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}

                        </div>
                    </Row>
                    <Row className="mb-3">
                        <label htmlFor="example-select-input" className="col-md-2 col-form-label">
                            Skew Mark
                        </label>
                        <div className="col-md-4">
                            <select
                                className="form-control"
                            // value={option}
                            // onChange={handleOptionChange}
                            >
                                <option value="">Select an option</option>
                                <option value="rear">Rear Skew Mark</option>
                                <option value="front">Front Skew Mark</option>
                            </select>
                        </div>

                        <label htmlFor="example-select-input" className="col-md-2 col-form-label">
                            Gap between Skew Marks
                        </label>
                        <div className="col-md-4">
                            <input className='form-control' placeholder="Enter the gap" />
                        </div>
                    </Row>


                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={handleCancel} className="waves-effect waves-light">Cancel</Button>{" "}
                    <Button type="button" color="success" onClick={handleSave} className="waves-effect waves-light">Save</Button>{" "}

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DesignTemplate;
