import { METADATA_DIRECTIVES } from '../constants';
import { Metadata } from '../types';
import { matchesDirective, getValueFromDirective } from '../utils';

export const parseMetadata = (content: string): Metadata => {
  const meta: Metadata = {};
  const lines = content.split('\n');
  const directives = Object.values(METADATA_DIRECTIVES);
  const directiveMap: Record<METADATA_DIRECTIVES, keyof Metadata> = {
    [METADATA_DIRECTIVES.Title]: 'title',
    [METADATA_DIRECTIVES.Subtitle]: 'subtitle',
    [METADATA_DIRECTIVES.Artist]: 'artist',
    [METADATA_DIRECTIVES.Album]: 'album',
    [METADATA_DIRECTIVES.Year]: 'year',
    [METADATA_DIRECTIVES.Key]: 'key',
    [METADATA_DIRECTIVES.Time]: 'time',
    [METADATA_DIRECTIVES.Tempo]: 'tempo',
    [METADATA_DIRECTIVES.Duration]: 'duration',
    [METADATA_DIRECTIVES.Capo]: 'capo',
    [METADATA_DIRECTIVES.Meta]: 'meta',
  };

  lines.forEach((line) => {
    directives.forEach((directive) => {
      const key = directiveMap[directive];

      // todo: add support for custom meta directives
      if (matchesDirective(METADATA_DIRECTIVES.Meta, line)) {
        return;
      }

      if (matchesDirective(directive, line)) {
        meta[key] = getValueFromDirective(line);
      }
    });
  });

  return meta;
};
