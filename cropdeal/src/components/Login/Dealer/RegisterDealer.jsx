
import React, { useState } from 'react';
import './RegisterDealer.css';
import { useNavigate } from 'react-router-dom';
import userService from '../../../service/UserService';

const RegisterDealer = () => {
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
        uRole: 'ROLE_DEALER',
    });

    const [errors, setErrors] = useState({
        uName: '',
        uEmail: '',
        uPassword: '',
        uMobile: '',
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

       
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

      
        if (formData.uName.trim() === '') {
            valid = false;
            newErrors.uName = 'Please enter your name';
        }

       

        if (formData.uEmail.trim() === '') {
            valid = false;
            newErrors.uEmail = 'Please enter your email';
        }

      

        if (formData.uMobile.trim() === '') {
            valid = false;
            newErrors.uMobile = 'Please enter your mobile number';
        }

        setErrors(newErrors);

        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const dealer = await userService.register(formData);
                console.log('Dealer registered', dealer.data);
                alert('User Registered Successfully')
                navigate('/dealerlogin');
            } catch (error) {
                console.error('Error during registration', error.message);
            }
        }
    };

    return (
        <div className="register-container">
            <h2>Register Your Details for Login</h2>
            <form onSubmit={handleSubmit} className="register-form">

                <label>
                    Name:
                    <input
                        type="text"
                        name="uName"
                        placeholder="Enter your Name"
                        value={formData.uName}
                        onChange={handleChange}
                        required
                    />
                    <span className="error-message">{errors.uName}</span>
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="uEmail" placeholder="Enter your emailid" value={formData.uEmail} onChange={handleChange} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                </label>
                <br />

                <label>
                    Password:
                    <input type="text" name="uPassword" placeholder="password" value={formData.uPassword} onChange={handleChange} required minLength="8" />
                </label>
                <br />

                <label>
                    Street:
                    <input type="text" name="address.street" placeholder="Street" value={formData.address.street} onChange={handleChange} required />
                </label>
                <br />

                <label>
                    Pincode:
                    <input type="text" name="address.pincode" placeholder="Pincode" value={formData.address.pincode} onChange={handleChange} required />
                </label>
                <br />

                <label>
                    City:
                    <input type="text" name="address.city" placeholder="City" value={formData.address.city} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    State:
                    <input type="text" name="address.state" placeholder="State" value={formData.address.state} onChange={handleChange} required />
                </label>
                <br />

                <label>
                    Country:
                    <input type="text" name="address.country" placeholder="Country" value={formData.address.country} onChange={handleChange} required />
                </label>
                <br />


                <label>
                    Mobile:
                    <input type="tel" name="uMobile" placeholder="mob" value={formData.uMobile} onChange={handleChange} required />
                </label>
                <br />





                <input name="uRole" value={formData.uRole} readOnly />

                <br />

                <button type="submit" className="register-button">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterDealer;



{/* <form onSubmit={handleSubmit} className="register-form">
      

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


 
  <input  name="uRole" value={formData.uRole} readOnly />

<br />

<button type="submit" className="register-button">
  Register
</button>
</form> */}