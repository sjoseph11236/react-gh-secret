import React from "react";
import logo from "../assests/ponder.png";
import { Box, Stack, Typography } from "@mui/material";
import playlists from "../seed.json";
import { Videos } from "./";

const HomeDetail = () => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: "space-between",
      }}
      color="white"
    >
      <img src={logo} alt="logo" height={100} />
      <Box minHeight="95vh">
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          Welcome to Ponder Media
        </Typography>
        <Typography mb={2} sx={{ color: "white" }}>
          A hub for users to create music playlist, annotate popular media and
          connect through shared thoughts and interests.
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          Listen Again
        </Typography>
        <Videos videos={playlists} />;
      </Box>
    </Stack>
  );
};

export default HomeDetail;
