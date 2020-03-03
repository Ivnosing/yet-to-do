const path = require('path');
const env = process.env.WEBPACK_MODE;

module.exports = {
  mode: env || 'development',
  entry: './dist/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  }
}