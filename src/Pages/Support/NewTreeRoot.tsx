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

import { Box, Grid, Paper } from '@mui/material'
import { Helmet } from 'react-helmet'
import {
  Link,
  OutboundLink,
  Paragraph,
  Subtitle,
  Title,
} from '../../Components/common'
import withTracker from '../../withTracker'

const NewTreeRoot = () => {
  return (
    <Grid item xs sx={{ px: 2, py: 2 }}>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Changing the Root of a Tree | Linguistics Tree Solver</title>
        <meta
          name='description'
          content='By default, the Linguistics Tree Solver builds trees from a full sentence, but not every sentence is a complete one. This guide will teach you how to change the root of a syntax tree to build trees for clauses in a sentence.'
        />

        <link
          rel='canonical'
          href='https://lin-tree-solver.adambcomer.com/support/new-tree-root'
        />

        <meta
          property='og:title'
          content='Changing the Root of a Tree | Linguistics Tree Solver'
        />
        <meta
          property='og:description'
          content='By default, the Linguistics Tree Solver builds trees from a full sentence, but not every sentence is a complete one. This guide will teach you how to change the root of a syntax tree to build trees for clauses in a sentence.'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://lin-tree-solver.adambcomer.com/support/new-tree-root'
        />
      </Helmet>

      <Box sx={{ maxWidth: '1536px' }}>
        <Title>Changing the Root of a Tree</Title>
        <Paragraph sx={{ my: 4 }}>
          Sometimes you don&apos;t want to build a tree for a complete sentence,
          but rather for an individual clause within a sentence like a noun
          phrase or verb phrase. This guide shows you how to modify a rule set
          to build trees that start from a different root. Most of the time this
          looks like building a tree where instead of starting at a SP or CP,
          you want to build a tree starting at a NP or VP. To do this, we have
          to adjust the &quot;root&quot; rule to shift the root to our desired
          clause type.
        </Paragraph>

        <Subtitle sx={{ mt: 6 }}>1. Find your Syntax Rules</Subtitle>
        <Paragraph sx={{ my: 4 }}>
          Start by going to the <Link to='/rules'>Syntax Rules</Link> and
          clicking the edit button on the Syntax Rule set you wish to use.
        </Paragraph>

        <Paper elevation={4} sx={{ my: 4 }}>
          <Box
            component='img'
            src='/images/new-tree-root/edit_syntax_rules.png'
            sx={{
              width: '100%',
            }}
          />
        </Paper>

        <Subtitle sx={{ mt: 6 }}>2. Edit the Root Tags</Subtitle>
        <Paragraph sx={{ my: 4 }}>
          Next, edit the root tags for these Syntax Rules. The root tags tell
          the tree builder where to start from to build your tree. The default
          for the rules{' '}
          <i>
            Chapter 3: Constituency, Trees, and Rules, Syntax: A Generative
            Introduction, by Andrew Carnie
          </i>{' '}
          is the CP tag or clause. Click the small &quot;X&quot; next ot the CP
          to remove it from the set of tags.
        </Paragraph>

        <Paper elevation={4} sx={{ my: 4 }}>
          <Box
            component='img'
            src='/images/new-tree-root/edit_syntax_rule.png'
            sx={{
              width: '100%',
            }}
          />
        </Paper>

        <Subtitle sx={{ mt: 6 }}>3. Add a New Root</Subtitle>
        <Paragraph sx={{ my: 4 }}>
          Next, add a new root tag to the empty set of root tags. The root tag
          you wish to set must already exist in the list of rules below. If root
          you wish to use hasn&apos;t been added, add the new rule before
          modifying the root. In this example, I&apos;m going to change the root
          to a NP so I can build trees that start from a noun phrase.
        </Paragraph>

        <Paper elevation={4} sx={{ my: 4 }}>
          <Box
            component='img'
            src='/images/new-tree-root/new_syntax_rule.png'
            sx={{
              width: '100%',
            }}
          />
        </Paper>

        <Subtitle sx={{ mt: 6 }}>3. Save the rules</Subtitle>
        <Paragraph sx={{ my: 4 }}>
          Finally, click save in the top-right-hand corner. You should no be
          able to go to the <Link to='/sentence'>Sentence Editor</Link> and the{' '}
          <Link to='/viewer'>Tree Viewer</Link> to build and view your new
          trees. For my example, I can now build and view trees that look like
          this:
        </Paragraph>

        <Paper elevation={4} sx={{ my: 4 }}>
          <Box
            component='img'
            src='/images/new-tree-root/final_tree.png'
            sx={{
              width: '100%',
            }}
          />
        </Paper>

        <Paragraph sx={{ my: 4 }}>
          If you are having problems and are unable to solve your problem, reach
          out to me at{' '}
          <OutboundLink
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
          >
            adamb
            <Box component='span' sx={{ display: 'none' }}>
              .nosp@m.
            </Box>
            come
            <Box component='span' sx={{ display: 'none' }}>
              .nosp@m.
            </Box>
            r@gma
            <Box component='span' sx={{ display: 'none' }}>
              .nosp@m.
            </Box>
            il.c
            <Box component='span' sx={{ display: 'none' }}>
              .nosp@m.
            </Box>
            om
          </OutboundLink>
        </Paragraph>
      </Box>
    </Grid>
  )
}

export default withTracker(NewTreeRoot)
