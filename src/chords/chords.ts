import { Section } from '../types';

const getUsedChords = (sections: Section[]): string[] => {
  const lines = sections.map((s) => s.lines).flat();
  const blocks = lines.map((l) => l.blocks).flat();
  const chords = blocks.map((b) => b.chord);
  const distinct = Array.from(new Set(chords));
  return distinct.sort();
};

export default getUsedChords;
