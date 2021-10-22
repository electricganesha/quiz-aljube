import styles from "../styles/Home.module.scss";
import WinnerForm from '../components/WinnerForm';
import cookies from "next-cookies";

export default function Winner({ user }) {
  return (
    <div className={styles.container}>
      <main>
       <WinnerForm user={user} />
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
