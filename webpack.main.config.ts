import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.ts',
  // Put your normal webpack config below here
  target: 'electron-main',
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
};
