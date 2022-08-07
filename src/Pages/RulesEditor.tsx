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

import { useContext } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  Fab,
  Grid,
} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { RuleSetsContext } from '../Context/RuleSetsContext'
import { RuleSet } from '../helpers/ruleset'
import withTracker from '../withTracker'
import { Title } from '../Components/common'

const RuleEditor = (): JSX.Element => {
  const {
    ruleSets,
    setRuleSets,
    idx: ruleSetIndex,
    setRuleSetIdx,
  } = useContext(RuleSetsContext)

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

  const createRuleSetClick = (): void => {
    const d = new Date()
    setRuleSets([
      ...ruleSets,
      new RuleSet(
        `New Rule Set - ${d.toLocaleDateString('en-US')} ${d.toLocaleTimeString(
          'en-US'
        )}`
      ),
    ])
  }

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Syntax Rules Editor | Linguistics Tree Solver</title>
        <meta
          name='description'
          content='Add your custom syntax rules for the solver to build trees with.'
        />

        <link
          rel='canonical'
          href='https://adambcomer.com/lin-tree-solver/rules'
        />

        <meta
          property='og:title'
          content='Syntax Rules Editor | Linguistics Tree Solver'
        />
        <meta
          property='og:description'
          content='Add your custom syntax rules for the solver to build trees with.'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://adambcomer.com/lin-tree-solver/rules'
        />
      </Helmet>
      <Grid item xs>
        <Title sx={{ pt: 2, px: 2 }}>Syntax Rules</Title>
        <List>
          {ruleSets.map((r, i) => {
            return (
              <ListItem button onClick={setDefaultRuleSetClick(i)} key={i}>
                {ruleSetIndex === i && (
                  <ListItemIcon>
                    <Tooltip title='Default'>
                      <DoneIcon />
                    </Tooltip>
                  </ListItemIcon>
                )}
                <ListItemText
                  inset={ruleSetIndex !== i}
                  primary={r.name}
                  secondary={`${[...r.getPos()].length} Parts of Speech, ${
                    [...r.getRules()].length
                  } Syntax Rules`}
                />
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
          <Fab
            color='primary'
            onClick={createRuleSetClick}
            sx={{ position: 'fixed', right: 20, bottom: 20 }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Grid>
    </>
  )
}

export default withTracker(RuleEditor)
