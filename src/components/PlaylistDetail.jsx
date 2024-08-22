import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { Videos } from './'; 
import { fetchFromAPI } from '../utils/fetchFromAPI';
const PlaylistDetail = () => {
    const [ playlistDetail, setPlaylistDetail ] = useState(null)
    const [ videoDetail, setVideoDetail ] = useState(null)
    const [ videos, setVideos ] = useState([])
    const { id } = useParams();
  
    useEffect(() =>  {
      fetchFromAPI(`playlists?part=snippet&id=${id}`).then(( data ) => {
        setPlaylistDetail(data.items[0])
      })
  
      fetchFromAPI(`playlistItems?part=snippet&playlistId=${id}`).then(( data ) => {
        setVideos(data.items)
        setVideoDetail(data.items[0])
      })      
    }, [id])
   
    if(!playlistDetail?.snippet) return 'Loading...'

     if(!videoDetail?.id) return 'Loading...'
  
    const { snippet: { title, channelId, channelTitle }} = playlistDetail
  
    return (
      <Box minHeight="95vh">
        <Stack direction={{xs: 'column', md: 'row'}}>
          <Box flex={1}> 
            <Box sx={{
              width: '100%', position: 'sticky', top: '86px'
            }}>
              { videoDetail && <ReactPlayer url={`https://www.youtube.com/watch?v=${videoDetail?.id}`} className="react-player" controls />}
              <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                {title}
              </Typography>
              <Stack direction="row" justifyContent="space-between" sx={{color: '#fff'}} py={1} px={2}>
                <Link to={`/channel/${channelId}`}>
                  <Typography variant={{ sm: 'subtitle1', md: 'h6' }} color='#fff'>
                    {channelTitle}
                    <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px'}} />
                  </Typography>
                </Link>
                <Stack direction="row" gap="20px" alignItems="center">
                  {/* <Typography variant='body1' sx={{ opacity: 0.7}}>
                    {parseInt(viewCount).toLocaleString()} views
                  </Typography> */}
                  {/* <Typography variant='body1' sx={{ opacity: 0.7}}>
                    {parseInt(likeCount).toLocaleString()} likes
                  </Typography> */}
                </Stack>
              </Stack>
            </Box>
          </Box>
          <Box px={2} py={{ md: 1, xs: 5}} justifyContent="center">
            <Videos videos={videos} direction={"column"} /> 
        </Box>
        </Stack>
      </Box>
    )
}

export default PlaylistDetail
