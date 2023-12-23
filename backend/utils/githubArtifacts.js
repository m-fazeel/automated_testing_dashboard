import axios from 'axios';
import fetchFileFromGitHub from './fetchTestResults.js';

const downloadArtifacts = async (owner, repo, GITHUB_TOKEN) => {
    try {
        const metadataUrl = `https://api.github.com/repos/${owner}/${repo}/contents/app/build/test-results/test?ref=main`;
        const headers = {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3.raw'
        };

        const metadataResponse = await axios.get(metadataUrl, { headers });
        const filesMetadata = metadataResponse.data;

        let fileContents = [];

        for (const fileMetadata of filesMetadata) {
            if (fileMetadata.type === 'file' && fileMetadata.name.endsWith('.xml')) {
                const fileContent = await fetchFileFromGitHub(fileMetadata.download_url, GITHUB_TOKEN);
                fileContents.push(fileContent);
            }
        }

        return fileContents; // Return the array of file contents
    } catch (error) {
        console.error('Error in downloading artifacts:', error);
        return []; // Return an empty array in case of an error
    }
};

export default downloadArtifacts;
