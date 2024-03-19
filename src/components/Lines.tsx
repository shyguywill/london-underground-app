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

const ListItem = styled.div<{ isSelected: boolean }>`
  background-color: ${({ isSelected }) => (isSelected ? "#2e9127" : "#113b92")};
  border-radius: 20px;
  padding: 5px 10px;
  margin: 5px;
  color: white;
  cursor: pointer;
`;

interface Line {
  id: string;
  name: string;
  lineStatuses: { statusSeverityDescription: string }[];
}

interface StatusProps {
  lines: Line[];
  onSelectLine: (id: string) => void;
  selectedLine: string | null;
}

const Status: React.FC<StatusProps> = ({
  lines,
  onSelectLine,
  selectedLine,
}) => {
  return (
    <div>
      <h2>Select a Line</h2>
      <SectionWrapper>
        <ListWrapper>
          {lines.map((line) => (
            <ListItem
              key={line.id}
              onClick={() => onSelectLine(line.id)}
              isSelected={selectedLine === line.id}
            >
              {line.name} -{" "}
              {line.lineStatuses.length > 0
                ? line.lineStatuses[0].statusSeverityDescription
                : "No status"}
            </ListItem>
          ))}
        </ListWrapper>
      </SectionWrapper>
    </div>
  );
};

export default Status;
