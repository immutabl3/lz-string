// modern port of lz-string (for utf-8 only)
// https://github.com/pieroxy/lz-string

import { isString } from '@immutabl3/utils';
import baseCompress from './compress.js';
import baseDecompress from './decompress.js';

export const compress = function(input) {
  if (!isString(input)) return '';
  return baseCompress(input);
};

export const decompress = function(compressed) {
  if (!isString(compressed)) return '';
  return baseDecompress(compressed);
};