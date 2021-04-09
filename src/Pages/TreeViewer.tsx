import { CircularProgress, Grid, makeStyles, Fade, Fab, Tooltip } from '@material-ui/core'
import React, { useEffect, useState, useRef } from 'react'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import ImageIcon from '@material-ui/icons/Image'
import TreeCanvas from '../Components/TreeCanvas'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers'
import { Node } from '../types'
// eslint-disable-next-line import/no-webpack-loader-syntax
import ParserWorker from 'worker-loader!../workers/parser.worker'
import { Helmet } from 'react-helmet'

const useStyles = makeStyles(() => ({
  container: {
    background: '#fff',
    height: '100vh'
  },

  loadingContainer: {
    position: 'absolute',
    top: 'calc(50% - 68px)',
    left: '50%',
    marginTop: -20,
    marginLeft: -20
  },

  metricsContainer: {
    paddingLeft: 8
  },
  metricsHeader: {
    marginTop: 8
  },
  metricsSubHeader: {
    marginTop: 8
  },

  svgContainer: {
    background: '#f5f5f5',
    height: '100vh'
  },

  toolsContainer: {
    paddingTop: 8,
    paddingRight: 8
  },

  computeButton: {
    position: 'fixed',
    right: 20,
    bottom: 20
  },

  nextTreeFabContainer: {
    position: 'fixed',
    right: 20,
    top: 20
  },
  priorTreeFabContainer: {
    position: 'fixed',
    right: 80,
    top: 20
  },
  zoomInFabContainer: {
    position: 'fixed',
    right: 20,
    bottom: 20
  },
  zoomOutFabContainer: {
    position: 'fixed',
    right: 80,
    bottom: 20
  },
  printTreeFabContainer: {
    position: 'fixed',
    right: 20,
    top: 80
  },
  fab: {
    background: '#fff'
  }
}))

const worker = new ParserWorker()

const TreeViewer: React.FC = () => {
  const words = useSelector((state: RootState) => state.sentence.words)
  const ruleSets = useSelector((state: RootState) => state.rules.ruleSets)
  const ruleSetIndex = useSelector((state: RootState) => state.rules.index)
  const [trees, setTrees] = useState<Node[]>([])
  const [treeIndex, setTreeIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [canvasZoom, setCanvasZoom] = useState(1)
  const canvas = useRef<HTMLCanvasElement>(null)
  const classes = useStyles()

  useEffect(() => {
    const t1 = performance.now()
    worker.onmessage = (e: MessageEvent<{ trees: Node[], searched: number }>) => {
      setTrees(e.data.trees)
      setTreeIndex(0)

      console.log(`Solved in ${(performance.now() - t1)}ms`)

      setLoading(false)
    }
    worker.postMessage({ grammar: ruleSets[ruleSetIndex].grammar(), words })
  }, [ruleSetIndex, ruleSets, words])

  function nextTree(): void {
    setTreeIndex(treeIndex + 1)
  }

  function priorTree(): void {
    setTreeIndex(treeIndex - 1)
  }

  function zoomIn(): void {
    setCanvasZoom(canvasZoom * 4/3)
  }

  function zoomOut(): void {
    setCanvasZoom(canvasZoom * 3/4)
  }

  function saveTreeImage(): void {
    if (canvas.current === null) return

    const image = document.createElement('canvas')
    image.width = canvas.current.width
    image.height = canvas.current.height

    const context = image.getContext('2d')
    if (context === null) return
    context.fillStyle = '#fff'
    context.fillRect(0, 0, image.width, image.height)
    context.drawImage(canvas.current, 0, 0)

    const png = image.toDataURL('image/png').replace('image/png', 'image/octet-stream')
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

          <link rel='canonical' href='https://adambcomer.com/lin-tree-solver/viewer' />

          <meta property='og:title' content='Tree Viewer | Linguistics Tree Solver' />
          <meta property='og:description' content='View parsed and built trees.' />
          <meta property='og:type' content='website' />
          <meta property='og:url' content='https://adambcomer.com/lin-tree-solver/viewer' />
        </Helmet>
        <Grid item xs>
          <div className={classes.loadingContainer}>
            <Fade in={loading} style={{ transitionDelay: loading ? '400ms' : '0ms' }} unmountOnExit>
              <CircularProgress />
            </Fade>
          </div>
        </Grid>
      </>
    )
  }
  return (
    <>
        <Helmet htmlAttributes={{ lang: 'en' }}>
          <title>Tree Viewer | Linguistics Tree Solver</title>
          <meta name='description' content='View parsed and built trees.' />

          <link rel='canonical' href='https://adambcomer.com/lin-tree-solver/viewer' />

          <meta property='og:title' content='Tree Viewer | Linguistics Tree Solver' />
          <meta property='og:description' content='View parsed and built trees.' />
          <meta property='og:type' content='website' />
          <meta property='og:url' content='https://adambcomer.com/lin-tree-solver/viewer' />
        </Helmet>
      <Grid item xs>
        <Grid container className={classes.container}>
          <Grid item xs={12} className={classes.svgContainer}>
            <Tooltip title='Next Tree'>
              <span className={classes.nextTreeFabContainer}>
                <Fab size='small' className={classes.fab} disabled={trees.length === 0 || treeIndex === trees.length - 1} onClick={nextTree}>
                  <NavigateNextIcon />
                </Fab>
              </span>
            </Tooltip>
            <Tooltip title='Prior Tree'>
              <span className={classes.priorTreeFabContainer}>
                <Fab size='small' className={classes.fab} disabled={trees.length === 0 || treeIndex === 0} onClick={priorTree}>
                  <NavigateBeforeIcon />
                </Fab>
              </span>
            </Tooltip>

            <Tooltip title='Zoom In' placement='top'>
              <span className={classes.zoomInFabContainer}>
                <Fab size='small' className={classes.fab} disabled={trees.length === 0} onClick={zoomIn}>
                  <ZoomInIcon />
                </Fab>
              </span>
            </Tooltip>
            <Tooltip title='Zoom Out' placement='top'>
              <span className={classes.zoomOutFabContainer}>
                <Fab size='small' className={classes.fab} disabled={trees.length === 0} onClick={zoomOut}>
                  <ZoomOutIcon />
                </Fab>
              </span>
            </Tooltip>

            <Tooltip title='Save Image' placement='left'>
              <span className={classes.printTreeFabContainer}>
                <Fab size='small' className={classes.fab} disabled={trees.length === 0} onClick={saveTreeImage}>
                  <ImageIcon />
                </Fab>
              </span>
            </Tooltip>

            {trees.length === 0
              ? <svg xmlns="http://www.w3.org/2000/svg" width="100%" height='100%' viewBox='0 100 1000 500'>
                <text x='50%' y='50%' fontFamily='Roboto Mono' fontSize='16' fill='#000' textAnchor='middle'>No Tree Found</text>              </svg>
              : <TreeCanvas ref={canvas} tree={trees[treeIndex]} words={words} rules={ruleSets[ruleSetIndex]} zoom={canvasZoom} />
            }
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default TreeViewer
