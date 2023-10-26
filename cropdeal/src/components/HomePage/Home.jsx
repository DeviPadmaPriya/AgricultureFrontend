import React from 'react'
import Navbar from '../Navbar/Navbar';


import BackgroungGif from './image1.jpg'
import Footer from './Footer';

    const Home = () => {
        const backgroundImageStyle = {
           
          backgroundImage:  `url(${BackgroungGif})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh', 
        };

  return (
    <div  style={backgroundImageStyle}>
        <Navbar/>
        <Footer/>
    </div>

         
  
  )
}

export default Home;