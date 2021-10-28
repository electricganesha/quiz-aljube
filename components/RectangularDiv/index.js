import React, { useState } from 'react';
import styles from './RectangularDiv.module.scss'

const RectangularDiv = ({ children, onClick, hasConnectors, theme }) => {
  const [isHovering, setIsHovering] = useState(false);

  const basicRectangularDiv = <div className={`${styles.wrapper} ${styles[`wrapper__theme--${theme}`]} ${onClick ? styles.wrapper__clickable : ''}`} onClick={onClick} onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}> 
    <div className={`${styles.rectangle} ${styles[`rectangle__theme--${theme}`]} ${onClick && isHovering ? styles.rectangle__hovered : ''}`}>
      {children}
    </div>
  </div>

  const connectedRectangularDiv = <div className={`${styles.connected}`}>
    <div className={`${styles.connector} ${styles.connector__left} ${onClick && isHovering ? styles.connector__hovered : ''}`} />
    {basicRectangularDiv}
    <div className={`${styles.connector} ${styles.connector__right} ${onClick && isHovering ? styles.connector__hovered : ''}`} />
  </div>

  return (
    <React.Fragment>
      {hasConnectors ? connectedRectangularDiv : basicRectangularDiv}
    </React.Fragment>
  );
}

export default RectangularDiv;
