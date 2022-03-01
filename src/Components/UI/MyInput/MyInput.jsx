import React from 'react';
import classes from './MyInput.module.css';
function MyInput(props) {
    return (
        <div>
            <input className={classes.myInput} {...props} />
        </div>
    );
}

export default MyInput;