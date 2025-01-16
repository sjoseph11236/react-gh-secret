import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { ChannelCard } from ".";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const FeedDetail = () => {
  const [channels, setChannels] = useState([
    {
      kind: "youtube#searchResult",
      id: {
        kind: "youtube#channel",
        channelId: "UCWfi5ELXGAe-DCA6cOP3aNw",
      },
      snippet: {
        publishedAt: "2018-07-25T18:18:31Z",
        channelId: "UCWfi5ELXGAe-DCA6cOP3aNw",
        title: "Tems",
        description: "The leading vibe.",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/MDcyFsGWB7GK0Mi9ZhXbl5OqL7PteI9eYc-fputLjOtDWcwLcvPT04YzSLOEJ9m1hzuFBmYvRw=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/MDcyFsGWB7GK0Mi9ZhXbl5OqL7PteI9eYc-fputLjOtDWcwLcvPT04YzSLOEJ9m1hzuFBmYvRw=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/MDcyFsGWB7GK0Mi9ZhXbl5OqL7PteI9eYc-fputLjOtDWcwLcvPT04YzSLOEJ9m1hzuFBmYvRw=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Tems",
        liveBroadcastContent: "none",
        publishTime: "2018-07-25T18:18:31Z",
      },
    },
  ]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(
      `search?channelId=${channels[0].id}&part=snippet&order=date`
    ).then((data) => {
      setVideos(data?.items);
    });
  }, [channels]);

  return (
    <Box minHeight="95vh">
      <ChannelCard channelDetail={channels[0]} marginTop="-110px" />
    </Box>
  );
};

export default FeedDetail;
