import { ENVIRONMENT_DIRECTIVES, METADATA_DIRECTIVES } from '../constants';
import parseLines from '../lines';
import { GridRow, GridToken, Line, Section } from '../types';
import { getValueFromDirective, matchesDirective } from '../utils';

type LineSection = Extract<Section, { lines: Line[] }>;

export const parseSections = (content: string): Section[] => {
  const sections: Section[] = [];
  const lines = removeMetadata(content.split('\n'));

  let current: Section = {
    type: 'unknown',
    lines: [],
  };
  let sectionLines = new Array<string>();

  for (const line of lines) {
    const isStart = isStartDirective(line);
    const isEnd = isEndDirective(line);

    if (isStart) {
      current = parseSectionContent(current, sectionLines);

      if (current && isValidSection(current)) {
        sections.push(filterSection(current));
      }

      current = createSection(line);
      sectionLines = [];
    } else if (isEnd) {
      current = parseSectionContent(current, sectionLines);

      if (current && isValidSection(current)) {
        sections.push(filterSection(current));
      }
      current = {
        type: 'unknown',
        lines: [],
      };
      sectionLines = [];
    } else {
      sectionLines.push(line);
    }
  }

  return sections;
};

const isValidSection = (section: Section) => {
  if (section.type === 'unknown') {
    return section.lines.filter((line) => line.blocks.length).length;
  }

  return true;
};

const filterSection = (section: Section): Section => {
  if (section.type === 'grid') {
    return {
      ...section,
      rows: section.rows.filter((row) => row.tokens.length),
    };
  }

  return {
    ...section,
    lines: section.lines.filter((line) => line.blocks.length),
  };
};

const parseSectionContent = (
  section: Section,
  sectionLines: string[]
): Section => {
  if (section.type === 'grid') {
    return {
      ...section,
      rows: parseGridRows(sectionLines),
    };
  }

  return {
    ...section,
    lines: parseLines(sectionLines),
  };
};

const createSection = (line: string): Section => {
  const type = getType(line);

  if (type === 'grid') {
    const label = getGridLabel(line);
    return {
      ...(label ? { label } : {}),
      type,
      rows: [],
    };
  }

  return {
    title: getValueFromDirective(line),
    type,
    lines: [],
  } as LineSection;
};

const getType = (line: string): Section['type'] => {
  if (matchesDirective(ENVIRONMENT_DIRECTIVES.GridStart, line)) {
    return 'grid';
  }

  if (matchesDirective(ENVIRONMENT_DIRECTIVES.VerseStart, line)) {
    return 'verse';
  }

  if (matchesDirective(ENVIRONMENT_DIRECTIVES.ChorusStart, line)) {
    return 'chorus';
  }

  if (matchesDirective(ENVIRONMENT_DIRECTIVES.BridgeStart, line)) {
    return 'chorus';
  }

  if (matchesDirective(ENVIRONMENT_DIRECTIVES.SectionStart, line)) {
    return 'misc';
  }

  return 'unknown';
};

const getGridLabel = (line: string): string | undefined => {
  const value = getValueFromDirective(line);

  if (!value || isGridShape(value)) {
    return undefined;
  }

  return value;
};

const isGridShape = (value: string): boolean =>
  /^(?:\d+\+)?\d+(?:x\d+)?(?:\+\d+)?$/.test(value.trim());

const parseGridRows = (lines: string[]): GridRow[] =>
  lines.map((line) => ({
    tokens: parseGridTokens(line),
  }));

const parseGridTokens = (line: string): GridToken[] =>
  line.trim().split(/\s+/).filter(Boolean).map(parseGridToken);

const parseGridToken = (token: string): GridToken => {
  if (isBarToken(token)) {
    return parseBarToken(token);
  }

  if (token === '.') {
    return { type: 'space', symbol: '.' };
  }

  if (token === '/') {
    return { type: 'slash', symbol: '/' };
  }

  if (token === '%') {
    return { type: 'repeat1', symbol: '%' };
  }

  if (token === '%%') {
    return { type: 'repeat2', symbol: '%%' };
  }

  if (token.includes('~')) {
    return {
      type: 'chords',
      chords: token.split('~').filter(isChordToken),
    };
  }

  return { type: 'chord', chord: token };
};

const isBarToken = (token: string): boolean =>
  ['|', '||', '|.', '|:', ':|', ':|:'].includes(token) ||
  /^:?\|\d+>?$/.test(token);

const parseBarToken = (token: string): GridToken => {
  const volta = token.match(/^(:?\|)(\d+)(>?)$/);

  if (volta) {
    return {
      type: 'bar',
      symbol: volta[1],
      volta: volta[2],
      ...(volta[3] ? { align: true } : {}),
    };
  }

  return { type: 'bar', symbol: token };
};

const isChordToken = (token: string): boolean =>
  token !== '' && token !== '.' && token !== '/';

const removeMetadata = (lines: string[]): string[] => {
  const directives = Object.values(METADATA_DIRECTIVES);
  return lines.filter(
    (line) => !directives.some((directive) => matchesDirective(directive, line))
  );
};

const isStartDirective = (line: string): boolean =>
  matchesDirective(ENVIRONMENT_DIRECTIVES.VerseStart, line) ||
  matchesDirective(ENVIRONMENT_DIRECTIVES.ChorusStart, line) ||
  matchesDirective(ENVIRONMENT_DIRECTIVES.BridgeStart, line) ||
  matchesDirective(ENVIRONMENT_DIRECTIVES.SectionStart, line) ||
  matchesDirective(ENVIRONMENT_DIRECTIVES.GridStart, line) ||
  line.includes('{start_of_');

const isEndDirective = (line: string): boolean =>
  matchesDirective(ENVIRONMENT_DIRECTIVES.VerseEnd, line) ||
  matchesDirective(ENVIRONMENT_DIRECTIVES.ChorusEnd, line) ||
  matchesDirective(ENVIRONMENT_DIRECTIVES.BridgeEnd, line) ||
  matchesDirective(ENVIRONMENT_DIRECTIVES.SectionEnd, line) ||
  matchesDirective(ENVIRONMENT_DIRECTIVES.GridEnd, line) ||
  line.includes('{end_of_');
