import './App.css';
import React, { useEffect, useState } from 'react';
const youtube_api_key = process.env.REACT_APP_API_KEY;

function App() {
  const [items, setItems] = useState([]);
  const getPlaylists = async () => {
    try {
      console.log('youtybe api key', youtube_api_key)
      const playlists_url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=25&key=${youtube_api_key}&channelId=UCCj88q3bb5OnVznn7hUY_9Q`
      const response = await fetch(playlists_url)
      const playlists = await response.json()
      const playlistItems = playlists.items
      console.log('playlists', playlists.items)
      setItems(playlistItems)
    } catch (error) {}
  }
  useEffect(() => {
    getPlaylists()
    console.log('playlist items', items)
  }, [items])
  return (
    <div className="App">
      <p>The number of items { items ? items.length: '--'}</p>
    </div>
  );
}

export default App;
