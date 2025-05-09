require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const youtubeRoutes = require('./routes/youtube.routes');

fastify.register(youtubeRoutes);

fastify.listen({ port: 5000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});
