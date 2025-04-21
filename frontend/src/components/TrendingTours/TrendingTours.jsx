import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import Card from "../Common/Card.jsx";

const TrendingTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tours/trending`);
        const data = await res.json();
        console.log("Trending Tours Response:", data);

        if (Array.isArray(data)) {
          setTours(data);
        } else {
          setError("Failed to load trending tours.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return <p className="p-4">Loading trending tours...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }
  return (
    <>
      <div className="mx-10 md:mx-20 lg:mx-36 xl:mx-[280px]">
        <div className="py-10 max-w-screen-xl mx-auto">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
            Trending <span className="text-main">Tours</span>
          </h1>
          <p className="text-xs text-center pt-3 pb-3 px-8 md:px-48 lg:px-56 xl:px-72 2xl:px-80">
            Top 3 tours trending now.
          </p>
          <div>
            {tours.length === 0 ? (
              <p>No trending tours found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-10">
                {tours.map((tour) => (
                  <Card
                    key={tour._id}
                    cid={tour._id}
                    img={tour.imgUrl}
                    ccity={tour.city}
                    crating={tour.rating}
                    cdesc={tour.desc}
                    cprice={tour.price}
                    cfeatured={tour.featured}
                    cdate={new Date(tour.date).toLocaleDateString()}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default TrendingTours;
