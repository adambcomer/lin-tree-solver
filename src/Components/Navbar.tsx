import { FC } from 'react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Divider, Typography } from '@material-ui/core'
import AspectRatioIcon from '@material-ui/icons/AspectRatio'
import GavelIcon from '@material-ui/icons/Gavel'
import SubjectIcon from '@material-ui/icons/Subject'
import { Link, useRouteMatch } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0
  },
  drawerPaper: {
    width: 240
  },
  toolbar: theme.mixins.toolbar,
  title: {
    textAlign: 'center',
    marginTop: theme.spacing(2)
  },
  link: {
    color: '#000',
    textDecoration: 'none'
  }
}))

const Navbar: FC = () => {
  const sentenceMatch = useRouteMatch('/sentence')
  const viewerMatch = useRouteMatch('/viewer')
  const rulesMatch = useRouteMatch('/rules')
  const classes = useStyles()

  return (
    <Drawer variant='permanent' anchor='left' className={classes.drawer} classes={{ paper: classes.drawerPaper }} >
      <div className={classes.toolbar}>
        <Link to='/' className={classes.link}>
          <Typography variant='h6' component='h1' className={classes.title}>Linguistics Tree Solver</Typography>
        </Link>
      </div>
      <Divider />
      <List>
        <Link to='/sentence' className={classes.link}>
          <ListItem button selected={sentenceMatch?.isExact}>
            <ListItemIcon><SubjectIcon /></ListItemIcon>
            <ListItemText primary='Sentence Editor' />
          </ListItem>
        </Link>
        <Link to='/viewer' className={classes.link}>
          <ListItem button selected={viewerMatch?.isExact}>
            <ListItemIcon><AspectRatioIcon /></ListItemIcon>
            <ListItemText primary='Tree Viewer' />
          </ListItem>
        </Link>
        <Link to='/rules' className={classes.link}>
          <ListItem button selected={rulesMatch?.isExact} >
            <ListItemIcon><GavelIcon /></ListItemIcon>
            <ListItemText primary='Syntax Rules' />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  )
}

export default Navbar
