import { Block, Line } from '../types';
import parseLines from './lines';

const data = {
  chord: '[Ami]',
  chordParsed: 'Ami',
  lyric: 'Lyric',
  pad: '     ',
};

describe('Lines:', () => {
  it('parses lyric only lines', () => {
    const lines = [data.lyric, data.lyric, data.lyric];
    const block: Block = { chord: '', lyric: data.lyric };
    const line: Line = { blocks: [block], type: 'lyrics-only' };
    const expected: Line[] = [line, line, line];
    const actual = parseLines(lines);
    expect(actual).toEqual(expected);
  });

  it('parses chord only lines', () => {
    const lines = [data.chord, data.chord, data.chord];
    const block: Block = { lyric: data.pad, chord: data.chordParsed };
    const line: Line = { blocks: [block], type: 'chords-only' };
    const expected: Line[] = [line, line, line];
    const actual = parseLines(lines);
    expect(actual).toEqual(expected);
  });

  it('parses mixed lines', () => {
    const lines = [data.chord, data.lyric, data.chord, data.lyric];
    const block: Block = { lyric: data.lyric, chord: data.chordParsed };
    const line: Line = { blocks: [block], type: 'mixed' };
    const expected: Line[] = [line, line];
    const actual = parseLines(lines);
    expect(actual).toEqual(expected);
  });
});
