import React from 'react'
import pic from "../../assets/CommonPic.jpg"

const CommonPicture = () => {
  return (
    <>
    <div className='my-10'>
        <img src={pic} alt="" className='h-96 w-full shadow-md'/>
    </div>
    </>
  )
}

export default CommonPicture