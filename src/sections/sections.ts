import { ENVIRONMENT_DIRECTIVES } from '../constants';
import { Section } from '../types';
import { getValueFromDirective, matchesDirective } from '../utils';

export const parseSections = (content: string): Section[] => {
  const sections: Section[] = [];
  const lines = content.split('\n');

  let current: Section | undefined = undefined;

  for (const line of lines) {
    if (matchesDirective(ENVIRONMENT_DIRECTIVES.VerseStart, line)) {
      if (current) {
        sections.push(current);
      }
      current = {
        title: getValueFromDirective(line),
        type: 'verse',
      };
    } else if (
      current &&
      matchesDirective(ENVIRONMENT_DIRECTIVES.VerseEnd, line)
    ) {
      sections.push(current);
      current = undefined;
    }
  }

  return sections;
};
