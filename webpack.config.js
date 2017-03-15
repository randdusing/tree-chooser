module.exports = {
  entry: "./main.js",
  output: {
    path: __dirname + "/dist",
    filename: "tree-chooser.js"
  },
  externals: {
    angular: 'angular',
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
        loader: "style-loader!css-loader"
      },
      {
        test: /\.html$/,
        loader: 'html'
      }
    ]
  },
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
