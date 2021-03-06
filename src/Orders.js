import React from 'react';
import { useState, useEffect } from 'react';
import { db } from './firebase';
import Order from './Order';
import './Orders.css';
import { useStateValue } from './StatProvider';



const Orders = () => {
    const [ { basket, user }, dispatch ] = useStateValue();
    const [ orders, setOrders ] = useState([]);


    useEffect(() => {
        if (user) {
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ))
        } else {
            setOrders([]);
        }

    }, []);

    return (
        <div className="orders">
            <h1>Your Orders</h1>

            <div className="orders__order">
                {orders.length > 0 ? orders?.map(order => (
                    <Order order={order} />
                )) : <p>No Orders Found.</p>}
            </div>


        </div>
    );
};

export default Orders;