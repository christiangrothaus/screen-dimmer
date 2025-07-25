import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';

rules.push({
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader',
    'postcss-loader',
  ],
});

export const rendererConfig: Configuration = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  target: 'electron-renderer',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
  },
};
