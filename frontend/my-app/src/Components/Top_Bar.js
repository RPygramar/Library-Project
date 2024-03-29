import styles from "./Top_Bar.module.css";

export default function Top_Bar() {
  return (
    <>
      <header className={styles.header}>
        <a href="#" className={styles.logo}>
          Logo
        </a>

        <nav className={styles.navbar}>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Gallery</a>
          <a href="#">Sevices</a>
          <a href="#">Contact</a>
        </nav>
      </header>
      <div className={styles.initial_image}></div>
    </>
  );
}
