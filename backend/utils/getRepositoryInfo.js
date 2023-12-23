// utils/getRepositoryInfo.js
import axios from 'axios';

const getRepositoryInfo = async (owner, repo, GITHUB_TOKEN) => {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}`;
    const headers = { 'Authorization': `token ${GITHUB_TOKEN}` };
    const response = await axios.get(url, { headers });
    const { id: repoId, name } = response.data;
    return { repoId, name };
  } catch (error) {
    console.error('Error fetching repository information:', error);
    return null;
  }
};

export default getRepositoryInfo;
