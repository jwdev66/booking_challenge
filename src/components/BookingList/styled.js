import styled from "styled-components";

export const Container = styled.div`  
  flex: 1;
  overflow-y: auto;  
`;

export const Table = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
`;

export const THead = styled.thead``;

export const TBody = styled.tbody``;

export const TR = styled.tr`
  border: 1px solid #ddd;    
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TH = styled.th`
  border: 1px solid #ddd;
  padding: 5px;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  background-color: #aaa;
`;

export const TD = styled.td`
  border: 1px solid #ddd;
  padding: 5px;
  font-size: 16px;
  font-weight: 500;  
`;

export const Button = styled.button`  
  font-size: 16px;
  margin: 5px;    
`;