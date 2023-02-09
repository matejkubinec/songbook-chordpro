import { LabeledLine } from '../types.internal';
import labelLines from './labeling';

const data = {
  chord: '[Ami]',
  lyric: 'Lyric',
  mixed: '[Ami]Lyric',
};

describe('LineLabeling:', () => {
  it('chord lines', () => {
    const lines: string[] = [data.chord, data.chord];
    const expected: LabeledLine[] = [
      { label: 'chord', line: data.chord },
      { label: 'chord', line: data.chord },
    ];
    const actual = labelLines(lines);
    expect(actual).toEqual(expected);
  });

  it('lyric lines', () => {
    const lines: string[] = [data.lyric, data.lyric];
    const expected: LabeledLine[] = [
      { label: 'lyric', line: data.lyric },
      { label: 'lyric', line: data.lyric },
    ];
    const actual = labelLines(lines);
    expect(actual).toEqual(expected);
  });

  it('chord & lyric lines', () => {
    const lines: string[] = [data.chord, data.lyric];
    const expected: LabeledLine[] = [
      { label: 'chord', line: data.chord },
      { label: 'lyric', line: data.lyric },
    ];
    const actual = labelLines(lines);
    expect(actual).toEqual(expected);
  });

  it('mixed line', () => {
    const lines: string[] = [data.mixed];
    const expected: LabeledLine[] = [
      { label: 'mixed', line: data.mixed },
    ];
    const actual = labelLines(lines);
    expect(actual).toEqual(expected);
  });
});
