import { getCollection } from 'astro:content';
export async function getProjects() {
  return (await getCollection('projects', ({ data }) => !data.draft))
    .sort((a,b) => a.data.order - b.data.order || b.data.date.getTime() - a.data.date.getTime());
}
