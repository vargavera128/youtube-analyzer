/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('videos', function(table) {
    table.increments('id').primary();
    table.string('video_id').unique();
    table.string('video_name');
    table.string('video_creator');
    table.timestamp('uploaded_at');
  })
  .createTable('comments', function(table) {
    table.increments('id').primary();
    table.string('video_id').references('video_id').inTable('videos');
    table.text('text');
    table.string('sentiment');
    table.timestamp('analyzed_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};

