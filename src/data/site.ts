// Single source of truth for identity + JSON-LD.
// Facts live in profile.json (also feeds llms.txt / resume.json later). Non-fabricated.
import profile from './profile.json';

export const site = profile;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#writing', label: 'Writing' },
  { href: '/#contact', label: 'Contact' },
];
