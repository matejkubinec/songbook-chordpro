import { Block, LineType } from '../types';

export const getValueFromDirective = (
  directive: string
): string | undefined => {
  const parts = directive.split(':');

  if (parts.length > 1) {
    const value = parts.slice(1).join(':');
    return value.trim().slice(0, -1).trim();
  }

  return undefined;
};

export const matchesDirective = (directive: string, line: string): boolean => {
  const regex = new RegExp(`\{(${directive}).*\}$`);
  return regex.test(line);
};

export const blocksToType = (blocks: Block[]): LineType => {
  const hasChords = blocks.some((b) => b.chord.length);
  const hasLyrics = blocks.some((b) => b.lyric.trim().length);

  if (hasChords && hasLyrics) {
    return 'mixed';
  }

  if (hasChords) {
    return 'chords-only';
  }

  return 'lyrics-only';
};
