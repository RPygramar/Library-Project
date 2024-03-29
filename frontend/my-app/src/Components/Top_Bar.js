import styles from "./Top_Bar.module.css";

export default function Top_Bar() {
  return (
    <>
      <header className={styles.header}>
        <a href="#" className={styles.logo}>
          OnLibrary
        </a>
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
