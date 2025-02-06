// import React from 'react'
// import Card from '../Common/Card.jsx';
// import { TourCardsData } from '../../Data/index.js';

// const TourCards = () => {
//     return (
//         <>
//             <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 mx-10 md:mx-20 lg:mx-36 xl:mx-[280px] py-10'>
//                 <Card data={TourCardsData} />
//             </div>

//         </>
//     )
// }

// export default TourCards

import React from 'react';
import Card from '../Common/Card.jsx';
import { TourCardsData } from '../../Data/index.js';

const TourCards = () => {
    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 mx-10 md:mx-20 lg:mx-36 xl:mx-[280px] py-10'>
            {TourCardsData.map((item) => (
                <Card 
                    key={item.id} 
                    cid={item.id} 
                    img={item.imgUrl} 
                    ccity={item.city} 
                    crating={item.rating} 
                    cdesc={item.desc} 
                    cprice={item.price} 
                    cBook={item.Book} 
                />
            ))}
        </div>
    );
};

export default TourCards;
