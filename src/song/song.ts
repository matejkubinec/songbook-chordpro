import getUsedChords from '../chords';
import convertToChordsOverLyrics from '../convert';
import { parseMetadata } from '../metadata';
import { parseSections } from '../sections';
import { Song } from '../types';

const parseSong = (content: string): Song => {
  const converted = convertToChordsOverLyrics(content);
  const metadata = parseMetadata(converted);
  const sections = parseSections(converted);
  const chords = getUsedChords(sections);
  return { meta: metadata, sections, chords };
};

export default parseSong;
