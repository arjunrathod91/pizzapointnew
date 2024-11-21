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
              <img src={logo}/>
              <span>Pizza Point</span>
            </div>
            {/* <div className='pp-logo'>
            </div> */}
          </div>
        </div>
        <div className='all-links'>
          <div className='links'>
            <span>About Pizzapoint</span>
            <a>Who We Are</a>
            <a>Blog</a>
            <a>Contact Us</a>
            <a>Home</a>
          </div>
          <div className='links'>
            <span>Learn More</span>
            <a>Terms</a>
            <a>Privacy</a>
            <a>Policy</a>
          </div>
          <div className='links'>
            <span>All Links</span>
            <a>Home</a>
            <a>Meals</a>
            <a>Outlets</a>
            <a>Offers</a>
          </div>
          <div className='links'>
            <span>Social Links</span>
            <a>Instagram</a>
            <a>Youtube</a>
            <a>Zomato</a>
            <a>Swiggy</a>
          </div>
        </div>
      </div>
      <div className='footer-tag'>@pizzapoint.com</div>
    </div>
  )
}

export default Footer
