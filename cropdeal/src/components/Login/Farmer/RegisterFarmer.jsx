import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import userService from '../../../service/UserService';

const RegisterFarmer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
   
    uName: '',
    uEmail: '',
    uPassword: '',
    address: {
        street: '',
        pincode: '',
        city: '',
        state: '',
        country: '',
      },
    uMobile: '',
    uRole: 'ROLE_FARMER',
  });
 
 






  const handleChange = (e) => {
    const { name, value } = e.target;

     if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: {
          ...prevFormData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dealer = await userService.register(formData);
      console.log('Farmer registered', dealer.data);
      alert("registered Successfully");
      navigate('/farmlogin');
    } 
     catch (error) {
        console.error('Error during registration', error.message);
    
       
    }
  };

  return (
    <div className="register-container">
      <h2>Register Your Details for Login</h2>
      <form onSubmit={handleSubmit} className="register-form">
      

        <label>
          Name:
          <input type="text" name="uName" placeholder="Enter your Name" value={formData.uName} onChange={handleChange} required/>
        </label>
        <br />

        <label>
          Email:
          <input type="email" name="uEmail" placeholder="Enter your emailid" value={formData.uEmail} onChange={handleChange} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
        </label>
        <br />

        <label>
          Password:
          <input type="text" name="uPassword" placeholder="password" value={formData.uPassword} onChange={handleChange} required  minLength="8"/>
        </label>
        <br />

        <label>
          Street:
          <input type="text" name="address.street" placeholder="Street" value={formData.address.street} onChange={handleChange} required/>
        </label>
        <br />

        <label>
          Pincode:
          <input type="text" name="address.pincode" placeholder="Pincode" value={formData.address.pincode} onChange={handleChange} required />
        </label>
        <br />

        <label>
          City:
          <input type="text" name="address.city" placeholder="City" value={formData.address.city} onChange={handleChange} required/>
        </label>
        <br />
        <label>
          State:
          <input type="text" name="address.state" placeholder="State" value={formData.address.state} onChange={handleChange} required/>
        </label>
        <br />

        <label>
          Country:
          <input type="text" name="address.country" placeholder="Country" value={formData.address.country} onChange={handleChange} required/>
        </label>
        <br />
       

        <label>
          Mobile:
          <input type="tel" name="uMobile" placeholder="mob" value={formData.uMobile} onChange={handleChange} required/>
        </label>
        <br />

        <label>
          Role:
          <input type="text" name="uRole" value={formData.uRole} readOnly />
        </label>
        <br />

        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterFarmer;
