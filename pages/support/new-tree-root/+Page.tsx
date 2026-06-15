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

import { Head } from 'vike-react/Head'
import { Card, CardHeader, CardBody } from '@heroui/card'
import { Chip } from '@heroui/chip'

import editSyntaxRulesJPEG from '/images/new-tree-root/edit_syntax_rules.jpg'
import editSyntaxRulesAVIF from '/images/new-tree-root/edit_syntax_rules.avif'
import editSyntaxRulesJXL from '/images/new-tree-root/edit_syntax_rules.jxl'

import editSyntaxRuleJPEG from '/images/new-tree-root/edit_syntax_rule.jpg'
import editSyntaxRuleAVIF from '/images/new-tree-root/edit_syntax_rule.avif'
import editSyntaxRuleJXL from '/images/new-tree-root/edit_syntax_rule.jxl'

import newSyntaxRuleJPEG from '/images/new-tree-root/new_syntax_rule.jpg'
import newSyntaxRuleAVIF from '/images/new-tree-root/new_syntax_rule.avif'
import newSyntaxRuleJXL from '/images/new-tree-root/new_syntax_rule.jxl'

import finalTreeJPEG from '/images/new-tree-root/final_tree.jpg'
import finalTreeAVIF from '/images/new-tree-root/final_tree.avif'
import finalTreeJXL from '/images/new-tree-root/final_tree.jxl'

const Page = () => (
  <>
    <Head>
      <link rel='canonical' href='https://lin-tree-solver.adambcomer.com/support/new-tree-root' />
      <meta property='og:type' content='website' />
      <meta
        property='og:url'
        content='https://lin-tree-solver.adambcomer.com/support/new-tree-root'
      />
    </Head>

    {/* Hero Section */}
    <div className='text-center py-12'>
      <h1 className='text-5xl font-bold mb-4'>Changing the Root of a Tree</h1>
      <p className='text-xl text-default-600 max-w-3xl mx-auto'>
        Learn how to build syntax trees for individual clauses like noun phrases or verb phrases
        instead of complete sentences.
      </p>
    </div>

    {/* Introduction */}
    <div className='mb-12'>
      <Card>
        <CardBody>
          <p className='text-default-600 mb-4'>
            Sometimes you don&apos;t want to build a tree for a complete sentence, but rather for an
            individual clause within a sentence like a noun phrase or verb phrase. This guide shows
            you how to modify a rule set to build trees that start from a different root.
          </p>
          <p className='text-default-600'>
            Most of the time this looks like building a tree where instead of starting at a SP or
            CP, you want to build a tree starting at a NP or VP. To do this, we have to adjust the
            &quot;root&quot; rule to shift the root to our desired clause type.
          </p>
        </CardBody>
      </Card>
    </div>

    {/* Step-by-step Guide */}
    <div className='space-y-8 mb-16'>
      <h2 className='text-3xl font-semibold mb-6 text-center'>Step-by-Step Guide</h2>

      {/* Step 1 */}
      <Card>
        <CardHeader className='flex-col items-start'>
          <Chip color='primary' variant='flat' className='mb-2'>
            Step 1
          </Chip>
          <h3 className='text-2xl font-semibold'>Find your Syntax Rules</h3>
        </CardHeader>
        <CardBody>
          <p className='text-default-600 mb-4'>
            Start by going to the Syntax Rules and clicking the edit button on the Syntax Rule set
            you wish to use.
          </p>
          <picture>
            <source srcSet={editSyntaxRulesJXL} type='image/jxl' />
            <source srcSet={editSyntaxRulesAVIF} type='image/avif' />
            <img
              className='w-full rounded-lg border-2 border-default-200'
              src={editSyntaxRulesJPEG}
              alt='Editing the syntax rules'
            />
          </picture>
        </CardBody>
      </Card>

      {/* Step 2 */}
      <Card>
        <CardHeader className='flex-col items-start'>
          <Chip color='primary' variant='flat' className='mb-2'>
            Step 2
          </Chip>
          <h3 className='text-2xl font-semibold'>Edit the Root Tags</h3>
        </CardHeader>
        <CardBody>
          <p className='text-default-600 mb-4'>
            Next, edit the root tags for these Syntax Rules. The root tags tell the tree builder
            where to start from to build your tree. The default for the rules{' '}
            <i>
              Chapter 3: Constituency, Trees, and Rules, Syntax: A Generative Introduction, by
              Andrew Carnie
            </i>{' '}
            is the CP tag or clause. Click the small &quot;X&quot; next to the CP to remove it from
            the set of tags.
          </p>
          <picture>
            <source srcSet={editSyntaxRuleJXL} type='image/jxl' />
            <source srcSet={editSyntaxRuleAVIF} type='image/avif' />
            <img
              className='w-full rounded-lg border-2 border-default-200'
              src={editSyntaxRuleJPEG}
              alt='Remove root syntax rule'
            />
          </picture>
        </CardBody>
      </Card>

      {/* Step 3 */}
      <Card>
        <CardHeader className='flex-col items-start'>
          <Chip color='primary' variant='flat' className='mb-2'>
            Step 3
          </Chip>
          <h3 className='text-2xl font-semibold'>Add a New Root</h3>
        </CardHeader>
        <CardBody>
          <p className='text-default-600 mb-4'>
            Next, add a new root tag to the empty set of root tags. The root tag you wish to set
            must already exist in the list of rules below. If the root you wish to use hasn&apos;t
            been added, add the new rule before modifying the root. In this example, I&apos;m going
            to change the root to a NP so I can build trees that start from a noun phrase.
          </p>
          <picture>
            <source srcSet={newSyntaxRuleJXL} type='image/jxl' />
            <source srcSet={newSyntaxRuleAVIF} type='image/avif' />
            <img
              className='w-full rounded-lg border-2 border-default-200'
              src={newSyntaxRuleJPEG}
              alt='Add new root syntax rule'
            />
          </picture>
        </CardBody>
      </Card>

      {/* Step 4 */}
      <Card>
        <CardHeader className='flex-col items-start'>
          <Chip color='primary' variant='flat' className='mb-2'>
            Step 4
          </Chip>
          <h3 className='text-2xl font-semibold'>Save the Rules</h3>
        </CardHeader>
        <CardBody>
          <p className='text-default-600 mb-4'>
            Finally, click save in the top-right-hand corner. You should now be able to go to the
            Sentence Editor and the Tree Viewer to build and view your new trees. For my example, I
            can now build and view trees that look like this:
          </p>
          <picture>
            <source srcSet={finalTreeJXL} type='image/jxl' />
            <source srcSet={finalTreeAVIF} type='image/avif' />
            <img
              className='w-full rounded-lg border-2 border-default-200'
              src={finalTreeJPEG}
              alt='New tree generated by changing the root syntax rule'
            />
          </picture>
        </CardBody>
      </Card>
    </div>

    {/* Back to Support */}
    <div className='py-12 border-t border-default-200'>
      <div className='text-center'>
        <h2 className='text-2xl font-semibold mb-4'>Need More Help?</h2>
        <p className='text-default-600 mb-6'>Check out our other guides or contact support.</p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <a href='/support' className='text-primary hover:underline text-lg'>
            Back to Support
          </a>
          <span className='hidden sm:inline text-default-400'>•</span>
          <a
            href='mailto:adambcomer@gmail.com?subject=Help Changing Tree Root'
            className='text-primary hover:underline text-lg'
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  </>
)

export default Page
