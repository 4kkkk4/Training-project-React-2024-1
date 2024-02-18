import React from 'react';
import classes from './MyModal.module.css'
import classNames from "classnames";

const MyModal = ({children, visible, setVisible}) => {
    return (
        <div className={classNames(classes.myModal, {[classes.active]: visible})}
             onClick={() => setVisible(false)}
        >
            <div className={classes.myModalContent}
                 onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>

        </div>
    );
};

export default MyModal;