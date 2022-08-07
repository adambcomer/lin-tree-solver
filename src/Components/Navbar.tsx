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

import {
  Box,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import AspectRatioIcon from '@mui/icons-material/AspectRatio'
import GavelIcon from '@mui/icons-material/Gavel'
import SubjectIcon from '@mui/icons-material/Subject'
import HelpIcon from '@mui/icons-material/Help'
import { useMatch } from 'react-router'
import { NavLink } from 'react-router-dom'

const Navbar = (): JSX.Element => {
  const sentenceMatch = useMatch('/sentence')
  const viewerMatch = useMatch('/viewer')
  const rulesMatch = useMatch('/rules')

  return (
    <Drawer
      variant='permanent'
      anchor='left'
      sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240 } }}
    >
      <Box sx={{ minHeight: 64 }}>
        <Link
          component={NavLink}
          to='/'
          sx={{ color: '#000', textDecoration: 'none' }}
        >
          <Typography variant='h6' component='h1' align='center' sx={{ mt: 2 }}>
            Linguistics Tree Solver
          </Typography>
        </Link>
      </Box>
      <Divider />
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 64px)',
        }}
      >
        <Link
          component={NavLink}
          to='/sentence'
          sx={{ color: '#000', textDecoration: 'none' }}
        >
          <ListItem button selected={sentenceMatch != null}>
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText primary='Sentence Editor' />
          </ListItem>
        </Link>
        <Link
          component={NavLink}
          to='/viewer'
          sx={{ color: '#000', textDecoration: 'none' }}
        >
          <ListItem button selected={viewerMatch != null}>
            <ListItemIcon>
              <AspectRatioIcon />
            </ListItemIcon>
            <ListItemText primary='Tree Viewer' />
          </ListItem>
        </Link>
        <Link
          component={NavLink}
          to='/rules'
          sx={{ color: '#000', textDecoration: 'none' }}
        >
          <ListItem button selected={rulesMatch != null}>
            <ListItemIcon>
              <GavelIcon />
            </ListItemIcon>
            <ListItemText primary='Syntax Rules' />
          </ListItem>
        </Link>
        <Link
          component={NavLink}
          to='/support'
          sx={{ color: '#000', textDecoration: 'none', mt: 'auto' }}
        >
          <ListItem button sx={{}}>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary='Support Pages' />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  )
}

export default Navbar
