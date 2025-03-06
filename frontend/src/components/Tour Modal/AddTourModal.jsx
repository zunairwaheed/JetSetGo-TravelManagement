// import React, { useState } from "react";

// const AddTourModal = ({ onClose, refreshTours }) => {
//     const [formData, setFormData] = useState({ city: "", country: "", imgUrl: "", price: "", desc: "" });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await fetch("http://localhost:5000/api/tours", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formData),
//         });
//         refreshTours();
//         onClose();
//     };

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg w-96">
//                 <h2 className="text-xl font-bold mb-4">Add New Tour</h2>
//                 <form onSubmit={handleSubmit}>
//                     <input type="text" name="city" placeholder="City" onChange={handleChange} className="border p-2 w-full mb-2" required />
//                     <input type="text" name="country" placeholder="Country" onChange={handleChange} className="border p-2 w-full mb-2" required />
//                     <input type="text" name="imgUrl" placeholder="Image URL" onChange={handleChange} className="border p-2 w-full mb-2" required />
//                     <input type="number" name="price" placeholder="Price" onChange={handleChange} className="border p-2 w-full mb-2" required />
//                     <textarea name="desc" placeholder="Description" onChange={handleChange} className="border p-2 w-full mb-2" required />
//                     <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded w-full">Add Tour</button>
//                 </form>
//                 <button onClick={onClose} className="mt-2 text-gray-500 w-full">Cancel</button>
//             </div>
//         </div>
//     );
// };

// export default AddTourModal;
