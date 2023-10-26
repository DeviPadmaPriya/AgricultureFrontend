import { useState } from "react";
import React from "react";
import CropService from "../../service/CropService";
import { useNavigate } from 'react-router-dom';

let AddCrop = () => {
  let navigate = useNavigate();

  let [cropid, setCropId] = useState('');
  let [cropName, setCropName] = useState('');
  let [cropType, setCropType] = useState('');
  let [quantity, setQuantity] = useState('');
  let [price, setPrice] = useState('');
  let [cropLocation, setCropLocation] = useState('');
  let[image,setImage]=useState('');


//   let handleCropId = (e) => { setCropId(e.target.value) }
  let handleCropName = (e) => { setCropName(e.target.value) }
  let handleCropType = (e) => { setCropType(e.target.value) }
  let handleQuantity = (e) => { setQuantity(e.target.value) }
  let handlePrice = (e) => { setPrice(e.target.value) }
  let handleCropLocation = (e) => { setCropLocation(e.target.value) }
let handleImage=(e)=>{setImage(e.target.value)}



  let handleSubmit = (e) => {
    e.preventDefault();

    let crop = { crop:cropid, cropName: cropName, cropType: cropType, price: price, quantity: quantity, cropLocation: cropLocation ,image:image}
    localStorage.setItem('cropid', cropid);
 
    CropService.addCrop(crop).then(() => {
      alert("Crop added successfully!!");
      navigate({ pathname: '/viewAllcrop' })
    }, () => {
      alert("Can't add crop to the list")
    });

  }

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
        <div className="card shadow p-3 mb-5 bg-light rounded col-md-6">
        <div className="card-body">
      <form onSubmit={handleSubmit}>
        {/* <div className="mb-3">
          <label htmlFor="cropId" className="col-sm-2 col-form-label">CropID:</label>
          <input onChange={handleCropId} type="text" value={cropid} className="form-control" />
        </div> */}
        <div className="mb-3">
          <label htmlFor="cropName" className="form-label">CropName:</label>
          <input onChange={handleCropName} type="text" value={cropName} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="cropType" className="form-label">CropType:</label>
          <input onChange={handleCropType} type="text" value={cropType} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity(kg):</label>
          <input onChange={handleQuantity} type="text" value={quantity} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price /unit:</label>
          <input onChange={handlePrice} type="text" value={price} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="cropLocation" className="form-label">CropLocation:</label>
          <input onChange={handleCropLocation} type="text" value={cropLocation} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image Link</label>
          <input onChange={handleImage} type="text" value={image} className="form-control" />
        </div>
        <button type="submit" className="btn btn-secondary">Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default AddCrop;
