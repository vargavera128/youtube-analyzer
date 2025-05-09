require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const youtubeRoutes = require('./routes/youtube.routes');
const { knex } = require("./database");



const start = async () => { 
  for (;;) {
    try {
      await knex.raw("select 1+1");
      break;
    } catch (err) {
      console.log(err);
      console.log("Unable to connect to PGSQL, waiting...");
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
    }
  }
  
  let version = await knex.raw(
    `SELECT default_version, installed_version FROM pg_available_extensions where name = 'timescaledb'`
  );
  if (!version) {
    console.log("ERROR: TimescaleDB is not installed on the DB instance");
    process.exit(1);
  }

  await knex.migrate.latest({ directory: "dbmigrations" }); 

  fastify.register(youtubeRoutes);


  fastify.listen({ port: 5000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});
};

start();
module.exports = fastify;


