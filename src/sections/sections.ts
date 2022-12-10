import { ENVIRONMENT_DIRECTIVES } from '../constants';
import parseLines from '../lines';
import { Line, Section } from '../types';
import { getValueFromDirective, matchesDirective } from '../utils';

export const parseSections = (content: string): Section[] => {
  const sections: Section[] = [];
  const lines = content.split('\n');

  let current: Section = {
    type: 'unknown',
    lines: [],
  };
  let sectionLines = new Array<string>();

  for (const line of lines) {
    const isStart = isStartDirective(line);
    const isEnd = isEndDirective(line);

    if (isStart) {
      current.lines = parseLines(sectionLines);

      if (current && isValidSection(current)) {
        sections.push(filterSection(current));
      }

      current = {
        title: getValueFromDirective(line),
        type: getType(line),
        lines: [],
      };
      sectionLines = [];
    } else if (isEnd) {
      current.lines = parseLines(sectionLines);

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
    return filterSection(section).lines.length;
  }

  return true;
};

const filterSection = (section: Section): Section => {
  section.lines = section.lines.filter((line) => line.blocks.length);
  return section;
};

const getType = (line: string): Section['type'] => {
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

const isStartDirective = (line: string): boolean =>
  matchesDirective(ENVIRONMENT_DIRECTIVES.VerseStart, line) ||
  matchesDirective(ENVIRONMENT_DIRECTIVES.ChorusStart, line) ||
  matchesDirective(ENVIRONMENT_DIRECTIVES.BridgeStart, line) ||
  matchesDirective(ENVIRONMENT_DIRECTIVES.SectionStart, line);

const isEndDirective = (line: string): boolean =>
  matchesDirective(ENVIRONMENT_DIRECTIVES.VerseEnd, line) ||
  matchesDirective(ENVIRONMENT_DIRECTIVES.ChorusEnd, line) ||
  matchesDirective(ENVIRONMENT_DIRECTIVES.BridgeEnd, line) ||
  matchesDirective(ENVIRONMENT_DIRECTIVES.SectionEnd, line);
