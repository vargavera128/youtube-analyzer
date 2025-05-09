const { knex } = require("../database");

async function commentRoutes(fastify, options) {
fastify.get('/positive-comments', async (request, reply) => {
  const { videoId } = request.query;

  if (!videoId) {
    return reply.code(400).send({ error: 'Missing videoId parameter' });
  }

  try {
    const positiveComments = await knex("comments").select("text").where({ video_id: videoId, sentiment: "pozitív" });
    
    return reply.send(positiveComments);
  } catch (err) {
    fastify.log.error(err);
    return reply.code(500).send({ error: 'Error during request' });
  }
});

fastify.get('/negative-comments', async (request, reply) => {
  const { videoId } = request.query;

  if (!videoId) {
    return reply.code(400).send({ error: 'Missing videoId parameter' });
  }

  try {
    const positiveComments = await knex("comments").select("text").where({ video_id: videoId, sentiment: "negatív" });
    
    return reply.send(positiveComments);
  } catch (err) {
    fastify.log.error(err);
    return reply.code(500).send({ error: 'Error during request' });
  }
});
}

module.exports = commentRoutes;
