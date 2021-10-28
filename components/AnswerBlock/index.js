import React, { useState, useEffect } from 'react';
import styles from './AnswerBlock.module.scss';
const BREAKPOINT = 768;

const AnswerBlock = ({ answers }) => {
    const [width, setWidth] = useState(0);
    const handleResizeWindow = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResizeWindow);
        setWidth(window.innerWidth);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
        
    }, []);

    const isSmallScreen = width < BREAKPOINT;
    const isBlockOfTwo = answers.length <= 2;

    if (isBlockOfTwo) {
        return <div className={styles.block}>
            <div className={`${styles.block__top} ${styles["block__top--two"]}`}>
                <div className={styles.connector} />
                {answers[0]}
                <div className={styles.connector} />
            </div>
            <div className={`${styles.block__bottom} ${styles["block__bottom--two"]}`}>
                <div className={styles.connector} />
                {answers[1]}
                <div className={styles.connector} />
            </div>
        </div>
    }

    if(isSmallScreen) {
        return <div className={styles.block}>
            <div className={styles.block__default}>
                <div className={styles.connector} />
                {answers[0]}
                <div className={styles.connector} />
            </div>
            <div className={styles.block__default}>
                <div className={styles.connector} />
                {answers[1]}
                <div className={styles.connector} />
            </div>
            <div className={styles.block__default}>
                <div className={styles.connector} />
                {answers[2]}
                <div className={styles.connector} />
            </div>
            <div className={styles.block__default}>
                <div className={styles.connector} />
                {answers[3]}
                <div className={styles.connector} />
            </div>
        </div>
    }

    return (
        <div className={styles.block}>
            <div className={`${styles.block__top}`}>
                <div className={styles.connector} />
                {answers[0]}
                {answers[1]}
                <div className={styles.connector} />
            </div>
            <div className={`${styles.block__bottom}`}>
                <div className={styles.connector} />
                {answers[2]}
                {answers[3]}
                <div className={styles.connector} />
            </div>
        </div>
    );
}

export default AnswerBlock;
