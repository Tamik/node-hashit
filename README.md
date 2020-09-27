# node-hashit

Fast node.js hash library with sorting and typing. Provides [Hasher](#Hasher) class. [stringifyit](https://www.npmjs.com/package/stringifyit) provides [stringify Symbol](https://github.com/yarabey/stringifyit#stringifierstringify--symbol) to allow you [customize](https://github.com/yarabey/stringifyit#stringifierstringifycallback--function) stringifying your own classes.

Using node.js `crypto` module and [stringifyit](https://www.npmjs.com/package/stringifyit) library. For browsers you can use [crypto-browserify](https://github.com/crypto-browserify/crypto-browserify) or only [stringifyit](https://www.npmjs.com/package/stringifyit) library.

See [benchmarks](#benchmarks) for compare to other libs.

# Install

`npm i node-hashit --save`

# Features

-   Supports node.js >= 4.0.0
-   Supports Map/WeakMap, Set/WeakSet and typed arrays
-   Supports algorithms and encodings from node.js `crypto` module
-   Supports sort Set, Map, object keys and optional sort arrays
-   Supports custom stringify rules for user-defined classes (provided by [stringifyit](https://www.npmjs.com/package/stringifyit) library)
-   One of the fastest hash libraries

# API

## Classes

<dl>
<dt><a href="#Hasher">Hasher</a></dt>
<dd><p>Provides interface to hash any value</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#hashit">hashit(value, [options])</a> ⇒ <code>string</code></dt>
<dd><p>Helper for simple hash single value</p>
</dd>
</dl>

<a name="Hasher"></a>

## Hasher

Provides interface to hash any value

**Kind**: global class

-   [Hasher](#Hasher)
    -   [new Hasher([options])](#new_Hasher_new)
    -   _instance_
        -   [.update(value, [inputEncoding])](#Hasher+update)
        -   [.digest([outputEncoding])](#Hasher+digest) ⇒ <code>string</code> &#124; <code>Buffer</code>
    -   _inner_
        -   [~options](#Hasher..options) : <code>Stringifier~options</code>

<a name="new_Hasher_new"></a>

### new Hasher([options])

| Param     | Type                                     |
| --------- | ---------------------------------------- |
| [options] | <code>[options](#Hasher..options)</code> |

<a name="Hasher+update"></a>

### hasher.update(value, [inputEncoding])

Updates hash with stringified value

**Kind**: instance method of <code>[Hasher](#Hasher)</code>
**Throws**:

-   <code>HashitRangeError</code>

| Param           | Type                | Description    |
| --------------- | ------------------- | -------------- |
| value           | <code>\*</code>     |                |
| [inputEncoding] | <code>string</code> | Input encoding |

<a name="Hasher+digest"></a>

### hasher.digest([outputEncoding]) ⇒ <code>string</code> &#124; <code>Buffer</code>

**Kind**: instance method of <code>[Hasher](#Hasher)</code>
**See**: [https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding](https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding)

| Param            | Type                | Description                                         |
| ---------------- | ------------------- | --------------------------------------------------- |
| [outputEncoding] | <code>string</code> | Output encoding (if `null` Buffer will be returned) |

<a name="Hasher..options"></a>

### Hasher~options : <code>Stringifier~options</code>

**Kind**: inner typedef of <code>[Hasher](#Hasher)</code>
**See**

-   [https://nodejs.org/api/crypto.html#crypto_class_hash](https://nodejs.org/api/crypto.html#crypto_class_hash)
-   [https://github.com/yarabey/stringifyit#stringifieroptions--object](https://github.com/yarabey/stringifyit#stringifieroptions--object)

**Properties**

| Name           | Type                | Default                       | Description                                         |
| -------------- | ------------------- | ----------------------------- | --------------------------------------------------- |
| algorithm      | <code>string</code> | <code>&quot;md5&quot;</code>  | Hash algorithm                                      |
| inputEncoding  | <code>string</code> | <code>&quot;utf8&quot;</code> | Input encoding                                      |
| outputEncoding | <code>string</code> | <code>&quot;hex&quot;</code>  | Output encoding (if `null` Buffer will be returned) |

<a name="hashit"></a>

## hashit(value, [options]) ⇒ <code>string</code>

Helper for simple hash single value

**Kind**: global function

| Param     | Type                                     |
| --------- | ---------------------------------------- |
| value     | <code>\*</code>                          |
| [options] | <code>[options](#Hasher..options)</code> |

**Example**

```js
const {hashit} = require('node-hashit');

hashit({key: 'value', value: 'key'}) === hashit({value: 'key', key: 'value'}); // true
hashit(new Set(['value1', 'value2'])) === hashit(new Set(['value2', 'value1'])); // true
hashit(
    new Map([
        ['key', 'value'],
        ['value', 'key'],
    ]),
) ===
    hashit(
        new Map([
            ['value', 'key'],
            ['key', 'value'],
        ]),
    ); // true
hashit([1, 2, 3]) === hashit([1, 2, 3]); // true
hashit([1, 2, 3], {sortArrays: true}) === hashit([1, 3, 2], {sortArrays: true}); // true

hashit([1, 2, 3]) === hashit([1, 3, 2]); // false
hashit(5) === hashit('5'); // false
```

# Benchmarks

Benchmarked with Node.js v6.9.5

## Usage

-   `npm run benchOps` to run comparison operations/second with other libs for different cases
-   `npm run benchHeap` to run comparison heap using with other libs for complex cases
-   `npm run benchSpeed` to run benchmarking hashit operations/second for different cases

## Results

### Operations/second comparison (+includePrimitiveTypes +sortArrays) [source](bench/ops.js)

```
hashit/array x 255,710 ops/sec ±1.54% (86 runs sampled)
nodeObjectHash/array x 174,084 ops/sec ±2.11% (84 runs sampled)
hashObject/array x 140,706 ops/sec ±1.56% (82 runs sampled)
objectHash/array x 48,767 ops/sec ±1.55% (88 runs sampled)

hashit/object x 426,051 ops/sec ±1.18% (82 runs sampled)
nodeObjectHash/object x 354,923 ops/sec ±1.59% (83 runs sampled)
hashObject/object x 350,324 ops/sec ±1.40% (84 runs sampled)
objectHash/object x 27,030 ops/sec ±1.39% (83 runs sampled)

hashit/nestedObject x 23,762 ops/sec ±1.33% (87 runs sampled)
nodeObjectHash/nestedObject x 16,252 ops/sec ±4.74% (81 runs sampled)
hashObject/nestedObject x 17,689 ops/sec ±1.92% (85 runs sampled)
objectHash/nestedObject x 657 ops/sec ±1.27% (84 runs sampled)

hashit/complexObject_5items x 19,677 ops/sec ±1.54% (86 runs sampled)
nodeObjectHash/complexObject_5items x 9,922 ops/sec ±1.58% (87 runs sampled)
hashObject/complexObject_5items x 2,561 ops/sec ±1.65% (84 runs sampled)
objectHash/complexObject_5items x 1,433 ops/sec ±1.37% (85 runs sampled)

hashit/complexObject_10items x 10,385 ops/sec ±1.58% (86 runs sampled)
nodeObjectHash/complexObject_10items x 4,906 ops/sec ±2.10% (86 runs sampled)
hashObject/complexObject_10items x 1,331 ops/sec ±1.21% (85 runs sampled)
objectHash/complexObject_10items x 722 ops/sec ±1.65% (82 runs sampled)

hashit/complexObject_100items x 944 ops/sec ±1.55% (84 runs sampled)
nodeObjectHash/complexObject_100items x 483 ops/sec ±1.72% (84 runs sampled)
hashObject/complexObject_100items x 129 ops/sec ±1.35% (70 runs sampled)
objectHash/complexObject_100items x 66.61 ops/sec ±1.44% (65 runs sampled)

hashit faster in cases: array, object, nestedObject, complexObject_5items, complexObject_10items, complexObject_100items (6)

```

### Heap using comparison (+includePrimitiveTypes +sortArrays) [source](bench/heap.js)

| Library                | Time (ms) | Memory (Mb) |
| ---------------------- | --------- | ----------- |
| hashit-0.3.2           | 2120.435  | 42          |
| node-object-hash-1.2.0 | 2635.670  | 39          |
| object-hash-1.1.5      | 17325.391 | 62          |
| hash-object-0.1.7      | 9762.324  | 51          |

### Operations/second hashit benchmarking (+includePrimitiveTypes -sortArrays) [source](bench/speed.js)

```
array x 362,314 ops/sec ±0.97% (84 runs sampled)
object x 434,386 ops/sec ±1.78% (85 runs sampled)
nestedObject x 23,896 ops/sec ±1.35% (85 runs sampled)
complexObject_5items x 20,820 ops/sec ±1.56% (86 runs sampled)
complexObject_10items x 10,930 ops/sec ±1.55% (84 runs sampled)
complexObject_100items x 981 ops/sec ±1.68% (83 runs sampled)
set x 119,927 ops/sec ±2.33% (83 runs sampled)
map x 111,666 ops/sec ±2.27% (83 runs sampled)
```

## Links

-   [node-object-hash](https://www.npmjs.com/package/node-object-hash) - Fast hasher with nice interface
-   [object-hash](https://www.npmjs.com/package/object-hash) - Slow but popular hash lib, supports browser using
-   [hash-object](https://www.npmjs.com/package/hash-object) - Old and not supporting lib, but useful for simple objects
