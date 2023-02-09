import { LabeledLine, LinePair } from '../types.internal';

const toPairs = (labeled: LabeledLine[]): LinePair[] => {
  const pairs = new Array<LinePair>();

  for (let i = 1; i <= labeled.length; i++) {
    const previous = labeled[i - 1];
    const current = labeled[i];

    if (previous.label === 'mixed') {
      pairs.push(parseMixed(previous.line));
    }

    if (previous.label === 'chord' && current?.label === 'lyric') {
      pairs.push({
        chord: previous.line,
        lyric: current.line,
      });
      i++;
    } else if (previous.label === 'chord' && current?.label === 'chord') {
      pairs.push({
        chord: previous.line,
        lyric: '',
      });
    } else if (previous.label === 'lyric' && current?.label === 'chord') {
      pairs.push({
        chord: '',
        lyric: previous.line,
      });
    } else if (previous.label === 'lyric' && current?.label === 'lyric') {
      pairs.push({
        chord: '',
        lyric: previous.line,
      });
    } else if (previous.label === 'chord' && !current) {
      pairs.push({
        chord: previous.line,
        lyric: '',
      });
    } else if (previous.label === 'lyric' && !current) {
      pairs.push({
        chord: '',
        lyric: previous.line,
      });
    }
  }

  return pairs;
};

const parseMixed = (line: string): LinePair => {
  let offset = 0;
  let chord = '';
  let lyric = '';
  let isChord = false;

  for (const char of line) {
    if (char === '[') {
      while (offset > 0) {
        chord += ' ';
        offset -= 1;
      }

      isChord = true;
    }

    if (isChord) {
      chord += char;
      offset -= 1;
    } else {
      lyric += char;
      offset += 1;
    }

    if (char === ']') {
      isChord = false;
    }
  }

  return { chord, lyric };
};

export default toPairs;
