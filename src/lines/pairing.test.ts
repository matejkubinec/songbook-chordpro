import { LabeledLine, LinePair } from '../types.internal';
import toPairs from './pairing';

const data = {
  chord: '[Ami]',
  lyric: 'Lyric',
  pad: '     ',
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
        lyric: data.pad,
      },
      {
        chord: data.chord,
        lyric: data.pad,
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
        lyric: data.pad,
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
        lyric: data.pad,
      },
      {
        chord: data.chord,
        lyric: data.lyric,
      },
    ];
    expect(toPairs(labeled)).toEqual(expected);
  });

  it('inline chords starting with chord', () => {
    const input: LabeledLine[] = [
      {
        label: 'mixed',
        line: '[G]Amazing grace, Oh, how sw[C]eet the s[G]ound',
      },
    ];
    const expected: LinePair[] = [
      {
        chord: '[G]                      [C]      [G]',
        lyric: 'Amazing grace, Oh, how sweet the sound',
      },
    ];
    const actual = toPairs(input);
    expect(actual).toStrictEqual(expected);
  });

  it('inline chords starting with lyric', () => {
    const input: LabeledLine[] = [
      {
        label: 'mixed',
        line: 'That saved a wretch like [D7]me',
      },
    ];
    const expected: LinePair[] = [
      {
        chord: '                         [D7]',
        lyric: 'That saved a wretch like me  ',
      },
    ];
    const actual = toPairs(input);
    expect(actual).toStrictEqual(expected);
  });

  it('inline chords', () => {
    const input: LabeledLine[] = [
      {
        label: 'mixed',
        line: '[G]Amazing grace, Oh, how sw[C]eet the s[G]ound',
      },
      {
        label: 'mixed',
        line: 'That saved a wretch like [D7]me',
      },
    ];
    const expected: LinePair[] = [
      {
        chord: '[G]                      [C]      [G]',
        lyric: 'Amazing grace, Oh, how sweet the sound',
      },
      {
        chord: '                         [D7]',
        lyric: 'That saved a wretch like me  ',
      },
    ];
    const actual = toPairs(input);
    expect(actual).toStrictEqual(expected);
  });
});
