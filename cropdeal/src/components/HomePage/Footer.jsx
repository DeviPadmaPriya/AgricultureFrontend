import React from 'react'


const Footer = () => {
    const footerStyle = {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: '#f8f8f8', // Set your desired background color
      textAlign: 'center',
      padding: '10px 0',
      height:'50px' // Adjust the padding as needed
    };
  
    return (
      <footer style={footerStyle}>
        {/* Add your footer content here */}
        <p>&copy; 2023 Capgemini. All rights reserved.</p>
      </footer>
    );
  };
  
  

  export default Footer;