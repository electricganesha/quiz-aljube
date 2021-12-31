import styles from "../styles/Home.module.scss";
import WinnersListView from '../components/WinnersListView';

export default function WinnersList() {
  return (
    <div className={styles.container}>
      <main>
          <WinnersListView/>
      </main>
    </div>
  );
}
