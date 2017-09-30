import paths from './gulp/paths';
import webpack from 'webpack';
import { env } from './options';
import { resolve } from 'path';

export default {
  entry: [
    'element.prototype.matches',
    'element-closest',
    'nodelist-foreach-polyfill',
    `${paths.src.scripts}/index.js`
  ],
  output: {
    path: `${paths.dist.scripts}/`,
    filename: 'app.js'
  },
  devtool: '#cheap-source-map',
  resolve: {
    moduleDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  resolveLoader: {
    modulesDirectories: ["node_modules"],
    extensions: ["loader.js", ".js", '']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: env !== 'dev' ? [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      jquery: 'jquery',
      'window.jquery': 'jquery',
      $: 'jquery',
      'window.$': 'jquery'
    })] : [new webpack.ProvidePlugin({
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      jquery: 'jquery',
      'window.jquery': 'jquery',
      $: 'jquery',
      'window.$': 'jquery'
    })]
}
