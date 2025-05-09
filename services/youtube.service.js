const axios = require('axios');

const getComments = async (videoId) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=50`;

  const response = await axios.get(url);
  return response.data.items.map(
    (item) => item.snippet.topLevelComment.snippet.textDisplay
  );
};

module.exports = { getComments };
