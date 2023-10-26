import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartService from '../../service/CartService';
import UserService from '../../service/UserService';
import Background from './backgroundimg.jpg'
import ProfileImg from './dealerprofile.jpg';
import Axios from 'axios';


const DealerProfile = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userid');
    const [user, setUser] = useState({});
    const [cart, setCart] = useState({ cartItems: [] });

    useEffect(() => {
        // Fetch user data
        UserService.findUserId(userId)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data', error);
            });

        
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
    
    
    
    const backgroundImageStyle = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
    };
    return (
        <div style={backgroundImageStyle} className="d-flex justify-content-center align-items-center vh-100">
        <div className="col-md-4">
           
            <div className="card shadow p-3 mb-5 bg-info rounded mt-0">
                <div className="card-body">
                    <div className="image-container">
                        <img
                            src={ProfileImg}
                            className="user-profile-image"
                            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                        />
                    </div>

                    <p><strong>Name:</strong> {user.uName}</p>
                    <p><strong>Email:</strong> {user.uEmail}</p>
                    <p><strong>Mobile:</strong> {user.uMobile}</p>
                    <p><strong>Address:</strong> {user.address && `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.country}`}</p>
                </div>
            </div>
        </div>
        <div className="col-md-4" style={{ marginLeft: '30px' , border: '2px solid blue'}}>
               
                <div className="card shadow p-3 mb-8 bg-light rounded mt-0">
                    <div className="card-body">
                        <h3>Order Placed Successfully</h3>
                        <ul>
                            {cart.cartItems.map((item) => (
                                <li key={item.itemId}>
                                    {item.cropName} - Quantity: {item.quantity} 
                                </li>
                            ))}
                        </ul>
                        <p><strong>Total Cost:</strong> Rs.{cart.totalCost}</p>
                    </div>
                </div>
            </div>
        </div>
       
    );
};

export default DealerProfile;



// <div style={backgroundImageStyle} className="d-flex justify-content-center align-items-center vh-100">
            
            //         <div className="col-md-4"  >
            //             <div className="card shadow p-3 mb-5 bg-info rounded  mt-0">
            //                 <div className="card-body" >
            //                     {/* <h3> Profile</h3> */}
            //                     <div className="image-container ">
            //                         <img
            //                             src={ProfileImg}
            //                             className="user-profile-image"
            //                             style={{ width: '150px', height: '150px', borderRadius: '50%' }}
            //                         />
            //                     </div>
    
            //                     <p><strong>Name:</strong> {user.uName}</p>
            //                     <p><strong>Email:</strong> {user.uEmail}</p>
            //                     <p><strong>Mobile:</strong> {user.uMobile}</p>
            //                     <p><strong>Address:</strong> {user.address && `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.country}`}</p>
            //                 </div>
            //             </div>
                    
                    
            //     </div>
               
            //     {/* <button onClick={handleBack} className="btn btn-secondary" >
            //         Back
            //     </button> */}
            // </div>