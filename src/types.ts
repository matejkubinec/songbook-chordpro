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

export type Line = {
  blocks: Block;
};

export type SectionType = 'chorus' | 'verse' | 'bridge' | 'tab' | 'grid';

export type Section = {
  type: SectionType;
  title?: string;
};

export type ChorusSection = {
  lines: Line[];
} & Section;

export type VerseSection = {
  lines: Line[];
} & Section;

export type BridgeSection = {
  lines: Line[];
} & Section;

export type Song = {
  meta: Metadata;
};
