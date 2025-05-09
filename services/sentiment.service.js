const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const analyzeComments = async (comments) => {
  const results = [];

  for (const text of comments) {
    const analysis = sentiment.analyze(text);
    const sentimentResult = analysis.score >= 0 ? 'pozitív' : 'negatív';

    results.push({ text, sentiment: sentimentResult });
  }

  return results;
};

module.exports = { analyzeComments };
