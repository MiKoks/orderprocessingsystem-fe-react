import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [status, setStatus] = useState('PENDING');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/orders', {
                product,
                quantity,
                status
            });
            setResponseMessage(`Order created with ID: ${response.data.id}`);
        } catch (error) {
            setResponseMessage('Error creating order: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Create Order</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product:</label>
                    <input
                        type="text"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Order</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default OrderForm;
