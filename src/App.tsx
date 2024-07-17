import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
`;

const App: React.FC = () => {
  return (
    <Container>
      Hello World
    </Container>
  );
};

export default App;
