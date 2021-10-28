import React, { FC } from 'react'
import { Box, Divider, Drawer, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import AspectRatioIcon from '@mui/icons-material/AspectRatio'
import GavelIcon from '@mui/icons-material/Gavel'
import SubjectIcon from '@mui/icons-material/Subject'
import { NavLink, useRouteMatch } from 'react-router-dom'

const Navbar: FC = () => {
  const sentenceMatch = useRouteMatch('/sentence')
  const viewerMatch = useRouteMatch('/viewer')
  const rulesMatch = useRouteMatch('/rules')

  return (
    <Drawer variant='permanent' anchor='left' sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240 } }}>
      <Box sx={{ minHeight: 64 }}>
        <Link component={NavLink} to='/' sx={{ color: '#000', textDecoration: 'none' }}>
          <Typography variant='h6' component='h1' align='center' sx={{ mt: 2 }}>Linguistics Tree Solver</Typography>
        </Link>
      </Box>
      <Divider />
      <List>
        <Link component={NavLink} to='/sentence' sx={{ color: '#000', textDecoration: 'none' }}>
          <ListItem button selected={sentenceMatch?.isExact}>
            <ListItemIcon><SubjectIcon /></ListItemIcon>
            <ListItemText primary='Sentence Editor' />
          </ListItem>
        </Link>
        <Link component={NavLink} to='/viewer' sx={{ color: '#000', textDecoration: 'none' }}>
          <ListItem button selected={viewerMatch?.isExact}>
            <ListItemIcon><AspectRatioIcon /></ListItemIcon>
            <ListItemText primary='Tree Viewer' />
          </ListItem>
        </Link>
        <Link component={NavLink} to='/rules' sx={{ color: '#000', textDecoration: 'none' }}>
          <ListItem button selected={rulesMatch?.isExact}>
            <ListItemIcon><GavelIcon /></ListItemIcon>
            <ListItemText primary='Syntax Rules' />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  )
}

export default Navbar
