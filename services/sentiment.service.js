const axios = require("axios");
const { knex } = require("../database");

const analyzeComments = async (comments, videoMetadata) => {
  const response = await axios.post("http://localhost:8001/analyze", { comments });
  const sentiments = response.data.results;

  let positive = 0, neutral = 0, negative = 0;
  const results = [];

  await knex("videos").insert({
    video_id: videoMetadata.id,
    video_name: videoMetadata.title,
    video_creator: videoMetadata.channelTitle,
    uploaded_at: videoMetadata.publishedAt,
  });

  for (let i = 0; i < comments.length; i++) {
    const text = comments[i];
    const sentiment = sentiments[i];

    if (sentiment === "pozitív") positive++;
    else if (sentiment === "semleges") neutral++;
    else negative++;

    results.push({ text, sentiment });

    await knex("comments").insert({
      video_id: videoMetadata.id,
      text,
      sentiment,
    });
  }

  return {
    summary: {
      total: comments.length,
      pozitív: positive,
      semleges: neutral,
      negatív: negative
    },
    comments: results
  };
};

module.exports = { analyzeComments };
