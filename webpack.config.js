const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const config = {
  entry: ['@babel/polyfill', './front/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3003',
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, 
        use: {       
          loader: "babel-loader",       
        },      
      },
      {
        test: /\.html$/,        
        use: [
          {
            loader: "html-loader",
          },
        ],        
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },      
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },  
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
  ],
}

module.exports = config
