import React from 'react';
import { useState, useEffect, useMemo} from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { SideBar, Videos } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import playlists from '../seed.json';
import styled from 'styled-components';

const Feed = () => {
  const [selectedCategory, setSelectedCategory ] = useState("Playlists");
  const [videos, setVideos] = useState(playlists);
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    return playlists.filter((item) => item.snippet.title.toLowerCase().includes(query.toLowerCase()));
  }, [query])

  const searchPlaylist = (_query) => {
    setQuery(_query)
  }

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then(( data ) => {
      setVideos(data.items)
    })
  }, [selectedCategory])
  
  return (
    <div>
      <Stack sx={{ flexDirection: {sx: "column", md: "row"}}}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
          <SideBar selectedCategory={selectedCategory}  setSelectedCategory={setSelectedCategory} />
          <Typography className="copyright" variant='body2' sx={{mt:1.5, color: '#fff'}}>
          Copyright © 2024 Ponder
          </Typography>
        </Box>
        {/* Videos */}
        <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
          <Typography variant='h4' fontWeight="bold"  mb={2} sx={{ color:"white" }}>
          {selectedCategory} {selectedCategory !== "Playlists" && <span style={{ color: "#004AAD"}}>Videos</span>}
          </Typography>
          {selectedCategory === "Playlists" && 
            <StyledInputContainer>
              <StyledInput
                type='text'
                placeholder='Filter playlists'
                value={query}
                onInput={(e) => {
                searchPlaylist(e.target.value)
              }}/>
            </StyledInputContainer>
          }
          { selectedCategory === "Playlists" ? <Videos videos={filteredItems} /> :  <Videos  videos={videos} /> }
        </Box>
      </Stack>
    </div>
  )
}

export default Feed

const StyledInputContainer = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
`

const StyledInput = styled.input`
  font-family: DejaVu Sans Mono, monospace;
  background: none;
  border-radius: 0;
  border: 0;
  padding: 5px 40px 4px 15px;
  width: 30%;
  transition: all .15s ease;
  border-bottom: 2px solid #004AAD;

  &:focus {
    outline: none;
    color: white;
  }
`
