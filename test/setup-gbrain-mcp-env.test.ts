/**
 * Regression guard for production Postgres/Supabase brains.
 *
 * Local stdio MCP hosts must not apply gbrain schema migrations during client
 * startup. Setup guidance should register gbrain with an explicit migration-skip
 * env var, then tell operators to run migrations deliberately after backup.
 */

import { describe, expect, test } from 'bun:test';
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(import.meta.dir, '..');

function read(relPath: string): string {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf-8');
}

describe('/setup-gbrain MCP startup environment', () => {
  const docs = [
    'README.md',
    'USING_GBRAIN_WITH_GSTACK.md',
    'setup-gbrain/SKILL.md.tmpl',
    'setup-gbrain/SKILL.md',
  ];

  test('documents explicit migration control for local stdio MCP hosts', () => {
    for (const relPath of docs) {
      const content = read(relPath);
      expect(content).toContain('GBRAIN_SKIP_AUTO_MIGRATE_ON_CONNECT');
      expect(content).toContain('gbrain init --migrate-only');
    }
  });

  test('does not recommend bare Claude MCP registration for local gbrain', () => {
    for (const relPath of docs) {
      const content = read(relPath);
      expect(content).not.toContain('claude mcp add gbrain -- gbrain serve');
    }
  });

  test('Codex and OpenCode examples include the migration-skip env var', () => {
    const guide = read('USING_GBRAIN_WITH_GSTACK.md');
    expect(guide).toContain('GBRAIN_SKIP_AUTO_MIGRATE_ON_CONNECT = "1"');
    expect(guide).toContain('"GBRAIN_SKIP_AUTO_MIGRATE_ON_CONNECT": "1"');

    const skill = read('setup-gbrain/SKILL.md.tmpl');
    expect(skill).toContain('GBRAIN_SKIP_AUTO_MIGRATE_ON_CONNECT = "1"');
    expect(skill).toContain('"GBRAIN_SKIP_AUTO_MIGRATE_ON_CONNECT": "1"');
  });
});
