const express = require('express');
const app = express();
const port = process.env.PORT || 3000

// Middleware to parse JSON bodies
app.use(express.json());

// Webhook endpoint
// Using ngrok to test locally 
// Setup 
app.post('/webhook', (req, res) => {
    // console.log('Webhook received:', req.body);

    if (req.body.action === 'completed' && req.body.workflow_run) {
        const runId = req.body.workflow_run.id;
        console.log('Workflow run id:', runId);
        // Further processing here
    }

    res.status(200).send('Webhook received');
});


app.get('/', (req, res) => res.send('Automated Testing Dashboard Backend is running!'));

app.listen(port, () => console.log(`Server listening on port ${port}`));

