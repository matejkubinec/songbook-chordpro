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

export const AMAZING_GRACE = `
{title: Amazing Grace}
{artist: Elvis Presley}

{start_of_chorus}
[G]Amazing grace, Oh, how sw[C]eet the s[G]ound
That saved a wretch like [D7]me
I o[G]nce was lost, but n[C]ow I'm f[G]ound
Was blind, But n[D7]ow I s[G]ee
{end_of_chorus}

{start_of_verse}
[G]When we've been there ten th[C]ousand y[G]ears,
Bright shinning as the s[D7]un
We[G]'ve no less days to s[C]ing God's pr[G]aise
Then when, when we fi[D7]rst be[G]gun
{end_of_verse}
`.trim();
