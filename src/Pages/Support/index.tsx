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

import { Box, Grid } from '@mui/material'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Paragraph, Subtitle, Title } from '../../Components/common'
import withTracker from '../../withTracker'

const Support = () => {
  return (
    <Grid item xs sx={{ px: 2, py: 2 }}>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Support | Linguistics Tree Solver</title>
        <meta
          name='description'
          content='Support and guides to help you solve common problems with the Linguistics Tree Solver.'
        />

        <link
          rel='canonical'
          href='https://adambcomer.com/lin-tree-solver/support'
        />

        <meta property='og:title' content='Support | Linguistics Tree Solver' />
        <meta
          property='og:description'
          content='Support and guides to help you solve common problems with the Linguistics Tree Solver.'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://adambcomer.com/lin-tree-solver/support'
        />
      </Helmet>

      <Title>Support</Title>
      <Paragraph>Helpful documentation to solve common problems.</Paragraph>

      <Subtitle>Pages:</Subtitle>
      <Grid container spacing={3} sx={{ mt: 2, maxWidth: '1536px' }}>
        <Grid item xs={12} sm={12} md={6} xl={4}>
          <Link
            to='/support/new-tree-root'
            style={{ textDecoration: 'none', color: '#000' }}
          >
            <Box
              sx={{
                background:
                  'linear-gradient(0deg,rgba(0,86,210,.08),rgba(0,86,210,.08)),#fdfbff',
                p: 4,
                borderRadius: 6,
                cursor: 'pointer',
                '&:hover': {
                  background:
                    'linear-gradient(0deg,rgba(0,86,210,.14),rgba(0,86,210,.14)),#fdfbff',
                },
              }}
            >
              <Subtitle sx={{ mt: 0 }}>Changing the Root of a Tree</Subtitle>
              <Paragraph>
                Sometimes you don&apos;t want to build a tree for a complete
                sentence, but rather for an individual clause within a sentence
                like a noun phrase or verb phrase. This guide shows you how to
                modify a rule set to build trees that start from a different
                root.
              </Paragraph>
            </Box>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withTracker(Support)
