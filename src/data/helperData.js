import { FaLeaf, FaRegCircle } from "react-icons/fa";
import { MdOutlineRectangle } from "react-icons/md";
import { LuRectangleHorizontal } from "react-icons/lu";
import { TbOvalVertical } from "react-icons/tb";
export const rejectData = [
    { id: 1, name: "0", showName: "False" },
    { id: 2, name: "1", showName: "True" },
]
export const sizeData = [
    { id: 1, name: "A4" },
    { id: 2, name: "IBM Card" },
    { id: 3, name: "WIDE Card" },
    { id: 4, name: "B5" },
    { id: 5, name: "POST Card" },
    { id: 6, name: "Setting User" },
    { id: 7, name: "8.5" },
];
export const bubbleData = [
    { id: 1, name: "circle", icon: <FaRegCircle /> },
    { id: 2, name: "rectangle", icon: <MdOutlineRectangle /> },
    { id: 3, name: "rounded rectangle", icon: <LuRectangleHorizontal /> },
    { id: 4, name: "oval", icon: <TbOvalVertical /> },
];
export const timingMethodData = [
    { id: 1, name: "Mark to mark" },
    { id: 2, name: "Direct under" },
    { id: 3, name: "Timing control(Standard : 3 times)" },
    { id: 4, name: "Timing control(Reduction : 2 times)" },
    { id: 5, name: "Timing control(Extension : 4 times)" },
];

export const typeOfColumnDisplayData = [
    { id: 1, name: "Type1" },
    { id: 2, name: "Type2" },
    { id: 3, name: "Type3" },
    { id: 4, name: "Type4" },
];

export const sensivityDensivityDifferenceData = [
    { id: 1, name: "Effictive the sensitivity of software setup" },
    { id: 2, name: "Effictive the sensitivity of OMR setup" },
];
export const errorOfTheNumberOfTimingMarksData = [
    { id: 1, name: "Not check error" },
    { id: 2, name: "Check error, and stop the OMR" },
    { id: 3, name: "Check error, and not stop the OMR" },
];

export const windowNgData = [
    { id: 0x00000001, name: "SKDV_ACTION_SELECT(0x00000001)", showName: "Paper ejection to select stacker" },
    { id: 0x00000002, name: "SKDV_ACTION_STOP(0x00000002)", showName: "Stop reading" },
    { id: 0x00000004, name: "SKDV_ACTION_NOPRINT (0x00000004)", showName: "Do not print" },
];

export const faceData = [
    { id: 0, name: "Front Side" },
    { id: 1, name: "Back Side" },
];