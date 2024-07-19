import React from 'react'
import classes from "./Imageswitch.module.css";
const Imageswitch = () => {
    return (
        <label className={classes.switch}>
            <input type="checkbox" />
            <span className={classes.slider}></span>
        </label>
    )
}

export default Imageswitch