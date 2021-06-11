import styled from "styled-components";

export const Form = styled.form`
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;  
  flex-wrap: wrap;
  border: 1px solid #aaa;
  padding: 5px;
  margin: 10px;
`;

export const Select = styled.select`
  width: fit-content;
  height: 36px;
  margin: 5px; 
  font-size: 16px;   
`;

export const Option = styled.option`
  font-size: 16px;
`;

export const Input = styled.input`
  width: 100px;
  height: 30px;
  font-size: 16px;
  margin: 5px;    
`;

export const Button = styled.button`
  width: 100px;
  height: 36px;
  font-size: 16px;
  margin: 5px;    
`;