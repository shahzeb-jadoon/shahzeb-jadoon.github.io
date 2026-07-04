// Single source of truth for identity + JSON-LD.
// Facts live in profile.json (also feeds llms.txt / resume.json later). Non-fabricated.
import profile from './profile.json';

export const site = profile;

// Nav routes + their icons: hand-drawn 24×24 stroke paths (currentColor), same
// family as the pillar icons — consistent on every OS, zero icon dependencies.
export const nav = [
  {
    href: '/work/',
    label: 'Work',
    icon: '<rect x="3.5" y="8" width="17" height="12" rx="2"/><path d="M9 8V6.2A2.2 2.2 0 0 1 11.2 4h1.6A2.2 2.2 0 0 1 15 6.2V8"/><path d="M3.5 13h17"/>',
  },
  {
    href: '/writing/',
    label: 'Writing',
    icon: '<path d="M4 20l1-4L16.5 4.5a2.12 2.12 0 0 1 3 3L8 19l-4 1z"/><path d="M14.5 6.5l3 3"/>',
  },
  {
    href: '/about/',
    label: 'About',
    icon: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.2-3.5 3.8-5 7-5s5.8 1.5 7 5"/>',
  },
  {
    href: '/cv/',
    label: 'CV',
    icon: '<path d="M6.5 3.5h7l4 4v13h-11z"/><path d="M13.5 3.5v4h4"/><path d="M9 12.5h6M9 15.5h6"/>',
  },
  {
    href: '/#contact',
    label: 'Contact',
    icon: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 7.5l8 5.5 8-5.5"/>',
  },
];
