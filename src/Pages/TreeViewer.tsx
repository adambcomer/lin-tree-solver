import { CircularProgress, Grid, makeStyles, Fade, Fab, Tooltip, Button } from '@material-ui/core'
import React, { useState } from 'react'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import ImageIcon from '@material-ui/icons/Image'
import MemoryIcon from '@material-ui/icons/Memory'
import { Tree } from '../tree-solver'
// eslint-disable-next-line import/no-webpack-loader-syntax
import WasmSolverWorker from 'worker-loader!../workers/wasm-solver.worker'
import TreeCanvas from '../Components/TreeCanvas'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers'

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

  nextTreeButton: {
    background: '#fff',
    position: 'fixed',
    right: 20,
    top: 20
  },
  priorTreeButton: {
    background: '#fff',
    position: 'fixed',
    right: 80,
    top: 20
  },
  printTreeButton: {
    background: '#fff',
    position: 'fixed',
    right: 20,
    top: 80
  }
}))

const worker = new WasmSolverWorker()

const TreeViewer: React.FC = () => {
  const words = useSelector((state: RootState) => state.sentence.words)
  const ruleSets = useSelector((state: RootState) => state.rules.ruleSets)
  const ruleSetIndex = useSelector((state: RootState) => state.rules.index)
  const [trees, setTrees] = useState<Tree[]>([])
  const [treeIndex, setTreeIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [metrics, setMetrics] = useState({ searched: 0, duration: 0 })
  const classes = useStyles()

  function computeTrees (): void {
    setLoading(true)

    const t1 = performance.now()
    worker.postMessage(words)
    worker.onmessage = function (e) {
      setTrees(e.data.trees)
      console.log(e.data.trees)
      setTreeIndex(0)
      setMetrics({ searched: e.data.searched, duration: performance.now() - t1 })
      console.log(`Solved in ${(performance.now() - t1)}ms, Searched ${e.data.searched as number} Trees, Found ${e.data.trees.length as number} Solutions`)
      setLoading(false)
    }
  }

  function nextTree (): void {
    setTreeIndex(treeIndex + 1)
  }

  function priorTree (): void {
    setTreeIndex(treeIndex - 1)
  }

  // function print (): void {
  //   if (treeSvg.current === null) {
  //     return
  //   }
  //   const { height, width } = treeSvg.current.getBBox()

  //   const blob = new Blob([treeSvg.current.outerHTML], { type: 'image/svg+xml' })

  //   const blobURL = URL.createObjectURL(blob)

  //   const image = new Image()
  //   image.onload = () => {
  //     const canvas = document.createElement('canvas')
  //     canvas.width = width * 4
  //     canvas.height = height * 4

  //     const context = canvas.getContext('2d')
  //     if (context === null) {
  //       return
  //     }
  //     context.fillStyle = '#fff'
  //     context.fillRect(0, 0, canvas.width, canvas.height)
  //     context.drawImage(image, 0, 0, canvas.width, canvas.height)

  //     const png = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
  //     const link = document.createElement('a')
  //     link.download = 'tree.png'
  //     link.href = png
  //     link.click()
  //   }
  //   image.src = blobURL
  // }

  if (loading) {
    return (
      <>
        <div className={classes.loadingContainer}>
          <Fade in={loading} style={{ transitionDelay: loading ? '800ms' : '0ms' }} unmountOnExit>
            <CircularProgress />
          </Fade>
        </div>
        <Fab color='primary' disabled className={classes.computeButton}>
          <MemoryIcon />
        </Fab>
      </>
    )
  } else if (trees.length === 0 && metrics.duration === 0 && metrics.searched === 0) {
    return (
      <Grid container className={classes.container} alignItems='center' justify='center'>
        <Grid item>
          <Button variant='contained' color='primary' startIcon={<MemoryIcon />} onClick={computeTrees} disableElevation>Compute Trees</Button>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.svgContainer}>
        <Tooltip title='Next Tree'>
          <Fab size='small' className={classes.nextTreeButton} disabled={trees.length === 0 || treeIndex === trees.length - 1} onClick={nextTree}>
            <NavigateNextIcon />
          </Fab>
        </Tooltip>
        <Tooltip title='Prior Tree'>
          <Fab size='small' className={classes.priorTreeButton} disabled={trees.length === 0 || treeIndex === 0} onClick={priorTree}>
            <NavigateBeforeIcon />
          </Fab>
        </Tooltip>
        <Tooltip title='Save Image' placement='left'>
          <Fab size='small' className={classes.printTreeButton} disabled={trees.length === 0}>
            <ImageIcon />
          </Fab>
        </Tooltip>

        {trees.length === 0
          ? <svg xmlns="http://www.w3.org/2000/svg" width="100%" height='100%' viewBox='0 100 1000 500'>
            <text x='50%' y='50%' fontFamily='Roboto Mono' fontSize='16' fill='#000' textAnchor='middle'>No Tree Found</text>
            <text x='50%' y='50%' dy='20' fontFamily='Roboto Mono' fontSize='14' fill='#000' textAnchor='middle'>Searched {metrics.searched} tree(s) in {(metrics.duration / 1000).toFixed(2)}s</text>
          </svg>
          : <TreeCanvas tree={trees[treeIndex]} words={words} rules={ruleSets[ruleSetIndex]} />
        }
      </Grid>
      <Tooltip title='Compute Trees' placement='top'>
        <Fab color='primary' onClick={computeTrees} className={classes.computeButton}>
          <MemoryIcon />
        </Fab>
      </Tooltip>
      {/* <Grid item md={3} lg={2}>
        <div className={classes.metricsContainer}>
          <Typography variant='h5' className={classes.metricsHeader}>Metrics:</Typography>
          <Typography variant='subtitle2' className={classes.metricsSubHeader}>Searched:</Typography>
          <Typography variant='body1'>{metrics.searched} tree(s)</Typography>
          <Typography variant='subtitle2' className={classes.metricsSubHeader}>Search Time:</Typography>
          <Typography variant='body1'>{(metrics.duration / 1000).toFixed(2)} sec</Typography>
          <Typography variant='subtitle2' className={classes.metricsSubHeader}>Trees per Second:</Typography>
          <Typography variant='body1'>{(metrics.searched / (metrics.duration / 1000)).toFixed(2)} trees/sec</Typography>
        </div>
      </Grid> */}
    </Grid>
  )
}

export default TreeViewer
