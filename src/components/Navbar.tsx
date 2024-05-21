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
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import AspectRatioIcon from '@mui/icons-material/AspectRatio'
import GavelIcon from '@mui/icons-material/Gavel'
import SubjectIcon from '@mui/icons-material/Subject'
import HelpIcon from '@mui/icons-material/Help'
import { appendState } from 'src/helpers/url-state'
import { useContext } from 'react'
import { SentenceContext } from 'src/Context/SentenceContext'

export enum NavbarTab {
  SentenceEditor,
  TreeViewer,
  RulesSettings
}

interface NavbarProps {
  tab?: NavbarTab
}

export const Navbar = ({ tab }: NavbarProps) => {
  const { sentence } = useContext(SentenceContext)

  return (
    <Drawer
      variant='permanent'
      anchor='left'
      sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240 } }}
    >
      <Box sx={{ minHeight: 64 }}>
        <Link
          href={appendState('/', sentence)}
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
          height: 'calc(100% - 64px)'
        }}
      >
        <Link
          href={appendState('/sentence', sentence)}
          sx={{ color: '#000', textDecoration: 'none' }}
        >
          <ListItemButton selected={tab === NavbarTab.SentenceEditor}>
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText primary='Sentence Editor' />
          </ListItemButton>
        </Link>
        <Link
          href={appendState('/viewer', sentence)}
          sx={{ color: '#000', textDecoration: 'none' }}
        >
          <ListItemButton selected={tab === NavbarTab.TreeViewer}>
            <ListItemIcon>
              <AspectRatioIcon />
            </ListItemIcon>
            <ListItemText primary='Tree Viewer' />
          </ListItemButton>
        </Link>
        <Link
          href={appendState('/rules', sentence)}
          sx={{ color: '#000', textDecoration: 'none' }}
        >
          <ListItemButton selected={tab === NavbarTab.RulesSettings}>
            <ListItemIcon>
              <GavelIcon />
            </ListItemIcon>
            <ListItemText primary='Syntax Rules' />
          </ListItemButton>
        </Link>
        <Link
          href='/support'
          sx={{ color: '#000', textDecoration: 'none', mt: 'auto' }}
        >
          <ListItemButton>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary='Support Pages' />
          </ListItemButton>
        </Link>
      </List>
    </Drawer>
  )
}
