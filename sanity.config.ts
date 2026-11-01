import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/cms/schema';

export default defineConfig({
  name: 'default',
  title: 'Persona Portfolio Creator Studio',
  projectId: '4zq18q5c',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
