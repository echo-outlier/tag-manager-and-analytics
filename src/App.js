import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Routes from "./routes";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  height: 100vh;
`;

const App = () => {
  return (
    <Container>
      <Routes />
    </Container>
  );
};

export default App;
