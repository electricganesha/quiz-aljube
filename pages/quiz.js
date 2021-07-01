import styles from "../styles/Home.module.scss";
import { useCallback, useState, useEffect } from "react";
import cc from "classcat";
import  React from 'react';
import router from "next/router";

const QUESTION_TIMEOUT = 2000;

export default function Home({ questionArray }) {
  if(!questionArray) {
    return null;
  }

  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [incorrectAnswer, setIncorrectAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setCurrentQuestion(0);
    window.sessionStorage.setItem("score", "0");
  }, []);

  const onButtonPress = useCallback(
    (answer) => {
      setHasClicked(true);
      clearAnswers();

      if (answer === questionArray[currentQuestion].correct) {
        setCorrectAnswer(answer);
        return;
      }

      setIncorrectAnswer(answer);
      return;
    },
    [currentQuestion]
  );

  useEffect(() => {
    if(correctAnswer === null && incorrectAnswer === null) {
      return;
    }

    const timeout = setTimeout(async function(){
      if(correctAnswer) {
        await addPointToScore();

      } 
      
      goToNextQuestion();
    }, QUESTION_TIMEOUT)

    return () => clearTimeout(timeout);
  }, [correctAnswer, incorrectAnswer]);

  const goToNextQuestion = useCallback(() => {
    clearAnswers();
    setHasClicked(false);
    if(currentQuestion < questionArray.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    } else {
      router.push('/gameover');
    }
  }, [currentQuestion, questionArray]);

  const addPointToScore = useCallback(async() => {
    const newScore = score + 1;
    setScore(newScore);
    window.sessionStorage.setItem("score", `${newScore}`);
  }, [score]);

  const clearAnswers = useCallback(() => {
    setCorrectAnswer(null);
    setIncorrectAnswer(null);
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.info}>
          <p>PERGUNTA {currentQuestion + 1}</p>
        </div>
        <div className={styles.score}>
          <p>{score}</p>
        </div>
        <img
          style={{
            maxWidth: 360,
          }}
          src="https://res.cloudinary.com/dhgkpiqzg/image/upload/v1624295134/quemquerterliberdade.png"
        ></img>
        {questionArray[currentQuestion] && questionArray[currentQuestion].answers.length > 0 && 
        <React.Fragment>
          <h3>{questionArray[currentQuestion].question}</h3>
          <div
            style={{
              display: "flex",
              width: 960,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button
                className={cc([
                  styles.button,
                  {
                    [styles[`button__correct`]]: correctAnswer === 0,
                    [styles['button__incorrect']] : incorrectAnswer === 0
                  },
                ])}
                onClick={() => onButtonPress(0)}
                disabled={hasClicked}
              >
                <b>{questionArray[currentQuestion].answers[0]}</b>
              </button>
              <button className={cc([
          styles.button,
          {
            [styles[`button__correct`]]: correctAnswer === 1,
            [styles['button__incorrect']] : incorrectAnswer === 1
          },
        ])} onClick={() => onButtonPress(1)}
        disabled={hasClicked}>
                <b>{questionArray[currentQuestion].answers[1]}</b>
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button className={cc([
          styles.button,
          {
            [styles[`button__correct`]]: correctAnswer === 2,
            [styles['button__incorrect']] : incorrectAnswer === 2
          },
        ])} onClick={() => onButtonPress(2)}
        disabled={hasClicked}>
                <b>{questionArray[currentQuestion].answers[2]}</b>
              </button>
              <button className={cc([
          styles.button,
          {
            [styles[`button__correct`]]: correctAnswer === 3,
            [styles['button__incorrect']] : incorrectAnswer === 3
          },
        ])} onClick={() => onButtonPress(3)}
        disabled={hasClicked}>
                <b>{questionArray[currentQuestion].answers[3]}</b>
              </button>
            </div>
          </div>
        </React.Fragment>
      }
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.API_HOST}/api/question`);
  const questionArray = await res.json();
  return {
    props: { questionArray },
  };
};
