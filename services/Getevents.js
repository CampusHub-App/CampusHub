import axios from "axios";

export const getevents = async (callback) => {
    try {
        const response = await axios.get("https://campushub.web.id/api/events/all");
        const data = response.data;
        callback(data.events); 
    } catch (error) {
        console.error("Error fetching events:", error);
        callback([]);
    }
}; 
