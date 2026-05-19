import { AMAZING_GRACE, AMAZING_GRACE_COL } from '../testData';
import parseSong from './song';

describe('Song:', () => {
  it('parses song', () => {
    const song = parseSong(AMAZING_GRACE);

    expect(song.meta.title).toBe('Amazing Grace');
    expect(song.meta.artist).toBe('Elvis Presley');

    const [chorus, verse] = song.sections;

    expect(chorus.type).toBe('chorus');
    expect(verse.type).toBe('verse');
  });

  it('parses song with chords over lyrics', () => {
    const song = parseSong(AMAZING_GRACE_COL);
    const expected = parseSong(AMAZING_GRACE);

    expect(song).toStrictEqual(expected);
  });

  it('lists clean chords from grid sections', () => {
    const song = parseSong(`
{start_of_grid}
| C . / | % . | D~G . ||
{end_of_grid}
`.trim());

    expect(song.chords).toEqual(['C', 'D', 'G']);
  });
});
