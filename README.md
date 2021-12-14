lz-string
=========

LZ-based compression algorithm

A esmodule port of [pieroxy/lz-string](https://github.com/pieroxy/lz-string/blob/master/README.md)

## Install via [npm](https://npmjs.org/)

```shell
$ npm install @immutabl3/lz-string
```

## Home page

Home page for this program with examples, documentation and a live demo: http://pieroxy.net/blog/pages/lz-string/index.html

## Benchmark

```
lz-string: compress x 388 ops/sec ±1.23% (83 runs sampled)
@immutabl3/lz-string: compress x 404 ops/sec ±1.19% (79 runs sampled)
lz-string: decompress x 1,820,963 ops/sec ±0.26% (96 runs sampled)
@immutabl3/lz-string: decompress x 1,404 ops/sec ±0.27% (98 runs sampled)
```