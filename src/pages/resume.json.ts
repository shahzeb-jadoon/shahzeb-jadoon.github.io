import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { experience, education, skillGroups } from '../data/cv';

// JSON Resume (https://jsonresume.org/schema) generated from the single source
// of truth so machine parsers and AI agents ingest the profile structurally.
export const GET: APIRoute = () => {
  const resume = {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: site.name,
      label: site.role,
      email: site.email,
      phone: site.phone,
      url: site.url,
      summary: site.tagline,
      location: { city: 'Rochester', region: 'NY', countryCode: 'US' },
      profiles: [
        { network: 'GitHub', url: site.github, username: 'shahzeb-jadoon' },
        { network: 'LinkedIn', url: site.linkedin, username: 'shahzebkjadoon' },
      ],
    },
    work: experience.map((e) => ({ name: e.org, position: e.role, summary: e.note })),
    education: education.map((e) => ({ institution: e.school, studyType: e.degree })),
    skills: skillGroups.map((g) => ({ name: g.label, keywords: g.items })),
  };

  return new Response(JSON.stringify(resume, null, 2), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
