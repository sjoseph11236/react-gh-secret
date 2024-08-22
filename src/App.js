import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Navbar, Feed, VideoDetail, ChannelDetail, SearchFeed, PlaylistDetail } from './components';
import { Box } from '@mui/material';

function App() {
  return(
    <BrowserRouter>
        <Box sx={{ backgroundColor: '#000'}}>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Feed/>} />
                <Route path="/react-gh-secret" exact element={<Feed/>} />
                <Route path="/channel/:id" element={<ChannelDetail/>} />
                <Route path="/playlist/:id" element={<PlaylistDetail/>} />
                <Route path="/search/:searchTerm" element={<SearchFeed/>} />
                <Route path="/video/:id" element={<VideoDetail/>} />
            </Routes>
        </Box>
    </BrowserRouter>
);
}

export default App;