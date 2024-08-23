import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate("");

  const handleSubmit = () => {
    if (searchTerm) {
      navigate(`/react-gh-secret/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <>
      <StyledInputContainer>
        <form onSubmit={() => handleSubmit()}>
          <StyledInput
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onInput={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </form>
      </StyledInputContainer>
    </>
  );
};

export default SearchBar;

const StyledInputContainer = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
`;

const StyledInput = styled.input`
  font-family: DejaVu Sans Mono, monospace;
  background: none;
  border-radius: 0;
  border: 0;
  padding: 5px 40px 4px 15px;
  width: 100%;
  transition: all 0.15s ease;
  border-bottom: 2px solid #004aad;
  outline: none;
  color: white;
`;
