import React, { useEffect, useState } from 'react';
import OrderService from '../../service/OrderService';
import CartService from '../../service/CartService';
import UserService from '../../service/UserService';
import { useNavigate } from 'react-router-dom';
import Background from './orderbg1.jpg'
import Swal from 'sweetalert2';

const Order = () => {

    const [cart, setCart] = useState({});
    const [orderdate, setOrderDate] = useState('');
    const [address, setAddress] = useState({});
    const [originalAddress, setOriginalAddress] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const userId = localStorage.getItem('userid');
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        UserService.findUserId(userId)
            .then((response) => {
                setUser(response.data);
                setAddress(response.data.address);
                setOriginalAddress(response.data.address);
            })
            .catch((error) => {
                console.error('Error fetching user details', error);
            });

        CartService.getCartByUserId(userId)
            .then((response) => {
                setCart(response.data);


                if (response.data && response.data.cartid) {
                    CartService.getCartItemsByCartId(response.data.cartid)
                        .then((cartItemsResponse) => {
                            setCartItems(cartItemsResponse.data);
                        })
                        .catch((error) => {
                            console.error('Error fetching cart items', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error fetching cart details', error);
            });
    }, [userId]);

    const handleCreateOrder = () => {
        const newOrder = {
            orderdate: orderdate,
            address: {
                street: address.street,
                pincode: address.pincode,
                city: address.city,
                state: address.state,
                country: address.country,
            },
            uName: user.uName,
        };

        OrderService.createOrder(userId, cart.cartid, newOrder)
            .then((response) => {
                localStorage.setItem('orderId', response.data.orderid);
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Order Created Successfully',
                //     text: 'Your order has been successfully created.',
                //     confirmButtonColor: '#3085d6',
                //     confirmButtonText: 'OK',
                // });
                navigate('/dealerpayment');

            })
            .catch((error) => {
                console.error('Error creating the order', error);
            });
    };

    const backgroundImageStyle = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
    };
    const centerCardStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ccc',
    };

    return (
        <div style={backgroundImageStyle}>
            {/* <div className="container mt-4"> */}
            <div className="card" style={{ maxWidth: '600px', marginLeft: '40px'}}>
                <div className="card-body mt-2" style={{ marginLeft: '40px' }}>

                    <ul className="list-group list-group-flush">
                        {/* <h2 className="card-title">User ID: {userId}</h2> */}

                        <h2 style={{ fontStyle: 'italic' }}>Welcome {user.uName}</h2>
                        <li className="list-group-item">Cart ID: {cart.cartid}</li>

                        <li className="list-group-item">Total Cost: {cart.totalCost}</li>
                    </ul>
                </div>
            </div>

            <div className="card mt-3" style={{ ...centerCardStyle , border: '2px solid #3498db' }}>
                <div className="card-body" style={{ backgroundColor: '#ADD8E6' }}>
                    <h2 className="card-title" style={{ textAlign: 'center' }}>Order Details</h2>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="orderDate">Order Date:</label>
                                <input
                                    type="date"
                                    id="orderDate"
                                    className="form-control"
                                    value={orderdate}
                                    onChange={(e) => setOrderDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="street">Street:</label>
                                <input
                                    type="text"
                                    id="street"
                                    className="form-control"
                                    value={address.street}
                                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="pincode">Pincode:</label>
                                <input
                                    type="text"
                                    id="pincode"
                                    className="form-control"
                                    value={address.pincode}
                                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="city">City:</label>
                                <input
                                    type="text"
                                    id="city"
                                    className="form-control"
                                    value={address.city}
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="state">State:</label>
                                <input
                                    type="text"
                                    id="state"
                                    className="form-control"
                                    value={address.state}
                                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="country">Country:</label>
                                <input
                                    type="text"
                                    id="country"
                                    className="form-control"
                                    value={address.country}
                                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>

            <button className="btn btn-outline-primary" onClick={handleCreateOrder} style={{ marginLeft: '750px', padding: '10px 30px', fontSize: '24px' }}>
                Order
            </button>
        </div>
        // </div>



    );
};

export default Order;








// import React, { useEffect, useState } from 'react';
// import OrderService from '../../service/OrderService';
// import CartService from '../../service/CartService';
// import UserService from '../../service/UserService';

// const Order = () => {
//   const [cart, setCart] = useState({});
//   const [orderdate, setOrderDate] = useState('');
//   const [address, setAddress] = useState({});
//   const [originalAddress, setOriginalAddress] = useState({});
//   const [cartItems, setCartItems] = useState([]);
//   const userId = localStorage.getItem('userid');
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     // Fetch user information by userId
//     UserService.findUserId(userId)
//       .then((response) => {
//         setUser(response.data);
//         setAddress(response.data.address); // Set the user's address
//         setOriginalAddress(response.data.address); // Store the original address
//       })
//       .catch((error) => {
//         console.error('Error fetching user details', error);
//       });

//     // Fetch the user's cart by userId
//     CartService.getCartByUserId(userId)
//     .then((response) => {
//       setCart(response.data);

//       // Fetch cart items by cartId
//       if (response.data && response.data.cartid) {
//         CartService.getCartItemsByCartId(response.data.cartid)
//           .then((cartItemsResponse) => {
//             setCartItems(cartItemsResponse.data);
//           })
//           .catch((error) => {
//             console.error('Error fetching cart items', error);
//           });
//       }
//     })
//     .catch((error) => {
//       console.error('Error fetching cart details', error);
//     });
// }, [userId]);

//   const handleCreateOrder = () => {
//     const newOrder = {
//       orderdate: orderdate,
//       address: {
//         street: address.street,
//         pincode: address.pincode,
//         city: address.city,
//         state: address.state,
//         country: address.country,
//       },
//       uName: user.uName,
//     };

//     OrderService.createOrder(userId, cart.cartid, newOrder)
//       .then((response) => {
//         // Handle success
//       })
//       .catch((error) => {
//         console.error('Error creating the order', error);
//       });
//   };



//   return (
//     <div className="container mt-4">
//       <div className="card">
//         <div className="card-body">
//           <h2 className="card-title">Cart Details</h2>
//           <ul className="list-group list-group-flush">
//             {/* <h2 className="card-title">User ID: {userId}</h2> */}
//             <h2 className="card-title">Welcome: {user.uName}</h2>
//             <li className="list-group-item">Cart ID: {cart.cartid}</li>
//             {/* <li className="list-group-item">
//               <h4>Cart Items:</h4>
//               <ul>
//                 {Array.isArray(cartItems) && cartItems.map((item) => (
//                   <li key={item.itemId}>{item.name}</li>
//                 ))}
//               </ul>
//             </li> */}
//             <li className="list-group-item">Total Cost: {cart.totalCost}</li>
//           </ul>
//         </div>
//       </div>

//       <div className="card mt-3">
//         <div className="card-body">
//           <h2 className="card-title">Order Details</h2>
//           <div className="mb-3">
//             <input
//               type="date"
//               className="form-control"
//               placeholder="Order Date"
//               value={orderdate}
//               onChange={(e) => setOrderDate(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Street"
//               value={address.street}
//               onChange={(e) => setAddress({ ...address, street: e.target.value })}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Pincode"
//               value={address.pincode}
//               onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="City"
//               value={address.city}
//               onChange={(e) => setAddress({ ...address, city: e.target.value })}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="State"
//               value={address.state}
//               onChange={(e) => setAddress({ ...address, state: e.target.value })}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Country"
//               value={address.country}
//               onChange={(e) => setAddress({ ...address, country: e.target.value })}
//             />
//           </div>
//           <button className="btn btn-primary" onClick={handleCreateOrder}>
//             Order
//           </button>
//         </div>
//       </div>

//       {/* Button to update the address */}
//       {/* <button className="btn btn-primary mt-3" onClick={handleAddressChange}>
//         Update Address
//       </button> */}
//     </div>
//   );
// };

// export default Order;
