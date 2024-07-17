import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const Circle = styled.div`
  width: 100px;
  height: 100px;
  background-color: blue;
  border-radius: 50%;
  margin-top: 20px;
`;

const App: React.FC = () => {
  return (
    <Container>
      <div>Hello World</div>
      <Circle></Circle>
      <ButtonArea>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonArea>
    </Container>
  );
};

export default App;
