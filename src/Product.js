import React from 'react';
import './Product.css';
import { useStateValue } from './StatProvider';
import Button from '@mui/material/Button';


const Product = ({ id, title, image, price, rating }) => {
    const [ { basket }, dispatch ] = useStateValue();
    // console.log("This is the basket >>> ", basket);

    const addToBasket = () => {
        // dispatch item to data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };

    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating" key={id}>
                    {Array(rating).fill().map((_, i) => (
                        <p key={i} >🌟</p>
                    ))}
                </div>
            </div>

            <img src={image} alt="item" />
            <Button size='small'
                style={{ textTransform: 'none' }}
                onClick={addToBasket}
            >
                Add to Basket</Button>
        </div>
    );
};

export default Product;