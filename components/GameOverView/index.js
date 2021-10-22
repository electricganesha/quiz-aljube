import React, { useEffect, useState } from 'react';
import Logo from '../Logo';
import styles from './GameOverView.module.scss';
import { useRouter } from "next/router";

const GameOverView = ({ user }) => {
    const [shouldRender, setShouldRender] = useState(false);
    const [score, setScore] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if(user.currentQuestion !== 10) {
            router.push("/"); 
        }
        
        setShouldRender(true);
        setScore(user.score);
    }, []);

    if(!shouldRender) {
        return null;
    }

    return (
        <div className={styles.gameover}>
            <Logo />
            <h1>Obrigado por teres jogado!</h1>
            <p>Acertaste em {score} perguntas de um total de 10</p>
            {score === 10 ?
                <React.Fragment>
                    <p>Parab&eacute;ns, acertaste em todas as perguntas o que significa que sabes bastante sobre o tema! O teu conhecimento extenso acabou de te ganhar bilhetes gratuitos para visitar o museu do Aljube. Para avançar, clica no bot&atilde;o abaixo.</p>
                    <button className={styles.button} onClick={() => router.push("/winner")}>
                        Reclamar o meu bilhete
                    </button>
                </React.Fragment>
                : null}
            <button className={styles.button} onClick={() => router.push("/")}>
                Voltar ao inicio
            </button>
        </div>
    );
}

export default GameOverView;
