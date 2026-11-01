import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const directory = path.join(root, 'src/content/projects');
const files = await readdir(directory, { recursive: true });

for (const name of files.filter(name => name.endsWith('.md'))) {
  const text = await readFile(path.join(directory, name), 'utf8');
  for (const match of text.matchAll(/(?:thumbnail|src):\s*["']?(\/[^\s"']+)/g)) {
    const asset = path.resolve(root, 'public', match[1].slice(1));
    if (!asset.startsWith(path.resolve(root, 'public') + path.sep)) {
      throw new Error(`${name}: invalid asset path ${match[1]}`);
    }
    try {
      await access(asset);
    } catch {
      throw new Error(`${name}: referenced asset does not exist: ${match[1]}`);
    }
  }
}
console.log(`Validated local media (thumbnails + gallery assets) for ${files.filter(name => name.endsWith('.md')).length} project files.`);
