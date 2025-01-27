import React from 'react'
import HeroSection from '../components/HeroSection/HeroSection'
import SearchBar from '../components/SearchBar/SearchBar'
import Services from '../components/Services/Services'
import FeaturedCard from '../components/FeaturedTour/FeaturedCard'
import GalleryImages from '../components/GalleryImages/GalleryImages'
import Testimonial from '../components/Testimonials/Testimonial'
import NewsLetter from '../components/NewsLetter/NewsLetter'


const Home = () => {
  return (
    <>
      <HeroSection/>
      <SearchBar/>
      <Services/>
      <FeaturedCard/>
      <GalleryImages/>
      <Testimonial/>
      <NewsLetter/>
    </>
  )
}

export default Home