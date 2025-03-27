import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { SideBar, HomeDetail, FeedDetail, Loading, Playlists } from "./";
import { getPlaylists } from "../utils/fetchFromAPI.js";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("Playlists");
  const [query, setQuery] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlaylists = async () => {
    try {
      const data = await getPlaylists();
      setPlaylists(data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
      setError("Failed to load playlists");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const renderCategory = (category) => {
    if (isLoading) return <Loading text={`Loading ${category}...`} />;
    switch (category) {
      case "Home":
        return <HomeDetail playlists={playlists} />;
      case "Feed":
        return <FeedDetail />;
      case "Playlists":
        return (
          <Playlists
            playlists={playlists}
            error={error}
            setError={setError}
            query={query}
            setQuery={setQuery}
            fetchPlaylists={fetchPlaylists}
          />
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
            Copyright © 2025 Ponder Media
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
            {!isLoading && selectedCategory === "Playlists" && playlists.length}
            {!isLoading && selectedCategory === "Playlists" && " "}
            {!isLoading && selectedCategory !== "Home" && selectedCategory}
          </Typography>
          {renderCategory(selectedCategory)}
        </Box>
      </Stack>
    </div>
  );
};

export default Feed;
