import  React from 'react';
import styles from './Button.module.scss'

const Button = ({children, onClick, theme}) => {
  return (
    <button className={`${styles.button} ${styles[`button--${theme}`]}`} onClick={onClick}>
          {children}
    </button>
  );
}

export default Button;
