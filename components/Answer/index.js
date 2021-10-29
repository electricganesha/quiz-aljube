import React, { useState } from 'react';
import styles from './Answer.module.scss';
import cc from "classcat";

const Answer = ({ children, onClick, correctAnswer, incorrectAnswer }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
       <div onClick={() => onClick()} className={styles.wrapper} onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
           <div className={cc([
               styles.triangleLeft,
               {
                    [styles["triangleLeft__hovered"]]: isHovering,
                    [styles["triangleLeft__correct"]]: correctAnswer,
                    [styles["triangleLeft__incorrect"]]: incorrectAnswer,
               }
           ])}/>
           <div className={cc([
               styles.hexagon,
               {
                    [styles["hexagon__hovered"]]: isHovering,
                    [styles["hexagon__correct"]]: correctAnswer,
                    [styles["hexagon__incorrect"]]: incorrectAnswer,
               }
           ])}>
           <span className={styles.diamond}>⬥</span>
           <span className={styles.answer}>{ children }</span>
           </div>
           <div  className={cc([
               styles.triangleRight,
               {
                    [styles["triangleRight__hovered"]]: isHovering,
                    [styles["triangleRight__correct"]]: correctAnswer,
                    [styles["triangleRight__incorrect"]]: incorrectAnswer,
               }
           ])}/>
        </div>
    );
}

export default Answer;
