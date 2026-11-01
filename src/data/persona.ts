// Genuine local game assets + Persona 3 Reload / Persona 4 Golden / Persona 5 Royal theme profiles.
export const persona = {
  background: '/persona/classroom.webp',
  portrait: '/persona/protagonist.webp',
  portraitMode: 'cutout' as 'reference' | 'cutout',
  music: '/persona/iwatodai-dorm.mp3',
  tracks: [
    { name: 'Iwatodai Dorm -Reload-', src: '/persona/iwatodai-dorm.mp3' },
    { name: 'Color Your Night', src: '/persona/color-your-night.mp3' },
  ],
  themes: [
    {
      id: 'p3r',
      code: 'P3R',
      name: 'Persona 3 Reload',
      subtitle: 'S.E.E.S. // Dark Hour Cyan & Navy',
      tag: 'DARK HOUR',
    },
    {
      id: 'p4g',
      code: 'P4G',
      name: 'Persona 4 Golden',
      subtitle: 'Midnight Channel // Broadcast Yellow & Amber',
      tag: 'MIDNIGHT TV',
    },
    {
      id: 'p5r',
      code: 'P5R',
      name: 'Persona 5 Royal',
      subtitle: 'Phantom Thieves // Metaverse Crimson & Ink',
      tag: 'METAVERSE',
    },
  ],
  artbook: [
    { title: 'Protagonist (Makoto Yuki)', page: '03', src: '/persona/artbook-03.png', role: 'Fool Arcana / S.E.E.S. Field Leader' },
    { title: 'Koromaru', page: '11', src: '/persona/artbook-11.png', role: 'Strength Arcana / Cerberus & Dagger' },
    { title: 'Key Visual Art Study', page: '13', src: '/persona/artbook-13.png', role: 'Promotional Art Direction / Shigenori Soejima' },
    { title: 'Persona Summoning Cut-Ins', page: '20', src: '/persona/artbook-20.png', role: 'Battle UI / Close-up Summon Sequence' },
    { title: 'All-Out Attack Finishes (Vol. 1)', page: '22', src: '/persona/artbook-22.png', role: 'Battle Victory / Dynamic Action Typography' },
    { title: 'All-Out Attack Finishes (Vol. 2)', page: '23', src: '/persona/artbook-23.png', role: 'Battle Victory / S.E.E.S. Squad Finishes' },
  ],
};
