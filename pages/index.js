import { useEffect } from "react";
import styles from "../styles/Home.module.scss";
import { useRouter } from "next/router";
import Logo from '../components/Logo';
import Button from '../components/Button';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    document.cookie = `user_id=; domain=*`;
    document.cookie = `doc_id=; domain=*`;
  }, []);
  

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Logo />
        <p className={styles.intro}>
          No âmbito do projecto Setenta & Quatro, pretende-se criar uma web-app
          que funcione como um jogo de perguntas (quiz) com a temática histórica
          do período do Estado Novo em Portugal e dos eventos do 25 de Abril de
          1974, com o objectivo de factualmente (com conteúdo validado de forma
          científica) informar e esclarecer os jogadores de uma forma divertida
          e gamificada, convidando-os através de um sistema de recompensas, a
          visitar e partilhar as suas experiências no museu do Aljube.
        </p>
        <Button onClick={() => {
          router.push("/quiz")
          }} theme="primary">
          Iniciar Jogo
        </Button>
      </main>
    </div>
  );
}
