import * as TestData from '../testData';
import { Block, Line, Section } from '../types';
import { parseSections } from './sections';

describe('Sections:', () => {
  it('parses verse without chords and titles', () => {
    const expectedLines: Line[] = [
      {
        blocks: [
          {
            chord: '',
            lyric: 'This is a verse',
          },
        ],
      },
    ];

    const parsedLong = parseSections(TestData.verseMinimal);

    expect(parsedLong.length).toBe(1);
    expect(parsedLong[0]).toBeDefined();
    expect(parsedLong[0]?.title).toBeUndefined();
    expect(parsedLong[0]?.type).toBe('verse');
    expect(parsedLong[0].lines).toEqual(expectedLines);
  });

  it('parses verse with title', () => {
    const expectedLines: Line[] = [
      {
        blocks: [
          {
            chord: '',
            lyric: 'This is a verse',
          },
        ],
      },
    ];

    const parsedLong = parseSections(TestData.verseTitle);

    expect(parsedLong.length).toBe(1);
    expect(parsedLong[0]).toBeDefined();
    expect(parsedLong[0].title).toBe('Verse');
    expect(parsedLong[0].type).toBe('verse');
    expect(parsedLong[0].lines).toEqual(expectedLines);
  });

  it('parses verse with chords', () => {
    const expectedLines: Line[] = [
      {
        blocks: [
          {
            chord: 'Ami',
            lyric: 'This ',
          },
          {
            chord: '',
            lyric: 'is a ',
          },
          {
            chord: 'C',
            lyric: 'ver',
          },
          {
            chord: '',
            lyric: 'se',
          },
        ],
      },
    ];

    const parsedLong = parseSections(TestData.verseChords);

    expect(parsedLong.length).toBe(1);
    expect(parsedLong[0]).toBeDefined();
    expect(parsedLong[0]?.title).toBe('Verse');
    expect(parsedLong[0]?.type).toBe('verse');
    expect(parsedLong[0].lines).toEqual(expectedLines);
  });

  it('parses multiple sections', () => {
    const blocks = [
      {
        chord: 'Ami',
        lyric: 'This ',
      },
      {
        chord: '',
        lyric: 'is a ',
      },
      {
        chord: 'C',
        lyric: 'ver',
      },
      {
        chord: '',
        lyric: 'se',
      },
    ];
    const expectedLines: Line[] = [
      {
        blocks: blocks,
      },
    ];

    const parsedLong = parseSections(TestData.multiSections);

    expect(parsedLong.length).toBe(3);

    for (let i = 0; i < parsedLong.length; i++) {
      expect(parsedLong[i]).toBeDefined();
      expect(parsedLong[i]?.title).toBe('Verse');
      expect(parsedLong[i]?.type).toBe('verse');
      expect(parsedLong[i].lines).toEqual(expectedLines);
    }
  });

  it('parses different section types', () => {
    const blocks: Record<Section['type'], Block[]> = {
      verse: [
        {
          chord: '',
          lyric: 'This is a verse',
        },
      ],
      bridge: [
        {
          chord: '',
          lyric: 'This is a bridge',
        },
      ],
      chorus: [
        {
          chord: '',
          lyric: 'This is a chorus',
        },
      ],
      unknown: [
        {
          chord: '',
          lyric: 'This is unknown',
        },
      ],
      misc: [
        {
          chord: '',
          lyric: 'This is misc',
        },
      ],
    };
    const expectedLines: Record<Section['type'], Line[]> = {
      verse: [
        {
          blocks: blocks.verse,
        },
      ],
      bridge: [
        {
          blocks: blocks.bridge,
        },
      ],
      chorus: [
        {
          blocks: blocks.chorus,
        },
      ],
      unknown: [
        {
          blocks: blocks.unknown,
        },
      ],
      misc: [
        {
          blocks: blocks.misc,
        },
      ],
    };

    const sections = parseSections(TestData.multiTypes);

    expect(sections.length).toBe(5);

    const [verse, unknown, chorus, bridge, misc] = sections;

    expect(verse.title).toBe('Verse');
    expect(verse.lines).toEqual(expectedLines.verse);

    expect(unknown.title).toBeUndefined();
    expect(unknown.lines).toEqual(expectedLines.unknown);

    expect(chorus.title).toBe('Chorus');
    expect(chorus.lines).toEqual(expectedLines.chorus);

    expect(bridge.title).toBe('Bridge');
    expect(bridge.lines).toEqual(expectedLines.bridge);

    expect(misc.title).toBe('Misc');
    expect(misc.lines).toEqual(expectedLines.misc);
  });
});
