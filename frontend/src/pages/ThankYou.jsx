import React from 'react';
import { Link } from 'react-router-dom';
const ThankYou = () => {
    return (
        <>
            <div className='mx-10 my-10 md:mx-20 lg:mx-36 xl:mx-[280px] h-96 flex flex-col justify-center items-center gap-5'>
                <div className=' font-bold text-main text-4xl'>Thank You!</div>
                <div className=''>
                    <button>
                        <Link to="/" className="text-sm text-white bg-main p-2 rounded font-semibold">Back To Home</Link>
                    </button>
                </div>
            </div>
        </>
    );
}

export default ThankYou;
