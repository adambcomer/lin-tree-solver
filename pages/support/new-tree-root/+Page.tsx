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
      <link
        rel='canonical'
        href='https://lin-tree-solver.adambcomer.com/support/new-tree-root'
      />
      <meta property='og:type' content='website' />
      <meta
        property='og:url'
        content='https://lin-tree-solver.adambcomer.com/support/new-tree-root'
      />
    </Head>
    <div>
      <h1 className='text-5xl'>Changing the Root of a Tree</h1>

      <p className='mt-8'>
        Sometimes you don&apos;t want to build a tree for a complete sentence,
        but rather for an individual clause within a sentence like a noun phrase
        or verb phrase. This guide shows you how to modify a rule set to build
        trees that start from a different root. Most of the time this looks like
        building a tree where instead of starting at a SP or CP, you want to
        build a tree starting at a NP or VP. To do this, we have to adjust the
        &quot;root&quot; rule to shift the root to our desired clause type.
      </p>

      <h2 className='text-3xl mt-8'>1. Find your Syntax Rules</h2>
      <p className='mt-4'>
        Start by going to the Syntax Rules and clicking the edit button on the
        Syntax Rule set you wish to use.
      </p>
      <picture>
        <source srcSet={editSyntaxRulesJXL} type='image/jxl' />
        <source srcSet={editSyntaxRulesAVIF} type='image/avif' />
        <img
          className='mt-4 border-solid border-2'
          src={editSyntaxRulesJPEG}
          alt='Editing the syntax rules'
        />
      </picture>

      <h2 className='text-3xl mt-8'>2. Edit the Root Tags</h2>
      <p className='mt-4'>
        Next, edit the root tags for these Syntax Rules. The root tags tell the
        tree builder where to start from to build your tree. The default for the
        rules{' '}
        <i>
          Chapter 3: Constituency, Trees, and Rules, Syntax: A Generative
          Introduction, by Andrew Carnie
        </i>{' '}
        is the CP tag or clause. Click the small &quot;X&quot; next ot the CP to
        remove it from the set of tags.
      </p>
      <picture>
        <source srcSet={editSyntaxRuleJXL} type='image/jxl' />
        <source srcSet={editSyntaxRuleAVIF} type='image/avif' />
        <img
          className='mt-4 border-solid border-2'
          src={editSyntaxRuleJPEG}
          alt='Remove root syntax rule'
        />
      </picture>

      <h2 className='text-3xl mt-8'>3. Add a New Root</h2>
      <p className='mt-4'>
        Next, add a new root tag to the empty set of root tags. The root tag you
        wish to set must already exist in the list of rules below. If root you
        wish to use hasn&apos;t been added, add the new rule before modifying
        the root. In this example, I&apos;m going to change the root to a NP so
        I can build trees that start from a noun phrase.
      </p>
      <picture>
        <source srcSet={newSyntaxRuleJXL} type='image/jxl' />
        <source srcSet={newSyntaxRuleAVIF} type='image/avif' />
        <img
          className='mt-4 border-solid border-2'
          src={newSyntaxRuleJPEG}
          alt='Add new root syntax rule'
        />
      </picture>

      <h2 className='text-3xl mt-8'>4. Save the Rules</h2>
      <p className='mt-4'>
        Finally, click save in the top-right-hand corner. You should no be able
        to go to the Sentence Editor and the Tree Viewer to build and view your
        new trees. For my example, I can now build and view trees that look like
        this:
      </p>
      <picture>
        <source srcSet={finalTreeJXL} type='image/jxl' />
        <source srcSet={finalTreeAVIF} type='image/avif' />
        <img
          className='mt-4 border-solid border-2'
          src={finalTreeJPEG}
          alt='New tree generated by changing the root syntax rule'
        />
      </picture>
    </div>
  </>
)

export default Page
