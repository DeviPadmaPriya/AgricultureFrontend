import React, { useEffect, useState } from "react";
import CropService from '../../service/CropService';
import { useNavigate } from 'react-router-dom';
import Background from './cropsbg1.jpg'

const ViewAllCrops = () => {
    const [state, setState] = useState({
        crops: []
    });

    useEffect(() => {
        CropService.getAllCrops().then((response) => {
            setState({
                crops: response.data
            });
        }, () => { });
    }, []);


    let navigate = useNavigate();

    let handleAddCrop = () => {
        navigate({ pathname: '/addcrop' })

    }

    let handleUpdate = (cropid) => {
        navigate('/updatecrop', { state: { cropid } })
    }

    let handleDelete = (cropid) => {
        navigate('/deletecrop', { state: { cropid } })

    }

    const handleUserProfile = () => {
        navigate('/farmerProfile');
    }
    const handleLogout=()=>{
  navigate('/');
    }
    
    const backgroundImageStyle = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
    };
    return (
        <>
        <div style={backgroundImageStyle}>
         <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                    <div className="container">
                        <a className="navbar-brand text-light" href="#">Crops</a>
                        <button type="button" class="btn btn-outline-primary" style={{marginLeft: "900px"}} onClick={handleUserProfile}>User Profile</button>
                        
                        <span><button type="button" class="btn btn-secondary ml-2" onClick={handleLogout}>Logout</button>
                        </span>
                    </div>
                </nav>
            <h2 className="text-center mt-3">Welcome Farmer !!!</h2>
            <button
                className="btn btn-primary btn-lg"
                onClick={handleAddCrop}>Add Crop</button>
            <br></br>
            <br></br>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {state.crops.map((crop, i) => (
                    <div key={i} className="col">
                        <div className="card h-100">
                            <div className="card-header bg-success text-white">
                                Crop ID: {crop.cropid}
                            </div>
                            <div className="card-body text-center">
                                <strong></strong>
                                <img src={crop.image} alt={`Crop ${crop.cropid}`} className="img-thumbnail" style={{ width: '150px', height: 'auto' }} />
                                <br></br>
                                <h5 className="card-title">{crop.cropName}</h5>
                                <p className="card-text">
                                    <strong>Crop Type:</strong> {crop.cropType}
                                    <br />
                                    <strong>Quantity(kg):</strong> {crop.quantity}
                                    <br />
                                    <strong>Price Per Unit(kg):</strong> {crop.price}
                                    <br />
                                    <strong>CropLocation:</strong> {crop.cropLocation}
                                    <br />

                                </p>
                            </div>
                            <div className="card-footer text-center">
                                <button className="btn btn-warning me-2" onClick={() => { handleUpdate(crop.cropid) }}>Update</button>
                                <button className="btn btn-info" onClick={() => { handleDelete(crop.cropid) }}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </>
    );
}

export default ViewAllCrops;
