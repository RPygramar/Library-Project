import styles from "./Footer.module.css";
import ECOMMERCE from "../../assets/ecommerce_portugal.png";

export default function Footer() {
  return (
    <>
      <div className={styles.footer_div}>
        <div className={styles.footer_top_bar}></div>
        <div className={styles.eccomerce}>
          <div className={styles.eccomerce_text}>
            Compre online, escolha sites nacionais
          </div>
          <img src={ECOMMERCE} className={styles.eccomerce_image} />
        </div>
        <div className={styles.footer_info}>
          <div className={styles.left}>
            <a className={styles.colares}>Colares.NET</a>
            <a>Quem Somos</a>
            <a>Contactos</a>
            <a>As nossas livrarias</a>
            <a>Editoras Colares</a>
          </div>
          <div className={styles.right}>
            <a className={styles.link_uteis}>LINKS ÚTEIS</a>
            <a>Apoio ao Cliente</a>
            <a>Termos de utilização</a>
            <a>Política de privacidade</a>
            <a>Livro de Reclamações</a>
          </div>
        </div>
        <div className={styles.endfooter}></div>
      </div>
    </>
  );
}
