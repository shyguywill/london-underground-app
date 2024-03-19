import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import StopInfo from "./StopInfo";

const Station = styled.div<{ $isLast: boolean }>`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ $isLast }) =>
    !$isLast &&
    `
    &:not(:last-child)::before {
      content: "";
      position: relative;
      width: 2px;
      height: 20px;
      background-color: blue;
      left: 5px;
      top: 10px;
    }
  `}
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Dot = styled.div`
  width: 10px;
  min-width: 10px;
  height: 10px;
  min-height: 10px;
  border-radius: 50%;
  background-color: black;
  position: relative;
  margin-right: 5px;
`;

const Dropdown = styled.div`
  background-color: gray;
  margin-left: 10px;
  font-size: 9px;
  border-radius: 6px;
  padding: 0px 6px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DropdownContent = styled.div<{ $isOpen: boolean }>`
  margin-top: 8px;
  border-radius: 6px;
  position: relative;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 10px;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
`;

interface Station {
  id: string;
  name: string;
}

interface StopDetails {
  id: string;
  commonName: string;
  modes: string[];
  additionalProperties: { key: string; value: any }[];
  lines: { id: number; name: string }[];
}

interface StatusProps {
  station: Station;
  isLast: boolean;
}

const Stops: React.FC<StatusProps> = ({ station, isLast }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [stopDetails, setStopDetails] = useState<StopDetails | null>(null);

  const handleStationSelect = (stationId: string) => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/stationDetails/${stationId}`
      )
      .then((response) => {
        setStopDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching line stops:", error);
      });
  };

  useEffect(() => {
    if (stopDetails?.id === station?.id) {
      setDropdownOpen(true);
    }
  }, [station, stopDetails]);

  const selectStop = () => {
    if (dropdownOpen) {
      setDropdownOpen(false);
    } else {
      handleStationSelect(station.id);
    }
  };

  return (
    <ContentWrapper>
      <Station onClick={selectStop} $isLast={isLast}>
        <Dot />
        <Text>{station.name}</Text>
        <Dropdown> Details</Dropdown>
      </Station>
      <DropdownContent $isOpen={dropdownOpen}>
        <StopInfo stopDetails={stopDetails} />
      </DropdownContent>
    </ContentWrapper>
  );
};

export default Stops;
