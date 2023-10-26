import { useState, useEffect } from "react";
import React from "react";
import CropService from "../../service/CropService";
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateCrop = () => {
  let location = useLocation();
  let [cropTemp, setCrop] = useState({
    cropid: '',
    cropName: '',
    cropType: '',
    quantity: '',
    price: '',
    cropLocation: '',
    image:''

  });

  useEffect(() => {
    CropService.findCropId(location.state.cropid).then((response) => {
      setCrop(response.data);
    }, () => { });
  }, []);

  let navigate = useNavigate();

  let [cropName, setCropName] = useState('');
  let [cropType, setCropType] = useState('');
  let [quantity, setQuantity] = useState('');
  let [price, setPrice] = useState('');
  let [cropLocation, setCropLocation] = useState('');
  let[image,setImgae]=useState('');


  let handleCropName = (e) => { setCropName(e.target.value) }
  let handleCropType = (e) => { setCropType(e.target.value) }
  let handleQuantity = (e) => { setQuantity(e.target.value) }
  let handlePrice = (e) => { setPrice(e.target.value) }
  let handleCropLocation = (e) => { setCropLocation(e.target.value) }
  let handleImage=(e)=>{setImgae(e.target.value)}


  let handleSubmit = (e) => {
    e.preventDefault();

    let updatedCrop = {
      cropid: location.state.cropid,
      cropName: cropName || cropTemp.cropName,
      cropType: cropType || cropTemp.cropType,
      price: price || cropTemp.price,
      quantity: quantity || cropTemp.quantity,
      cropLocation: cropLocation || cropTemp.cropLocation,
      image:image||cropTemp.image
    };

    CropService.addCrop(updatedCrop).then(() => {
      alert("Crop updated successfully!!");
      navigate({ pathname: '/viewAllCrop' })
    }, () => {
      alert("Can't update crop to the list")
    });
  }

  return (
    <div className = "card col-md-4 offset-md-3 shadow-lg p-3 mb-3 bg-body rounded">
                <div className="bg-success p-2 text-dark bg-opacity-25">
                    <div className = "card-body">
      <div className="mb-3">
        <label htmlFor="cropId" className="form-label">CropID:</label>
        <input type="text" value={location.state.cropid} className="form-control" disabled />
      </div>
      <div className="mb-3">
        <label htmlFor="cropName" className="form-label">CropName:</label>
        <input onChange={handleCropName} type="text" value={cropName} className="form-control" placeholder={cropTemp.cropName} />
      </div>
      <div className="mb-3">
        <label htmlFor="cropType" className="form-label">CropType:</label>
        <input onChange={handleCropType} type="text" value={cropType} className="form-control" placeholder={cropTemp.cropType} />
      </div>
      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">Quantity:</label>
        <input onChange={handleQuantity} type="text" value={quantity} className="form-control" placeholder={cropTemp.quantity} />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price:</label>
        <input onChange={handlePrice} type="text" value={price} className="form-control" placeholder={cropTemp.price} />
      </div>
      <div className="mb-3">
        <label htmlFor="cropLocation" className="form-label">CropLocation:</label>
        <input onChange={handleCropLocation} type="text" value={cropLocation} className="form-control" placeholder={cropTemp.cropLocation} />
      </div>
      <button type="submit" className="btn btn-secondary" onClick={handleSubmit}>Submit</button>
    </div>
    </div>
    </div>
     
  );
}

export default UpdateCrop;
