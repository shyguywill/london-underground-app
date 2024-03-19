import React from "react";
import styled from "styled-components";

const SectionWrapper = styled.div`
  align-items: center;
  border-radius: 6px;
  box-sizing: border-box;
  color: rgb(170, 170, 170);
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  justify-content: space-between;
  padding: 16px 16px 16px 0;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.div`
  background-color: gray;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 5px;
  color: white;
  cursor: pointer;
`;

interface StopDetails {
  commonName: string;
  modes: string[];
  lines: { id: number; name: string }[];
}

interface StopInfoProps {
  stopDetails: StopDetails | null;
}

const StopInfo: React.FC<StopInfoProps> = ({ stopDetails }) => {
  if (!stopDetails) return null;
  const { commonName, modes, lines } = stopDetails;

  return (
    <SectionWrapper>
      <h2>{commonName}</h2>
      <ListWrapper>
        {modes.map((mode, index) => (
          <ListItem key={index}>{mode}</ListItem>
        ))}
      </ListWrapper>
      <ListWrapper>
        {lines.map((line) => (
          <ListItem key={line.id}>{line.name}</ListItem>
        ))}
      </ListWrapper>
    </SectionWrapper>
  );
};

export default StopInfo;
