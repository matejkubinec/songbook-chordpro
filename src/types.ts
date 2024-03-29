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
  | ({ type: 'unknown' } & UnknownSection);

export type Song = {
  meta: Metadata;
  chords: string[];
  sections: Array<Section>;
};
