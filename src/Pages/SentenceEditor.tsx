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

import React, { ChangeEvent, FC, useContext, useState } from 'react'
import { Typography, Grid, TextField, Avatar, Card, CardContent } from '@mui/material'
import { getColor } from '../helpers/colors'
import { Helmet } from 'react-helmet'
import { SentenceContext } from '../Context/SentenceContext'
import { RuleSetsContext } from '../Context/RuleSetsContext'
import withTracker from '../withTracker'

const SentenceEditor: FC = () => {
  const { words, setWords } = useContext(SentenceContext)
  const { ruleSets, idx: ruleSetIndex } = useContext(RuleSetsContext)
  const [sentence, setSentenceText] = useState(words.map(w => w.word).join(' '))

  const onSentenceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSentenceText(e.target.value)

    const words: Array<{ word: string, pos: string[] }> = []
    e.target.value.split(' ').forEach(w => {
      if (w === '') {
        return
      }
      words.push({ word: w, pos: [] })
    })

    setWords(words)
  }

  const onPosClicked = (wordIndex: number, pos: string) => {
    return (): void => {
      if (words[wordIndex].pos.includes(pos)) {
        words[wordIndex].pos = words[wordIndex].pos.filter(p => p !== pos)
        setWords([...words])
      } else {
        words[wordIndex].pos.push(pos)
        setWords([...words])
      }
    }
  }

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Sentence Editor | Linguistics Tree Solver</title>
        <meta name='description' content='Add your sentence and annotate it for the tree builder.' />

        <link rel='canonical' href='https://adambcomer.com/lin-tree-solver/sentence' />

        <meta property='og:title' content='Sentence Editor | Linguistics Tree Solver' />
        <meta property='og:description' content='Add your sentence and annotate it for the tree builder.' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://adambcomer.com/lin-tree-solver/sentence' />
      </Helmet>
      <Grid item xs sx={{ pt: 2, px: 2 }}>
        <Typography variant='h3' component='h1'>Sentence Editor</Typography>
        <TextField label='Sentence' value={sentence} onChange={onSentenceChange} fullWidth sx={{ mt: 2 }} />
        <Grid container spacing={1} sx={{ mt: 2 }}>
          {words.map((w, i) => {
            return (
              <Grid item xs={2} key={i}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='h6' component='h4' align='center' sx={{ mb: 2 }}>{w.word}</Typography>
                    <Grid container spacing={1} justifyContent='space-evenly'>
                      {[...ruleSets[ruleSetIndex].getPos()].map((pos, j) => {
                        return (
                          <Grid item key={j}>
                            <Avatar sx={{ height: 32, width: 32, cursor: 'pointer', fontSize: '0.875rem' }} style={{ backgroundColor: (w.pos.includes(pos) ? getColor(j) : '#bdbdbd') }} onClick={onPosClicked(i, pos)}>{pos}</Avatar>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </>
  )
}

export default withTracker(SentenceEditor)
