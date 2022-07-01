const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.tsx'],
    aliasFields: ['browser'],
    alias: {
      '~/theme': path.resolve(__dirname, './src/theme/'),
      '~/components': path.resolve(__dirname, './src/components/'),
      '~/hooks': path.resolve(__dirname, './src/hooks/'),
      '~/assets': path.resolve(__dirname, './src/assets/'),
      '~/tests': path.resolve(__dirname, './src/tests/'),
    },
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new DotenvPlugin({
      sample: './.env.default',
      path: './.env',
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      hash: true,
      filename: '../dist/index.html',
    }),
  ],
  stats: {
    preset: 'errors-warning',
  },
};
