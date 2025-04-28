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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='25px'
            viewBox='0 -960 960 960'
            width='25px'
          >
            <path d='M479.89-240Q500-240 514-253.89q14-13.88 14-34Q528-308 514.11-322q-13.88-14-34-14Q460-336 446-322.11q-14 13.88-14 34Q432-268 445.89-254q13.88 14 34 14Zm.39 144Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Zm3.23-172q25.31 0 44.04 16.21Q546-619.59 546-595.28 546-573 533-556t-30 31q-23 20-41 45t-17 56q0 14 10.08 22.5t23.52 8.5q14.4 0 24.4-8.5 10-8.5 13-22.5 5-22 19-38.84 14-16.85 30-32.16 23-22 37.5-49t14.5-58q0-51-39.5-84.5T483.59-720q-37.59 0-71.09 16.5t-53.66 48.77Q351-643 354.5-629t16.5 20q14 7 28 3t23-15q11-14 27-22.5t34.23-8.5Z' />
          </svg>
        </Button>
      </a>
    </>
  )
}

export default Page
