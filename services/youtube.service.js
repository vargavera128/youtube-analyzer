const axios = require('axios');

const getComments = async (videoId) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=50`;

  const response = await axios.get(url);
  return response.data.items.map(
    (item) => item.snippet.topLevelComment.snippet.textDisplay
  );
};

const getVideoMetadata = async (videoId) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
  const response = await axios.get(url);

  const item = response.data.items[0]?.snippet;
  if (!item) throw new Error("No video metadata found");

  return {
    id: videoId,
    title: item.title,
    channelTitle: item.channelTitle,
    publishedAt: item.publishedAt,
  };
};

module.exports = { getComments, getVideoMetadata };

