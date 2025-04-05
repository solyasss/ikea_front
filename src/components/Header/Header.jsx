import classes from './Headers.module.css';
import burgerIcon from '../../assets/img/header/burger copy.svg';
import UnionIcon from "../../assets/BuyNow.svg";
import GeoIcon from "../../assets/img/header/Vector.svg";
import UserIcon from "../../assets/img/header/uil_user1.svg";
import BuyIcon from "../../assets/img/header/BuyIcon.svg";
import likeIkon from "../../assets/img/header/Component 1.svg";
import Search from "../Search/Search";


export default function Headers() {
    return (
        <>
            <div className={classes.firstHeader}>
                <div>
                    <p className={classes.movingText}>#швидкотазручно</p>
                    <p className={classes.movingText}>#buy now</p>
                    <p className={classes.movingText}>#вседлядому</p>
                    <p className={classes.movingText}>#швидкотазручно</p>
                    <p className={classes.movingText}>#buy now</p>
                    <p className={classes.movingText}>#вседлядому</p>
                </div>
            </div>
            <header>
                <nav className={classes.menu}>

                    <div className={classes.leftMenu}>
                        <div className={classes.burgerContainer}>
                            <img src={burgerIcon} alt="Меню" width={30} />
                            <p>Меню</p>
                        </div>

                        <img src={UnionIcon} className={classes.logo} width={112} height={36} alt="Лого" />

                        <div className={classes.menuItems}>
                            <a href="#products"><p>Товари</p></a>
                            <a href="#rooms"><p>Кімнати</p></a>
                            <a href="#design"><p>Дизайн</p></a>
                        </div>
                    </div>

                    <div className={classes.menuItemsLeft}>
                        <div className={classes.logoText}>
                            <img src={GeoIcon} alt="Гео" />
                            <a href="#kyiv"><p>Київ</p></a>
                        </div>
                        <div className={classes.logoText}>
                            <img src={UserIcon} alt="Гео" />
                            <a href="#login"><p>Привіт! Увійдіть в Систему</p></a>
                        </div>
                        <div className={classes.logoGroup}>
                            <img src={BuyIcon} alt="Гео" />
                            <img src={likeIkon} alt="Гео" />
                        </div>
                    </div>
                </nav>
            </header>
            <Search />
        </>
    );
}