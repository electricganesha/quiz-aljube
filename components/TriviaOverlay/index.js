import  React, { useCallback, useEffect, useState } from 'react';
import styles from './TriviaOverlay.module.scss'

const TriviaOverlay = ({ id, host, onCloseTriviaOverlay }) => {
    const [triviaCard, setTriviaCard] = useState(null);

    useEffect(() => {
        fetchTriviaCard();
    }, []); 

    const fetchTriviaCard = useCallback(async () => {
        const res = await fetch(`${host}/api/trivia/${id}`);
        const triviaCard = await res.json();

        setTriviaCard(triviaCard);
    }, [])
    
    if(!triviaCard) {
        return null;
    }

  return (
    <div className={styles.triviaCard}>
        <div className={styles.triviaCard__header}>
            <div className={styles["triviaCard__header--text"]}>
                <h1>Sabias que...</h1>
                <p>{triviaCard.text}</p>
            </div>
            <div className={styles["triviaCard__header--image"]}>
                {triviaCard.image ? <img src={triviaCard.image}/> : null}
            </div>
        </div>
        <br></br>
        <div className={styles.sources}>
            <h3>Fontes:</h3>
            {triviaCard.links.map(link => <a href={link.link} target="_blank"> 
                {link.text}
            </a>)}
        </div>
        <div className={styles.triviaCard__buttons}>
            <button onClick={() => onCloseTriviaOverlay()}>Continuar</button>
        </div>
    </div>
  );
}

export default TriviaOverlay;
