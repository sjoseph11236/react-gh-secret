import React, { useEffect, useState, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { SideBar, Videos, HomeDetail, FeedDetail } from "./";
import styled from "styled-components";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("Playlists");
  const [playlists, setPlaylists] = useState([]);
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch(
        "http://ponder-svc-sandbox.us-east-1.elasticbeanstalk.com/playlists"
      );
      const data = await response.json();
      setPlaylists(data);
      setVideos(data);
    } catch (error) {
      console.log(
        `An issue has occurred while fetching playlist Items ${error}`
      );
    }
  };

  const filteredItems = useMemo(() => {
    return playlists.filter((item) =>
      item.snippet.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [playlists, query]);

  const searchPlaylist = (_query) => {
    setQuery(_query);
  };

  const renderCategory = (category) => {
    switch (category) {
      case "Home":
        return <HomeDetail />;
      case "Feed":
        return <FeedDetail />;
      case "Playlists":
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
              />
            </StyledInputContainer>
            <Videos videos={filteredItems} />;
          </>
        );
      default:
        return;
    }
  };

  return (
    <div>
      <Stack
        sx={{
          flexDirection: { sx: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            height: { sx: "auto", md: "92vh" },
            borderRight: "1px solid #3d3d3d",
            px: { sx: 0, md: 2 },
          }}
        >
          <SideBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setQuery={setQuery}
          />
          <Typography
            className="copyright"
            variant="body2"
            sx={{ mt: 1.5, color: "#fff" }}
          >
            Copyright © 2024 Ponder
          </Typography>
        </Box>
        {/* Videos */}
        <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
            sx={{ color: "white" }}
          >
            {selectedCategory === "Playlists" && videos.length}
            {selectedCategory === "Playlists" && " "}
            {selectedCategory !== "Home" && selectedCategory}
          </Typography>
          {renderCategory(selectedCategory)}
        </Box>
      </Stack>
    </div>
  );
};

export default Feed;

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
  width: 30%;
  transition: all 0.15s ease;
  border-bottom: 2px solid #004aad;
  outline: none;
  color: white;
`;
