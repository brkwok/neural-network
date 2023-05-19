const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: path.resolve(__dirname, "./src/neural_network.js"),
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	devServer: {
		static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
		historyApiFallback: true,
	},
	plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
