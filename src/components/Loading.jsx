import React from "react";
import styled from "styled-components";
import { FaSpinner } from "react-icons/fa";

const Loading = ({ text = "Loading..." }) => {
  return (
    <StyledLoadingWrapper>
      <StyledSpinner />
      <StyledLoadingText>{text}</StyledLoadingText>
    </StyledLoadingWrapper>
  );
};

export default Loading;

// Wrapper for the loading spinner
const StyledLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50vh;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
`;

// Styled spinner with rotation animation
const StyledSpinner = styled(FaSpinner)`
  font-size: 50px;
  color: white;
  animation: spin 1s infinite linear;

  /* Keyframes for spinner rotation */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Loading text style
const StyledLoadingText = styled.p`
  color: white;
  font-family: "Arial";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  margin-top: 20px;
`;
