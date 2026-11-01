import {sanityClient} from 'sanity:client';
import {PROJECTS_QUERY} from './queries';
import {parseCmsProjects} from './project-contract';

export async function getCmsProjects() {
  const documents = await sanityClient.fetch(PROJECTS_QUERY, {}, {perspective: 'published'});
  return parseCmsProjects(documents);
}
