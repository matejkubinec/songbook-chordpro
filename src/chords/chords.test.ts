import { Block, Section } from '../types';
import getUsedChords from './chords';

describe('Chords:', () => {
  it('lists chords from one section', () => {
    const block: Block = {
      chord: 'C',
      lyric: '',
    };
    const section: Section = {
      type: 'verse',
      lines: [{ blocks: [block] }],
    };
    const expected = ['C'];
    const actual = getUsedChords([section]);
    expect(actual).toEqual(expected);
  });

  it('lists chords from multiple sections', () => {
    const block: Block = {
      chord: 'C',
      lyric: '',
    };
    const section: Section = {
      type: 'verse',
      lines: [{ blocks: [block] }],
    };
    const expected = ['C'];
    const actual = getUsedChords([section, section]);
    expect(actual).toEqual(expected);
  });

  it('lists chords in order', () => {
    const blockC: Block = {
      chord: 'Dmi',
      lyric: '',
    };
    const blockD: Block = {
      chord: 'C',
      lyric: '',
    };
    const section: Section = {
      type: 'verse',
      lines: [{ blocks: [blockC, blockD] }],
    };
    const expected = ['C', 'Dmi'];
    const actual = getUsedChords([section]);
    expect(actual).toEqual(expected);
  });
});
