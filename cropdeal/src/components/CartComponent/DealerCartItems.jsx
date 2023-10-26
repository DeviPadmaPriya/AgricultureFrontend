import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartService from '../../service/CartService';
import CropService from '../../service/CropService';

const DealerCartItems = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userid');
  const [cart, setCart] = useState({ cartItems: [] });

  useEffect(() => {
    CartService.getCartByUserId(userId)
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart details', error);
      });
  }, [userId]);

  const handleBack = () => {
    navigate(-1);
  };
  // const handleOrder = () => {
  //   navigate("/dealerOrder");
  // }

  const handleRemoveItem = (cartId, cropId) => {
    CartService.removeCartItem(cartId, cropId)
      .then(() => {

        const updatedCart = { ...cart };
        updatedCart.cartItems = updatedCart.cartItems.filter(item => item.cropid !== cropId);
        setCart(updatedCart);

        // Recalculate the total cost
        const totalCost = updatedCart.cartItems.reduce(
          (total, item) => total + item.totalprice,
          0
        );
        updatedCart.totalCost = totalCost;
        setCart(updatedCart);
      })
      .catch((error) => {
        console.error('Error removing cart item', error);
      });
  };

  const handleQuantityChange = (cropId, newQuantity) => {
    const updatedCart = { ...cart };
    const itemIndex = updatedCart.cartItems.findIndex(item => item.cropid === cropId);

    if (itemIndex !== -1) {
      const item = updatedCart.cartItems[itemIndex];


      CropService.findCropId(cropId)
        .then((response) => {
          const cropData = response.data;


          const actualQuantity = cropData.quantity;

          if (newQuantity < 0 || newQuantity > actualQuantity) {
            alert(`Quantity cannot be less than 0 or exceed the available Quantity: ${actualQuantity} kg.`);
            return;
          }

          item.totalprice = (newQuantity / item.quantity) * item.totalprice;
          item.quantity = newQuantity;

          const totalCost = updatedCart.cartItems.reduce(
            (total, item) => total + item.totalprice,
            0
          );
          updatedCart.totalCost = totalCost;

          setCart(updatedCart);
        })
        .catch((error) => {
          console.error('Error fetching crop data from the backend', error);
        });
    }
  };



  const handleCheckout = () => {
    const cartId = cart.cartid;
    CartService.checkoutCart(cartId, cart)
      .then((response) => {
        console.log('Cart checked out successfully:', response.data);
        navigate('/dealerorder')
      })
      .catch((error) => {
        console.error('Error checking out cart', error);
      });
  };






  return (
    <div>
      <nav style={{ backgroundColor: 'lightblue', height: '60px' }}>
        {/* <h3 className="fst-italic text-center" style={{ display: 'flex', justifyContent: 'center' }}>Dealer Cart Items</h3> */}
      </nav>
      <br></br>
      <br></br>
      {cart.cartItems.length > 0 ? (
        <div className="card col-md-8 offset-md-2 shadow-lg p-3 mb-3 bg-body rounded">
          <div className="bg-dark p-2 text-dark bg-opacity-25">
            <div className="card-body">
              <h4>Cart Items</h4>
              <ul>
                {cart.cartItems.map((item) => (
                  <li key={item.cropid}>
                    <label>
                      Crop Name: {item.cropName}
                    </label>
                    <br />

                    <button
                      className="btn "
                      onClick={() => handleQuantityChange(item.cropid, item.quantity + 1)}
                    >
                      |+|
                    </button>
                    <label>
                      Quantity (kg): {item.quantity}
                    </label>
                    <button
                      className="btn "
                      onClick={() => handleQuantityChange(item.cropid, item.quantity - 1)}
                    >
                      |-|
                    </button>
                    <br />
                    <label>
                      Price Per Unit (kg): {item.totalprice / item.quantity}
                    </label>
                    <br />
                    <label>
                      Total Cost: {item.totalprice}
                    </label>
                    <br />
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveItem(cart.cartid, item.cropid)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <h4>Total Cart Cost: {cart.totalCost}</h4>
            </div>

          </div>
          <button
            className="btn btn-warning"
            onClick={() => handleCheckout(cart.cartid)}
          >
            Checkout
          </button>


        </div>
      ) : (
        <p>No items in the cart</p>
      )}
      <button onClick={handleBack} className="btn btn-secondary">
        Back
      </button>
    </div>
  );
};

export default DealerCartItems;
