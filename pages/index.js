import React, { useEffect } from "react";
import styles from "../styles/Home.module.scss";
import { useRouter } from "next/router";
import Logo from '../components/Logo';
import HexagonalDiv from '../components/HexagonalDiv';

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
          Museu do Aljube Resistência e Liberdade desafia-te a explorar a história da resistência à ditadura e da luta pela liberdade em Portugal. 
          Participa no jogo  “A Liberdade não é um quiz”  e se conseguires responder corretamente às 10 perguntas, ganhas uma entrada grátis no Museu!
        </p>
        <HexagonalDiv onClick={() => {
          router.push("/quiz")
          }} hasConnectors={true} theme="glow">
          Iniciar Jogo
        </HexagonalDiv>
      </main>
    </div>
  );
}
