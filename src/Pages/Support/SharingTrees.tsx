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
import { OutboundLink, Paragraph, Title } from '../../Components/common'
import withTracker from '../../withTracker'

const SharingTrees = () => {
  return (
    <Grid item xs sx={{ px: 2, py: 2 }}>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Sharing Parse Trees | Linguistics Tree Solver</title>
        <meta
          name='description'
          content='Sharing Parse Trees is simple, just copy the URL.'
        />

        <link
          rel='canonical'
          href='https://lin-tree-solver.adambcomer.com/support/sharing-trees'
        />

        <meta
          property='og:title'
          content='Sharing Parse Trees | Linguistics Tree Solver'
        />
        <meta
          property='og:description'
          content='Sharing Parse Trees is simple, just copy the URL.'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://lin-tree-solver.adambcomer.com/support/sharing-trees'
        />
      </Helmet>

      <Box sx={{ maxWidth: '1536px' }}>
        <Title>Sharing Parse Trees</Title>
        <Paragraph sx={{ my: 4 }}>
          You've built your trees and now want to share them with a friend.
          Sharing the sentence and parse trees is as simple as copying the URL
          in the browser. All the data necessary to recreate the trees on your
          friend's computer is stored in the random looking letters and numbers
          in the URL.
        </Paragraph>

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

export default withTracker(SharingTrees)
