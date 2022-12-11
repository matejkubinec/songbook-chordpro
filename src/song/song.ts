import getUsedChords from '../chords';
import { parseMetadata } from '../metadata';
import { parseSections } from '../sections';
import { Song } from '../types';

const parseSong = (content: string): Song => {
  const metadata = parseMetadata(content);
  const sections = parseSections(content);
  const chords = getUsedChords(sections);
  return { meta: metadata, sections, chords };
};

export default parseSong;
