import './Outlet.css'
import outlet from '../../Images/outlet.webp'

function Outlet() {
  return (
    <div className='outlet'>
        <div className='' style={{display:'flex',flexDirection:'column'}}>
        <img src={outlet} alt="" />
        <p>No outlet here</p>
        </div>
    </div>
  )
}

export default Outlet