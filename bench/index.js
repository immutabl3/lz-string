import Benchmark from 'benchmark';
import lzstring from 'lz-string';
import { compress, decompress } from '../src/index.js';
import path from 'path';
import fs from 'fs';

const data = fs.readFileSync(path.resolve(process.cwd(), 'bench/data.json')).toString();
const compressedData = compress(data);

const suite = new Benchmark.Suite()
  .on('cycle', e => console.log(`${e.target}`))
  .on('abort', err => {
    console.error('abort', err);
  })
  .on('error', err => {
    console.error('error', err);
  });

suite.add('lz-string: compress', () => {
  return lzstring.compress(data);
});
suite.add('@immutabl3/lz-string: compress', () => {
  return compress(data);
});

suite.add('lz-string: decompress', () => {
  return lzstring.decompress(compressedData);
});
suite.add('@immutabl3/lz-string: decompress', () => {
  return decompress(compressedData);
});

suite.run();
