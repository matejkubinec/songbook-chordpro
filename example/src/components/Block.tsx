import { FC } from 'react';
import { Block } from '../../../src';
import './Block.css';

interface Props {
  block: Block;
}

const LineBlock: FC<Props> = ({ block }) => {
  return (
    <div className="block">
      <div className="chord">{block.chord}</div>
      <div className="lyric">{block.lyric || ' '}</div>
    </div>
  );
};

export default LineBlock;
