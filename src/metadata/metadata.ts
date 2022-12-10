import { METADATA_DIRECTIVES } from '../constants';
import { Metadata } from '../types';
import { matchesDirective, getValueFromDirective } from '../utils';

export const parseMetadata = (content: string): Metadata => {
  const meta: Metadata = {};
  const lines = content.split('\n');

  lines.forEach((line) => {
    if (matchesDirective(METADATA_DIRECTIVES.Title, line)) {
      meta.title = getValueFromDirective(line);
    }

    if (matchesDirective(METADATA_DIRECTIVES.Artist, line)) {
      meta.artist = getValueFromDirective(line);
    }
  });

  return meta;
};
