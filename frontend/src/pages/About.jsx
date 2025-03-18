import React from 'react'

const About = () => {
  return (
    <>
      <div className='my-10'>
        <div className="text-gray-800">
          {/* Hero Section */}
          <section className="bg-[#FA7436] text-white py-20 px-5 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Tour Booking Platform</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Experience a seamless way to explore, book, and manage tours with our powerful and intuitive platform.
            </p>
          </section>

          {/* Main Features Section */}
          <section className="py-16 px-5 max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold text-center text-[#FA7436]">Why Choose Us?</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-10">
              {/* Feature 1 */}
              <div className="p-6 bg-white shadow-lg rounded-lg border-l-4 border-[#FA7436]">
                <h3 className="text-2xl font-semibold text-[#FA7436]">Easy & Secure Booking</h3>
                <p className="text-gray-600 mt-2">
                  Our platform offers a seamless **user authentication** system, allowing you to sign up, log in, and book tours hassle-free.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="p-6 bg-white shadow-lg rounded-lg border-l-4 border-[#FA7436]">
                <h3 className="text-2xl font-semibold text-[#FA7436]">Safe & Secure Payments</h3>
                <p className="text-gray-600 mt-2">
                  We use **Stripe integration** to provide a fast and secure payment experience, ensuring your transactions are safe.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="p-6 bg-white shadow-lg rounded-lg border-l-4 border-[#FA7436]">
                <h3 className="text-2xl font-semibold text-[#FA7436]">Featured & Exclusive Tours</h3>
                <p className="text-gray-600 mt-2">
                  Discover handpicked **featured tours**, curated by travel experts to offer the best travel experiences worldwide.
                </p>
              </div>
              {/* Feature 4 */}
              <div className="p-6 bg-white shadow-lg rounded-lg border-l-4 border-[#FA7436]">
                <h3 className="text-2xl font-semibold text-[#FA7436]">Best Prices & Special Offers</h3>
                <p className="text-gray-600 mt-2">
                  We provide **competitive pricing** with special discounts and deals, ensuring you get the best value for your trip.
                </p>
              </div>
            </div>
          </section>


          {/* Contact Us Section */}
          <section className="bg-gray-100 py-16 px-5 text-center">
            <h2 className="text-3xl font-semibold text-[#FA7436]">Contact Us</h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Have questions or need support? Get in touch with us.
            </p>
            <div className="mt-6">
              <p className="text-lg font-semibold text-gray-800">Email: jetsetgo.travels@gmail.com</p>
              <p className="text-lg font-semibold text-gray-800">Phone: +92 324 0048893</p>
              <p className="text-lg font-semibold text-gray-800">Location: Gulberg III, Lahore, Pakistan</p>
            </div>
          </section>
        </div>

      </div>
    </>
  )
}

export default About