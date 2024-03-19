import React, { useState, useEffect } from "react";
import axios from "axios";
import { Lines, Stop } from "./components";
import styled from "styled-components";

const AppWrapper = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
`;

const StopsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

interface Station {
  id: string;
  name: string;
}

const App: React.FC = () => {
  const [lineStatus, setLineStatus] = useState<any[]>([]);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [lineStops, setLineStops] = useState<{ stations: Station[] } | null>(
    null
  );

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/lineStatus`)
      .then((response) => {
        setLineStatus(response.data);
      })
      .catch((error) => {
        console.error("Error fetching line status:", error);
      });
  }, []);

  const handleLineSelect = (lineId: string) => {
    setSelectedLine(lineId);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/lineStations/${lineId}`)
      .then((response) => {
        setLineStops(response.data);
      })
      .catch((error) => {
        console.error("Error fetching line branches:", error);
      });
  };

  return (
    <AppWrapper>
      <h1>London Underground</h1>

      <Lines
        lines={lineStatus}
        onSelectLine={(id) => handleLineSelect(id)}
        selectedLine={selectedLine}
      />

      {selectedLine && lineStops && (
        <div style={{ width: "100%" }}>
          <StopsWrapper>
            {lineStops.stations.map((station: Station, index) => (
              <Stop
                key={station.id}
                isLast={index === lineStops.stations.length - 1}
                station={station}
              />
            ))}
          </StopsWrapper>
        </div>
      )}
    </AppWrapper>
  );
};

export default App;
