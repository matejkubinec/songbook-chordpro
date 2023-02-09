export type LineLabel = 'chord' | 'lyric' | 'mixed';

export type LabeledLine = {
  label: LineLabel;
  line: string;
};

export type LinePair = {
  chord: string;
  lyric: string;
};
