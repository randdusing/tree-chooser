var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    'tree-chooser': './src/index.js',
    'tree-chooser.min': './src/index.js'
  },
  output: {
    path: './dist',
    filename: '[name].js',
    library: 'tree-chooser',
    libraryTarget: 'commonjs'
  },
  externals: {
    angular: 'angular',
    lodash : {
      'commonjs': 'lodash'
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'jshint-loader!jscs-loader',
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'ng-annotate?single_quotes!babel?presets[]=es2015'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.html$/,
        loader: 'html?minimize=true'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('tree-chooser.css'),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],
  jshint: {
    failOnHint: true,
    esversion: 6,
    node: true,
    quotmark: 'single'
  },
  jscs: {
    failOnHint: true
  }
};
