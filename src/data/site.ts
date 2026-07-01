// Single source of truth for identity + JSON-LD.
// Facts live in profile.json (also feeds llms.txt / resume.json later). Non-fabricated.
import profile from './profile.json';

export const site = profile;

export const nav = [
  { href: '/work/', label: 'Work' },
  { href: '/writing/', label: 'Writing' },
  { href: '/about/', label: 'About' },
  { href: '/cv/', label: 'CV' },
  { href: '/#contact', label: 'Contact' },
];
