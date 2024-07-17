import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  background-color: #f0f4f8; /* 背景色を変更 */
  padding: 20px;
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin: 10px;
  padding: 15px 25px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 25px;
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 6px 6px 12px #cfcfcf, -6px -6px 12px #ffffff;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 4px 4px 10px #cfcfcf, -4px -4px 10px #ffffff;
  }

  &:active {
    box-shadow: inset 4px 4px 10px #cfcfcf, inset -4px -4px 10px #ffffff;
  }
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px; /* サイズを大きく */
  height: 150px; /* サイズを大きく */
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  border-radius: 50%;
  margin-top: 20px;
  box-shadow: 6px 6px 12px #cfcfcf, -6px -6px 12px #ffffff;
  font-size: 20px; /* 文字サイズを大きく */
`;

const App: React.FC = () => {
  return (
    <Container>
      <div>Hello World</div>
      <Circle>00:05:00</Circle>
      <ButtonArea>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonArea>
    </Container>
  );
};

export default App;
