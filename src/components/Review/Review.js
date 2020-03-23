import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] =useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);


    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeProduct = (productKey) =>{
        console.log('remove clicked', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        //cart
        const savedcart = getDatabaseCart();
        const productkeys = Object.keys(savedcart);
        
        const cartProducts = productkeys.map ( key => {
            const product = fakeData.find( pd => pd.key ===key);
            product.quantity = savedcart[key];
            return product;
        });

        setCart(cartProducts);
    }, [])

    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt=""/>;
    } 
    return (
        <div className="twin-container">
            <div className = "product-container">
                {
                    cart.map(pd => <ReviewItem 
                        key = {pd.key}
                        removeProduct = {removeProduct}
                        product = {pd}></ReviewItem>)
                } 
                {
                    thankyou
                } 
            </div>
            <div className="cart-container">
                <Cart cart = {cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place order</button>
                </Cart>
            </div>         
        </div>
    );
};

export default Review;