import styles from "../styles/Home.module.scss";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <img
          style={{
            maxWidth: 360,
          }}
          src="https://res.cloudinary.com/dhgkpiqzg/image/upload/v1624295134/quemquerterliberdade.png"
        ></img>
        <p
          style={{
            maxWidth: 960,
            textAlign: "center",
          }}
        >
          No âmbito do projecto Setenta & Quatro, pretende-se criar uma web-app
          que funcione como um jogo de perguntas (quiz) com a temática histórica
          do período do Estado Novo em Portugal e dos eventos do 25 de Abril de
          1974, com o objectivo de factualmente (com conteúdo validado de forma
          científica) informar e esclarecer os jogadores de uma forma divertida
          e gamificada, convidando-os através de um sistema de recompensas, a
          visitar e partilhar as suas experiências no museu do Aljube.
        </p>
        <button className={styles.button} onClick={() => router.push("/quiz")}>
          Iniciar Jogo
        </button>
      </main>
    </div>
  );
}
