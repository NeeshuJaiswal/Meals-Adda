import React,{ useContext,useState } from 'react';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart=(props)=>{
    const[isCheckout,setIsCheckout]=useState(false);
    const[isSubmiting,setIsSubmiting]=useState(false);
    const[didSubmit,setDidSubmit]=useState(false);

    const cartCtx=useContext(CartContext);
    const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems= cartCtx.items.length>0;

    const cartItemRemoveHandler=(id)=>{
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler=(item)=>{
        cartCtx.addItem({...item,amount:1});
    }
    const CheckOutHandler=()=>{
        setIsCheckout(true);
    }
    const submitOrderHandler= async(userData)=>{
        setIsSubmiting(true);
        await fetch('https://react-http-548bd-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderdItems:cartCtx.items
            })
        });
        setIsSubmiting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }
    const modalActions=(
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems &&<button className={classes.button} onClick={CheckOutHandler}>Order</button>}
            </div>
    );
    const cartItems=<ul className={classes['cart-items']}>{cartCtx.items.map((item)=><CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}/>)}</ul>
    
    const cartModalContent=<React.Fragment>
         {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckout && modalActions}
    </React.Fragment>
    const isSubmitingModalContent=<p>Sending Order data..!</p>
    const didSubmitModalContent=<React.Fragment>
        <p>Order placed successfully..!</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>Close</button>
            </div>
        </React.Fragment>

    return(
        <Modal onClose={props.onClose}>
           {!isSubmiting && !didSubmit && cartModalContent}
           {isSubmiting &&  isSubmitingModalContent}
           {!isSubmiting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};
export default Cart;