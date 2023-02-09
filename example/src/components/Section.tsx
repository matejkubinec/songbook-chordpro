import { FC } from 'react';
import { Section } from '../../../src';
import LineBlock from './Block';
import SectionLine from './Line';

interface Props {
  section: Section;
}

const Section: FC<Props> = ({ section }) => {
  return (
    <div>
      <h5>{section.title}</h5>
      {section.lines.map((line, index) => (
        <SectionLine key={index} line={line} />
      ))}
    </div>
  );
};

export default Section;
