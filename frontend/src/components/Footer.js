import { useTranslation } from "react-i18next";
import "../styles/Footer.css";

const Footer = () => {
    const {t} = useTranslation();
    return (
        <footer>
            
            <h2>{t('CodeVoltage')}</h2>
            <p>{t('Formations en Électronique et Informatique')}</p>
            <div className="local">
                <h3>{t('Loacal 1 : ')}</h3>
                <h4>{t('30 Ile verte Tit mellil, mediouna, Grand-Casablanca, Maroc')}</h4>
            </div>
            <div className="local">
                <h3>{t('Loacal 2 : ')}</h3>
                <h4>{t('30 Ile verte Maârif, Grand-Casablanca, Maroc')}</h4>
            </div>
            <h4>{t('oussamaelabbasi@gmail.com')}</h4>
            <h4>{t('+212 682-684625')}</h4>
        </footer>
    );
}
 
export default Footer;