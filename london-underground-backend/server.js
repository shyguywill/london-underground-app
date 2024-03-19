const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/lineStatus', async (req, res) => {
  try {
    const response = await axios.get('https://api.tfl.gov.uk/line/mode/tube/status');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching line status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/lineStations/:lineId', async (req, res) => {
  const { lineId } = req.params;
  try {
    const response = await axios.get(`https://api.tfl.gov.uk/line/${lineId}/route/sequence/outbound`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching line branches:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/stationDetails/:stopId', async (req, res) => {
  const { stopId } = req.params;
  try {
    // Fetch stop details for the specific stop ID
    const response = await axios.get(`https://api.tfl.gov.uk/StopPoint/${stopId}`);
    const stopDetails = response.data;
    res.json(stopDetails);
  } catch (error) {
    console.error(`Error fetching stop details for stop ID ${stopId}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
