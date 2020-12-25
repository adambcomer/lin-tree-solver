import React from 'react'
import { Link, makeStyles, Typography, Grid } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  subtitle: {
    marginTop: theme.spacing(4)
  },
  subtitle2: {
    marginTop: theme.spacing(2)
  },
  body: {
    marginTop: theme.spacing(2)
  },
  link: {
    color: '#1976d2'
  }
}))

const Home: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid item xs className={classes.container}>
      <Typography variant='h3' component='h1'>Linguistics Tree Solver</Typography>

      <Typography variant='h4' component='h2' className={classes.subtitle}>About:</Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        This tool automatically builds linguistics syntax trees.
      </Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        A major goal of this software is to be configurable with any set of syntax rules. There are many competing views in linguistics syntax and I want this tool to support a broad set of user defined syntactic rules.
      </Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        Currently, this project is a bit of a mess. I'm working on rounding out the features and usability.
        I have included a annotated sentence and syntactic rules from <i>Syntax: A Generative Introduction, Third Edition, by Andrew Carnie. </i>
        Click around to see the <Link component={RouterLink} to='/sentence' className={classes.link}>sentence</Link>, the
        <Link component={RouterLink} to='/rules' className={classes.link}> syntax rules</Link>,
        and <Link component={RouterLink} to='/viewer' className={classes.link}>compute the all of the trees</Link>.
      </Typography>

      <Typography variant='h4' component='h2' className={classes.subtitle}>Tutorial:</Typography>

      <Typography variant='h6' component='h3' className={classes.subtitle2}>1. Define Syntax Rules (One Time Step)</Typography>
      <Typography variant='body1' component='p'>Work in progress.</Typography>

      <Typography variant='h6' component='h3' className={classes.subtitle2}>2. Write and Annotate a Sentence</Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        In the <Link component={RouterLink} to='/sentence' className={classes.link}>Sentence Editor</Link>, add your sentence in the text box at the top. The sentence will be automatically be split by word.
        Under each word will be all of the Parts of Speech from the Syntactic Rules. By coloring these Parts of Speech, the solver will find trees that satisfy these constraints.
      </Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        <b>Note:</b> You can select multiple Parts of Speech for a single word. At first, this may seem strange. How can a word be a Noun, Verb, and Adjective at the same time?
        But, what if we don't know what Part of Speech a word is? A word that is multiple Parts of Speech represents our uncertainty or lack of knowledge. The solver can use that
        uncertainty to work out all possible trees that satisfy the other constraints.
      </Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        Once the sentence has been annotated to the best of a our ability, we can compute the trees that satisfy the syntactic rules in conjunction with the annotations.
      </Typography>

      <Typography variant='h6' component='h3' className={classes.subtitle2}>3. Build/Solve/Compute All Syntax Trees For a Sentence</Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        In the <Link component={RouterLink} to='/viewer' className={classes.link}>Tree Viewer</Link>, click 'Compute Trees' to compute all possible trees.
      </Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        <b>Note:</b> This is a intense computational process that can process hundreds of thousands of trees to exhaustively search through all structural ambiguities.
        The pre-made sentence will take a few milliseconds to process 144 trees to resolve 2 trees, but this process can take some time depending on a number of factors.
      </Typography>

      <Typography variant='h4' component='h2' className={classes.subtitle}>Technologies:</Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        This project uses Web Workers and WASM to run the full search on the frontend. To get the best performance and support, use an up-to-date version of Chrome, Firefox, or Safari.
      </Typography>

    </Grid>
  )
}

export default Home
