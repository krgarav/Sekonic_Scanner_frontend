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
    // const [imgsrc, setImageSrc] = useState(image1)
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
    const { numberOfFrontSideColumn, numberOfLines, imgsrc } = useLocation().state;
    const numRows = numberOfLines;
    const numCols = numberOfFrontSideColumn;
    // console.log(imgsrc)
    // const imgsrc= 
    const toggleSelection = (row, col) => {
        const key = `${row},${col}`;
        console.log("Toggling:", key);
        setSelected((prev) => {
            const newState = { ...prev, [key]: !prev[key] };
            console.log(newState);
            return newState;
        });
    };

    // useEffect(() => {
    //     const navbarElement = document.getElementById("navbar-main");
    //     if (navbarElement) {
    //         navbarElement.style.display = "none";
    //     }
    // }, []);

    useEffect(() => {
        const imgDiv = document.getElementById("imagecontainer");

        const handleKeyPress = (event) => {
            event.preventDefault();
            if (event.altKey) {
                imgDiv.style.zIndex = imgDiv.style.zIndex === "999" ? "-1" : "999";
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

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
        // console.log(selection.startRow)

        // console.log("start row ---> ", selection.startRow + 1);
        // console.log("end row ---> ", selection.startRow + 1);
        console.log(selection?.endRow + 1, " ", selection?.startRow + 1, " ", selection?.endCol, " ", selection?.startCol);
    };

    const handleMouseUp = () => {
        if (dragStart) {
            setDragStart(null);
            setModalShow(true);
        }
    };

    const handleCancle = () => {
        setDragStart(null);
        setSelection(null);
        setModalShow(false);
    };
    const handleSave = () => {
        setSelectedCoordinates((prev) => [...prev, selection]);
        setSelection(null);
        setModalShow(false);
    };

    return (
        <>
            <div className="container">
                <div id="imagecontainer" className={classes.img}>
                    {/* <TransformWrapper
            defaultScale={1}
            options={{ limitToBounds: false }}
            pan={{
              disabled: false,
              velocity: false,
              lockAxisX: false,
              lockAxisY: false,
              padding: false,
            }}
          >
            <TransformComponent>
              <img
                src={image1}
                className={`object-contain  ${classes.imgContainer} zoomable-image rounded`}
                alt="omr sheet"
              />
            </TransformComponent>
          </TransformWrapper> */}
                    {/* <Draggable>
                        <img
                            src={imgsrc}
                            className={`${classes["object-contain"]} ${classes["draggable-image"]} rounded`}
                            alt="omr sheet"
                        />

                    </Draggable> */}

                    <Rnd
                        default={{
                            x: 0,
                            y: 0,
                            width: 400,
                            height: 400,
                        }}
                        minWidth={100}
                        minHeight={100}
                        bounds="parent"
                        // lockAspectRatio
                        style={{ border: '1px solid #ddd' }} // Optional: for visual boundary
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
                                        <div className="">
                                        </div>
                                        {Array.from({ length: numCols }).map((_, colIndex) => (
                                            <div key={colIndex} className={`circle ${selected[`${rowIndex},${colIndex}`] ? 'selected' : ''}`}></div>
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
                                placeholder="Enter User Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                            {!name && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}

                        </div>
                    </Row>




                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={handleCancle} className="waves-effect waves-light">Cancel</Button>{" "}
                    <Button type="button" color="success" onClick={handleSave} className="waves-effect waves-light">Save</Button>{" "}

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DesignTemplate;
