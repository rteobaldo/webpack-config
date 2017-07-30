const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');


let inputContext = path.resolve(__dirname, './src');
let outputContext = path.resolve(__dirname, './dist');

let config = {

  context: inputContext,

  entry: {
    vendor: [
      // Vendor scripts
    ],
    main: './scripts/main.js',
  },

  output: {
    path: outputContext,
    filename: './scripts/[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader', 'postcss-loader'],
          fallback: 'style-loader'
        })

      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/i,
        loaders: [`file-loader?name=../[path][name].[ext]`, {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png'],
    alias: {
      // handlebars: 'handlebars/dist/handlebars.min.js'
    }
  },

  plugins: [
    new ExtractTextPlugin(`styles/main.css`),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new OptimizeCssAssets(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity
    })
  ],

  devtool: 'source-map',

  stats: {
    // Add chunk information (setting this to `false` allows for a less verbose output)
    chunks: false,
    // Add built modules information to chunk information
    chunkModules: false,
    chunkOrigins: false,
    modules: false
  }
};

module.exports = config;
