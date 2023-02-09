import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { ChangeEventHandler } from 'react';
import './App.css';
import songs from './data';
import parseSong from '../../src/index';
import Song from './components/Song';

function App() {
  const [idx, setIdx] = useState(0);

  const handleSongChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const idx = e.target.selectedIndex;
    setIdx(idx);
  };

  return (
    <main>
      <div className="form-input">
        <label htmlFor="song-select">Song</label>
        <select name="song-select" id="song-select" onChange={handleSongChange}>
          {songs.map((song, index) => (
            <option value={index}>{song.name}</option>
          ))}
        </select>
      </div>
      <hr />
      <div className="song-section">
        <div className="song-raw">
          <pre>{songs[idx].raw}</pre>
        </div>
        <div className="divider"></div>
        <div className="song-converted">
          <Song song={parseSong(songs[idx].raw)} />
        </div>
      </div>
    </main>
  );
}

export default App;
