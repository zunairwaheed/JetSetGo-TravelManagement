import Testimonial from "../models/Testimonials.js";

// ✅ Create a new testimonial
export const createTestimonial = async (req, res) => {
    try {
        const newTestimonial = new Testimonial(req.body);
        const savedTestimonial = await newTestimonial.save();
        res.status(201).json({ success: true, data: savedTestimonial });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get all testimonials
export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json({ success: true, data: testimonials });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get a single testimonial by ID
export const getTestimonialById = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) return res.status(404).json({ success: false, message: "Testimonial not found" });
        res.status(200).json({ success: true, data: testimonial });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update a testimonial
export const updateTestimonial = async (req, res) => {
    try {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTestimonial) return res.status(404).json({ success: false, message: "Testimonial not found" });
        res.status(200).json({ success: true, data: updatedTestimonial });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete a testimonial
export const deleteTestimonial = async (req, res) => {
    try {
        const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!deletedTestimonial) return res.status(404).json({ success: false, message: "Testimonial not found" });
        res.status(200).json({ success: true, message: "Testimonial deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
