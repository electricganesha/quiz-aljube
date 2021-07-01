import styles from "../styles/Home.module.scss";
import { useRouter } from "next/router";

export default function FourOhFour() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>
          ERRO <span style={{ color: "#c20a25" }}>404</span>!
        </h1>
        <h3>Parece que esta página não existe!</h3>
        <button className={styles.button} onClick={() => router.push("/")}>
          Voltar
        </button>
      </main>
    </div>
  );
}
