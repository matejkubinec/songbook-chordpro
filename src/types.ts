export type Metadata = {
  title?: string;
  subtitle?: string;
  artist?: string;
  album?: string;
  year?: string;
  key?: string;
  time?: string;
  tempo?: string;
  duration?: string;
  capo?: string;
  meta?: string;
};

export type Block = {
  chord: string;
  lyric: string;
};

export type LineType = 'mixed' | 'lyrics-only' | 'chords-only';

export type Line = {
  blocks: Block[];
  type: LineType;
};

export type GridToken =
  | { type: 'bar'; symbol: string; volta?: string; align?: boolean }
  | { type: 'chord'; chord: string }
  | { type: 'chords'; chords: string[] }
  | { type: 'space'; symbol: '.' }
  | { type: 'slash'; symbol: '/' }
  | { type: 'repeat1'; symbol: '%' }
  | { type: 'repeat2'; symbol: '%%' };

export type GridRow = {
  tokens: GridToken[];
};

export type GridSection = {
  label?: string;
  rows: GridRow[];
};

export type ChorusSection = {
  title?: string;
  lines: Line[];
};

export type VerseSection = {
  title?: string;
  lines: Line[];
};

export type BridgeSection = {
  title?: string;
  lines: Line[];
};

export type UnknownSection = {
  title?: string;
  lines: Line[];
};

export type MiscSection = {
  title?: string;
  lines: Line[];
};

export type Section =
  | ({ type: 'chorus' } & ChorusSection)
  | ({ type: 'verse' } & VerseSection)
  | ({ type: 'bridge' } & BridgeSection)
  | ({ type: 'misc' } & MiscSection)
  | ({ type: 'unknown' } & UnknownSection)
  | ({ type: 'grid' } & GridSection);

export type Song = {
  meta: Metadata;
  chords: string[];
  sections: Array<Section>;
};
