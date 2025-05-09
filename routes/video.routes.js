const { knex } = require("../database");

async function videoRoutes(fastify, options) {
fastify.get('/all-videos', async (request, reply) => {
  
  try {
    const allVideos = await knex("videos").select("*");
    
    return reply.send(allVideos);
  } catch (err) {
    fastify.log.error(err);
    return reply.code(500).send({ error: 'Error during request' });
  }
});

fastify.get('/video', async (request, reply) => {
  const { videoId } = request.query;

  if (!videoId) {
    return reply.code(400).send({ error: 'Missing videoId parameter' });
  }

  try {
    const videos = await knex("videos").select("*").where({ video_id: videoId});
    
    return reply.send(videos);
  } catch (err) {
    fastify.log.error(err);
    return reply.code(500).send({ error: 'Error during request' });
  }
});
}

module.exports = videoRoutes;
