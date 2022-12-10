export const verseMinimal = `
{start_of_verse}
This is a verse
{end_of_verse}
`.trim();

export const verseTitle = `
{start_of_verse:Verse}
This is a verse
{end_of_verse}
`.trim();

export const verseChords = `
{start_of_verse:Verse}
[Ami]     [C]
This is a verse
{end_of_verse}
`.trim();

export const multiSections = `
{start_of_verse:Verse}
[Ami]     [C]
This is a verse
{end_of_verse}

{start_of_verse:Verse}
[Ami]     [C]
This is a verse
{end_of_verse}

{start_of_verse:Verse}
[Ami]     [C]
This is a verse
{end_of_verse}
`;

export const multiTypes = `
{start_of_verse:Verse}
This is a verse
{end_of_verse}

This is unknown

{start_of_chorus:Chorus}
This is a chorus
{end_of_chorus}

{start_of_bridge:Bridge}
This is a bridge
{end_of_bridge}

{start_of_section:Misc}
This is misc
{start_of_section}
`;
