const path = require('path');

module.exports = {
  entry: './src/neural_network.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './')
  }
};