import { getCollection } from 'astro:content';
import { getCmsProjects } from './cms/projects';

export async function getProjects() {
  const source = import.meta.env.CONTENT_SOURCE || 'local';
  if (source === 'sanity') return getCmsProjects();
  if (source !== 'local') throw new Error('CONTENT_SOURCE must be "local" or "sanity".');
  return (await getCollection('projects', ({ data }) => !data.draft && !data.hidden))
    .map(project => ({...project, source: 'local' as const}))
    .sort((a,b) => a.data.order - b.data.order || b.data.date.getTime() - a.data.date.getTime());
}
