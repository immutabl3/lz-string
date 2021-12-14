lz-string
=========

LZ-based compression algorithm

A esmodule port of [pieroxy/lz-string](https://github.com/pieroxy/lz-string/blob/master/README.md) with a ton of (benchmarked) optimizations and a smaller file size

## Install via [npm](https://npmjs.org/)

```shell
$ npm install @immutabl3/lz-string
```

## Home page

Home page for this program with examples, documentation and a live demo: http://pieroxy.net/blog/pages/lz-string/index.html

## Benchmark

```
lz-string: compress x 374 ops/sec ±1.20% (82 runs sampled)
@immutabl3/lz-string: compress x 411 ops/sec ±1.40% (83 runs sampled)
lz-string: decompress x 1,419 ops/sec ±0.21% (96 runs sampled)
@immutabl3/lz-string: decompress x 83,761,295 ops/sec ±0.26% (97 runs sampled)
```

### Library Size

As of version `0.0.1` the payload added to your app is rather small. Served using gzip compression, lz-string will add less than `1k` to your total bundle size:

<dl>
  <dt>minified</dt><dd>`~3.2kB`</dd>
  <dt>gzipped</dt><dd>`~0.9kB`</dd>
  <dt>brotli'd</dt><dd>`~0.8kB`</dd>
</dl>

# License

[MIT](https://github.com/immutabl3/lz-string/blob/master/LICENSE)