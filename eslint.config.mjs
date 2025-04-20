/*
 * Copyright 2025 Adam Bishop Comer
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
