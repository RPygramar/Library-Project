import lordoftherings from '../../assets/lord_of_the_rings_1.jpg';
import Styles from './BooksCards.module.css';
import currency from '../../assets/icons/currency-eur.png';
import basket from '../../assets/icons/shopping-basket.png'
export default function BooksCards({bookURL, bookTitle, bookAuthor }){
    return <>
            <div className={Styles.card}>
                <div className={Styles.bookLeftSide}>
                <img src={bookURL}
                     alt="Book Image not Found"/>
                    </div>
                <div className={Styles.bookRightSide}>
                    <div className={Styles.bookDescription}>
                        <h2>{bookTitle}</h2>
                        <div className={Styles.author}>
                            <a>{bookAuthor}</a>
                            <p><span>Em stock</span></p></div>
                    </div>
                    <div className={Styles.bookPrice}>
                        <h1>20,00$</h1>
                        <button><img src={basket} alt="add-carrinho" className={Styles.basketIcon}/>
                            </button>
                    </div>

                </div>
            </div>


    </>

}