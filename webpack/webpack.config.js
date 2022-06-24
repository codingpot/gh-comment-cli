const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: {
    contentScript: path.resolve(__dirname, '..', 'src', 'contentScript.ts'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: '.', to: '.', context: 'public' },
        { from: 'contentStyle.css', to: '.', context: 'src' },
      ],
    }),
  ],
}
