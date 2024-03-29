import styles from "../styles/Home.module.scss";
import GameOverView from '../components/GameOverView';
import cookies from "next-cookies";

export default function GameOver({ user }) {
  return (
    <div className={styles.container}>
      <main>
       <GameOverView user={user} />
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const cookie = cookies(context);
  const user_id = cookie.user_id;
  const userResponse = await fetch(`${process.env.API_HOST}/api/user/${user_id}`);
  const userContent = await userResponse.json();

  return {
    props: { user: userContent },
  };
};
