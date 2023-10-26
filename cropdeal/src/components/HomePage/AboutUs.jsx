import React from 'react'
import Footer from './Footer';

const AboutUs = () => {
    return (
        <div>
        <div className="card mt-4" style={{ maxWidth: '800px', marginLeft: '400px' }}>
            <div className="card-header">
                <strong>Our Vision</strong>
                <p>
                    Our vision is to provide opportunities for increasing net incomes in the agriculture sector and creating a prosperous, progressive and proud farmer by setting up efficient and knowledge-based marketing systems and services.
                </p>
            </div>

            <div>
                <strong>Our Mission</strong>
                <ul>
                    <li>Set up efficient marketing services</li>
                    <li>Integrate and professionalise delivery of agricultural services and get better value for the farmer's produce</li>
                    <li>Facilitate diversification of crops and promote judicious and profitable use of land resources</li>
                    <li>Introduce knowledge and technology-based interventions</li>
                    <li>The enforcement of Act, Rules, and Bye-laws</li>
                    <li>Improve skill sets and awareness of the farmers</li>
                    <li>Develop quality control and standards in the agriculture sector</li>
                </ul>
            </div>
          
        </div>
          <Footer/>
          </div>
    );
};

export default AboutUs;