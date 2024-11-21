import React, { useState } from 'react'
import './Popup.css'

function Popup() {
  return (
    <div className='popup' >
        {/* style={{display:flex}} */}
      <div>Order from Kolkata</div>
      <div>
        <div>1. Paneer Pizza</div>
        <div>2. Chineese Noodles</div>
      </div>
      <div className='options'>
        <div className='cancel'>Cancel</div>
        <div className='accepts'>Accept</div>
        {/* onClick={()=>setFlex('none')} */}
      </div>
    </div>
  )
}

export default Popup
