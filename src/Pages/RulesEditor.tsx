import React from 'react'
import { Typography, makeStyles, List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton, Tooltip, Fab, Grid } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { RootState } from '../redux/reducers'
import { useSelector, useDispatch } from 'react-redux'
import { removeRuleSet, addRuleSet, setDefaultRuleSet } from '../redux/actions/rulesets'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

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

const RuleEditor: React.FC = () => {
  const ruleSets = useSelector((state: RootState) => state.rules.ruleSets)
  const ruleSetIndex = useSelector((state: RootState) => state.rules.index)
  const dispatch = useDispatch()

  const classes = useStyles()

  function deleteRuleSetClick (index: number): () => void {
    return () => {
      dispatch(removeRuleSet(index))
    }
  }

  function setDefaultRuleSetClick (index: number): () => void {
    return () => {
      dispatch(setDefaultRuleSet(index))
    }
  }

  function createRuleSetClick (): void {
    const d = new Date()
    dispatch(addRuleSet(`New Rule Set - ${d.toLocaleDateString('en-US')} ${d.toLocaleTimeString('en-US')}`))
  }

  return (
    <>
      <Helmet>
        <title>{ruleSets[ruleSetIndex].name} Syntax Rules | Linguistics Tree Solver</title>
        <meta name='description' content={`Edit ${ruleSets[ruleSetIndex].name} syntax rules to your heart's content.`} />
      </Helmet>
      <Grid item xs>
        <Typography variant='h3' component='h1' className={classes.header}>Syntactic Rules</Typography>
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
                <ListItemText inset={ruleSetIndex !== i} primary={r.name} secondary={`${[...r.getPos()].length} Parts of Speech, ${[...r.getRules()].length} Syntactic Rules`} />
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
