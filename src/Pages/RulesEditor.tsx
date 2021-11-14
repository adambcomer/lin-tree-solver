import React, { FC, useContext } from 'react'
import { Typography, List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton, Tooltip, Fab, Grid } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { RuleSetsContext } from '../Context/RuleSetsContext'
import { RuleSet } from '../helpers/ruleset'
import withTracker from '../withTracker'

const RuleEditor: FC = () => {
  const { ruleSets, setRuleSets, idx: ruleSetIndex, setRuleSetIdx } = useContext(RuleSetsContext)

  const deleteRuleSetClick = (index: number) => {
    return () => {
      ruleSets.splice(index, 1)
      setRuleSets([...ruleSets])
    }
  }

  const setDefaultRuleSetClick = (index: number) => {
    return () => {
      setRuleSetIdx(index)
    }
  }

  const createRuleSetClick = () => {
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
        <Typography variant='h3' component='h1' sx={{ pt: 2, px: 2 }}>Syntax Rules</Typography>
        <List>
          {ruleSets.map((r, i) => {
            return (
              <ListItem button onClick={setDefaultRuleSetClick(i)} key={i}>
                {ruleSetIndex === i &&
                  <ListItemIcon>
                    <Tooltip title='Default'>
                      <DoneIcon />
                    </Tooltip>
                  </ListItemIcon>}
                <ListItemText inset={ruleSetIndex !== i} primary={r.name} secondary={`${[...r.getPos()].length} Parts of Speech, ${[...r.getRules()].length} Syntax Rules`} />
                <ListItemSecondaryAction>
                  <Link to={`/rules/${i}`}>
                    <Tooltip title='Edit'>
                      <IconButton edge='end' sx={{ mr: 0 }}>
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
          <Fab color='primary' onClick={createRuleSetClick} sx={{ position: 'fixed', right: 20, bottom: 20 }}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Grid>
    </>
  )
}

export default withTracker(RuleEditor)
