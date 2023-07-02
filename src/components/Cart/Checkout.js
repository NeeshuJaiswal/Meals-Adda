import React,{useRef,useState} from 'react';
import classes from './Checkout.module.css';


    const isEmpty=(value)=>value.trim()==='';
    const isFiveChar=(value)=>value.trim().length ===5;
    const isTenChar=(value)=>value.trim().length ===10;
    
const Checkout=(props)=>{
    const[formsInputValidity,setFormsInputValidity]= useState({
        name:true,
        street:true,
        city:true,
        zipcode:true,
        phone:true
    });

    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const cityInputRef=useRef();
    const zipcodeInputRef=useRef();
    const phoneInputRef=useRef();



    const confirmHandler=(event)=>{
        event.preventDefault();

        const enteredName=nameInputRef.current.value;
        const enteredStreet=streetInputRef.current.value;
        const enteredCity=cityInputRef.current.value;
        const enteredZipcode=zipcodeInputRef.current.value;
        const enteredPhone=phoneInputRef.current.value;

        const enteredNameIsValid=!isEmpty(enteredName);
        const enteredStreetIsValid=!isEmpty(enteredStreet);
        const enteredCityIsValid=!isEmpty(enteredCity);
        const enteredZipcodeIsValid=isFiveChar(enteredZipcode);
        const enteredPhoneIsValid=isTenChar(enteredPhone);

        setFormsInputValidity({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            city:enteredCityIsValid,
            zipcode:enteredZipcodeIsValid,
            phone:enteredPhoneIsValid
        });

        const formIsValid=enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredZipcodeIsValid && enteredPhoneIsValid;

        if(!formIsValid){
            return;
        }
        
        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            zipcode:enteredCity,
            phone:enteredPhone
        });

    }

    return(
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formsInputValidity.name?'':classes.invalid}`}>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' ref={nameInputRef}></input>
                {!formsInputValidity.name && <p>please enter valid name</p>}
            </div>
            <div className={`${classes.control} ${formsInputValidity.street?'':classes.invalid}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id='address' ref={streetInputRef}></input>
                {!formsInputValidity.street && <p>please enter valid street.</p>}
            </div>
            <div className={`${classes.control} ${formsInputValidity.city?'':classes.invalid}`}>
                <label htmlFor="city">City</label>
                <input type="text" id='city' ref={cityInputRef}></input>
                {!formsInputValidity.city && <p>please enter valid city.</p>}
            </div>
            <div className={`${classes.control} ${formsInputValidity.zipcode?'':classes.invalid}`}>
                <label htmlFor="zipcode">Zip Code</label>
                <input type="text" id='zipcode' ref={zipcodeInputRef}></input>
                {!formsInputValidity.zipcode && <p>please enter valid Zipcode (5 char length)</p>}
            </div>
            <div className={`${classes.control} ${formsInputValidity.phone?'':classes.invalid}`}>
                <label htmlFor="phone">Phone Number</label>
                <input type="phone" id='phone' ref={phoneInputRef}></input>
                {!formsInputValidity.phone && <p>please enter valid phone number (10 char length)</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit} >Confirm</button>
            </div>
        </form>
    )
}
export default Checkout;