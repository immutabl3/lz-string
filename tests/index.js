import describe from 'tape-describe';
import { range } from '@immutabl3/utils';
import { compress, decompress } from '../src/index.js';
import allPrintableCharacters from './allPrintableCharacters.js';

describe('utf-16', function(test) {
  test('compresses and decompresses: string', assert => {
    const value = 'Hello world!';
    const compressed = compress(value);
    assert.is(value, 'Hello world!');
    assert.not(compressed, value);
    const decompressed = decompress(compressed);
    assert.is(decompressed, value);
    assert.end();
  });

  test('compresses and decompresses: null', assert => {
    const compressed = compress(null);
    assert.is(compressed, '');
    assert.is(typeof compressed, typeof '');
    const decompressed = decompress(compressed);
    assert.is(decompressed, '');
    assert.end();
  });

  test('compresses and decompresses: undefined', assert => {
    const compressed = compress();
    assert.is(compressed, '');
    assert.is(typeof compressed, typeof '');
    const decompressed = decompress(compressed);
    assert.is(decompressed, '');
    assert.end();
  });

  test('decompresses: null', assert => {
    const decompressed = decompress(null);
    assert.is(decompressed, '');
    assert.end();
  });

  test('compresses and decompresses: empty string', assert => {
    const compressed = compress('');
    assert.not(compressed, '');
    assert.is(typeof compressed, typeof '');
    const decompressed = decompress(compressed);
    assert.is(decompressed, '');
    assert.end();
  });

  test('all printable characters', assert => {
    const testString = allPrintableCharacters();
    const compressed = compress(testString);
    assert.not(compressed, testString);
    const decompressed = decompress(compressed);
    const equal = decompressed === testString;
    assert.ok(equal);
    assert.end();
  });

  test('compresses and decompresses a string that repeats', assert => {
    const testString = 'aaaaabaaaaacaaaaadaaaaaeaaaaa';
    const compressed = compress(testString);
    assert.not(compressed, testString);
    assert.ok(compressed.length < testString.length);
    const decompressed = decompress(compressed);
    assert.is(decompressed, testString);
    assert.end();
  });

  test('compresses and decompresses a long string', assert => {
    const testString = range(1000)
      .map(() => `${Math.random()} `)
      .join('');

    const compressed = compress(testString);
    assert.not(compressed, testString);
    assert.ok(compressed.length < testString.length);
    const decompressed = decompress(compressed);
    assert.is(decompressed, testString);
    assert.end();
  });
});