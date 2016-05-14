module.exports = {
  entry: './lib/index.js',
  output: {
    path: __dirname,
    filename: './dist/index.js',
    library: 'JDate',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    preLoaders: [
      // {
        // test: /\.js$/,
        // loader: 'eslint-loader',
        // exclude: /node_modules|dist/
      // }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules|dist/,
        query: {
          presets: ['es2015'],
          compact: false
        }
      }
    ]
  },
  eslint: {
    configFile: '.eslintrc'
  }
};
