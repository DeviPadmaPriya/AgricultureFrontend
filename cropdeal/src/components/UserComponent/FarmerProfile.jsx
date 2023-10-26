import React, { useEffect, useState } from 'react';
import CartService from '../../service/CartService';
import UserService from '../../service/UserService';
import ProfileImg from './farmerprofile.jpg';

const FarmerProfile = () => {
    const [user, setUser] = useState({});
    const[cart,setCart]=useState([]);

    useEffect(() => {
       
        const userId = localStorage.getItem('userid');

       
        UserService.findUserId(userId)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data', error);
            });
       CartService.getCartByUserId(userId)
       .then((response)=>{
        if (response.data && response.data.cartItems) {
            setCart(response.data.cartItems);
        } else {
            console.error('Cart items not found in the response data.');
        }
    })
         .catch((error)=>{
            console.log('Error fetching cart items',error);
         })


    }, []);


    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="card col-md-4 shadow-lg p-3 mb-3 bg-body rounded">
                    <div className="bg-white p-2 text-dark bg-opacity-25">
                        <div className="card-body">
                            <h2>User Profile</h2>
                            <div className="image-container">
                                <img
                                    src={ProfileImg}
                                    alt="Profile"
                                    className="user-profile-image"
                                    style={{ width: '200px', height: '200px' }}
                                />
                            </div>
                            <div>
                                <p><strong>Name:</strong> {user.uName}</p>
                                <p><strong>Email:</strong> {user.uEmail}</p>
                                <p><strong>Mobile:</strong> {user.uMobile}</p>
                                <p><strong>Address:</strong> {user.address && `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.country}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmerProfile;
