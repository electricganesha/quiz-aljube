import  React from 'react';
import Logo from '../Logo';
import HexagonalDiv from '../HexagonalDiv';
import styles from './QuizHeader.module.scss'

const QuizHeader = ({ score, currentQuestion, timer }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topRow}>
        <span className={styles.timer}>{timer}</span>
        <HexagonalDiv theme="glow">
            <span>PONTUA&Ccedil;&Atilde;O: {score}</span>
        </HexagonalDiv>
        </div>
        <Logo />
        <div>
        <HexagonalDiv theme="glow">
            <span>PERGUNTA {currentQuestion}</span>
        </HexagonalDiv>
        </div>
    </div>
  );
}

export default QuizHeader;
