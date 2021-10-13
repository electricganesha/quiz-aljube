import  React from 'react';
import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <img
    className={styles.logo}
    src="https://res.cloudinary.com/dhgkpiqzg/image/upload/v1634120906/alneuq_logo.png"
  />
  );
}

export default Logo;
