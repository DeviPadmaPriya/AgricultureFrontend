import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CropService from "../../service/CropService";
import Background from './dealerbgimg2.jpg'

const DealerCrops = () => {
    const [state, setState] = useState({
        crops: [],
        filteredCrops: [],
        filterType: '',
        filterName: '',
        filterLocation: ''
    });

    useEffect(() => {
        CropService.getAllCrops().then((response) => {
            setState({
                crops: response.data,
                filteredCrops: response.data
            });
        }, () => { });
    }, []);
    let navigate = useNavigate();
    const handleUpdate = (cropid) => {
        navigate('/addcart', { state: { cropid } });
    }

    const handleFilter = () => {
        const { crops, filterType, filterName, filterLocation } = state;

        const filteredCrops = crops.filter(crop => {
            const typeMatch = !filterType || (crop.cropType && crop.cropType.toLowerCase().includes(filterType.toLowerCase()));
            const nameMatch = !filterName || (crop.cropName && crop.cropName.toLowerCase().includes(filterName.toLowerCase()));
            const locationMatch = !filterLocation || (crop.cropLocation && crop.cropLocation.toLowerCase().includes(filterLocation.toLowerCase()));

            return typeMatch && nameMatch && locationMatch;
        });

        setState(prevState => ({
            ...prevState,
            filteredCrops
        }));
    };

    const backgroundImageStyle = {
        backgroundImage: `url(${Background})`, 
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',  
    };

    const handleUserProfile = () => {
        navigate('/dealerProfile');
    }
    const handleLogout=()=>{
        navigate('/');
          }
  
    return (
        <>
         <div style={backgroundImageStyle}>
         <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                    <div className="container">
                        <a className="navbar-brand text-light" href="#">Crops Add to cart</a>
                        <button type="button" class="btn btn-outline-primary" style={{marginLeft: "900px"}}  onClick={handleUserProfile}>User Profile</button>
                        <button type="button" class="btn btn-secondary ml-2" onClick={handleLogout}>Logout</button>
                    </div>
                </nav>
           <br></br>
            <div className="row mb-2">
                <div className="col">
                <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Type"
                        value={state.filterType}
                        onChange={(e) => setState({ ...state, filterType: e.target.value })}
                    />
                    </div>
                </div>
                <div className="col">
                <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search by Name"
                        value={state.filterName}
                        onChange={(e) => setState({ ...state, filterName: e.target.value })}
                    />
                    </div>
                </div>
                <div className="col">
                <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search by Location"
                        value={state.filterLocation}
                        onChange={(e) => setState({ ...state, filterLocation: e.target.value })}
                    />
                    </div>
                </div>
                <div className="col-auto ml-1">
                    <button className="btn btn-primary" onClick={handleFilter}>Apply Filters</button>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-4 g-4">
                {state.filteredCrops.map((crop, i) => (
                    <div key={i} className="col">
                        <div className="card h-80">
                            {/* <div className="card-header bg-success text-white">
                Crop ID: {crop.cropid}
              </div> */}
                            <div className="card-body text-center">
                                <img
                                    src={crop.image}
                                    alt={`Crop ${crop.cropid}`}
                                    className="img-thumbnail"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        objectFit: 'cover',
                                    }}
                                />                <br></br>
                                <h5 className="card-title">{crop.cropName}</h5>
                                <p className="card-text ">
                                    <strong> Type:</strong> {crop.cropType}
                                    <br />
                                    <strong>Quantity(kg):</strong> {crop.quantity}
                                    <br />
                                    <strong>Price Per Unit(kg):</strong> {crop.price}
                                    <br />
                                    <strong>Location:</strong> {crop.cropLocation}
                                    <br />
                                </p>
                            </div>
                            <div className="card-footer text-center">
                                <button className="btn btn-warning me-2" onClick={() => { handleUpdate(crop.cropid) }}>Go To Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </>
    );
}

export default DealerCrops;
