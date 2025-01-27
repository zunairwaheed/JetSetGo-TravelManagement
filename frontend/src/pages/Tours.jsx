import React from 'react'
import SeachBar from '../components/SearchBar/SearchBar'
import NewsLetter from '../components/NewsLetter/NewsLetter'
import CommonPicture from '../components/CommonPicture/CommonPicture'
import TourCards from '../components/CommonPicture/TourCards'

const Tour = () => {
  return (
    <>
      <CommonPicture/>
      <TourCards/>
      <SeachBar />
      <NewsLetter />
    </>
  )
}

export default Tour