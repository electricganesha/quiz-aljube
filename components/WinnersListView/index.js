import React, { useState } from 'react';
import styles from './WinnersListView.module.scss';
import { ExportToCsv } from 'export-to-csv';
import format from 'date-fns/format';

const WinnersListView = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [isAuthorised, setIsAuthorised] = useState(null);

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }

    const signIn = async () => {
        const isAuthorised = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/basicAuth`, {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (isAuthorised.status === 200) {
            setIsAuthorised(true);
        } else {
            setIsAuthorised(false);
        }
    }

    const downloadCSV = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/winners`);
        const json = await response.json();

        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: `Vencedores Quiz Liberdade ${format(
            new Date(),
            "dd/MM/yyyy",
          )}`,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            filename: `vencedores-quiz-${format(
            new Date(),
            "dd-MM-yyyy",
          )}`
        };

        try {
            const csvExporter = new ExportToCsv(options);
            csvExporter.generateCsv(json);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={styles.winnersList}>
            {!isAuthorised ?
                <form className={styles.authForm}>
                    <label htmlFor="username">Utilizador:</label>
                    <input onChange={handleUsernameChange} type="text" id="username" name="username" />
                    <label htmlFor="password">Palavra-Passe:</label>
                    <input onChange={handlePasswordChange} type="password" id="password" name="password" />
                    <div onClick={signIn} className={styles.authForm__button} >Entrar</div>
                    {isAuthorised === false && <div className={styles.authForm__denied}>Acesso n&atilde;o autorizado</div>}
                </form>

                : isAuthorised &&
                <div className={styles.adminPanel}>
                    Bem-vindo <b>{username}</b>
                    <div onClick={downloadCSV} className={styles.adminPanel__button} >Descarregar vencedores.csv</div>
                </div>
            }
        </div>
    );
}

export default WinnersListView;
