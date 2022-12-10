import { Block } from '../types';
import { LinePair } from '../types.internal';

const toBlocks = (pair: LinePair): Block[] => {
  if (!pair.lyric && !pair.chord) {
    return [];
  }

  if (pair.lyric && pair.chord) {
    return parseMixedLine(pair);
  }

  if (pair.lyric) {
    return [{ chord: '', lyric: pair.lyric }];
  }

  return splitChords(pair.chord).map<Block>((chord) => ({ chord, lyric: '' }));
};

const parseMixedLine = (pair: LinePair): Block[] => {
  const indices = getIndices(pair.chord);
  const chords = splitAtIndices(pair.chord, indices);
  const lyrics = splitAtIndices(pair.lyric, indices);
  const blocks = new Array<Block>();
  for (let i = 0; i <= indices.length; i++) {
    if (!!chords[i] || !!lyrics[i]) {
      blocks.push({
        chord: cleanupChord(chords[i] || ''),
        lyric: lyrics[i] || '',
      });
    }
  }
  return blocks;
};

const cleanupChord = (chord: string): string =>
  chord.replace(/\[|\]/g, '').trim();

const splitAtIndices = (line: string, indices: number[]): string[] => {
  const parts = new Array<string>();
  let start = 0;
  for (const idx of indices) {
    parts.push(line.slice(start, idx + 1));
    start = idx + 1;
  }
  parts.push(line.slice(start));
  return parts;
};

const getIndices = (line: string): number[] => {
  const indices = new Array<number>();
  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '[') {
      indices.push(i - 1);
    } else if (char === ']') {
      indices.push(i);
    }
  }
  return indices;
};

const splitChords = (chordLine: string): string[] =>
  chordLine.split(/\[|\]/).map(cleanupChord).filter(Boolean);

export default toBlocks;
