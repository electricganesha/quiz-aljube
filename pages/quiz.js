import styles from "../styles/Quiz.module.scss";
import { useCallback, useState, useEffect } from "react";
import React from 'react';
import router from "next/router";
import TriviaOverlay from '../components/TriviaOverlay';
import QuizHeader from '../components/QuizHeader';
import RectangularDiv from "../components/RectangularDiv";
import AnswerBlock from "../components/AnswerBlock";
import Answer from "../components/Answer";

const QUESTION_TIMEOUT = 2000;
const COUNTDOWN_TIMER = 30;

export default function Home({ questionArray, user, host }) {
  if (!questionArray) {
    return null;
  }

  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [incorrectAnswer, setIncorrectAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [score, setScore] = useState(0);
  const [isTriviaShowing, setIsTriviaShowing] = useState(false);

  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_TIMER);

  useEffect(() => {
    setCurrentQuestion(0);
    document.cookie = `user_id=${user.user_id};`;
    window.sessionStorage.setItem("user_id", user.user_id);
    window.sessionStorage.setItem("doc_id", user.doc_id);
  }, []);

  useEffect(() => {
    if (!timeLeft) return;
    
    if(timeLeft <= 1) {
      checkAnswer(questionArray[currentQuestion].id);
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const resetTimer = useCallback(() => {
    setTimeLeft(COUNTDOWN_TIMER);
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
    if (correctAnswer === null && incorrectAnswer === null) {
      return;
    }

    const timeout = setTimeout(async function () {
      if (correctAnswer !== null && incorrectAnswer === null) {
        updateUser(score + 1);
        await addPointToScore();
      } else {
        updateUser(score);
      }

      if (questionArray[currentQuestion].hasTrivia) {
        setIsTriviaShowing(true);
        return;
      }

      goToNextQuestion();
    }, QUESTION_TIMEOUT)

    return () => clearTimeout(timeout);
  }, [correctAnswer, incorrectAnswer]);

  const goToNextQuestion = useCallback(async () => {
    clearAnswers();
    setHasClicked(false);
    if (currentQuestion < questionArray.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      resetTimer();
      return;
    } else {
      updateUser(score + 1, true);
      router.push('/gameover');
    }
  }, [currentQuestion, questionArray]);

  const addPointToScore = useCallback(async () => {
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

    if(!answer) {
      setCorrectAnswer(remoteAnswer);
      setIncorrectAnswer('timeout');
      return;
    }

    if (answer === remoteAnswer) {
      setCorrectAnswer(answer);
      setIncorrectAnswer(null);
      return;
    }

    setCorrectAnswer(remoteAnswer);
    setIncorrectAnswer(answer);
  }, []);

  const onCloseTriviaOverlay = useCallback(async () => {
    setIsTriviaShowing(false);
    goToNextQuestion();
  });

  const updateUser = useCallback(async (aScore, sessionClosed) => {
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

  if (isTriviaShowing) {
    return (
      <TriviaOverlay id={questionArray[currentQuestion].id} host={host} onCloseTriviaOverlay={onCloseTriviaOverlay} />
    )
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <QuizHeader score={score} currentQuestion={currentQuestion + 1} timer={timeLeft}/>
        {questionArray[currentQuestion] && questionArray[currentQuestion].answers.length > 0 &&
          <React.Fragment>
            <RectangularDiv hasConnectors={true} theme="original">
              {questionArray[currentQuestion].question}
            </RectangularDiv>
            <AnswerBlock
              answers={questionArray[currentQuestion].answers.length <= 2 ?
                [
                  <Answer onClick={() => onButtonPress(0)} correctAnswer={correctAnswer === 0} incorrectAnswer={incorrectAnswer === 0}>
                    {questionArray[currentQuestion].answers[0]}
                  </Answer>,
                  <Answer onClick={() => onButtonPress(1)} correctAnswer={correctAnswer === 1} incorrectAnswer={incorrectAnswer === 1}>
                    {questionArray[currentQuestion].answers[1]}
                  </Answer>
                ]
                :
                [
                  <Answer onClick={() => onButtonPress(0)} correctAnswer={correctAnswer === 0} incorrectAnswer={incorrectAnswer === 0}>
                    {questionArray[currentQuestion].answers[0]}
                  </Answer>,
                  <Answer onClick={() => onButtonPress(1)} correctAnswer={correctAnswer === 1} incorrectAnswer={incorrectAnswer === 1}>
                    {questionArray[currentQuestion].answers[1]}
                  </Answer>,
                  <Answer onClick={() => onButtonPress(2)} correctAnswer={correctAnswer === 2} incorrectAnswer={incorrectAnswer === 2}>
                    {questionArray[currentQuestion].answers[2]}
                  </Answer>,
                  <Answer onClick={() => onButtonPress(3)} correctAnswer={correctAnswer === 3} incorrectAnswer={incorrectAnswer === 3}>
                    {questionArray[currentQuestion].answers[3]}
                  </Answer>
                ]
              }
            />
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
