import { parseSections } from './sections';

describe('Sections:', () => {
  it('parses verse without chords and titles', () => {
    const verseLong = `
        {start_of_verse}
        This is a verse
        {end_of_verse}
    `.trim();

    const parsedLong = parseSections(verseLong);

    expect(parsedLong.length).toBe(1);
    expect(parsedLong[0]).toBeDefined();
    expect(parsedLong[0]?.title).toBeUndefined();
    expect(parsedLong[0]?.type).toBe('verse');
  });

  it('parses verse without chords', () => {
    const verseLong = `
        {start_of_verse:Verse}
        This is a verse
        {end_of_verse}
    `.trim();

    const parsedLong = parseSections(verseLong);

    expect(parsedLong.length).toBe(1);
    expect(parsedLong[0]).toBeDefined();
    expect(parsedLong[0]?.title).toBe('Verse');
    expect(parsedLong[0]?.type).toBe('verse');
  });
});
