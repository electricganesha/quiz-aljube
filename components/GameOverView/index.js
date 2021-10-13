import  React, { useEffect, useState } from 'react';
import styles from './GameOverView.module.scss';
import { useRouter } from "next/router";

const GameOverView = () => {
    const [score, setScore] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setScore(window.sessionStorage.getItem("score"));
    }, []);
    
    return (
        <div className={styles.gameover}>
            <h1>Obrigado por teres jogado!</h1>
            <p>Acertaste em {score} perguntas de um total de 10</p>
            <button className={styles.button} onClick={() => router.push("/")}>
            Voltar ao inicio
            </button>
        </div>
    );
}

export default GameOverView;
