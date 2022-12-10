import { LabeledLine, LineLabel } from '../types.internal';

const labelLines = (lines: string[]): LabeledLine[] =>
  lines.map((line) => ({
    label: getLineLabel(line),
    line,
  }));

const getLineLabel = (line: string): LineLabel =>
  isChordLine(line) ? 'chord' : 'lyric';

const isChordLine = (line: string): boolean => line.includes('[');

export default labelLines;
