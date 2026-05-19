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

### Grid sections

ChordPro grid environments are parsed as `grid` sections with tokenized rows:

```ts
import parseSong from 'songbook-chordpro';

const song = parseSong(`
{start_of_grid: Intro}
| C . . . | G . . . |
{end_of_grid}
`.trim());

const grid = song.sections[0];

if (grid.type === 'grid') {
  console.log(grid.label);
  // Intro

  console.log(grid.rows[0].tokens);
  // [
  //   { type: 'bar', symbol: '|' },
  //   { type: 'chord', chord: 'C' },
  //   { type: 'space', symbol: '.' },
  //   { type: 'space', symbol: '.' },
  //   { type: 'space', symbol: '.' },
  //   { type: 'bar', symbol: '|' },
  //   { type: 'chord', chord: 'G' },
  //   { type: 'space', symbol: '.' },
  //   { type: 'space', symbol: '.' },
  //   { type: 'space', symbol: '.' },
  //   { type: 'bar', symbol: '|' },
  // ]
}
```

## License

[MIT](./license.txt)
