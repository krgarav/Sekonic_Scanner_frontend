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

export const directionData = [
    { id: "Top To Bottom", name: "Top To Bottom" },
    { id: "Bottom To Top", name: "Bottom To Top" },
];
export const barcodeTypeData = [
    { id: "0x1U", name: "CODE-39" },
    { id: "0x2U", name: "Interleaved 2 of 5 (ITF)" },
    { id: "0x4U", name: "NW-7" },
    { id: "0x8U", name: "JAN,EAN,UPC" },
    { id: "0x10U", name: "Code-128" },
    { id: "0x20U", name: "Industrial 2 of 5" },
    { id: "0x40U", name: "COOP 2 of 5" },
    { id: "0x80U", name: "CODE-93" },
    { id: "0x100U", name: "JAN,EAN 8" },
    { id: "0x200U", name: "JAN,EAN 13" },
    { id: "0x400U", name: " UPC-A" },
    { id: "0x800U", name: "UPC-E" },
    { id: "0x1000000U", name: "QR Code" },
];

export const colorTypeData = [
    { id: "0", name: "Color (3 colors)" },
    { id: "1", name: "Gray scale (single color)" },
    { id: "2", name: "Red (single color)" },
    { id: "3", name: "Green (single color)" },
    { id: "4", name: "Blue (single color)" },

];
export const encodingOptionData = [
    { id: "0", name: "Bit map format" },
    { id: "1", name: "GIF format" },
    { id: "2", name: "Jpeg format" },
    { id: "3", name: "PNG format" },
    { id: "4", name: "Tiff format" },
];
export const rotationOptionData = [
    { id: "0", name: "No rotation" },
    { id: "1", name: "Rotated 90 degrees" },
    { id: "2", name: "Rotated 180 degrees" },
    { id: "3", name: "Rotated 270 degrees" },
];

export const resolutionOptionData = [
    { id: "0", name: "600dpi" },
    { id: "1", name: "300dpi" },
    { id: "2", name: "200dpi" },
    { id: "3", name: "150dpi" },
    { id: "4", name: "100dpi" },
];

export const scanningSideData = [
    { id: "0", name: "Non-reading image" },
    { id: "1", name: "Double side" },
    { id: "2", name: "Front side only" },
    { id: "3", name: "Back side only" },
];
export const imageStatusData = [
    { id: "0", name: "Not Enabled" },
    { id: "1", name: "Enabled" },

];