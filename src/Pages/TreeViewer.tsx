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

import { useEffect, useState, useRef, useContext } from 'react'
import { CircularProgress, Grid, Fade, Fab, Tooltip, Box } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import ImageIcon from '@mui/icons-material/Image'
import TreeCanvas from '../Components/TreeCanvas'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import { Node } from '../types'
import { Helmet } from 'react-helmet'
import { SentenceContext } from '../Context/SentenceContext'
import { RuleSetsContext } from '../Context/RuleSetsContext'
import withTracker from '../withTracker'

const worker = new Worker(new URL('../workers/parser.ts', import.meta.url), {
  type: 'module',
})

const TreeViewer = (): JSX.Element => {
  const { words } = useContext(SentenceContext)
  const { ruleSets, idx: ruleSetIndex } = useContext(RuleSetsContext)
  const [trees, setTrees] = useState<Node[]>([])
  const [treeIndex, setTreeIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [canvasZoom, setCanvasZoom] = useState(1)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const t1 = performance.now()
    worker.onmessage = (
      e: MessageEvent<{ trees: Node[]; searched: number }>
    ) => {
      setTrees(e.data.trees)
      setTreeIndex(0)

      console.log(`Solved in ${performance.now() - t1}ms`)

      setLoading(false)
    }
    worker.postMessage({ grammar: ruleSets[ruleSetIndex].grammar(), words })
  }, [ruleSetIndex, ruleSets, words])

  const nextTree = (): void => {
    setTreeIndex(treeIndex + 1)
  }

  const priorTree = (): void => {
    setTreeIndex(treeIndex - 1)
  }

  const zoomIn = (): void => {
    setCanvasZoom((canvasZoom * 4) / 3)
  }

  const zoomOut = (): void => {
    setCanvasZoom((canvasZoom * 3) / 4)
  }

  const saveTreeImage = (): void => {
    if (canvas.current === null) return

    const image = document.createElement('canvas')
    image.width = canvas.current.width
    image.height = canvas.current.height

    const context = image.getContext('2d')
    if (context === null) return
    context.fillStyle = '#fff'
    context.fillRect(0, 0, image.width, image.height)
    context.drawImage(canvas.current, 0, 0)

    const png = image
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
    const link = document.createElement('a')
    link.download = 'tree.png'
    link.href = png
    link.click()
  }

  if (loading) {
    return (
      <>
        <Helmet htmlAttributes={{ lang: 'en' }}>
          <title>Tree Viewer | Linguistics Tree Solver</title>
          <meta name='description' content='View parsed and built trees.' />

          <link
            rel='canonical'
            href='https://adambcomer.com/lin-tree-solver/viewer'
          />

          <meta
            property='og:title'
            content='Tree Viewer | Linguistics Tree Solver'
          />
          <meta
            property='og:description'
            content='View parsed and built trees.'
          />
          <meta property='og:type' content='website' />
          <meta
            property='og:url'
            content='https://adambcomer.com/lin-tree-solver/viewer'
          />
        </Helmet>
        <Grid item xs>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            sx={{ height: '100vh' }}
          >
            <Fade
              in={loading}
              style={{ transitionDelay: loading ? '400ms' : '0ms' }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
          </Box>
        </Grid>
      </>
    )
  }
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Tree Viewer | Linguistics Tree Solver</title>
        <meta name='description' content='View parsed and built trees.' />

        <link
          rel='canonical'
          href='https://adambcomer.com/lin-tree-solver/viewer'
        />

        <meta
          property='og:title'
          content='Tree Viewer | Linguistics Tree Solver'
        />
        <meta
          property='og:description'
          content='View parsed and built trees.'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://adambcomer.com/lin-tree-solver/viewer'
        />
      </Helmet>
      <Grid item xs>
        <Grid container sx={{ background: '#fff', height: '100vh' }}>
          <Grid item xs={12} sx={{ background: '#f5f5f5', height: '100vh' }}>
            <Tooltip title='Next Tree'>
              <Box sx={{ position: 'fixed', right: 20, top: 20 }}>
                <Fab
                  size='small'
                  sx={{ background: '#fff' }}
                  disabled={
                    trees.length === 0 || treeIndex === trees.length - 1
                  }
                  onClick={nextTree}
                >
                  <NavigateNextIcon />
                </Fab>
              </Box>
            </Tooltip>
            <Tooltip title='Prior Tree'>
              <Box sx={{ position: 'fixed', right: 80, top: 20 }}>
                <Fab
                  size='small'
                  sx={{ background: '#fff' }}
                  disabled={trees.length === 0 || treeIndex === 0}
                  onClick={priorTree}
                >
                  <NavigateBeforeIcon />
                </Fab>
              </Box>
            </Tooltip>

            <Tooltip title='Zoom In' placement='top'>
              <Box sx={{ position: 'fixed', right: 20, bottom: 20 }}>
                <Fab
                  size='small'
                  sx={{ background: '#fff' }}
                  disabled={trees.length === 0}
                  onClick={zoomIn}
                >
                  <ZoomInIcon />
                </Fab>
              </Box>
            </Tooltip>
            <Tooltip title='Zoom Out' placement='top'>
              <Box sx={{ position: 'fixed', right: 80, bottom: 20 }}>
                <Fab
                  size='small'
                  sx={{ background: '#fff' }}
                  disabled={trees.length === 0}
                  onClick={zoomOut}
                >
                  <ZoomOutIcon />
                </Fab>
              </Box>
            </Tooltip>

            <Tooltip title='Save Image' placement='left'>
              <Box sx={{ position: 'fixed', right: 20, top: 80 }}>
                <Fab
                  size='small'
                  sx={{ background: '#fff' }}
                  disabled={trees.length === 0}
                  onClick={saveTreeImage}
                >
                  <ImageIcon />
                </Fab>
              </Box>
            </Tooltip>

            {trees.length === 0 ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='100%'
                height='100%'
                viewBox='0 100 1000 500'
              >
                <text
                  x='50%'
                  y='50%'
                  fontFamily='Roboto Mono'
                  fontSize='16'
                  fill='#000'
                  textAnchor='middle'
                >
                  No Tree Found
                </text>
              </svg>
            ) : (
              <TreeCanvas
                ref={canvas}
                tree={trees[treeIndex]}
                words={words}
                rules={ruleSets[ruleSetIndex]}
                zoom={canvasZoom}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default withTracker(TreeViewer)
