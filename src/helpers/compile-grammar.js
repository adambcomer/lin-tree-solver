/*
 * Copyright 2022 Adam Bishop Comer
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

import { Parser } from 'nearley'
import compile from 'nearley/lib/compile'
import generate from 'nearley/lib/generate'
import nearleyGrammar from 'nearley/lib/nearley-language-bootstrapped'

export function compileGrammar (sourceCode) {
  // Parse the grammar source into an AST
  const grammarParser = new Parser(nearleyGrammar)
  grammarParser.feed(sourceCode)
  const grammarAst = grammarParser.results[0] // TODO check for errors

  // Compile the AST into a set of rules
  const grammarInfoObject = compile(grammarAst, {})
  // Generate JavaScript code from the rules
  const grammarJs = generate(grammarInfoObject, 'grammar')

  // Pretend this is a CommonJS environment to catch exports from the grammar.
  const module = { exports: {} }
  // eslint-disable-next-line no-eval
  eval(grammarJs)

  return module.exports
}
