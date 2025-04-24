import { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(url, { credentials: "include" });
            if (!res.ok) {
                setError("Failed to Fetch");
            }
            const result = await res.json();
            setData(Array.isArray(result) ? result : result.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        error,
        loading,
        refetch: fetchData,
    };
};

export default useFetch;
