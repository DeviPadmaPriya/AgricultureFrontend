import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate,Link } from 'react-router-dom';
import CartService from '../../service/CartService';
import CropService from '../../service/CropService';
import Background from './addcart.jpg'


const AddCart = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cropid = location.state.cropid;
    const [crop, setCrop] = useState({});
    const [quantity, setQuantity] = useState(1); 
    const userId = localStorage.getItem('userid'); 

    useEffect(() => {
        CropService.findCropId(cropid)
            .then((response) => {
                setCrop(response.data);
            })
            .catch((error) => {
                console.error('Error fetching crop details', error);
            });
    }, [cropid]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleAddToCart = () => {
        const userId = localStorage.getItem('userid');
    
        if (!userId) {
            console.error('User ID not found in localStorage.');
            return;
        }
        
        if (quantity <= 0 || quantity > crop.quantity) {
            alert(`Please check the quantity. Available Quantity: ${crop.quantity}`);
            return;
        }
        const cartItem = {
            cropid: crop.cropid, 
            quantity,
        };
    
       
        CartService.addToCart(userId, cartItem, cropid) 
            .then((response) => {
                console.log('Added to cart:', response.data);
                 navigate('/dealercartitem'); 
            })
            .catch((error) => {
                console.error('Error adding to cart', error);
            });
    };
   
 

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
    };

    const backgroundImageStyle = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
    };

    return (
        <div style={backgroundImageStyle}>
            <nav style={{ backgroundColor: 'lightblue' ,height:'60px'}}>
                    <h3 className="fst-italic text-center" style={{ display: 'flex', justifyContent: 'center' }}>Add to Cart</h3>
              
            </nav>
   <br></br>
   <br></br>
   
            <div className = "card col-md-4 offset-md-3 shadow-lg p-3 mb-3 bg-body rounded">
                <div className="bg-dark p-2 text-dark bg-opacity-25">
                    <div className = "card-body">
                <label>
                    Crop Name:
                    <input type="text" value={crop.cropName} disabled />
                </label>
                <br />
                <label>
                    Crop Type:
                    <input type="text" value={crop.cropType} disabled />
                </label>
                <br />
                <label>
                    Quantity (kg):
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                </label>
                <br />
                <label>
                    Price Per Unit (kg):
                    <input type="text" value={crop.price} disabled />
                </label>
                <br />
                <label>
                    Location:
                    <input type="text" value={crop.cropLocation} disabled />
                </label>
               <br></br>
               <br></br>
                <button onClick={handleAddToCart} className="btn btn-primary"  style={{ marginRight: '10px' }}>
                    Add to Cart
                </button>

                {/* <Link to="/dealercartitem">
                            <button className="btn btn-success">Checkout</button>
                        </Link> */}
            </div>
            </div>
            </div>
            <button onClick={handleBack} className="btn btn-secondary">
                Back
            </button>
           
            
        </div>
    );
};

export default AddCart;
