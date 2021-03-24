import React from 'react'
import { Link, makeStyles, Typography, Grid } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(2)
  },
  subtitle: {
    marginTop: theme.spacing(4)
  },
  subtitle2: {
    marginTop: theme.spacing(2)
  },
  body: {
    marginTop: theme.spacing(1)
  },
  link: {
    color: '#1976d2',
    textDecoration: 'none'
  },
  question: {
    marginTop: theme.spacing(2)
  },
  answer: {
    marginTop: theme.spacing(1),
  }
}))

const Home: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid item xs className={classes.container}>
      <Helmet>
        <title>Linguistics Tree Solver</title>
        <meta name='description' content='Automatically build trees based on linguistic syntax rules.' />
      </Helmet>

      <Typography variant='h3' component='h1'>Linguistics Tree Solver</Typography>

      <Typography variant='h4' component='h2' className={classes.subtitle}>About:</Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        This tool automatically builds linguistics syntax trees.
      </Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        A major goal of this tool is to accept to a broad set of syntax rules. Nearly every textbook has different rules and standards.
        I want others to be able to add/modify the rules to work for them.
      </Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        I have included an annotated sentence and syntax rules from <i>Syntax: A Generative Introduction, Third Edition, by Andrew Carnie. </i>
        Click around to view the <Link component={RouterLink} to='/sentence' className={classes.link}>sentence</Link>, the
        <Link component={RouterLink} to='/rules' className={classes.link}> syntax rules</Link>,
        and <Link component={RouterLink} to='/viewer' className={classes.link}>parsed trees</Link>.
      </Typography>

      <Typography variant='h4' component='h2' className={classes.subtitle}>Tutorial:</Typography>

      <Typography variant='h6' component='h3' className={classes.subtitle2}>1. Define Syntax Rules (One Time Step)</Typography>
      <Typography variant='body1' component='p'>Work in progress.</Typography>

      <Typography variant='h6' component='h3' className={classes.subtitle2}>2. Write and Annotate a Sentence</Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        In the <Link component={RouterLink} to='/sentence' className={classes.link}>Sentence Editor</Link>, add your sentence in the text box at the top. The sentence will be automatically be split by word.
        Under each word will be all of the Parts of Speech from the Syntax Rules. By coloring these Parts of Speech, the solver will find trees that satisfy these constraints.
      </Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        <b>Note:</b> You can select multiple Parts of Speech for a single word. At first, this may seem strange. How can a word be a Noun, Verb, and Adjective at the same time?
        But, what if we don't know what Part of Speech a word is? A word that has multiple Parts of Speech represents our uncertainty or lack of knowledge. The solver can use that
        uncertainty to work out all possible trees that satisfy the other constraints.
      </Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        Once the sentence has been annotated to the best of a our ability, we can compute the trees that satisfy the syntax rules in conjunction with the annotations.
      </Typography>

      <Typography variant='h6' component='h3' className={classes.subtitle2}>3. Build/Solve/Compute All Syntax Trees For a Sentence</Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        In the <Link component={RouterLink} to='/viewer' className={classes.link}>Tree Viewer</Link>, you can view all of the parsed trees.
      </Typography>

      <Typography variant='h4' component='h2' className={classes.subtitle}>Technologies:</Typography>
      <Typography variant='body1' component='p' className={classes.body}>
        This project uses Web Workers to parse the trees. To get the best performance and support, use an up-to-date version of Chrome, Firefox, or Safari.
      </Typography>

      <Typography variant='h4' component='h2' className={classes.subtitle}>FAQ:</Typography>

      <Typography variant='h6' component='h3' className={classes.question}>Why are a few the syntax rules slightly different from the textbook?</Typography>
      <Typography variant='body1' component='p' className={classes.answer}>
        The textbook has some rules that don't work well with parsers and were modified to work as the author intended. 
        For example, the X-Bar rule in the textbook N'&rarr;N' (PP). This rule can be satisfied by an infinite chain of N's. 
        Intuitively, we know that the shortest possible tree is the desired result, but the computer doesn't know that when it searches for every possible tree.
        I modified some of the rules to work with the parser to give the desired parsed trees rather then make the exact rules work. 
      </Typography>

      <Typography variant='h6' component='h3' className={classes.question}>Can I save a picture of the parsed trees?</Typography>
      <Typography variant='body1' component='p' className={classes.answer}>
        Yes. In the <Link component={RouterLink} to='/viewer' className={classes.link}>Tree Viewer</Link>, there is a Image button in the top right. 
        Clicking this button will generate an image based on the viewer window and automatically download it.
      </Typography>

      <Typography variant='h6' component='h3' className={classes.question}>How do I share my Sentence/Syntax Rules with a friend?</Typography>
      <Typography variant='body1' component='p' className={classes.answer}>
        Currently, there are no sharing mechanisms. This feature is under active development. I'm considering several strategies to make this feature work seamlessly. 
      </Typography>

      <Typography variant='h6' component='h3' className={classes.question}>Is this project open source?</Typography>
      <Typography variant='body1' component='p' className={classes.answer}>
        Yes. You can view the code at my <a href='https://github.com/adambcomer/lin-tree-solver' className={classes.link}>Github Repository</a>. I'm happy to merge pull requests that build on the project.
      </Typography>

      <Typography variant='h4' component='h2' className={classes.subtitle}>To-Do:</Typography>
      <ul>
      <li><Typography variant='body1' component='p' className={classes.body}>Saving of Sentences/Syntax Rules/Trees</Typography></li>
        <li><Typography variant='body1' component='p' className={classes.body}>Sharing of Sentences/Syntax Rules/Trees</Typography></li>
        <li><Typography variant='body1' component='p' className={classes.body}>Embeddable iframes</Typography></li>
        <li><Typography variant='body1' component='p' className={classes.body}>Tooling to catch common syntax rule errors</Typography></li>
        <li><Typography variant='body1' component='p' className={classes.body}>Improve rendering for larger trees</Typography></li>
        <li><Typography variant='body1' component='p' className={classes.body}>Label structural relationships between all of the nodes in a tree</Typography></li>
      </ul>

      <Typography variant='h4' component='h2' className={classes.subtitle}>Resources:</Typography>
      <Typography variant='body1' component='p' className={classes.body}>Email: <a href='mailto:adambcomer@gmail.com' className={classes.link}>adambcomer@gmail.com</a></Typography>
      <Typography variant='body1' component='p' className={classes.body}>Project Site: <a href='https://adambcomer.com/lin-tree-solver/' className={classes.link}>Project Site</a></Typography>
      <Typography variant='body1' component='p' className={classes.body}>Personal Site: <a href='https://adambcomer.com/' className={classes.link}>Personal Site</a></Typography>
      <Typography variant='body1' component='p' className={classes.body}>Repository: <a href='https://github.com/adambcomer/lin-tree-solver' className={classes.link}>Project Github Repository</a></Typography>
    </Grid>
  )
}

export default Home
