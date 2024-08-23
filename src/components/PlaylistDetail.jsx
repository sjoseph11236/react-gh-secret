import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { Videos, PlaylistCard, SideBar } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import playlists from "../seed.json";

const PlaylistDetail = () => {
  const [selectedCategory, setSelectedCategory] = useState("Playlists");
  const [playlistDetail, setPlaylistDetail] = useState(playlists[0]);
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(playlists);
  const { id } = useParams();

  useEffect(() => {
    // fetchFromAPI(`playlists?part=snippet&id=${id}`).then(( data ) => {
    //   setPlaylistDetail(data.items[0])
    // }).catch((e) => {
    //   const { response } = e;
    //   if(response?.status == 429) {
    //     console.log('HELLO WORLD')
    //     return;
    //   }
    //   console.log('error =>', response)
    // })
    // fetchFromAPI(`playlistItems?part=snippet&playlistId=${id}`).then(( data ) => {
    //   setVideos(data.items)
    //   setVideoDetail(data.items[0])
    // }).catch((e) => {
    //   console.log('error =>', e)
    // })
  }, [id]);

  if (!playlistDetail?.snippet)
    return (
      <Box minHeight="95vh">
        <Stack direction={{ xs: "column", md: "row" }}>
          <Typography
            className="loading"
            color="#fff"
            variant="h5"
            fontWeight="bold"
            p={2}
          >
            LOADING PLAYLIST DETAILS ...
          </Typography>
        </Stack>
      </Box>
    );

  //  if(!videoDetail?.id) return 'Loading...'

  const {
    snippet: { title, channelId, channelTitle },
  } = playlistDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box
            sx={{
              width: "100%",
              position: "sticky",
              top: "86px",
            }}
          >
            {/* { videoDetail && <ReactPlayer url={`https://www.youtube.com/watch?v=${videoDetail?.id}`} className="react-player" controls />}
             */}
            <PlaylistCard playlist={videos[0]} title={title} />
            {/* <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                {title}
              </Typography> */}
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              {/* <Link to={`/channel/${channelId}`}>
                  <Typography variant={{ sm: 'subtitle1', md: 'h6' }} color='#fff'>
                    {channelTitle}
                    <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px'}} />
                  </Typography>
                </Link> */}
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
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center">
          <Videos videos={videos} direction={"column"} />
        </Box>
      </Stack>
    </Box>
  );
};

export default PlaylistDetail;