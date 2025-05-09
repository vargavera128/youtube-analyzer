const { analyzeComments } = require('../services/sentiment.service');
const { getComments, getVideoMetadata } = require('../services/youtube.service');

async function youtubeRoutes(fastify, options) {
fastify.get('/analyze-comments', async (request, reply) => {
  const { videoId } = request.query;

  if (!videoId) {
    return reply.code(400).send({ error: 'Missing videoId parameter' });
  }

  try {
    const comments = await getComments(videoId);
    const videoMetadata = await getVideoMetadata(videoId);

    const analysisResults = await analyzeComments(comments, videoId, videoMetadata);

    return reply.send(analysisResults);
  } catch (err) {
    fastify.log.error(err);
    return reply.code(500).send({ error: 'Error during analysis' });
  }
});
}

module.exports = youtubeRoutes;
