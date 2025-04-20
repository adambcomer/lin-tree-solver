CREATE TABLE IF NOT EXISTS workspaces (
  id TEXT PRIMARY KEY,
  sentence BLOB NOT NULL,
  ruleset BLOB NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);
