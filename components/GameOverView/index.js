import React, { useEffect, useState } from 'react';
import Logo from '../Logo';
import styles from './GameOverView.module.scss';
import { useRouter } from "next/router";
import HexagonalDiv from '../HexagonalDiv';

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
            <h1>Obrigado por teres jogado.</h1>
            <p>Acertaste em {score} perguntas de um total de 10. Tenta novamente e ganha a tua entrada grátis no Museu do Aljube!</p>
            {score === 10 ?
                <React.Fragment>
                    <p>Parab&eacute;ns, acertaste em todas as perguntas! O teu conhecimento extenso acabou de te ganhar bilhetes gratuitos para visitar o museu do Aljube. Para avançar, clica no bot&atilde;o abaixo.</p>
                    <HexagonalDiv theme="glow" hasConnectors={true} onClick={() => router.push("/winner")}>Reclamar o meu bilhete</HexagonalDiv> 
                </React.Fragment>
                : null}
                <div style={{ marginTop: 48 }}>
                <HexagonalDiv theme="glow" hasConnectors={true} onClick={() => router.push("/")}>Voltar ao inicio</HexagonalDiv>
                </div>
        </div>
    );
}

export default GameOverView;
