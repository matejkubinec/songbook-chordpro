import { Block, Line } from '../types';
import parseLines from './lines';

const data = {
  chord: '[Ami]',
  lyric: 'Lyric',
};

describe('Lines:', () => {
  it('parses lyric only lines', () => {
    const lines = [data.lyric, data.lyric, data.lyric];
    const block: Block = { chord: '', lyric: data.lyric };
    const line: Line = { blocks: [block] };
    const expected: Line[] = [line, line, line];
    const actual = parseLines(lines);
    expect(actual).toEqual(expected);
  });

  it('parses chord only lines', () => {
    const lines = [data.chord, data.chord, data.chord];
    const block: Block = { lyric: '', chord: 'Ami' };
    const line: Line = { blocks: [block] };
    const expected: Line[] = [line, line, line];
    const actual = parseLines(lines);
    expect(actual).toEqual(expected);
  });

  it('parses mixed lines', () => {
    const lines = [data.chord, data.lyric, data.chord, data.lyric];
    const block: Block = { lyric: data.lyric, chord: 'Ami' };
    const line: Line = { blocks: [block] };
    const expected: Line[] = [line, line];
    const actual = parseLines(lines);
    expect(actual).toEqual(expected);
  });
});
