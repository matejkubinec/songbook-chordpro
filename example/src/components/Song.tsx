import { FC } from 'react';
import { Song } from '../../../src';
import Section from './Section';

type Props = {
  song: Song;
};

const Song: FC<Props> = ({ song }) => {
  console.log(song);
  return (
    <div>
      <h3>{song.meta.title}</h3>
      <h4>{song.meta.artist}</h4>
      <div>
        {song.sections.map((section, index) => (
          <Section key={index} section={section} />
        ))}
      </div>
    </div>
  );
};

export default Song;
