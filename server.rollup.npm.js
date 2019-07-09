/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import builtins from 'rollup-plugin-node-builtins';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const env = process.env.NODE_ENV;

const plugins = [
  postcss(),
  babel({ exclude: '**/node_modules/**' }),
  filesize(),
];

const globals = {
  immer: 'immer',
  react: 'React',
  redux: 'Redux',
  'react-cookies': 'Cookies',
  'prop-types': 'PropTypes',
  'react-dragtastic': 'ReactDragtastic',
  mousetrap: 'Mousetrap',
  'socket.io-client': 'io',
  flatted: 'Flatted',
  three: 'THREE',
  '@tweenjs/tween.js': 'TWEEN',
};

export default [
  // Sub-packages.
  {
    input: 'packages/server.js',
    output: { file: 'dist/server.js', format: 'cjs', name: 'Server' },
    plugins: [
      babel({ exclude: ['**/node_modules/**'] }),
      commonjs({ include: 'node_modules/**' }),
      resolve(),
    ],
  },

  // UMD and ES versions.
];
