import React, { useEffect, useState } from 'react';
import Card from './Card';
import { FaBox, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { BASE_URL } from '../../utils/config';
import { dataLineTemplate, dataBarTemplate } from '../../assets/chartData.jsx';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
    const [counts, setCounts] = useState({ tours: 0, bookings: 0, users: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize states using templates
    const [dataLine, setDataLine] = useState(dataLineTemplate);
    const [dataBar, setDataBar] = useState(dataBarTemplate);

    const fetchCount = async (endpoint, key) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, { credentials: 'include' });
            if (!response.ok) throw new Error(`Failed to fetch ${key} count`);
            const data = await response.json();

            setCounts(prevCounts => {
                const updatedCounts = { ...prevCounts, [key]: data.data };

                // Update Chart Data
                setDataLine({
                    ...dataLine,
                    datasets: [
                        {
                            ...dataLine.datasets[0],
                            data: [updatedCounts.users, updatedCounts.bookings, updatedCounts.tours ],
                        },
                    ],
                });

                setDataBar({
                    ...dataBar,
                    datasets: [
                        {
                            ...dataBar.datasets[0],
                            data: [updatedCounts.users, updatedCounts.bookings, updatedCounts.tours],
                        },
                    ],
                });

                return updatedCounts;
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCount('/tours/search/getTourCount', 'tours');
        fetchCount('/bookings/search/getBookingCount', 'bookings');
        fetchCount('/users/search/getUserCount', 'users');
    }, []);

    const renderCard = (icon, title, key) => (
        <Card
            icon={icon}
            title={title}
            value={loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-3 w-3 border-t-4 border-gray-600"></div>
                </div>
            ) : error ? 'Error' : counts[key]}
        />
    );

    return (
        <>
            <div className="grow p-6">
                <h2 className="text-2xl font-bold mb-4"><span className="text-main">Dash</span>board</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 h-">
                    {renderCard(<FaShoppingCart className='text-main'/>, 'Bookings', 'bookings')}
                    {renderCard(<FaBox className='text-main'/>, 'Tours', 'tours')}
                    {renderCard(<FaUsers className='text-main'/>, 'Users', 'users')}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Data<span className='text-main'>Line</span></h3>
                        <Line data={dataLine} />
                    </div>
                    <div className="bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4"><span className='text-main'>Data</span>Bar</h3>
                        <Bar data={dataBar} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
