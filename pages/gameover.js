import styles from "../styles/Home.module.scss";
import GameOverView from '../components/GameOverView';

export default function GameOver() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
       <GameOverView />
      </main>
    </div>
  );
}
