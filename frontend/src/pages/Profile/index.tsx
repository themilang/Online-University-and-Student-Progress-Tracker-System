import React from 'react'
import logo from '../../assets/profile-circle.svg'
const Profile  = () => {
  return (
   <>
  
    <img className='m-auto w-60' src={logo} alt="img" />
  
    <div className= " w-60   m-auto flex flex-row  justify-center items-center bg-blue-200 text-3xl text-center  rounded-t-lg cursor-pointer  ">
    <ul className="list-group list-none">
  <li className="list-group-item">Full Name: </li>
  <li className="list-group-item">Roles:</li>
  <li className="list-group-item">Merit:</li>

</ul>
    </div>

   
   
   
   
   </>
    

  )
}

export default Profile 