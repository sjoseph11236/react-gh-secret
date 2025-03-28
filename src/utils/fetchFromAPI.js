import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  method: "GET",
  url: BASE_URL,
  params: {
    maxResults: "50",
  },
  headers: {
    "x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
    "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};

export const getPlaylists = async () => {
  try {
    const response = await fetch(process.env.REACT_APP_S3_URL);
    console.log("Resolved S3 URL:", process.env.REACT_APP_S3_URL);
    console.log("getPlaylists response: ", response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An issue has occurred when fetching playlists.", error);
    throw error;
  }
};

export const syncPlaylists = async () => {
  try {
    const response = await fetch(process.env.REACT_APP_SYNC_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": process.env.REACT_APP_SYNC_API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to sync playlists");
      return false;
    }
  } catch (error) {
    console.error("Failed to sync playlists");
    throw error;
  }
};
