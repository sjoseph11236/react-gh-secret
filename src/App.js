import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import {
  Navbar,
  Feed,
  VideoDetail,
  ChannelDetail,
  SearchFeed,
  PlaylistDetail,
} from "./components";
import { Box } from "@mui/material";

function App() {
  return (
    <HashRouter>
      <Box sx={{ backgroundColor: "#000" }}>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Feed />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/playlist/:id" element={<PlaylistDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />\
          <Route path="/video/:id" element={<VideoDetail />} />
        </Routes>
      </Box>
    </HashRouter>
  );
}

export default App;
