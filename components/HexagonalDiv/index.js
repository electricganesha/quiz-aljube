import React, { useState } from 'react';
import styles from './HexagonalDiv.module.scss'

const HexagonalDiv = ({ children, onClick, hasConnectors, theme }) => {
  const [isHovering, setIsHovering] = useState(false);

  const basicHexagonalDiv = <div className={`${styles.wrapper} ${styles[`wrapper__theme--${theme}`]} ${onClick ? styles.wrapper__clickable : ''}`} onClick={onClick} onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
    <div className={`${styles.triangleLeft} ${onClick && isHovering ? styles.triangleLeft__hovered : ''}`} />
    <div className={`${styles.hexagon} ${styles[`hexagon__theme--${theme}`]} ${onClick && isHovering ? styles.hexagon__hovered : ''}`}>
      {children}
    </div>
    <div className={`${styles.triangleRight} ${onClick && isHovering ? styles.triangleRight__hovered : ''}`} />
  </div>

  const connectedHexagonalDiv = <div className={`${styles.connected}`}>
    <div className={`${styles.connector} ${styles.connector__left} ${onClick && isHovering ? styles.connector__hovered : ''}`} />
    {basicHexagonalDiv}
    <div className={`${styles.connector} ${styles.connector__right} ${onClick && isHovering ? styles.connector__hovered : ''}`} />
  </div>

  return (
    <React.Fragment>
      {hasConnectors ? connectedHexagonalDiv : basicHexagonalDiv}
    </React.Fragment>
  );
}

export default HexagonalDiv;
