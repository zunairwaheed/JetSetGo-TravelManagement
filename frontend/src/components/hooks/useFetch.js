import {useState, useEffect} from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true)
            setError(null);

            try{
                const res = await fetch(url, { credentials: "include" });
                if(!res.ok){
                    setError("Failed to Fetch")
                }
                const result = await res.json()
                setData(Array.isArray(result) ? result : result.data || []);
                setLoading(false)
            }
            catch(err){
                setError(err.message)
                setLoading(false)
            }
        };
        fetchData();
    },[url]);
    return{
        data,
        error,
        loading
    }
}
export default useFetch;