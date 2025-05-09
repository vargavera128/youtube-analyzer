const { analyzeComments } = require('../services/sentiment.service');
const { getComments } = require('../services/youtube.service');

async function routes(fastify, options) {
  fastify.get('/analyze-comments', async (request, reply) => {
    const { videoId } = request.query;

    if (!videoId) {
      return reply.code(400).send({ error: 'Missing videoId parameter' });
    }

    try {
      const comments = await getComments(videoId);

      const analysisResults = await analyzeComments(comments);

      const summary = analysisResults.reduce( // TODO: javítani
        (acc, curr) => {
          acc[curr.sentiment]++;
          return acc;
        },
        { pozitív: 0, negatív: 0 }
      );

      return {
        summary,
        results: analysisResults,
      };
    } catch (err) {
      console.error(err);
      return reply.code(500).send({ error: 'Error during analysis' });
    }
  });
}

module.exports = routes;
