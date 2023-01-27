export const convertToChordsOverLyrics = (content: string): string => {
  let result = '';

  for (const line of content.split('\n')) {
    if (line.includes('[')) {
      let parsingChord = false;
      let chordLine = '';
      let lyricLine = '';
      let offset = 0;

      for (const char of line) {
        if (char === '[') {
          parsingChord = true;

          for (let i = 0; i < offset; i++) {
            chordLine += ' ';
          }

          offset = 0;
        }

        if (parsingChord) {
          chordLine += char;
          offset += 1;
        } else {
          lyricLine += char;
        }

        if (char === ']') {
          parsingChord = false;
        }
      }

      lyricLine = lyricLine.trim();
      chordLine = chordLine.trim();

      if (chordLine.length) {
        result += chordLine + '\n';
      }

      if (lyricLine.length) {
        result += lyricLine + '\n';
      }
    } else {
      result += line + '\n';
    }
  }

  return result.trim();
};
