import { Button } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { getBasketTotal } from './reducer';
import { useStateValue } from './StatProvider';
import { useEffect } from 'react';
import axios from './axios';



const Payment = () => {
    const [ { basket, user }, dispatch ] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [ succeeded, setSucceeded ] = useState(false);
    const [ processing, setProcessing ] = useState("");
    const [ error, setError ] = useState(null);
    const [ disabled, setDisabled ] = useState(true);
    const [ clientSecret, setClientSecret ] = useState(true);


    useEffect(() => {
        console.log("BEFORE axios sends to BE API <<<<<<<<");
        
        // generate the special stripe secret which allows us to charge a customer for
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits ($ => cents)
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            console.log("AFTER axios >>>>>>>>>",response);
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    }, [ basket ]);


    console.log("THE SECRET IS >>>>>>", clientSecret);


    // Submit
    const handleSubmit = async (event) => {
        // Stripe functionality
        event.preventDefault();

        setProcessing(true);

        const payload =  await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            history.replace('/orders');
        })
        
    }

    const handleChange = event => {
        // Listen for changes in the CardElement and
        // display any errors as the customer types their card details.
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "")
    }


    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (
                    <Link to='/checkout'>{basket?.length} items</Link>
                    )
                </h1>

                {/* Payment Section - delivery address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 react lane</p>
                        <p>Seattle, WA. 98121</p>
                    </div>
                </div>

                {/* Payment Section - review items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment Section - payment method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>

                    <div className="payment__details">
                        {/* Stripe magic will go here */}
                        <form className="payment__form" onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}
                                    size='small'
                                    style={{ textTransform: 'none' }}
                                >
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {/* Errors */}
                            {error & <div className="payment__errors">{error}</div>}
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Payment;