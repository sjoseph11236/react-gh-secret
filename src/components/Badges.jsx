import React from "react";
import { SiYoutubemusic } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";
import styled from "styled-components";

const Badges = ({ id }) => {
  return (
    <>
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
    </>
  );
};

export default Badges;

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
