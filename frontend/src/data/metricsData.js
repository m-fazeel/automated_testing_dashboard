import fetchApi from "../services/apiService";

const getMetricsData = async () => {
    try {
        const metrics = await fetchApi('/metrics');
        return metrics;
    } catch (error) {
        console.error("Error fetching workflow data:", error);
        throw error;
    }
};

export  { getMetricsData };