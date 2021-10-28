import React, { useEffect, useState, useCallback } from 'react';
import Logo from '../Logo';
import styles from './WinnerForm.module.scss';
import { useRouter } from "next/router";
import HexagonalDiv from '../HexagonalDiv';

const WinnerForm = ({ user }) => {
    const [score, setScore] = useState(null);
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [error, setError] = useState({
        name: false,
        email: false,
    });

    const router = useRouter();

    const updateUser = useCallback(async(name, email, phone) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/winner`, {
          method: "POST",
          body: JSON.stringify({
              doc_id: window.sessionStorage.getItem('doc_id'),
              user_id: user.user_id,
              name,
              email,
              phone
          }),
        });
      });

    useEffect(() => {
        if(user.currentQuestion !== 10 || user.score < 10) {
            router.push("/"); 
        }

        setScore(user.score);
    }, []);

    const submitData = () => {
        if (!values.name) {
            setError({ name: true });
        }

        if (!values.email) {
            setError({ email: true });
        }

        updateUser(values.name, values.email, values.phone);

        router.push("/");
    }

    const handleNameInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            name: event.target.value,
        }));
    };

    const handleEmailInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            email: event.target.value,
        }));
    };

    const handlePhoneInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            phone: event.target.value,
        }));
    };

    return (
        <div className={styles.winner}>
            <Logo />
            <h1>Parab&eacute;ns!</h1>
            <p>Por favor introduz os teus dados para registarmos a tua inscri&ccedil;&atilde;o no sistema do <a target="_blank" href="https://www.museudoaljube.pt/servico-educativo/visitas/">EducAljube</a>.</p>
            <p>Em breve, o museu ir&aacute; entrar em contacto contigo para te facultar bilhetes gratuitos para o museu do Aljube.</p>
            <form>
                <input
                    id="name"
                    type="text"
                    placeholder="Nome completo (obrigat&oacute;rio)"
                    name="name"
                    value={values.name}
                    required={true}
                    onChange={handleNameInputChange}
                />

                <input
                    id="mail"
                    type="email"
                    placeholder="E-mail (obrigat&oacute;rio)"
                    name="email"
                    value={values.email}
                    required={true}
                    onChange={handleEmailInputChange}
                />

                <input
                    id="phone"
                    type="tel"
                    placeholder="Número de telefone (opcional)"
                    name="phone"
                    value={values.phone}
                    pattern="[0-9]{9}"
                    onChange={handlePhoneInputChange}
                />

                
            </form>
            <div style={{ marginTop: 48 }}>
            <HexagonalDiv hasConnectors={true} theme="glow" onClick={() => submitData()}>
                    Submeter
            </HexagonalDiv>
            </div>
        </div>
    );
}

export default WinnerForm;
