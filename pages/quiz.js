import styles from "../styles/Quiz.module.scss";
import { useCallback, useState, useEffect } from "react";
import cc from "classcat";
import  React from 'react';
import router from "next/router";
import Logo from '../components/Logo';
import TriviaOverlay from '../components/TriviaOverlay'

const QUESTION_TIMEOUT = 2000;

export default function Home({ questionArray, user, host }) {
  if(!questionArray) {
    return null;
  }

  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [incorrectAnswer, setIncorrectAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [score, setScore] = useState(0);
  const [isTriviaShowing, setIsTriviaShowing] = useState(false);

  useEffect(() => {
    setCurrentQuestion(0);
    document.cookie = `user_id=${user.user_id};`;
    window.sessionStorage.setItem("user_id", user.user_id);
    window.sessionStorage.setItem("doc_id", user.doc_id);
  }, []);

  const onButtonPress = useCallback(
    (answer) => {   
      setHasClicked(true);
      clearAnswers();
      checkAnswer(questionArray[currentQuestion].id, answer);
      
      return;
    },
    [currentQuestion]
  );

  useEffect(() => {
    if(correctAnswer === null && incorrectAnswer === null) {
      return;
    }

    const timeout = setTimeout(async function(){
      if(correctAnswer !== null) {
        updateUser(score + 1);
        await addPointToScore();
      } else {
        updateUser(score);
      }

      if(questionArray[currentQuestion].hasTrivia) {
        setIsTriviaShowing(true);
        return;
      }
      
      goToNextQuestion();
    }, QUESTION_TIMEOUT)

    return () => clearTimeout(timeout);
  }, [correctAnswer, incorrectAnswer]);

  const goToNextQuestion = useCallback(async() => {
    clearAnswers();
    setHasClicked(false);
    if(currentQuestion < questionArray.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    } else {
      updateUser(score + 1, true);
      router.push('/gameover');
    }
  }, [currentQuestion, questionArray]);

  const addPointToScore = useCallback(async() => {
    const newScore = score + 1;
    setScore(newScore);
  }, [score]);

  const clearAnswers = useCallback(() => {
    setCorrectAnswer(null);
    setIncorrectAnswer(null);
  }, []);

  const checkAnswer = useCallback(async (id, answer) => {
    const res = await fetch(`${host}/api/answer/${id}`);
    const remoteAnswer = await res.json();

    if (answer === remoteAnswer) {
      setCorrectAnswer(answer);
      return;
    }

    setIncorrectAnswer(answer);
  }, []);

  const onCloseTriviaOverlay = useCallback(async () => {
    setIsTriviaShowing(false);
    goToNextQuestion();
  });

  const updateUser = useCallback(async(aScore, sessionClosed) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/update`, {
      method: "POST",
      body: JSON.stringify({
          doc_id: window.sessionStorage.getItem('doc_id'),
          currentQuestion: currentQuestion + 1,
          score: aScore,
          ...sessionClosed && { session_closed: sessionClosed }
      }),
    });
  });

  if(isTriviaShowing) {
    return ( 
      <TriviaOverlay id={questionArray[currentQuestion].id} host={host} onCloseTriviaOverlay={onCloseTriviaOverlay}/>
    )
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.questionHeader}>
        <div className={styles.info}>
          <p>PERGUNTA {currentQuestion + 1}</p>
        </div>
        <div className={styles.score}>
          <p>{score}</p>
        </div>
        </div>
        <Logo />
        {questionArray[currentQuestion] && questionArray[currentQuestion].answers.length > 0 && 
        <React.Fragment>
          <h3 className={styles.question}>{questionArray[currentQuestion].question}</h3>
          <div
          className={styles.questionContainer}
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
        { questionArray[currentQuestion].answers.length > 2 &&
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
        }
          </div>
        </React.Fragment>
      }
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const userResponse = await fetch(`${process.env.API_HOST}/api/user/create`);
  const userContent = await userResponse.json();

  const questionsResponse = await fetch(`${process.env.API_HOST}/api/questions`);
  const questionArray = await questionsResponse.json();
  return {
    props: { questionArray, host: process.env.API_HOST, user: userContent.user },
  };
};
