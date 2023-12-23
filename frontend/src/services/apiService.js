const BASE_URL = 'http://localhost:3000/api'; // Adjust this to your backend server's URL

const fetchApi = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
};

export default fetchApi;