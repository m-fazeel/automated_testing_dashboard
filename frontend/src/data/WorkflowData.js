import fetchApi from "../services/apiService";

const getWorkflowData = async () => {
    try {
        const workflowData = await fetchApi('/workflowrun');
        return workflowData;
    } catch (error) {
        console.error("Error fetching workflow data:", error);
        throw error;
    }
};

export  { getWorkflowData };