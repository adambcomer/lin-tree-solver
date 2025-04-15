import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import reacteslint from 'eslint-plugin-react'
import prettierlint from 'eslint-config-prettier/flat'
import { includeIgnoreFile } from '@eslint/compat'
import { fileURLToPath } from 'node:url'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

export default tseslint.config(
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}']
  },
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      'eslint.config.mjs',
      'postcss.config.cjs',
      'tailwind.config.ts',
      'vite.config.ts',

      // TODO: Add nearley types
      'pages/@workspace/builder/compile-grammar.js',
      'pages/@workspace/builder/parser.ts',

      // Generated
      'repo/proto/bundle.d.ts',
      'repo/proto/bundle.js'
    ]
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      '@typescript-eslint/no-namespace': [
        'error',
        {
          allowDeclarations: true
        }
      ]
    }
  },
  reacteslint.configs.flat.recommended,
  reacteslint.configs.flat['jsx-runtime'],
  prettierlint
)
