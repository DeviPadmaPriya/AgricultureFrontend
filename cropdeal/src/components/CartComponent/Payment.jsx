import React, { useEffect, useState } from 'react';
import PaymentService from '../../service/PaymentService';
import CartService from '../../service/CartService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const Payment = () => {
  const [payment, setPayment] = useState({
    paymentMode: '',
    cvv: '',
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    totalCost: 0,
  });

  const userId = localStorage.getItem('userid');
  const orderId = localStorage.getItem('orderId');

  const navigate = useNavigate();

  useEffect(() => {
    CartService.getCartByUserId(userId)
      .then((cartResponse) => {
        const totalCost = cartResponse.data.totalCost;
        setPayment({ ...payment, totalCost });
      })
      .catch((error) => {
        console.error('Error fetching cart details', error);
      });
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handleAddPayment = () => {
    PaymentService.addPayment(payment, userId, orderId)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Payment Created Successfully',
          text: 'Your payment has been successfully created.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        navigate('/dealerProfile')
      })
      .catch((error) => {
        console.error('Error creating the payment', error);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-4" style={{ minHeight: '80vh' }}>
      <div className="card" style={{ width: '400px', boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)', border: '1px solid #ccc' }}>
        <div className="card-body">
          <h2 className="card-title">Payment Details</h2>
          <br />
          <form>
            <div className="mb-3">
              <label htmlFor="paymentMode">Payment Mode:</label>
              <select
                id="paymentMode"
                name="paymentMode"
                value={payment.paymentMode}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">Select Payment Mode</option>
                <option value="UPI Payment">UPI Payment</option>
                <option value="Card Payment">Card Payment</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="cvv">CVV:</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={payment.cvv}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cardHolderName">Card Holder Name:</label>
              <input
                type="text"
                id="cardHolderName"
                name="cardHolderName"
                value={payment.cardHolderName}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={payment.cardNumber}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="expiryDate">Expiry Date:</label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={payment.expiryDate}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="totalCost">Total Cost:</label>
              <input
                type="number"
                id="totalCost"
                name="totalCost"
                value={payment.totalCost}
                className="form-control"
                disabled
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleAddPayment}>
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
