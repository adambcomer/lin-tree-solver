import React, { useState } from 'react'
import { Typography, Grid, makeStyles, TextField, Avatar, Card, CardContent } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/reducers'
import { getColor } from '../helpers/colors'
import { removePos, addPos, setSentence } from '../redux/actions/sentence'
import { Helmet } from 'react-helmet'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  textEdit: {
    marginTop: theme.spacing(2)
  },
  wordsContainer: {
    marginTop: theme.spacing(4)
  },
  word: {
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
  posAvatar: {
    height: theme.spacing(4),
    width: theme.spacing(4),
    fontSize: theme.typography.body2.fontSize,
    cursor: 'pointer'
  }
}))

const SentenceEditor: React.FC = () => {
  const words = useSelector((state: RootState) => state.sentence.words)
  const [sentence, setSentenceText] = useState(words.map(w => w.word).join(' '))

  const ruleSets = useSelector((state: RootState) => state.rules.ruleSets)
  const ruleSetIndex = useSelector((state: RootState) => state.rules.index)

  const dispatch = useDispatch()
  const classes = useStyles()

  function onSentenceChange (e: React.ChangeEvent<HTMLInputElement>): void {
    setSentenceText(e.target.value)
    dispatch(setSentence(e.target.value))
  }

  function onPosClicked (wordIndex: number, pos: string): () => void {
    return (): void => {
      if (words[wordIndex].pos.includes(pos)) {
        dispatch(removePos(wordIndex, pos))
      } else {
        dispatch(addPos(wordIndex, pos))
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
      <Grid item xs className={classes.container}>
        <Typography variant='h3' component='h1'>Sentence Editor</Typography>
        <TextField label='Sentence' value={sentence} onChange={onSentenceChange} className={classes.textEdit} fullWidth />
        <Grid container className={classes.wordsContainer} spacing={1}>
          {words.map((w, i) => {
            return (
              <Grid item xs={2} key={i}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='h6' component='h4' className={classes.word}>{w.word}</Typography>
                    <Grid container spacing={1} justify='space-evenly'>
                      {[...ruleSets[ruleSetIndex].getPos()].map((pos, j) => {
                        return (
                          <Grid item key={j}>
                            <Avatar className={classes.posAvatar} style={{ backgroundColor: (w.pos.includes(pos) ? getColor(j) : '#bdbdbd') }} onClick={onPosClicked(i, pos)}>{pos}</Avatar>
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

export default SentenceEditor
