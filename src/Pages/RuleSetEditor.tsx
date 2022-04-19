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

import React, { ChangeEvent, useContext, useState } from 'react'
import { Typography, List, ListItem, ListItemText, ListItemIcon, Grid, TextField, Chip, Button, ListItemSecondaryAction, IconButton, Tooltip, Snackbar, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import { Expression, RuleSet, tagToString } from '../helpers/ruleset'
import { useParams } from 'react-router-dom'
import { getColor } from '../helpers/colors'
import { Helmet } from 'react-helmet'
import { RuleSetsContext } from '../Context/RuleSetsContext'
import withTracker from '../withTracker'

const RuleSetEditor = (): JSX.Element => {
  const { id } = useParams()
  const { ruleSets, setRuleSets } = useContext(RuleSetsContext)

  const rs = ruleSets[parseInt(id ?? '0')]

  const [ruleSet, setRuleSet] = useState({ name: rs.name, pos: [...rs.getPos()], rules: [...rs.getRules()], root: [...rs.getRoot()] })
  const [newPos, setNewPos] = useState({ editing: false, pos: '', error: false })
  const [newRoot, setNewRoot] = useState({ editing: false, root: '', error: false })
  const [newRule, setNewRule] = useState({ editing: false, name: '', rule: '', nameError: false, ruleError: false })
  const [saved, setSaved] = useState(false)

  const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRuleSet({ ...ruleSet, name: e.target.value })
  }

  const onPosDeleted = (index: number) => {
    return () => {
      ruleSet.pos.splice(index, 1)
      setRuleSet({ ...ruleSet, pos: [...ruleSet.pos] })
    }
  }

  const onCreatePos = (): void => {
    setNewPos({ ...newPos, editing: true })
  }

  const onNewPosChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewPos({ ...newPos, pos: e.target.value, error: false })
  }

  const addPos = (): void => {
    if (ruleSet.pos.includes(newPos.pos) || ruleSet.rules.some(([r]) => r === newPos.pos)) {
      setNewPos({ ...newPos, error: true })
      return
    }

    setRuleSet({ ...ruleSet, pos: [...ruleSet.pos, newPos.pos] })
    setNewPos({ editing: false, pos: '', error: false })
  }

  const onRootDeleted = (index: number) => {
    return () => {
      ruleSet.root.splice(index, 1)
      setRuleSet({ ...ruleSet, root: [...ruleSet.root] })
    }
  }

  const onCreateRoot = (): void => {
    setNewRoot({ ...newRoot, editing: true })
  }

  const onNewRootChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewRoot({ ...newRoot, root: e.target.value, error: false })
  }

  const addRoot = (): void => {
    if (ruleSet.root.includes(newRoot.root)) {
      setNewRoot({ ...newRoot, error: true })
      return
    }
    if (!ruleSet.pos.includes(newRoot.root) && !ruleSet.rules.some(([r]) => r === newRoot.root)) {
      setNewRoot({ ...newRoot, error: true })
      return
    }

    setRuleSet({ ...ruleSet, root: [...ruleSet.root, newRoot.root] })
    setNewRoot({ editing: false, root: '', error: false })
  }

  const onCreateRule = (): void => {
    setNewRule({ ...newRule, editing: true })
  }

  const onNewRuleNameChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewRule({ ...newRule, name: e.target.value, nameError: false })
  }

  const onNewRuleChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewRule({ ...newRule, rule: e.target.value, ruleError: false })
  }

  const addRule = (): void => {
    if (ruleSet.pos.includes(newRule.name)) {
      setNewRule({ ...newRule, nameError: true })
      return
    }

    const rule = new Expression(newRule.name, newRule.rule)
    const valid = rule.tags.every((t) => {
      if (t.values.every((v) => ruleSet.pos.includes(v))) {
        return true
      }
      return ruleSet.rules.some(([r]) => t.values.includes(r))
    })

    if (!valid) {
      setNewRule({ ...newRule, ruleError: true })
      return
    }

    setRuleSet({ ...ruleSet, rules: [...ruleSet.rules, [newRule.name, rule]] })
    setNewRule({ editing: false, name: '', rule: '', nameError: false, ruleError: false })
  }

  const deleteRule = (index: number) => {
    return () => {
      ruleSet.rules.splice(index, 1)
      setRuleSet({ ...ruleSet, rules: [...ruleSet.rules] })
    }
  }

  const saveRuleSet = (): void => {
    const r = new RuleSet(ruleSet.name)
    r.pos = new Set(ruleSet.pos)
    r.rules = [...ruleSet.rules]
    r.root = new Set(ruleSet.root)

    ruleSets[Number(id)] = r
    setRuleSets([...ruleSets])

    setSaved(true)
  }

  const onSavedSnackbarClose = (): void => {
    setSaved(false)
  }

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>{rs.name} Syntax Rules | Linguistics Tree Solver</title>
        <meta name='description' content={`${rs.name} syntax rules.`} />

        <link rel='canonical' href={`https://adambcomer.com/lin-tree-solver/rules/${id ?? '0'}`} />

        <meta property='og:title' content={`${rs.name} Syntax Rules | Linguistics Tree Solver`} />
        <meta property='og:description' content={`${rs.name} syntax rules.`} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={`https://adambcomer.com/lin-tree-solver/rules/${id ?? '0'}`} />
      </Helmet>
      <Grid item xs>
        <Box sx={{ pt: 2, px: 2 }}>
          <Grid container alignItems='center'>
            <Grid item xs>
              <Typography variant='h3' component='h1'>Rule Set</Typography>
            </Grid>
            <Grid item>
              <Button color='primary' variant='contained' size='large' startIcon={<SaveIcon />} onClick={saveRuleSet} disableElevation>Save</Button>
              <Snackbar
                open={saved} autoHideDuration={6000} onClose={onSavedSnackbarClose} message='Saved Rule Set' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                action={
                  <>
                    <IconButton size='small' aria-label='close' color='inherit' onClick={onSavedSnackbarClose}>
                      <CloseIcon fontSize='small' />
                    </IconButton>
                  </>
                }
              />
            </Grid>
          </Grid>

          <TextField variant='outlined' label='Name' value={ruleSet.name} onChange={onNameChange} fullWidth sx={{ mt: 2 }} />
        </Box>

        <Typography variant='h6' component='h3' sx={{ mt: 4, mx: 2 }}>Parts of Speech:</Typography>

        <Grid container spacing={1} sx={{ pt: 2, px: 2 }}>
          {ruleSet.pos.map((p, i) => {
            return (
              <Grid item key={i}>
                <Chip label={p} sx={{ color: '#fff' }} style={{ background: getColor(i) }} onDelete={onPosDeleted(i)} />
              </Grid>
            )
          })}
          {!newPos.editing &&
            <Grid item>
              <Chip label='New Part of Speech' icon={<AddIcon />} onClick={onCreatePos} />
            </Grid>}
        </Grid>

        {newPos.editing &&
          <Grid container spacing={3} alignItems='center' sx={{ pt: 2, px: 2 }}>
            <Grid item xs>
              <TextField variant='outlined' label='Name' value={newPos.pos} error={newPos.error} onChange={onNewPosChanged} fullWidth />
            </Grid>
            <Grid item>
              <Button color='primary' variant='contained' size='large' onClick={addPos} disabled={newPos.pos.length === 0} disableElevation>Add</Button>
            </Grid>
          </Grid>}

        <Typography variant='h6' component='h3' sx={{ mt: 4, mx: 2 }}>Root Tags:</Typography>
        <Grid container spacing={1} sx={{ pt: 2, px: 2 }}>
          {ruleSet.root.map((r, i) => {
            return (
              <Grid item key={i}>
                <Chip label={r} onDelete={onRootDeleted(i)} />
              </Grid>
            )
          })}
          {!newPos.editing &&
            <Grid item>
              <Chip label='New Root' icon={<AddIcon />} onClick={onCreateRoot} />
            </Grid>}
        </Grid>

        {newRoot.editing &&
          <Grid container spacing={3} alignItems='center' sx={{ pt: 2, px: 2 }}>
            <Grid item xs>
              <TextField variant='outlined' label='Name' value={newRoot.root} error={newRoot.error} onChange={onNewRootChanged} fullWidth />
            </Grid>
            <Grid item>
              <Button color='primary' variant='contained' size='large' onClick={addRoot} disabled={newRoot.root.length === 0} disableElevation>Add</Button>
            </Grid>
          </Grid>}

        <Typography variant='h6' component='h3' sx={{ mt: 4, mx: 2 }}>Syntax Rules:</Typography>
        <List>
          {ruleSet.rules.map(([name, expression], i) => {
            return (
              <ListItem key={i}>
                <Chip label={name} sx={{ mr: 1 }} />
                <Typography variant='body1' sx={{ mr: 1 }}>&rarr;</Typography>
                {expression.tags.map((t, j) => {
                  if (t.values.length === 1 && rs.hasPos(t.values[0])) {
                    return <Chip label={tagToString(t)} style={{ background: getColor(rs.getPosIndex(t.values[0])), color: '#fff' }} key={j} sx={{ mr: 1 }} />
                  }
                  return <Chip label={tagToString(t)} key={j} sx={{ mr: 1 }} />
                })}
                <ListItemSecondaryAction>
                  <Tooltip title='Delete' placement='top'>
                    <IconButton edge='end' onClick={deleteRule(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
          {!newRule.editing &&
            <ListItem button onClick={onCreateRule}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary='New Syntax Rule' />
            </ListItem>}
        </List>
        {newRule.editing &&
          <Grid container spacing={3} alignItems='center' sx={{ pt: 2, py: 2 }}>
            <Grid item xs={2}>
              <TextField variant='outlined' label='Name' value={newRule.name} error={newRule.nameError} onChange={onNewRuleNameChanged} fullWidth />
            </Grid>
            <Grid item xs>
              <TextField variant='outlined' label='Rule' value={newRule.rule} error={newRule.ruleError} onChange={onNewRuleChanged} fullWidth />
            </Grid>
            <Grid item>
              <Button color='primary' variant='contained' size='large' onClick={addRule} disabled={newRule.name.length === 0 || newRule.rule.length === 0} disableElevation>Add</Button>
            </Grid>
          </Grid>}
      </Grid>
    </>
  )
}

export default withTracker(RuleSetEditor)
