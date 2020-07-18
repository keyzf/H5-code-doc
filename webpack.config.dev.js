const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  watch:true,
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/dist/',
    filename: 'js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
      {test: /\.(eot|svg|ttf|woff|woff2|png|ico)\w*/, use: 'file-loader'},
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename:'index.html',
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 3000,
    hot:true,
    compress: true,
    open:"Chrome",
    openPage:'index.html'
  },
}