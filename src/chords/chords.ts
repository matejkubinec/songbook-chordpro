import { GridToken, Section } from '../types';

const getUsedChords = (sections: Section[]): string[] => {
  const chords = sections.flatMap((section) => {
    if (section.type === 'grid') {
      return section.rows.flatMap((row) => row.tokens.flatMap(getGridChords));
    }

    return section.lines.flatMap((line) =>
      line.blocks.map((block) => block.chord)
    );
  });
  const distinct = Array.from(new Set(chords));
  return distinct.sort();
};

const getGridChords = (token: GridToken): string[] => {
  if (token.type === 'chord') {
    return [token.chord];
  }

  if (token.type === 'chords') {
    return token.chords;
  }

  return [];
};

export default getUsedChords;
