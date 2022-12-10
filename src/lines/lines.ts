import toBlocks from '../blocks';
import { Line } from '../types';
import labelLines from './labeling';
import toPairs from './pairing';

const parseLines = (lines: string[]): Line[] => {
  const labeled = labelLines(lines);
  const pairs = toPairs(labeled);
  return pairs.map<Line>((pair) => ({
    blocks: toBlocks(pair),
  }));
};

export default parseLines;
