import { AMAZING_GRACE } from '../testData';
import parseSong from './song';

describe('Song:', () => {
  it('parses whole song', () => {
    const song = parseSong(AMAZING_GRACE);

    expect(song.meta.title).toBe('Amazing Grace');
    expect(song.meta.artist).toBe('Elvis Presley');

    const [chorus, verse] = song.sections;

    expect(chorus.type).toBe('chorus');
    expect(verse.type).toBe('verse');
  });
});
