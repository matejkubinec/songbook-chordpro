# Songbook Chordpro

Simple typescript library for parsing songs in chordpro format.  
You can view the package on [npm](https://npmjs.com/package/songbook-chordpro).

For a react component that uses the library see: [songbook-chordpro-view](https://github.com/matejkubinec/songbook-chordpro-view).

## Installation

Using npm:

```bash
npm i songbook-chordpro
```

Using yarn:

```bash
yarn add songbook-chordpro

```

## Usage

To parse the chordpro string to a common format use:

```ts
import parseSong from 'songbook-chordpro';

const content = '...chordpro string';

const song = parseSong(content);
```

## License

[MIT](./license.txt)
