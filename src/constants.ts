export enum METADATA_DIRECTIVES {
  Title = 'title|Title',
  Subtitle = 'subtitle|Subtitle',
  Artist = 'artist|Artist',
  Album = 'album',
  Year = 'year',
  Key = 'key',
  Time = 'time',
  Tempo = 'tempo',
  Duration = 'duration',
  Capo = 'capo',
  Meta = 'meta',
}

export enum ENVIRONMENT_DIRECTIVES {
  VerseStart = 'start_of_verse|sov',
  VerseEnd = 'end_of_verse|eov',

  ChorusStart = 'start_of_chorus|soc',
  ChorusEnd = 'end_of_chorus|eoc',

  BridgeStart = 'start_of_bridge|sob',
  BridgeEnd = 'end_of_bridge|eob',

  SectionStart = 'start_of_section|sos',
  SectionEnd = 'end_of_section|eos',
}
