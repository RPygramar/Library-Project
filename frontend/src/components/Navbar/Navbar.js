import styles from './Navbar.module.css';
import logo from '../../assets/colares_sintra_logo.png';


export default function Navbar(){
    return (
        <>
      <header className={styles.header}>
        <img className= {styles.image} src={logo}></img>
        <nav className={styles.navbar}>
          <a href="">Home</a>
          <a href="/livros">Livros</a>
          <a href="/carrinho">Carrinho</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </nav>
      </header>
    </>
  );
}

