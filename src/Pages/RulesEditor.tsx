import { FC, useContext } from 'react'
import { Typography, makeStyles, List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton, Tooltip, Fab, Grid } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { RuleSetsContext } from '../Context/RuleSetsContext'
import { RuleSet } from '../helpers/ruleset'

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  newRuleSetButton: {
    position: 'fixed',
    right: 20,
    bottom: 20
  },
  editRuleSetButton: {
    marginRight: 0
  }
}))

const RuleEditor: FC = () => {
  const { ruleSets, setRuleSets, idx: ruleSetIndex, setRuleSetIdx } = useContext(RuleSetsContext)

  const classes = useStyles()

  function deleteRuleSetClick (index: number): () => void {
    return () => {
      ruleSets.splice(index, 1)
      setRuleSets([...ruleSets])
    }
  }

  function setDefaultRuleSetClick (index: number): () => void {
    return () => {
      setRuleSetIdx(index)
    }
  }

  function createRuleSetClick (): void {
    const d = new Date()
    setRuleSets([...ruleSets, new RuleSet(`New Rule Set - ${d.toLocaleDateString('en-US')} ${d.toLocaleTimeString('en-US')}`)])
  }

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Syntax Rules Editor | Linguistics Tree Solver</title>
        <meta name='description' content='Add your custom syntax rules for the solver to build trees with.' />

        <link rel='canonical' href='https://adambcomer.com/lin-tree-solver/rules' />

        <meta property='og:title' content='Syntax Rules Editor | Linguistics Tree Solver' />
        <meta property='og:description' content='Add your custom syntax rules for the solver to build trees with.' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://adambcomer.com/lin-tree-solver/rules' />
      </Helmet>
      <Grid item xs>
        <Typography variant='h3' component='h1' className={classes.header}>Syntax Rules</Typography>
        <List>
          {ruleSets.map((r, i) => {
            return (
              <ListItem button onClick={setDefaultRuleSetClick(i)} key={i}>
                {ruleSetIndex === i &&
                  <ListItemIcon>
                    <Tooltip title='Default'>
                      <DoneIcon />
                    </Tooltip>
                  </ListItemIcon>
                }
                <ListItemText inset={ruleSetIndex !== i} primary={r.name} secondary={`${[...r.getPos()].length} Parts of Speech, ${[...r.getRules()].length} Syntax Rules`} />
                <ListItemSecondaryAction>
                  <Link to={`/rules/${i}`}>
                    <Tooltip title='Edit'>
                      <IconButton edge='end' className={classes.editRuleSetButton}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  <Tooltip title='Delete'>
                    <IconButton edge='end' onClick={deleteRuleSetClick(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
        <Tooltip title='New Rule Set' placement='top'>
          <Fab color='primary' onClick={createRuleSetClick} className={classes.newRuleSetButton}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Grid>
    </>
  )
}

export default RuleEditor
