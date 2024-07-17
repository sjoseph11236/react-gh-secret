import './App.css';
import React, { useMemo, useState } from 'react';
import playlists from './seed.json';
import styled from 'styled-components';
// import YouTube from 'react-youtube';

function App() {
  const [query, setQuery] = useState("");
  // const [queue, setQueue] = useState([]);
  const [ current, setCurrent ]= useState("");
  const filteredItems = useMemo(() => {
    return playlists.filter((item) => item.snippet.title.toLowerCase().includes(query.toLowerCase()));
  }, [query])

  const searchPlaylist = (_query) => {
    setQuery(_query)
  }

  // const getPlaylistItems = async (playlistId) => {
  //   try {
  //     const youtube_api_key = process.env.REACT_APP_API_KEY
  //     const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&key=${youtube_api_key}&playlistId=${playlistId}`)
  //     const json = await response.json();
  //     const queueItems = json.items;
  //     const video = queueItems[0].contentDetails.videoId
  //     setCurrent(video)
  //     console.log('queueItems', queueItems)
  //     setQueue(queueItems)
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }

  return (
    <div className="App">
          <div>
        <StyledInput
          type='text'
          placeholder='Search playlists'
          onInput={(e) => {
          searchPlaylist(e.target.value)
        }}/>
      </div>
      <div>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/videoseries?si=AOnR1uy3rBlhF90S&amp;list=${current}&autoplay=1`}
          title="YouTube video player"
          allow='autoplay; encrypted-media'
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen></iframe>

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
      <StyledList>
          {filteredItems.map((item)=> (
            <StyledListItem key={item.id} onClick={() => {setCurrent(item.id)}}>
              <div>
                <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title}/>
              </div>
              {item.snippet.title}
            </StyledListItem>))}
          </StyledList>

    </div>
  );
}

export default App;

const StyledInput = styled.input`
  border-radius: 25px;
  border: 1px solid;
  padding: 5px 40px 4px 15px;
  width: 30%;
`

const StyledList = styled.ul`
  list-style-type: none;
`
const StyledListItem = styled.li`
  margin-bottom: 10px;
  margin-top: 10px;
  color: white;
  &:hover {
    text-decoration: underline;
  }
`

// const StyledContainer = styled.div`
//   display: flex;
// `
