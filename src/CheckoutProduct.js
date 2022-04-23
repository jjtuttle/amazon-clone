import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StatProvider';
import Button from '@mui/material/Button';
// import FlipMove from 'react-flip-move';


const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {
    const [ { basket }, dispatch ] = useStateValue();

    const removeFromBasket = () => {
        // remove item from Basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        })
    }

    return (
        // <FlipMove>
        <div className="checkoutProduct">
            <img className="checkoutProduct__image"
                src={image} alt="item"
            />

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating).fill().map((_, i) => (
                        <p key={i} >🌟</p>
                    ))}
                </div>
                {/* Hide button IF on Orders receipt endpoint */}
                {!hideButton && (
                    <Button size='small'
                        style={{ textTransform: 'none' }}
                        onClick={removeFromBasket}
                    >
                        Remove from Basket</Button>
                )}
            </div>
        </div>
        //  </FlipMove> 

    );
};

export default CheckoutProduct;