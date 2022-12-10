import { parseMetadata } from '../metadata';
import { parseSections } from '../sections';
import { Song } from '../types';

const parseSong = (content: string): Song => {
  const metadata = parseMetadata(content);
  const sections = parseSections(content);
  return { meta: metadata, sections };
};

export default parseSong;
