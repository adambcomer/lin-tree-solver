import React from 'react'
import { Typography, makeStyles, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import AddIcon from '@material-ui/icons/Add'
import { RuleSet } from '../tree-solver'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers'
import { useParams } from 'react-router-dom'
import { getColor } from '../helpers/colors'
// import { useDispatch } from 'react-redux'

const ruleSet = new RuleSet('');
['N', 'D', 'V', 'Adj', 'Adv', 'P', 'Conj', 'C', 'T'].forEach(t => {
  ruleSet.addPos(t)
});
[
  ['AdvP', '(AdvP) Adv'],
  ['AdjP', '(AdvP) Adj'],
  ['PP', 'P (NP)'],
  ['NP', '(D) (AdjP+) N (PP+)'],
  ['VP', '(AdvP+) V (NP) (AdvP+) (PP+) (AdvP+)'],
  ['TP', '(NP) (T) (VP)']
].forEach(([name, rule]) => {
  ruleSet.addRule(name, rule)
})

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}))

const RuleSetEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const ruleSet = useSelector((state: RootState) => state.rules.ruleSets[Number(id)])
  // const dispatch = useDispatch()
  const classes = useStyles()

  return (
    <>
      <Typography variant='h3' component='h1' className={classes.header}>Rule Set</Typography>
      <Typography variant='h5' component='h2' className={classes.header}>{ruleSet.name}</Typography>

      <Typography variant='h6' component='h3' className={classes.header}>Parts of Speech:</Typography>
      <List>
        {[...ruleSet.getPos()].map((r, i) => {
          return (
            <ListItem key={i}>
              <ListItemIcon>
                <FiberManualRecordIcon style={{ color: getColor(i) }} />
              </ListItemIcon>
              <ListItemText primary={r} />
            </ListItem>
          )
        })}
        <ListItem button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary='New Part of Speech' />
        </ListItem>
      </List>

      <Typography variant='h6' component='h3' className={classes.header}>Syntactic Rules:</Typography>
      <List>
        {[...ruleSet.getRules().entries()].map(([name, expression], i) => {
          return (
            <ListItem key={i}>
              <ListItemText inset primary={`${name} -> ${expression.tagsToString()}`} />
            </ListItem>
          )
        })}
        <ListItem button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary='New Syntactic Rule' />
        </ListItem>
      </List>
    </>
  )
}

export default RuleSetEditor
