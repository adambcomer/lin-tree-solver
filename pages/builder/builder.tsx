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

import { useEffect } from 'react'
import { data as routeData } from 'react-router'
import { type Response, useWorkspace } from './useWorkspace'
import { RulesetEditor } from './RulesetEditor'
import { SentenceEditor } from './SentenceEdtitor'
import { TreeViewer } from './TreeViewer'
import useDebounce from './useDebounce'
import { Button } from '@heroui/button'
import { addToast } from '@heroui/toast'
import { Chip } from '@heroui/chip'

import treeJPEG from '/images/tree.jpeg'

import type { Route } from './+types/builder'
import { db } from '../../repo/database'
import { getWorkspace } from '../../repo/workspace'

// Flattens the decoded protobuf messages into the plain, serializable shape that
// gets handed to the client.
export const loader = ({ params }: Route.LoaderArgs): Response => {
  const workspace = getWorkspace(db, params.workspace)
  if (!workspace) {
    throw routeData(`Workspace with ID ${params.workspace} can't be found.`, {
      status: 404,
      statusText: 'Not Found'
    })
  }

  return {
    id: workspace.id,
    sentence: {
      words: (workspace.sentence.words ?? []).map((w) => ({
        text: w.text ?? '',
        pos: w.pos ?? []
      }))
    },
    ruleset: {
      roots: workspace.ruleset.roots ?? [],
      pos: workspace.ruleset.pos ?? [],
      rules: (workspace.ruleset.rules ?? []).map((r) => ({
        name: r.name ?? '',
        tags: (r.tags ?? []).map((t) => ({
          values: t.values ?? [],
          optional: t.optional ?? false,
          repeated: t.repeated ?? false
        }))
      }))
    },
    createdAt: workspace.createdAt,
    updatedAt: workspace.updatedAt
  }
}

const sentenceTitle = (text: string) => `"${text}" Syntax Tree | Linguistics Tree Solver`

export const meta: Route.MetaFunction = ({ loaderData, params }) => {
  const sentenceText = loaderData?.sentence.words.map((w) => w.text).join(' ') ?? ''
  const url = `https://lin-tree-solver.adambcomer.com/${params.workspace}/builder`

  return [
    { title: sentenceTitle(sentenceText) },
    { name: 'description', content: `Syntax tree for the sentence "${sentenceText}".` },
    { property: 'og:description', content: `Syntax tree for the sentence "${sentenceText}".` },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: treeJPEG }
  ]
}

const Page = ({ loaderData, params }: Route.ComponentProps) => {
  const { data, updateSentence, updateRuleset } = useWorkspace(loaderData)

  useDebounce(data, 500, (value) => {
    void fetch(`/api/workspaces/${params.workspace}`, {
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

  useEffect(() => {
    document.title = sentenceTitle(senentenceText)
  }, [senentenceText])

  return (
    <>
      {/* Hero Section */}
      <div className='text-center py-12'>
        <h1 className='text-5xl font-bold mb-4'>Linguistics Tree Solver</h1>
        <p className='text-lg text-default-600 max-w-3xl mx-auto mb-4'>
          Build and visualize syntax trees for linguistic analysis. Follow the three steps below to
          create your parse tree.
        </p>
        <Chip variant='flat' className='font-mono min-w-auto max-w-full overflow-scroll'>
          Workspace: {params.workspace}
        </Chip>
      </div>

      {/* Step 1: Build Rule Set */}
      <div className='mt-16'>
        <div className='flex items-start gap-4 mb-4'>
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-xl shrink-0'>
            1
          </div>
          <div className='flex flex-col'>
            <h2 className='text-3xl font-semibold'>Build Rule Set</h2>
            <p className='text-default-600 text-sm mt-1'>
              Define your grammar by specifying parts of speech (POS), syntax rules, and root tags.
              Click on each section to expand and edit.
            </p>
          </div>
        </div>
        <RulesetEditor ruleset={data.ruleset} updateRuleset={updateRuleset} />
      </div>

      {/* Step 2: Annotate Sentence */}
      <div className='mt-16'>
        <div className='flex items-start gap-4 mb-4'>
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-xl shrink-0'>
            2
          </div>
          <div className='flex flex-col'>
            <h2 className='text-3xl font-semibold'>Annotate Sentence</h2>
            <p className='text-default-600 text-sm mt-1'>
              Enter your sentence and tag each word with its possible parts of speech. Click on POS
              tags to toggle them for each word.
            </p>
          </div>
        </div>
        <SentenceEditor
          sentence={data.sentence}
          ruleset={data.ruleset}
          updateSentence={updateSentence}
        />
      </div>

      {/* Step 3: View Trees */}
      <div className='mt-16 mb-16'>
        <div className='flex items-start gap-4 mb-4'>
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-xl shrink-0'>
            3
          </div>
          <div className='flex flex-col'>
            <h2 className='text-3xl font-semibold'>View Syntax Trees</h2>
            <p className='text-default-600 text-sm mt-1'>
              Your syntax trees will appear here automatically. Use the navigation buttons to view
              multiple trees, zoom in/out, and download images.
            </p>
          </div>
        </div>
        <TreeViewer ruleset={data.ruleset} sentence={data.sentence} />
      </div>

      <a href='/support' target='_blank'>
        <Button color='primary' variant='shadow' className='fixed bottom-5 right-5 font-semibold'>
          Need Help?
        </Button>
      </a>
    </>
  )
}

export default Page
