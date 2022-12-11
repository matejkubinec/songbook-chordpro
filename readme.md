# Songbook Chordpro

Simple typescript library for parsing songs in chordpro format.

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
