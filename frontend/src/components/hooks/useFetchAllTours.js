import {useState, useEffect} from "react";

const useFetchAllTours = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllTours = async () => {
            setLoading(true);
            let allTours = [];
            let page = 0;
            let moreData = true;

            try {
                while (moreData) {
                    const res = await fetch(`${url}?page=${page}`);
                    if (!res.ok) throw new Error("Failed to fetch");
                    
                    const result = await res.json();
                    allTours = [...allTours, ...result.data];

                    if (result.data.length < 8) {
                        moreData = false;
                    } else {
                        page++;
                    }
                }

                setData(allTours);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllTours();
    }, [url]);

    return { data, error, loading };
};

export default useFetchAllTours;
