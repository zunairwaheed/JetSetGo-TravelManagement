import React from 'react'
import heroImg from '../../assets/heroImg.png'

const HeroSection = () => {
    return (
        <>
            <div className="mt-10 px-10 md:px-20 lg:px-36 xl:px-[280px]">
                <div className="flex flex-col lg:flex-row lg:gap-8">
                    <div className="lg:order-first lg:w-1/2">
                        <div className="font-bold text-center lg:text-left mt-3 lg:mt-12 text-xl md:text-3xl lg:text-4xl xl:text-5xl">
                            Get started your <br /> exiting <span className="text-[#FA7436]">journey</span> <br /> with us
                        </div>
                        <p className="mt-3 text-center lg:text-start lg:text-base xl:text-lg">
                            A Team of experienced tourism professionals will <br /> provide you with
                            the best advice and tips for your <br /> desire place.
                        </p>
                    </div>
                    <div className="order-first lg:w-1/2">
                        <img src={heroImg} alt="" />
                    </div>
                </div>

                
            </div>
        </>
    )
}

export default HeroSection