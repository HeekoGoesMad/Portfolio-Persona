import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCmsProjects, headingId } from '../src/lib/cms/project-contract.ts';

const project = () => ({
  _id: 'example-document', title: 'Example project', slug: { current: 'example-project' },
  summary: 'An explicitly illustrative project.', role: 'Example developer',
  technologies: ['Astro'], date: '2026-10-01', category: 'Web', example: true,
  body: [{ _type: 'block', _key: 'overview', style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: 'text', text: 'Overview', marks: [] }] }],
});

test('published project preserves its URL and typed metadata', () => {
  const [result] = parseCmsProjects([project()]);
  assert.equal(result?.id, 'example-project');
  assert.equal(result?.source, 'sanity');
  assert.equal(result?.data.title, 'Example project');
  assert.equal(result?.data.date.getFullYear(), 2026);
  assert.equal(result?.data.example, true);
});

test('draft/version/archived/trashed records cannot enter public output', () => {
  for (const override of [{ _id: 'drafts.secret' }, { _id: 'versions.release.secret' },
    { archivedAt: '2026-10-19' }, { trashedAt: '2026-10-19' }]) {
    assert.throws(() => parseCmsProjects([{ ...project(), ...override }]));
  }
});

test('required fields, duplicate routes and invalid dates fail the build contract', () => {
  for (const override of [{ summary: '' }, { technologies: [] }, { date: 'invalid' },
    { slug: { current: '../outside' } }, { body: [] }]) {
    assert.throws(() => parseCmsProjects([{ ...project(), ...override }]));
  }
  assert.throws(() => parseCmsProjects([project(), { ...project(), _id: 'another-document' }]), /duplicate/i);
});

test('unsafe URLs and unsupported body objects are rejected', () => {
  assert.throws(() => parseCmsProjects([{ ...project(), demo: 'javascript:alert(1)' }]));
  const unsafe = project();
  unsafe.body[0]!.markDefs = [{ _type: 'link', _key: 'unsafe', href: 'javascript:alert(1)' }] as never[];
  assert.throws(() => parseCmsProjects([unsafe]));
  assert.throws(() => parseCmsProjects([{ ...project(), body: [{ _type: 'html', html: '<script/>' }] }]));
});

test('heading IDs survive text edits and honor imported anchors', () => {
  assert.equal(headingId({ _key: 'overview' }), 'section-overview');
  assert.equal(headingId({ _key: 'overview', anchor: 'building-it' }), 'building-it');
});

test('an empty published dataset stays empty instead of becoming local examples', () => {
  assert.deepEqual(parseCmsProjects([]), []);
});
