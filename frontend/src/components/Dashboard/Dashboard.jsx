import React, { useEffect, useState } from 'react';
import Card from './Card';
import { FaBox, FaCog, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { BASE_URL } from '../../utils/config';
import { dataLine, dataBar } from '../../assets/chartData.jsx';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
    const [counts, setCounts] = useState({ tours: 0, bookings: 0, users: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCount = async (endpoint, key) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, { credentials: 'include' });
            if (!response.ok) throw new Error(`Failed to fetch ${key} count`);
            const data = await response.json();
            setCounts(prevCounts => ({ ...prevCounts, [key]: data.data }));
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
            <div className="grow p-8">
                <h2 className="text-2xl font-bold mb-4"><span className="text-main">Dash</span>board</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {renderCard(<FaShoppingCart />, 'Bookings', 'bookings')}
                    {renderCard(<FaBox />, 'Tours', 'tours')}
                    {renderCard(<FaUsers />, 'Users', 'users')}
                    <Card icon={<FaCog />} title="Settings" value="11" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Sales Data</h3>
                        <Line data={dataLine} />
                    </div>
                    <div className="bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Products Data</h3>
                        <Bar data={dataBar} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
