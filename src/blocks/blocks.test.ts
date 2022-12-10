import { Block } from '../types';
import { LinePair } from '../types.internal';
import toBlocks from './blocks';

describe('Blocks:', () => {
  it('creates lyric block', () => {
    const pair: LinePair = {
      chord: '',
      lyric: 'Lyric',
    };
    const expected: Block[] = [
      {
        chord: '',
        lyric: 'Lyric',
      },
    ];
    const actual = toBlocks(pair);
    expect(actual).toEqual(expected);
  });

  it('creates chord block', () => {
    const pair: LinePair = {
      chord: '[Ami]',
      lyric: '',
    };
    const expected: Block[] = [
      {
        chord: 'Ami',
        lyric: '',
      },
    ];
    const actual = toBlocks(pair);
    expect(actual).toEqual(expected);
  });

  it('creates multiple chord block', () => {
    const pair: LinePair = {
      chord: '[Ami] [Ami]',
      lyric: '',
    };
    const expected: Block[] = [
      {
        chord: 'Ami',
        lyric: '',
      },
      {
        chord: 'Ami',
        lyric: '',
      },
    ];
    const actual = toBlocks(pair);
    expect(actual).toEqual(expected);
  });

  it('creates from pair with same length', () => {
    const pair: LinePair = {
      chord: '[Ami]',
      lyric: 'Lyric',
    };
    const expected: Block[] = [
      {
        chord: 'Ami',
        lyric: 'Lyric',
      },
    ];
    const actual = toBlocks(pair);
    expect(actual).toEqual(expected);
  });

  it('creates from pair with longer lyric', () => {
    const pair: LinePair = {
      chord: '[Ami]',
      lyric: 'Lyric lyric',
    };
    const expected: Block[] = [
      {
        chord: 'Ami',
        lyric: 'Lyric',
      },
      {
        chord: '',
        lyric: ' lyric',
      },
    ];
    const actual = toBlocks(pair);
    expect(actual).toEqual(expected);
  });

  it('creates from pair with longer chords', () => {
    const pair: LinePair = {
      chord: '[Ami] [Ami]',
      lyric: 'Lyrictest',
    };
    const expected: Block[] = [
      {
        chord: 'Ami',
        lyric: 'Lyric',
      },
      {
        chord: '',
        lyric: 't',
      },
      {
        chord: 'Ami',
        lyric: 'est',
      },
    ];
    const actual = toBlocks(pair);
    expect(actual).toEqual(expected);
  });
});
