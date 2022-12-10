import { LabeledLine, LinePair } from '../types.internal';

const toPairs = (labeled: LabeledLine[]): LinePair[] => {
  const pairs = new Array<LinePair>();

  for (let i = 1; i <= labeled.length; i++) {
    const previous = labeled[i - 1];
    const current = labeled[i];

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

export default toPairs;
