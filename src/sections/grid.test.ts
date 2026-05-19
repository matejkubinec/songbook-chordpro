import { GridRow } from '../types';
import { parseSections } from './sections';

const getGrid = (content: string) => {
  const section = parseSections(content)[0];

  if (section.type !== 'grid') {
    throw new Error('Expected grid section');
  }

  return section;
};

describe('Grid sections:', () => {
  it('parses simple grid with ignored shape', () => {
    const grid = getGrid(`
{start_of_grid 4x4}
| C | G | B | F |
{end_of_grid}
`.trim());

    const expectedRows: GridRow[] = [
      {
        tokens: [
          { type: 'bar', symbol: '|' },
          { type: 'chord', chord: 'C' },
          { type: 'bar', symbol: '|' },
          { type: 'chord', chord: 'G' },
          { type: 'bar', symbol: '|' },
          { type: 'chord', chord: 'B' },
          { type: 'bar', symbol: '|' },
          { type: 'chord', chord: 'F' },
          { type: 'bar', symbol: '|' },
        ],
      },
    ];

    expect(grid.label).toBeUndefined();
    expect(grid.rows).toEqual(expectedRows);
  });

  it('parses multi-row grid with placeholders and double bars', () => {
    const grid = getGrid(`
{start_of_grid}
|| Am . . . | C . . . | D  . . . | F  . . . |
|  Am . . . | C . . . | E  . . . | E  . . . |
|  Am . . . | C . . . | D  . . . | F  . . . |
|  Am . . . | E . . . | Am . . . | Am . . . ||
{end_of_grid}
`.trim());

    expect(grid.rows).toHaveLength(4);
    expect(grid.rows[0].tokens.slice(0, 6)).toEqual([
      { type: 'bar', symbol: '||' },
      { type: 'chord', chord: 'Am' },
      { type: 'space', symbol: '.' },
      { type: 'space', symbol: '.' },
      { type: 'space', symbol: '.' },
      { type: 'bar', symbol: '|' },
    ]);
    const lastRowTokens = grid.rows[3].tokens;
    expect(lastRowTokens[lastRowTokens.length - 1]).toEqual({
      type: 'bar',
      symbol: '||',
    });
  });

  it('parses abbreviated directives', () => {
    const grid = getGrid(`
{sog}
| C |
{eog}
`.trim());

    expect(grid.rows).toEqual([
      {
        tokens: [
          { type: 'bar', symbol: '|' },
          { type: 'chord', chord: 'C' },
          { type: 'bar', symbol: '|' },
        ],
      },
    ]);
  });

  it('parses colon labels and ignores shape-like colon values', () => {
    const [labeled, shaped] = parseSections(`
{start_of_grid: Intro}
| C |
{end_of_grid}
{start_of_grid: 4x4}
| G |
{end_of_grid}
`);

    expect(labeled.type).toBe('grid');
    expect(labeled.type === 'grid' ? labeled.label : undefined).toBe('Intro');
    expect(shaped.type).toBe('grid');
    expect(shaped.type === 'grid' ? shaped.label : undefined).toBeUndefined();
  });

  it('parses reference-style symbols and multiple chords', () => {
    const grid = getGrid(`
{start_of_grid}
|: C~G . / | % . | %% . |1 D~C :|2> |.
{end_of_grid}
`.trim());

    expect(grid.rows[0].tokens).toEqual([
      { type: 'bar', symbol: '|:' },
      { type: 'chords', chords: ['C', 'G'] },
      { type: 'space', symbol: '.' },
      { type: 'slash', symbol: '/' },
      { type: 'bar', symbol: '|' },
      { type: 'repeat1', symbol: '%' },
      { type: 'space', symbol: '.' },
      { type: 'bar', symbol: '|' },
      { type: 'repeat2', symbol: '%%' },
      { type: 'space', symbol: '.' },
      { type: 'bar', symbol: '|', volta: '1' },
      { type: 'chords', chords: ['D', 'C'] },
      { type: 'bar', symbol: ':|', volta: '2', align: true },
      { type: 'bar', symbol: '|.' },
    ]);
  });

  it('keeps line sections and grid sections on their own shapes', () => {
    const sections = parseSections(`
{start_of_verse}
Verse text
{end_of_verse}
{start_of_grid}
| C |
{end_of_grid}
`.trim());

    const [verse, grid] = sections;

    expect(verse.type).toBe('verse');
    expect('lines' in verse).toBe(true);
    expect('rows' in verse).toBe(false);

    expect(grid.type).toBe('grid');
    expect('rows' in grid).toBe(true);
    expect('lines' in grid).toBe(false);
  });
});
