import React, { useState } from 'react'
import { Typography, makeStyles, List, ListItem, ListItemText, ListItemIcon, Grid, TextField, Chip, Button, ListItemSecondaryAction, IconButton, Tooltip, Snackbar } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import CloseIcon from '@material-ui/icons/Close'
import { Expression, RuleSet, tagToString } from '../helpers/ruleset'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/reducers'
import { useParams } from 'react-router-dom'
import { getColor } from '../helpers/colors'
import { updateRuleSet } from '../redux/actions/rulesets'
import { Helmet } from 'react-helmet'

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  nameTextField: {
    marginTop: theme.spacing(2)
  },

  subheader: {
    marginTop: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },

  posContainer: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  posChip: {
    color: '#fff'
  },

  newPosContainer: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },

  syntaxRuleChip: {
    marginRight: theme.spacing(1)
  }
}))

const RuleSetEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const rs = useSelector((state: RootState) => state.rules.ruleSets[Number(id)])
  const [ruleSet, setRuleSet] = useState({ name: rs.name, pos: [...rs.getPos()], rules: [...rs.getRules()], root: [...rs.getRoot()] })
  const [newPos, setNewPos] = useState({ editing: false, pos: '', error: false })
  const [newRoot, setNewRoot] = useState({ editing: false, root: '', error: false })
  const [newRule, setNewRule] = useState({ editing: false, name: '', rule: '', nameError: false, ruleError: false })
  const [saved, setSaved] = useState(false)
  const dispatch = useDispatch()
  const classes = useStyles()

  function onNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setRuleSet({ ...ruleSet, name: e.target.value })
  }

  function onPosDeleted(index: number): () => void {
    return () => {
      ruleSet.pos.splice(index, 1)
      setRuleSet({ ...ruleSet, pos: [...ruleSet.pos] })
    }
  }

  function onCreatePos(): void {
    setNewPos({ ...newPos, editing: true })
  }

  function onNewPosChanged(e: React.ChangeEvent<HTMLInputElement>): void {
    setNewPos({ ...newPos, pos: e.target.value, error: false })
  }

  function addPos(): void {
    if (ruleSet.pos.includes(newPos.pos) || ruleSet.rules.some(([r]) => r === newPos.pos)) {
      setNewPos({ ...newPos, error: true })
      return
    }

    setRuleSet({ ...ruleSet, pos: [...ruleSet.pos, newPos.pos] })
    setNewPos({ editing: false, pos: '', error: false })
  }

  function onRootDeleted(index: number): () => void {
    return () => {
      ruleSet.root.splice(index, 1)
      setRuleSet({ ...ruleSet, root: [...ruleSet.root] })
    }
  }

  function onCreateRoot(): void {
    setNewRoot({ ...newRoot, editing: true })
  }

  function onNewRootChanged(e: React.ChangeEvent<HTMLInputElement>): void {
    setNewRoot({ ...newRoot, root: e.target.value, error: false })
  }


  function addRoot(): void {
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

  function onCreateRule(): void {
    setNewRule({ ...newRule, editing: true })
  }

  function onNewRuleNameChanged(e: React.ChangeEvent<HTMLInputElement>): void {
    setNewRule({ ...newRule, name: e.target.value, nameError: false })
  }

  function onNewRuleChanged(e: React.ChangeEvent<HTMLInputElement>): void {
    setNewRule({ ...newRule, rule: e.target.value, ruleError: false })
  }

  function addRule(): void {
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

  function deleteRule(index: number): () => void {
    return () => {
      ruleSet.rules.splice(index, 1)
      setRuleSet({ ...ruleSet, rules: [...ruleSet.rules] })
    }
  }

  function saveRuleSet(): void {
    const r = new RuleSet(ruleSet.name)
    r.pos = new Set(ruleSet.pos)
    r.rules = [...ruleSet.rules]
    r.root = new Set(ruleSet.root)

    dispatch(updateRuleSet(Number(id), r))
    setSaved(true)
  }

  function onSavedSnackbarClose(){
    setSaved(false)
  }

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>{rs.name} Syntax Rules | Linguistics Tree Solver</title>
        <meta name='description' content={`${rs.name} syntax rules.`} />

        <link rel='canonical' href={`https://adambcomer.com/lin-tree-solver/rules/${id}`} />

        <meta property='og:title' content={`${rs.name} Syntax Rules | Linguistics Tree Solver`} />
        <meta property='og:description' content={`${rs.name} syntax rules.`} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={`https://adambcomer.com/lin-tree-solver/rules/${id}`} />
      </Helmet>
      <Grid item xs>
        <div className={classes.headerContainer}>
          <Grid container alignItems='center'>
            <Grid item xs>
              <Typography variant='h3' component='h1'>Rule Set</Typography>
            </Grid>
            <Grid item>
              <Button color='primary' variant='contained' size='large' startIcon={<SaveIcon />} onClick={saveRuleSet} disableElevation>Save</Button>
              <Snackbar open={saved} autoHideDuration={6000} onClose={onSavedSnackbarClose} message='Saved Rule Set' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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

          <TextField variant='outlined' label='Name' value={ruleSet.name} onChange={onNameChange} className={classes.nameTextField} fullWidth />
        </div>

        <Typography variant='h6' component='h3' className={classes.subheader}>Parts of Speech:</Typography>

        <Grid container spacing={1} className={classes.posContainer}>
          {ruleSet.pos.map((p, i) => {
            return (
              <Grid item key={i}>
                <Chip label={p} className={classes.posChip} style={{ background: getColor(i) }} onDelete={onPosDeleted(i)} />
              </Grid>
            )
          })}
          {!newPos.editing &&
            <Grid item>
              <Chip label='New Part of Speech' icon={<AddIcon />} onClick={onCreatePos} />
            </Grid>
          }
        </Grid>

        {newPos.editing &&
          <Grid container spacing={3} alignItems='center' className={classes.newPosContainer}>
            <Grid item xs>
              <TextField variant='outlined' label='Name' value={newPos.pos} error={newPos.error} onChange={onNewPosChanged} fullWidth />
            </Grid>
            <Grid item>
              <Button color='primary' variant='contained' size='large' onClick={addPos} disabled={newPos.pos.length === 0} disableElevation>Add</Button>
            </Grid>
          </Grid>
        }

        <Typography variant='h6' component='h3' className={classes.subheader}>Root Tags:</Typography>
        <Grid container spacing={1} className={classes.posContainer}>
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
            </Grid>
          }
        </Grid>

        {newRoot.editing &&
          <Grid container spacing={3} alignItems='center' className={classes.newPosContainer}>
            <Grid item xs>
              <TextField variant='outlined' label='Name' value={newRoot.root} error={newRoot.error} onChange={onNewRootChanged} fullWidth />
            </Grid>
            <Grid item>
              <Button color='primary' variant='contained' size='large' onClick={addRoot} disabled={newRoot.root.length === 0} disableElevation>Add</Button>
            </Grid>
          </Grid>
        }

        <Typography variant='h6' component='h3' className={classes.subheader}>Syntax Rules:</Typography>
        <List>
          {ruleSet.rules.map(([name, expression], i) => {
            return (
              <ListItem key={i}>
                <Chip label={name} className={classes.syntaxRuleChip} />
                <Typography variant='body1' className={classes.syntaxRuleChip}>&rarr;</Typography>
                {expression.tags.map((t, j) => {
                  if (t.values.length === 1 && rs.hasPos(t.values[0])) {
                    return <Chip label={tagToString(t)} style={{ background: getColor(rs.getPosIndex(t.values[0])), color: '#fff' }} key={j} className={classes.syntaxRuleChip} />
                  }
                  return <Chip label={tagToString(t)} key={j} className={classes.syntaxRuleChip} />
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
            </ListItem>
          }
        </List>
        {newRule.editing &&
          <Grid container spacing={3} alignItems='center' className={classes.newPosContainer}>
            <Grid item xs={2}>
              <TextField variant='outlined' label='Name' value={newRule.name} error={newRule.nameError} onChange={onNewRuleNameChanged} fullWidth />
            </Grid>
            <Grid item xs>
              <TextField variant='outlined' label='Rule' value={newRule.rule} error={newRule.ruleError} onChange={onNewRuleChanged} fullWidth />
            </Grid>
            <Grid item>
              <Button color='primary' variant='contained' size='large' onClick={addRule} disabled={newRule.name.length === 0 || newRule.rule.length === 0} disableElevation>Add</Button>
            </Grid>
          </Grid>
        }
      </Grid>
    </>
  )
}

export default RuleSetEditor
