import React,{Fragment} from "react";
import classes from './Header.module.css';
import headerMeals from '../../assets/Header Meal image.jpg'
import HeaderCartButton from "./HeaderCartButton";

const Header=(props)=>{
return(
    <Fragment>
        <header className={classes.header}>
            <h1>Meals Adda</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={headerMeals} alt="A table full of delicious food!" />
        </div>
    </Fragment>
)
}
export default Header;