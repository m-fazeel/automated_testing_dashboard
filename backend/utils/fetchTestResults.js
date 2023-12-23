import axios from 'axios';
import '../dotenv.js';

const fetchFileFromGitHub = async (downloadUrl, GITHUB_TOKEN) => {
    try {
      const headers = {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3.raw'
      };
      const response = await axios.get(downloadUrl, { headers });
      return response.data; // Should return the raw file content
    } catch (error) {
      console.error('Error fetching file:', error);
      return null;
    }
  };
  
  export default fetchFileFromGitHub;
