import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

module.exports = {
  input: 'dist/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    exports: 'default',
  },
  plugins: [resolve(), commonjs(), terser()],
};
