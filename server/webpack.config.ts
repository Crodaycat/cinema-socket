import fs = require('fs');
import path = require('path');

import {
  Configuration,
  ProgressPlugin,
  NamedModulesPlugin,
  NoEmitOnErrorsPlugin,
  DefinePlugin
} from 'webpack';

import { CheckerPlugin, TsConfigPathsPlugin } from 'awesome-typescript-loader';

// Node modules paths & externals
const nodeModules = path.join(process.cwd(), 'node_modules');

const externals = fs
  .readdirSync(nodeModules)
  .filter(x => {
    const condition = ![
      '.bin',
      'core-js',
      'ts-helpers',
      'reflect-metadata'
      // 'express-graphql',
    ].some(v => x.includes(v));
    return condition;
  })
  .reduce((modules, mod) => {
    modules[mod] = `commonjs ${mod}`;
    return modules;
  }, {});

// Webpack config
const webpackConfig: Configuration = {
  entry: {
    index: './src/index.ts'
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsConfigPathsPlugin()]
  },
  externals,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: /\/node_modules\//
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: /\/node_modules\//
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CheckerPlugin(),
    new NoEmitOnErrorsPlugin(),
    new ProgressPlugin(),
    new NamedModulesPlugin()
  ],
  target: 'node',
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
};

export default webpackConfig;
