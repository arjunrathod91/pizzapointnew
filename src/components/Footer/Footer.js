import React from 'react'
import '../Footer/Footer.css'
import logo from '../../Images/logo.png'

function Footer() {
  return (
    <div className='footer'>
      <div className='link-sec'>
        <div className='footer-logo'>
          <div className='main-logo'>
            <div className='pp-logo'>
              <img src={logo} alt="logo img"/>
              <span>Pizza Point</span>
            </div>
            {/* <div className='pp-logo'>
            </div> */}
          </div>
        </div>
        <div className='all-links'>
          <div className='links'>
            <span>About Pizzapoint</span>
            <span className="footer-l">Who We Are</span>
            <span className="footer-l">Blog</span>
            <span className="footer-l">Contact Us</span>
            <span className="footer-l">Home</span>
          </div>
          <div className='links'>
            <span>Learn More</span>
            <span className="footer-l">Terms</span>
            <span className="footer-l">Privacy</span>
            <span className="footer-l">Policy</span>
          </div>
          <div className='links'>
            <span>All Links</span>
            <span className="footer-l">Home</span>
            <span className="footer-l">Meals</span>
            <span className="footer-l">Outlets</span>
            <span className="footer-l">Offers</span>
          </div>
          <div className='links'>
            <span>Social Links</span>
            <span classname="footer-l">Instagram</span>
            <span classname="footer-l">Youtube</span>
            <span classname="footer-l">Zomato</span>
            <span classname="footer-l">Swiggy</span>
          </div>
        </div>
      </div>
      <div className='footer-tag'>© {new Date().getFullYear()} PizzaPoint. All rights reserved.</div>
    </div>
  )
}

export default Footer
