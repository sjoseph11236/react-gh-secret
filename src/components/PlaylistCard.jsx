import React from "react";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  demoThumbnailUrl,
  demoVideoTitle,
  demoChannelTitle,
} from "../utils/constants";
import Badges from "./Badges";

const PlaylistCard = ({ playlist: { id, snippet, contentDetails }, title }) => {
  return (
    <Card
      sx={{
        width: { xs: "360px", sm: "358px", md: "320px" },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <CardMedia
        image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
        alt={snippet?.title}
        sx={{ width: { xs: "100%", sm: "358px" }, height: 180 }}
      />
      <CardContent sx={{ backgroundColor: "#1E1E1E", height: "70px" }}>
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
          <Typography variant="subtitle2" color="grey" mb={"5px"}>
            {snippet?.channelTitle?.slice(0, 60) || ""}
            {" - "}
            {contentDetails.itemCount} tracks
            <CheckCircle
              sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
            ></CheckCircle>
          </Typography>
        )}
        <Badges id={id} />
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;
