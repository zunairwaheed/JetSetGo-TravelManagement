import React from 'react'
import HeroSection from '../components/HeroSection/HeroSection'
import SearchBar from '../components/SearchBar/SearchBar'
import Services from '../components/Services/Services'
import FeaturedCard from '../components/FeaturedTour/FeaturedCard'
import GalleryImages from '../components/GalleryImages/GalleryImages'
import Testimonial from '../components/Testimonials/Testimonial'
import NewsLetter from '../components/NewsLetter/NewsLetter'
import TrendingTours from '../components/TrendingTours/TrendingTours'
import SmartSearch from '../components/SmartSearch/SmartSearch'


const Home = () => {
  return (
    <>
      <HeroSection/>
      <SearchBar/>
      <Services/>
      <FeaturedCard/>
      <GalleryImages/>
      <TrendingTours/>
      <SmartSearch/>
      <Testimonial/>
      <NewsLetter/>
    </>
  )
}

export default Home