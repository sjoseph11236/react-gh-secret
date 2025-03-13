import { Box, Stack } from "@mui/material";
import React from "react";
import VideoCard from "./VideoCard";
import ChannelCard from "./ChannelCard";
import PlaylistCard from "./PlaylistCard";

const Videos = ({ videos, direction }) => {
  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={2}
      ml={"2px"}
    >
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.kind === "youtube#playlist" && <PlaylistCard playlist={item} />}
          {item.kind === "youtube#playlistItem" && (
            <VideoCard
              videoId={item.snippet.resourceId.videoId}
              snippet={item.snippet}
            />
          )}
          {item.id.videoId && (
            <VideoCard videoId={item.id.videoId} snippet={item.snippet} />
          )}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
