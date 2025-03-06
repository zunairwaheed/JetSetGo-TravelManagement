import React, { useEffect, useState } from 'react';
import Card from '../Common/Card.jsx';
import useFetch from '../hooks/useFetch.js';
import { BASE_URL } from '../../utils/config.js';

const TourCards = () => {
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const limit = 8; 

    // Fetch tours based on the current page
    const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}&limit=${limit}`);
    const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

    // Update page count when tourCount changes
    useEffect(() => {
        const pages = Math.ceil(tourCount / limit);
        setPageCount(pages);
        window.scrollTo(0,0);
    }, [page,tourCount, tours]); 

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < pageCount) {
            setPage(newPage);
        }
    };

    return (
        <div>
            {/* Display Tour Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 mx-10 md:mx-20 lg:mx-36 xl:mx-[280px] py-10">
                {loading && <h4>Loading...</h4>}
                {error && <h4>{error}</h4>}
                {!loading && !error && tours.map((item) => (
                    <Card
                        key={item._id}
                        cid={item._id}
                        img={item.imgUrl}
                        ccity={item.city}
                        crating={item.rating}
                        cdesc={item.desc}
                        cprice={item.price}
                        cBook={item.book}
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 py-4">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 0}
                    className="p-1 bg-main text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="text-sm flex justify-center items-center">{page + 1} / {pageCount}</span>

                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pageCount - 1}
                    className="p-1 bg-main text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TourCards;
