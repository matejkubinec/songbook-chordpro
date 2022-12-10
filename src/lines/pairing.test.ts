import { LabeledLine, LinePair } from '../types.internal';
import toPairs from './pairing';

const data = {
  chord: '[Ami]',
  lyric: 'Lyric',
};

describe('LinePairing:', () => {
  it('parses chord only', () => {
    const labeled: LabeledLine[] = [
      {
        label: 'chord',
        line: data.chord,
      },
      {
        label: 'chord',
        line: data.chord,
      },
    ];
    const expected: LinePair[] = [
      {
        chord: data.chord,
        lyric: '',
      },
      {
        chord: data.chord,
        lyric: '',
      },
    ];
    expect(toPairs(labeled)).toEqual(expected);
  });

  it('parses lyric only', () => {
    const labeled: LabeledLine[] = [
      {
        label: 'lyric',
        line: data.lyric,
      },
      {
        label: 'lyric',
        line: data.lyric,
      },
    ];
    const expected: LinePair[] = [
      {
        chord: '',
        lyric: data.lyric,
      },
      {
        chord: '',
        lyric: data.lyric,
      },
    ];
    expect(toPairs(labeled)).toEqual(expected);
  });

  it('parses mixed -  chord | lyric', () => {
    const labeled: LabeledLine[] = [
      {
        label: 'chord',
        line: data.chord,
      },
      {
        label: 'lyric',
        line: data.lyric,
      },
    ];
    const expected: LinePair[] = [
      {
        chord: data.chord,
        lyric: data.lyric,
      },
    ];
    expect(toPairs(labeled)).toEqual(expected);
  });

  it('parses mixed - lyric | chord', () => {
    const labeled: LabeledLine[] = [
      {
        label: 'lyric',
        line: data.lyric,
      },
      {
        label: 'chord',
        line: data.chord,
      },
    ];
    const expected: LinePair[] = [
      {
        chord: '',
        lyric: data.lyric,
      },
      {
        chord: data.chord,
        lyric: '',
      },
    ];
    expect(toPairs(labeled)).toEqual(expected);
  });

  it('parses mixed - lyric | chord | lyric', () => {
    const labeled: LabeledLine[] = [
      {
        label: 'lyric',
        line: data.lyric,
      },
      {
        label: 'chord',
        line: data.chord,
      },
      {
        label: 'lyric',
        line: data.lyric,
      },
    ];
    const expected: LinePair[] = [
      {
        chord: '',
        lyric: data.lyric,
      },
      {
        chord: data.chord,
        lyric: data.lyric,
      },
    ];
    expect(toPairs(labeled)).toEqual(expected);
  });

  it('parses mixed - chord | chord | lyric', () => {
    const labeled: LabeledLine[] = [
      {
        label: 'chord',
        line: data.chord,
      },
      {
        label: 'chord',
        line: data.chord,
      },
      {
        label: 'lyric',
        line: data.lyric,
      },
    ];
    const expected: LinePair[] = [
      {
        chord: data.chord,
        lyric: '',
      },
      {
        chord: data.chord,
        lyric: data.lyric,
      },
    ];
    expect(toPairs(labeled)).toEqual(expected);
  });
});
