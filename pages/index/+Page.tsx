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

import { Button } from '@heroui/button'
import { navigate } from 'vike/client/router'
import { addToast } from '@heroui/toast'
import { Head } from 'vike-react/Head'

import treeJPEG from '/images/tree.jpeg'
import treeAVIF from '/images/tree.avif'
import treeJXL from '/images/tree.jxl'

interface CreatWorkspaceResponse {
  id: string
}

const Page = () => {
  const onGetStarted = () =>
    void fetch('/api/workspaces', { method: 'POST' })
      .then((res) => res.json())
      .then((data: CreatWorkspaceResponse) => navigate(`/${data.id}/builder`))
      .catch(() =>
        addToast({
          title: 'Error Creating a New Workspace',
          color: 'danger'
        })
      )

  return (
    <>
      <Head>
        <title>Linguistics Tree Solver</title>
        <meta
          name='description'
          content='Automatically build trees based on linguistic syntax rules.'
        />
        <meta
          property='og:description'
          content='Automatically build trees based on linguistic syntax rules.'
        />
        <link rel='canonical' href='https://lin-tree-solver.adambcomer.com' />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://lin-tree-solver.adambcomer.com'
        />
      </Head>
      <div>
        <h1 className='text-5xl mt-16'>Linguistics Tree Solver</h1>

        <h2 className='text-3xl mt-8'>About:</h2>
        <p className='mt-2'>
          This tool automatically builds linguistics syntax trees.
        </p>
        <p className='mt-2'>
          A major goal of this tool is to accept to a broad set of syntax rules.
          Nearly every textbook has different rules and standards. I want others
          to be able to add/modify the rules to work for them.
        </p>
        <p className='mt-2'>
          I have included an annotated sentence and syntax rules from{' '}
          <i>
            Syntax: A Generative Introduction, Third Edition, by Andrew Carnie.
          </i>
        </p>

        <Button
          color='primary'
          size='lg'
          onPress={onGetStarted}
          className='mt-8'
        >
          New Syntax Tree
        </Button>

        <picture>
          <source srcSet={treeJXL} type='image/jxl' />
          <source srcSet={treeAVIF} type='image/avif' />
          <img
            src={treeJPEG}
            className='w-full'
            alt='Syntax tree for the sentence "The small dog quickly ran home to his owner"'
          />
        </picture>

        <h2 className='text-3xl mt-8'>Tutorial:</h2>

        <h3 className='text-xl font-medium mt-4'>
          1. Define Syntax Rules (One Time Step)
        </h3>
        <p className='mt-2'>Work in progress.</p>

        <h3 className='text-xl font-medium mt-4'>
          2. Write and Annotate a Sentence
        </h3>
        <p className='mt-2'>
          In the Sentence Editor, add your sentence in the text box at the top.
          The sentence will be automatically be split by word. Under each word
          will be all of the Parts of Speech from the Syntax Rules. By coloring
          these Parts of Speech, the solver will find trees that satisfy these
          constraints.
        </p>
        <p className='mt-2'>
          <b>Note:</b> You can select multiple Parts of Speech for a single
          word. At first, this may seem strange. How can a word be a Noun, Verb,
          and Adjective at the same time? But, what if we don&apos;t know what
          Part of Speech a word is? A word that has multiple Parts of Speech
          represents our uncertainty or lack of knowledge. The solver can use
          that uncertainty to work out all possible trees that satisfy the other
          constraints.
        </p>
        <p className='mt-2'>
          Once the sentence has been annotated to the best of a our ability, we
          can compute the trees that satisfy the syntax rules in conjunction
          with the annotations.
        </p>

        <h3 className='text-xl font-medium mt-4'>
          3. Build/Solve/Compute All Syntax Trees For a Sentence
        </h3>
        <p className='mt-2'>
          In the Tree Viewer, you can view all of the parsed trees.
        </p>

        <h2 className='text-3xl mt-8'>Technologies:</h2>
        <p>
          This project uses Web Workers to parse the trees. To get the best
          performance and support, use an up-to-date version of Chrome, Firefox,
          or Safari.
        </p>

        <h2 className='text-3xl mt-8'>FAQ:</h2>

        <h3 className='text-xl font-medium mt-4'>
          Why are a few the syntax rules slightly different from the textbook?
        </h3>
        <p className='mt-2'>
          The textbook has some rules that do&apos;t work well with parsers and
          were modified to work as the author intended. For example, the X-Bar
          rule in the textbook N&apos;&rarr;N&apos; (PP). This rule can be
          satisfied by an infinite chain of N&apos;s. Intuitively, we know that
          the shortest possible tree is the desired result, but the computer
          doesn&apos;t know that when it searches for every possible tree. I
          modified some of the rules to work with the parser to give the desired
          parsed trees rather then make the exact rules work.
        </p>

        <h3 className='text-xl font-medium mt-4'>
          Can I save a picture of the parsed trees?
        </h3>
        <p className='mt-2'>
          Yes. In the Tree Viewer, there is a Image button in the top right.
          Clicking this button will generate an image based on the viewer window
          and automatically download it.
        </p>

        <h3 className='text-xl font-medium mt-4'>
          How do I share my Sentence/Syntax Rules with a friend?
        </h3>
        <p className='mt-2'>
          Currently, there are no sharing mechanisms. This feature is under
          active development. I&apos;m considering several strategies to make
          this feature work seamlessly.
        </p>

        <h3 className='text-xl font-medium mt-4'>
          Is this project open source?
        </h3>
        <p className='mt-2'>
          Yes. You can view the code at my{' '}
          <a
            href='https://github.com/adambcomer/lin-tree-solver'
            className='text-sky-600'
          >
            Github Repository
          </a>
          . I&apos;m happy to merge pull requests that build on the project.
        </p>

        <h3 className='text-xl font-medium mt-4'>
          Can I use this tool on my university linguistics syntax assignments?
        </h3>
        <p className='mt-2'>
          This tool can solve many questions on introductory linguistics syntax
          assignments. If you are worried about committing an academic offence,
          I would recommend solving the trees by hand instead of using this
          tool.
        </p>

        <h2 className='text-3xl mt-8'>Resources:</h2>
        <p className='mt-2'>
          Email:{' '}
          <a
            href='#'
            onClick={() => {
              location.href =
                'mai' +
                'lto:' +
                'ada' +
                'mb' +
                'com' +
                'er' +
                '@gm' +
                'ai' +
                'l.c' +
                'om'
            }}
            className='text-sky-600'
          >
            adamb
            <span className='hidden'>.nosp@m.</span>
            come
            <span className='hidden'>.nosp@m.</span>
            r@gma
            <span className='hidden'>.nosp@m.</span>
            il.c
            <span className='hidden'>.nosp@m.</span>
            om
          </a>
        </p>
        <p className='mt-2'>
          Project Site:{' '}
          <a
            href='https://lin-tree-solver.adambcomer.com/'
            className='text-sky-600'
          >
            Project Site
          </a>
        </p>
        <p className='mt-2'>
          Personal Site:{' '}
          <a href='https://adambcomer.com/' className='text-sky-600'>
            Personal Site
          </a>
        </p>
        <p className='mt-2'>
          Repository:{' '}
          <a
            href='https://github.com/adambcomer/lin-tree-solver'
            className='text-sky-600'
          >
            Project Github Repository
          </a>
        </p>
      </div>
    </>
  )
}

export default Page
