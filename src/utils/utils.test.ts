import { Block } from '../types';
import { blocksToType, getValueFromDirective, matchesDirective } from './utils';

describe('Utils:', () => {
  it('extracts value from directive - empty', () => {
    expect(getValueFromDirective('{test}')).toBeUndefined();
    expect(getValueFromDirective('{test:}')).toBe('');
  });

  it('extracts value from directive - without :', () => {
    expect(getValueFromDirective('{test:value }')).toBe('value');
    expect(getValueFromDirective('{test: value}')).toBe('value');
    expect(getValueFromDirective('{test: value }')).toBe('value');
  });

  it('extracts value from directive - with :', () => {
    expect(getValueFromDirective('{test: :value:}')).toBe(':value:');
    expect(getValueFromDirective('{test::value:}')).toBe(':value:');
    expect(getValueFromDirective('{test: :value: }')).toBe(':value:');
  });

  it('matches directive', () => {
    expect(matchesDirective('title|Title', '{title}')).toBeTruthy();
    expect(matchesDirective('title|Title', '{Title}')).toBeTruthy();
  });

  it('matches directive with value', () => {
    expect(matchesDirective('title|Title', '{title:value}')).toBeTruthy();
    expect(matchesDirective('title|Title', '{Title:value}')).toBeTruthy();
  });

  it('get type from chords only blocks', () => {
    const blocks: Block[] = [
      { chord: 'Ami', lyric: '' },
      { chord: 'D', lyric: '' },
    ];
    expect(blocksToType(blocks)).toBe('chords-only');
  });

  it('get type from lyrics only blocks', () => {
    const blocks: Block[] = [
      { chord: '', lyric: 'Lyric' },
      { chord: '', lyric: 'Lyric' },
    ];
    expect(blocksToType(blocks)).toBe('lyrics-only');
  });

  it('get type from mixed blocks', () => {
    const blocks: Block[] = [
      { chord: '', lyric: 'Lyric' },
      { chord: 'Ami', lyric: 'Lyric' },
    ];
    expect(blocksToType(blocks)).toBe('mixed');
  });
});
