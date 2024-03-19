import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [lineStatus, setLineStatus] = useState<any[]>([]);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [lineStations, setLineStations] = useState<any>(null);
  const [lineStops, setLineStops] = useState<any[]>([]);

  console.log({lineStatus, selectedLine, lineStations, lineStops})

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/lineStatus`)
      .then(response => {
        setLineStatus(response.data);
      })
      .catch(error => {
        console.error('Error fetching line status:', error);
      });
  }, []);

  const handleLineSelect = (lineId: string) => {
    setSelectedLine(lineId);
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/lineStations/${lineId}`)
      .then(response => {
        console.log({ response })
        setLineStations(response.data);
      })
      .catch(error => {
        console.error('Error fetching line branches:', error);
      });
  };

  const handleStationSelect = (stationId: string) => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/stationDetails/${stationId}`)
      .then(response => {
        setLineStops(response.data);
      })
      .catch(error => {
        console.error('Error fetching line stops:', error);
      });
  };

  return (
    <div>
      <h1>London Underground</h1>
      <h2>Line Statuses</h2>
      <ul>
        {lineStatus.map(line => (
          <li key={line.id}>{line.name} - {line.lineStatuses[0].statusSeverityDescription}</li>
        ))}
      </ul>

      <h2>Select a Line</h2>
      <ul>
        {lineStatus.map(line => (
          <li key={line.id} onClick={() => handleLineSelect(line.id)}>{line.name}</li>
        ))}
      </ul>

      {selectedLine && lineStations && (
        <div key={selectedLine}>
          <h2>{selectedLine} Branches</h2>
          <ul>
            {lineStations.stations.map(station =>  (
              <li key={station.id} onClick={() => handleStationSelect(station.id)}>{station.name}</li>
            ))}
          </ul>

          <h2>{selectedLine} Stops</h2>
          <ul>
            {lineStops.map(stop => (
              <li key={stop.id}>{stop.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
