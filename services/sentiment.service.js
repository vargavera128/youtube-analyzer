const toxicity = require('@tensorflow-models/toxicity');
const tf = require('@tensorflow/tfjs');
const { knex } = require("../database");

const loadModel = async () => {
  const model = await toxicity.load(0.9);
  return model;
};

const analyzeComments = async (comments, videoId, videoMetadata) => {
  const model = await loadModel();
  const results = [];
  let positiveCount = 0;
  let negativeCount = 0;

  for (const text of comments) {
    const predictions = await model.classify([text]);
    const isToxic = predictions.some(pred => pred.results[0].match === true);

    const sentiment = isToxic ? 'negatív' : 'pozitív';

    if (isToxic) negativeCount++;
    else positiveCount++;

     const existing = await knex('videos').where({ video_id: videoId }).first();
  if (!existing) {
    await knex('videos').insert({
      video_id: videoId,
      video_name: videoMetadata.video_name,
      video_creator: videoMetadata.video_creator,
      uploaded_at: videoMetadata.uploaded_at
    });
  }

    results.push({ text, sentiment });

    await knex('comments').insert({
      video_id: videoId,
      text,
      sentiment
    });
  }

 

  return {
    summary: {
      total: comments.length,
      pozitív: positiveCount,
      negatív: negativeCount
    },
    comments: results
  };
};


module.exports = { analyzeComments };
