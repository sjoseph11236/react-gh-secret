import React, { useState, useMemo } from "react";
import { Videos } from "./";
import styled from "styled-components";
import { syncPlaylists } from "../utils/fetchFromAPI.js";
import { FaSync, FaSpinner } from "react-icons/fa";

const Playlists = ({
  playlists,
  error,
  setError,
  query,
  setQuery,
  fetchPlaylists,
}) => {
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const clearStatus = () => {
    setError("");
    setMessage("");
  };

  const filteredItems = useMemo(() => {
    return playlists.filter((item) =>
      item.snippet.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [playlists, query]);

  const searchPlaylist = (_query) => {
    setQuery(_query);
  };

  const updatePlaylists = async () => {
    setIsDisabled(true);
    clearStatus();
    try {
      const syncResult = await syncPlaylists();
      setIsDisabled(false);
      setMessage(syncResult.message);
      if (syncResult.status === "success") {
        fetchPlaylists();
      }
    } catch (error) {
      console.error("Error updating playlists:", error);
      setError("Failed to update playlists");
    } finally {
      setTimeout(() => {
        clearStatus();
      }, 3000);
    }
  };

  return (
    <>
      <StyledInputContainer>
        <StyledInput
          type="text"
          placeholder="Search Playlists"
          value={query}
          onInput={(e) => {
            searchPlaylist(e.target.value);
          }}
          disabled={isDisabled}
        />
        <TooltipWrapper>
          <StyledSyncButton onClick={updatePlaylists} disabled={isDisabled}>
            {isDisabled ? <FaSpinner className="spin" /> : <FaSync />}
          </StyledSyncButton>
          <StyledTooltip>Sync Playlists</StyledTooltip>
        </TooltipWrapper>
      </StyledInputContainer>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {<Videos videos={filteredItems} />}
    </>
  );
};

export default Playlists;

const StyledInputContainer = styled.div`
  display: flex;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const StyledInput = styled.input`
  font-family: DejaVu Sans Mono, monospace;
  background: none;
  border-radius: 0;
  border: 0;
  padding: 5px 40px 4px 15px;
  width: 30%;
  transition: all 0.15s ease;
  border-bottom: 2px solid #004aad;
  outline: none;
  color: white;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const StyledSyncButton = styled.button`
  background-color: #1e1e1e;
  color: white;
  border: none;
  padding: 10px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
  position: relative;

  &:hover:not(:disabled) {
    background-color: #00377f;
    transform: scale(1.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledTooltip = styled.div`
  visibility: hidden;
  background-color: #222;
  color: #fff;
  text-align: center;
  font-family: DejaVu Sans Mono, monospace;
  font-size: 13px;
  border-radius: 6px;
  padding: 6px 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  transition-delay: 0.7s; /* Tooltip delay */

  ${TooltipWrapper}:hover & {
    visibility: visible;
    opacity: 1;
    transform: translateX(-50%) translateY(-4px); /* subtle lift */
  }

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: #222 transparent transparent transparent;
  }
`;
