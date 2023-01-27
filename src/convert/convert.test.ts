import { verseChords, verseChordsInline } from '../testData';
import { convertToChordsOverLyrics } from './convert';

describe('Conversion', () => {
  it("doesn't do anything if format is chords over lyrics", () => {
    const actual = convertToChordsOverLyrics(verseChords);

    expect(actual).toBe(verseChords);
  });

  it('converts inline chords', () => {
    const actual = convertToChordsOverLyrics(verseChordsInline);

    expect(actual).toBe(verseChords);
  });
});
