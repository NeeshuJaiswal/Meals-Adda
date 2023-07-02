import React,{useContext,useEffect,useState} from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton=(props)=>{
    const cartCtx= useContext(CartContext);
    const [buttonIsHighlited,setButtonIsHighlited]=useState(false);
    const {items}=cartCtx;
    const numberOfCartItems=items.reduce((curNumber,item)=>{
        return curNumber + item.amount;
    },0);

    useEffect(()=>{
        if(items.length===0){
            return;
        }
        setButtonIsHighlited(true);

        const timer=setTimeout(() => {
            setButtonIsHighlited(false);
        },300);
        return()=>{
            clearTimeout(timer);
        };
    },[items]);
    const btnClass=`${classes.button} ${buttonIsHighlited? classes.bump:''}`;
return(
    <button className={btnClass} onClick={props.onClick}>
    <span className={classes.icon}>
        <CartIcon/>
    </span>
    <span> Your Cart</span>
    <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
)
};
export default HeaderCartButton;