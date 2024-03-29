import styles from "./Main_Page.module.css";

export default function Main_Page() {
  return (
    <>
      <div className={styles.initial_image}>
        <p className={styles.top_livros}>Top Livros</p>
      </div>
      <div className={styles.top_books}>
        <div className={styles.slider}>
          <div className={styles.slide_track}>
            <div className={styles.slide}>
              <img src="/images/arte_da_guerra.jpg" />
            </div>
            <div className={styles.slide}>
              <img src="/images/lord_of_the_rings_1.jpg" />
            </div>
            <div className={styles.slide}>
              <img src="/images/arte_da_guerra.jpg" />
            </div>
            <div className={styles.slide}>
              <img src="/images/lord_of_the_rings_1.jpg" />
            </div>
            <div className={styles.slide}>
              <img src="/images/arte_da_guerra.jpg" />
            </div>
            <div className={styles.slide}>
              <img src="/images/lord_of_the_rings_1.jpg" />
            </div>
            <div className={styles.slide}>
              <img src="/images/arte_da_guerra.jpg" />
            </div>
            <div className={styles.slide}>
              <img src="/images/lord_of_the_rings_1.jpg" />
            </div>
            <div className={styles.slide}>
              <img src="/images/arte_da_guerra.jpg" />
            </div>

            <div className={styles.slide}>
              <img src="/images/lord_of_the_rings_1.jpg" />
            </div>
            <div className={styles.slide}>
              <img src="/images/arte_da_guerra.jpg" />
            </div>
            <div className={styles.slide}>
              <img src="/images/lord_of_the_rings_1.jpg" />
            </div>
            <div className={styles.slide}>
              <img src="/images/arte_da_guerra.jpg" />
            </div>
            <div className={styles.slide}>
              <img src="/images/lord_of_the_rings_1.jpg" />
            </div>
            <div className={styles.slide}>
              <img src="/images/arte_da_guerra.jpg" />
            </div>
            <div className={styles.slide}>
              <img src="/images/lord_of_the_rings_1.jpg" />
            </div>
            <div className={styles.slide}>
              <img src="/images/arte_da_guerra.jpg" />
            </div>
            <div className={styles.slide}>
              <img src="/images/lord_of_the_rings_1.jpg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
