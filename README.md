# youtube-analyzer

This project is a YouTube comment analysis tool developed for the course called "Mesterséges Intelligencia (GKNB_INTM002)".

# author

Varga Veronika - FY4D57

# description

This project is built with Node.js and Fastify, providing an API to fetch YouTube comments and video metadata. It uses Knex.js to interact with a PostgreSQL database for storing comments and sentiment analysis results. The backend sends the comments to a Python service for sentiment categorization (positive, neutral, negative) and returns the results via API endpoints.
Without the Python program this project will NOT work.

# how to run

1 - First, create a PostgreSQL database named "analyzer".
2 - Then, run the Node.js application by executing the following command in your terminal: node index.js.
The migration will run automatically, and you can confirm the successful creation of the necessary tables by checking the database.
3 - Afterward, run the Python script (detailed instructions are provided in the Python repository's README file).
4 - Finally, you can test the API endpoints using Postman, as described in the documentation.

# note

Please note that not all planned features have been fully implemented in this project. While the core functionalities are in place, there are still plans for future improvements and refinements. Some minor issues or bugs may be encountered during use.
