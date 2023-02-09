import { LabeledLine, LineLabel } from '../types.internal';

const labelLines = (lines: string[]): LabeledLine[] =>
  lines.map((line) => ({
    label: getLineLabel(line),
    line,
  }));

const getLineLabel = (line: string): LineLabel => {
  if (isChordLine(line)) {
    if (isMixedLine(line)) {
      return 'mixed';
    }

    return 'chord';
  }

  return 'lyric';
};

const isChordLine = (line: string): boolean => line.includes('[');

const isMixedLine = (line: string): boolean => {
  let isChord = false;

  for (const char of line) {
    if (char === '[') {
      isChord = true;
    }

    if (!isChord && char !== ' ') {
      return true;
    }

    if (char === ']') {
      isChord = false;
    }
  }

  return false;
};

export default labelLines;
