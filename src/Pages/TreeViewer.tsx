import { CircularProgress, Grid, makeStyles, Fade, Fab, Tooltip } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import ImageIcon from '@material-ui/icons/Image'
import TreeCanvas from '../Components/TreeCanvas'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers'
import { Node } from '../types'
// eslint-disable-next-line import/no-webpack-loader-syntax
import ParserWorker from 'worker-loader!../workers/parser.worker'

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
  // const [metrics, setMetrics] = useState({ searched: 0, duration: 0 })
  const classes = useStyles()

  useEffect(() => {
    console.log(ruleSets[ruleSetIndex].grammar())

    const t1 = performance.now()
    worker.onmessage = (e: MessageEvent<{trees: Node[], searched: number}>) => {
      setTrees(e.data.trees)
      setTreeIndex(0)

      console.log(`Solved in ${(performance.now() - t1)}ms`)

      setLoading(false)
    }
    worker.postMessage({ grammar: ruleSets[ruleSetIndex].grammar(), words })
  }, [ruleSetIndex, ruleSets, words])

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
      <Grid item xs>
        <div className={classes.loadingContainer}>
          <Fade in={loading} style={{ transitionDelay: loading ? '400ms' : '0ms' }} unmountOnExit>
            <CircularProgress />
          </Fade>
        </div>
      </Grid>
    )
  }
  return (
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
          <Tooltip title='Save Image' placement='left'>
            <span className={classes.printTreeFabContainer}>
              <Fab size='small' className={classes.fab} disabled={trees.length === 0}>
                <ImageIcon />
              </Fab>
            </span>
          </Tooltip>

          {trees.length === 0
            ? <svg xmlns="http://www.w3.org/2000/svg" width="100%" height='100%' viewBox='0 100 1000 500'>
              <text x='50%' y='50%' fontFamily='Roboto Mono' fontSize='16' fill='#000' textAnchor='middle'>No Tree Found</text>
              {/* <text x='50%' y='50%' dy='20' fontFamily='Roboto Mono' fontSize='14' fill='#000' textAnchor='middle'>Searched {metrics.searched} tree(s) in {(metrics.duration / 1000).toFixed(2)}s</text> */}
            </svg>
            : <TreeCanvas tree={trees[treeIndex]} words={words} rules={ruleSets[ruleSetIndex]} />
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TreeViewer
