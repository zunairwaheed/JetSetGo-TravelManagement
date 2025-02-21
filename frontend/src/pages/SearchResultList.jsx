import { useLocation } from "react-router-dom";
import CommonPicture from "../components/CommonPicture/CommonPicture";

const SearchTourList = () => {
    const location = useLocation();

    return (
        <>
        <CommonPicture/>
        </>
    );
};

export default SearchTourList;
