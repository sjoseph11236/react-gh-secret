import React from "react";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  demoThumbnailUrl,
  demoVideoTitle,
  demoChannelTitle,
} from "../utils/constants";
import { SiYoutubemusic } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";
import styled from "styled-components";

const PlaylistCard = ({ playlist: { id, snippet }, title }) => {
  return (
    <Card
      sx={{
        width: { xs: "190px", sm: "358px", md: "320px" },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <CardMedia
        image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
        alt={snippet?.title}
        sx={{ width: { xs: "100%", sm: "358px" }, height: 180 }}
      />
      <CardContent sx={{ backgroundColor: "#1E1E1E", height: "115px" }}>
        {title && (
          <Typography color="#fff" variant="h5" fontWeight="bold">
            {title}
          </Typography>
        )}
        {!title && (
          <Link to={`/playlist/${id}`}>
            <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
              {snippet?.title?.slice(0, 60) || demoVideoTitle.slice(0, 60)}
            </Typography>
          </Link>
        )}

        {!title && (
          <Typography variant="subtitle2" color="grey">
            {snippet?.title?.slice(0, 60) || demoChannelTitle.slice(0, 60)}
            <CheckCircle
              sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
            ></CheckCircle>
          </Typography>
        )}
        <StyledYTLink
          href={`https://music.youtube.com/playlist?list=${id}`}
          target="_blank"
        >
          <SiYoutubemusic />
        </StyledYTLink>
        <StyledYTLink
          href={`https://www.youtube.com/playlist?list=${id}`}
          target="_blank"
        >
          <FaYoutube />
        </StyledYTLink>
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;

const StyledYTLink = styled.a`
  margin-left: 0px;
  margin-right: 10px;
  margin-bottom: 10px;
  color: white;
  font-size: 30px;
  &:hover {
    color: #004aad;
  }
`;
