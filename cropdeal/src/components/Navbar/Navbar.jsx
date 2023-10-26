import React from 'react'
import { Link } from 'react-router-dom';
 import './Navbar.css';


 
 function Navbar() {
   return (
    <nav  className="Navbar  navbar navbar-light">

           <h2  style={{ marginLeft: '260px' }}>FARM-DEAL</h2>
            <ul>
             <li>
                <Link to="/" className="btn btn-primary">Home</Link>
             </li>
             <li>
                <Link to="/farmlogin" className="btn btn-outline-info">For Farmers</Link>
                 </li>
                 <li>
               <Link to="/dealerlogin" className="btn btn-outline-info">For Dealers</Link>
             </li>
             <li>
                <Link  to="/aboutus" className="btn btn-outline-dark" style={{ marginRight: '50px' }}>About us</Link>
             </li>
            </ul>
         </nav>
   )
 }
 
 export default Navbar

// export default function Navbar() {
//   return (

// <nav  className="Navbar  navbar navbar-light" style={{ backgroundColor: '#e3f2fd' }}>

//        <h2>Crop Deal</h2>
//        <ul>
//         <li>
//            <Link to="/" className="btn btn-primary">Home</Link>
//         </li>
//         <li>
//            <Link to="/farmlogin" className="btn btn-outline-info">For Farmers</Link>
//             </li>
//             <li>
//            <Link to="/dealerlogin" className="btn btn-outline-info">For Dealers</Link>
//         </li>
//         <li>
//            <Link className="btn btn-outline-dark">Contact us</Link>
//         </li>
//        </ul>
//     </nav>
//   )
// }
