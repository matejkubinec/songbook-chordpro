import { FC } from 'react';
import { Line } from '../../../src';
import Block from './Block';
import './Line.css';

interface Props {
  line: Line;
}

const SectionLine: FC<Props> = ({ line }) => {
  return (
    <div className="line">
      {line.blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
};

export default SectionLine;
