import React from 'react';
import styles from './MyButton.module.css'

function MyButton({children, ...props}) {
    return (
        <button {...props} className={styles.myButton}>
            {children}</button>
    );
}

export default MyButton;