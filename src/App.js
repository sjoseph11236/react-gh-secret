import './App.css';
import React, { useEffect, useMemo, useState } from 'react';
import playlists from './seed.json';
import styled from 'styled-components';
// import YouTube from 'react-youtube';
import { SiYoutubemusic } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";

function App() {

  const createImage  =  (item) =>  {


    return (
      <StyledImageContainer>
      <StyledRowContainer>
        <StyledImage src={item.snippet.thumbnails.default.url} alt={item.snippet.title}/>
        <StyledImage src={item.snippet.thumbnails.default.url} alt={item.snippet.title}/>
      </StyledRowContainer>
      <StyledRowContainer>
        <StyledImage src={item.snippet.thumbnails.default.url} alt={item.snippet.title}/>
        <StyledImage src={item.snippet.thumbnails.default.url} alt={item.snippet.title}/>
      </StyledRowContainer>
    </StyledImageContainer>
    )
  }
  const [query, setQuery] = useState("");
  // const [queue, setQueue] = useState([]);
  // const [ current, setCurrent ]= useState("");
  const filteredItems = useMemo(() => {
    return playlists.filter((item) => item.snippet.title.toLowerCase().includes(query.toLowerCase()));
  }, [query])

  const searchPlaylist = (_query) => {
    setQuery(_query)
  }

  const getPlaylistItems = async (playlistId) => {
    try {
      const youtube_api_key = process.env.REACT_APP_API_KEY
      const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&key=${youtube_api_key}&playlistId=${playlistId}`)
      const json = await response.json();
      const queueItems = json.items;
      return queueItems.slice(0, 4)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="App">

      <div>

          {/* <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/videoseries?si=AOnR1uy3rBlhF90S&amp;list=${current}&autoplay=1`}
          title="YouTube video player"
          allow='autoplay; encrypted-media'
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen></iframe>  */}


        {/* <iframe width="560" height="315" src={`https://www.youtube.com/embed/${current}?si=4GZPtd2-cAZtclt4`} title={`YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share`} referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}

        {/* <YouTube
          videoId={current}
          opts={{playerVars: {autoplay: 1}}}
        /> */}
      </div>
      {/* <StyledContainer>
        <div>
          <h1>Playlists</h1>
          <StyledList>
          {filteredItems.map((item)=> (
            <StyledListItem key={item.id} onClick={() => {getPlaylistItems(item.id)}}>
              <div>
                <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title}/>
              </div>
              {item.snippet.title}
            </StyledListItem>))}
          </StyledList>
        </div>
        <div>
          <h1>Current Queue</h1>
          <StyledList>
          {queue.map((item)=> (
            <StyledListItem key={item.id} onClick={() => {setCurrent(item.contentDetails.videoId)}}>
              <div>
                <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title}/>
              </div>
              {item.snippet.title}
            </StyledListItem>))}
          </StyledList>
        </div>
      </StyledContainer> */}

      {/* Legacy Playlist Idea */}
      <StyledInputContainer>
        <StyledInput
          type='text'
          placeholder='Search playlists'
          onInput={(e) => {
          searchPlaylist(e.target.value)
        }}/>
      </StyledInputContainer>
      <StyledList>
        {filteredItems.map((item)=> (
          <StyledListItem key={item.id}>
            <StyledImageContainer>
              <StyledRowContainer>
                <StyledImage src={item.snippet.thumbnails.default.url} alt={item.snippet.title}/>
                <StyledImage src={item.snippet.thumbnails.default.url} alt={item.snippet.title}/>
              </StyledRowContainer>
              <StyledRowContainer>
                <StyledImage src={item.snippet.thumbnails.default.url} alt={item.snippet.title}/>
                <StyledImage src={item.snippet.thumbnails.default.url} alt={item.snippet.title}/>
              </StyledRowContainer>
            </StyledImageContainer>
            {item.snippet.title}
            <StyledYTLink href={`https://music.youtube.com/playlist?list=${item.id}`} target='_blank'>
              <SiYoutubemusic />
            </StyledYTLink>
            <StyledYTLink href={`https://www.youtube.com/playlist?list=${item.id}`} target='_blank'>
              <FaYoutube />
            </StyledYTLink>
          </StyledListItem>))}
        </StyledList>
    </div>
  );
}

export default App;

const StyledImageContainer = styled.div`
  width: 30%;
`
const StyledImage = styled.img`
  width: 25%;
`

const StyledRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px;
  width: 100%;
`

const StyledInputContainer = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
`


const StyledYTLink = styled.a`
  margin-left: 23px;
  color: white;
  font-size: 30px;
  &:hover {
    color: #004AAD;
  }
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

  &::placeholder {
    text-align: center;
  }
`

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledListItem = styled.div`
  font-family: DejaVu Sans Mono, monospace;
  margin-bottom: 10px;
  margin-top: 10px;
  color: white;
  display: flex;
  padding: 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transition: 0.3s;

  &:hover {
    background-color: gray;
  }
`



