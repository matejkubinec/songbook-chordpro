import toBlocks from '../blocks';
import { Line } from '../types';
import { blocksToType } from '../utils';
import labelLines from './labeling';
import toPairs from './pairing';

const parseLines = (lines: string[]): Line[] => {
  const labeled = labelLines(lines);
  const pairs = toPairs(labeled);
  return pairs.map<Line>((pair) => {
    const blocks = toBlocks(pair);
    const type = blocksToType(blocks);
    return { blocks, type };
  });
};

export default parseLines;
