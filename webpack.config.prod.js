const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  entry: {
    vendors: [
      'jquery',
      'react',
      'react-dom',
      'react-app-polyfill/ie11',
      'react-app-polyfill/stable',
      'axios'
    ],
    index: "./src/main/webapp/WEB-INF/views/src/index.js",
    content: "./src/main/webapp/WEB-INF/views/src/content.js",
    mail: "./src/main/webapp/WEB-INF/views/src/mail.js"
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, "./src/main/webapp/dist")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }]
        })
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 20000,
          name: 'images/[hash]-[name].[ext]'
        }
      },
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          // test: /[\\/]node_modules[\\/]/,
          test: 'vendors',
          chunks: 'initial',
          name: 'vendors',
          enforce: true,
        }
      }
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new ExtractTextPlugin('app.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new BundleAnalyzerPlugin(), 
  ],
};
