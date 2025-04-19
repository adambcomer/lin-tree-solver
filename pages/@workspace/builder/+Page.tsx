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

import { usePageContext } from 'vike-react/usePageContext'
import { useData } from 'vike-react/useData'
import { Response, useWorkspace } from './useWorkspace'
import { RulesetEditor } from './RulesetEditor'
import { SentenceEditor } from './SentenceEdtitor'
import { TreeViewer } from './TreeViewer'
import useDebounce from './useDebounce'
import { Button } from '@heroui/button'
import { addToast } from '@heroui/toast'
import { Head } from 'vike-react/Head'

const Page = () => {
  const { routeParams } = usePageContext()
  const initialData = useData<Response>()
  const { data, updateSentence, updateRuleset } = useWorkspace(initialData)

  useDebounce(data, 500, (value) => {
    void fetch(`/api/workspaces/${initialData.id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({
        ruleset: {
          roots: [...value.ruleset.roots],
          pos: [...value.ruleset.pos],
          rules: value.ruleset.rules
        },
        sentence: {
          words: value.sentence.words.map((w) => ({
            text: w.text,
            pos: [...w.pos]
          }))
        }
      })
    }).catch(() =>
      addToast({
        title: 'Error Saving Workspace',
        color: 'danger'
      })
    )
  })

  const senentenceText = data.sentence.words.map((w) => w.text).join(' ')

  return (
    <>
      <Head>
        <title>
          {`"${senentenceText}" Syntax Tree | Linguistics Tree Solver`}
        </title>
        <meta
          name='description'
          content={`Syntax tree for the sentence "${senentenceText}".`}
        />
        <meta
          property='og:description'
          content={`Syntax tree for the sentence "${senentenceText}".`}
        />
        <link
          rel='canonical'
          href={`https://lin-tree-solver.adambcomer.com/${initialData.id}/builder`}
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content={`https://lin-tree-solver.adambcomer.com/${initialData.id}/builder`}
        />
      </Head>
      <h1 className='text-5xl mt-16'>Linguistics Tree Solver</h1>
      <div className='mt-4 text-sm font-medium'>
        Workspace ID: {routeParams.workspace}
      </div>

      <h2 className='text-3xl mt-16'>1. Build Rule Set</h2>
      <RulesetEditor ruleset={data.ruleset} updateRuleset={updateRuleset} />

      <h2 className='text-3xl mt-16'>2. Annotate Sentence</h2>
      <SentenceEditor
        sentence={data.sentence}
        ruleset={data.ruleset}
        updateSentence={updateSentence}
      />

      <h2 className='text-3xl mt-16'>3. Draw Syntax Trees</h2>
      <TreeViewer ruleset={data.ruleset} sentence={data.sentence} />

      <a href='/support' target='_blank'>
        <Button isIconOnly className='fixed bottom-5 right-5'>
          <span className='material-symbols-rounded'>help</span>
        </Button>
      </a>
    </>
  )
}

export default Page
