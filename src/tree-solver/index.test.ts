import { Tree, TreeSolver } from '.'
import { Expression } from './expression'
import { RuleSet } from './ruleset'

const ruleSet = new RuleSet();
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

test('Parse Expression', () => {
  const exp = new Expression('NP', '(D)(AdjP+)N(PP+)')

  expect(exp.tags).toHaveLength(4)
  expect(exp.tags[0]).toEqual({ name: 'D', optional: true, repeated: false })
  expect(exp.tags[1]).toEqual({ name: 'AdjP', optional: true, repeated: true })
  expect(exp.tags[2]).toEqual({ name: 'N', optional: false, repeated: false })
  expect(exp.tags[3]).toEqual({ name: 'PP', optional: true, repeated: true })
})

test('Tree Expand Tag', () => {
  const tree = new Tree('NP', ruleSet)
  tree.nodes = [{ tag: { name: 'N', optional: true, repeated: false }, expanded: false, level: 0 }]

  expect(tree.flat()).toEqual(['(N)'])
  expect(tree.flatLeaf()).toEqual([])

  tree.expand(0)

  expect(tree.flat()).toEqual(['N'])
  expect(tree.flatLeaf()).toEqual(['N'])
  expect(tree.nodes).toEqual([{ tag: { name: 'N', optional: true, repeated: false }, expanded: true, level: 0 }])
})

test('Tree Expand Rule', () => {
  const tree = new Tree('NP', ruleSet)
  tree.nodes = [{ tag: { name: 'PP', optional: true, repeated: false }, expanded: false, level: 0 }]

  expect(tree.flat()).toEqual(['(PP)'])
  expect(tree.flatLeaf()).toEqual([])

  tree.expand(0)

  expect(tree.flat()).toEqual(['P', '(NP)'])
  expect(tree.flatLeaf()).toEqual(['P'])
  expect(tree.nodes).toEqual([
    { tag: { name: 'P', optional: false, repeated: false }, expanded: true, level: 1 },
    { tag: { name: 'NP', optional: true, repeated: false }, expanded: false, level: 1 },
    { tag: { name: 'PP', optional: true, repeated: false }, expanded: true, level: 0 }
  ])
})

test('Tree Expand Multiple Rules', () => {
  const tree = new Tree('NP', ruleSet)
  tree.nodes = [
    { tag: { name: 'PP', optional: true, repeated: false }, expanded: false, level: 0 },
    { tag: { name: 'NP', optional: true, repeated: false }, expanded: false, level: 0 }
  ]

  expect(tree.flat()).toEqual(['(PP)', '(NP)'])
  expect(tree.flatLeaf()).toEqual([])

  tree.expand(1)

  expect(tree.flat()).toEqual(['(PP)', '(D)', '(AdjP+)', 'N', '(PP+)'])
  expect(tree.flatLeaf()).toEqual(['N'])
  expect(tree.nodes).toEqual([
    { tag: { name: 'PP', optional: true, repeated: false }, expanded: false, level: 0 },
    { tag: { name: 'D', optional: true, repeated: false }, expanded: false, level: 1 },
    { tag: { name: 'AdjP', optional: true, repeated: true }, expanded: false, level: 1 },
    { tag: { name: 'N', optional: false, repeated: false }, expanded: true, level: 1 },
    { tag: { name: 'PP', optional: true, repeated: true }, expanded: false, level: 1 },
    { tag: { name: 'NP', optional: true, repeated: false }, expanded: true, level: 0 }
  ])
})

test('Tree Expand Multiple Tags', () => {
  const tree = new Tree('NP', ruleSet)
  tree.nodes = [
    { tag: { name: 'PP', optional: true, repeated: false }, expanded: false, level: 0 },
    { tag: { name: 'N', optional: true, repeated: false }, expanded: false, level: 0 }
  ]

  expect(tree.flat()).toEqual(['(PP)', '(N)'])
  expect(tree.flatLeaf()).toEqual([])

  tree.expand(1)

  expect(tree.flat()).toEqual(['(PP)', 'N'])
  expect(tree.flatLeaf()).toEqual(['N'])
  expect(tree.nodes).toEqual([
    { tag: { name: 'PP', optional: true, repeated: false }, expanded: false, level: 0 },
    { tag: { name: 'N', optional: true, repeated: false }, expanded: true, level: 0 }
  ])
})

test('Tree Solver Simple', () => {
  const solver = new TreeSolver(['N'], ruleSet)

  const t = solver.getTree(['TP'])

  expect(t?.flat()).toEqual(['(D)', '(AdjP+)', 'N', '(PP+)', '(T)', '(VP)'])
  expect(t?.flatLeaf()).toEqual(['N'])
  expect(t?.nodes).toEqual([
    { tag: { name: 'D', optional: true, repeated: false }, expanded: false, level: 1 },
    { tag: { name: 'AdjP', optional: true, repeated: true }, expanded: false, level: 1 },
    { tag: { name: 'N', optional: false, repeated: false }, expanded: true, level: 1 },
    { tag: { name: 'PP', optional: true, repeated: true }, expanded: false, level: 1 },
    { tag: { name: 'NP', optional: true, repeated: false }, expanded: true, level: 0 },
    { tag: { name: 'T', optional: true, repeated: false }, expanded: false, level: 0 },
    { tag: { name: 'VP', optional: true, repeated: false }, expanded: false, level: 0 }
  ])
})

test('Tree Solver Multiple', () => {
  const solver = new TreeSolver(['D', 'N', 'V'], ruleSet)

  const t = solver.getTree(['TP'])

  expect(t?.flatLeaf()).toEqual(['D', 'N', 'V'])
  expect(t?.flat()).toEqual(['D', '(AdjP+)', 'N', '(PP+)', '(T)', '(AdvP+)', 'V', '(NP)', '(AdvP+)', '(PP+)', '(AdvP+)'])
  expect(t?.nodes).toEqual([
    { tag: { name: 'D', optional: true, repeated: false }, expanded: true, level: 1 },
    { tag: { name: 'AdjP', optional: true, repeated: true }, expanded: false, level: 1 },
    { tag: { name: 'N', optional: false, repeated: false }, expanded: true, level: 1 },
    { tag: { name: 'PP', optional: true, repeated: true }, expanded: false, level: 1 },
    { tag: { name: 'NP', optional: true, repeated: false }, expanded: true, level: 0 },
    { tag: { name: 'T', optional: true, repeated: false }, expanded: false, level: 0 },
    { tag: { name: 'AdvP', optional: true, repeated: true }, expanded: false, level: 1 },
    { tag: { name: 'V', optional: false, repeated: false }, expanded: true, level: 1 },
    { tag: { name: 'NP', optional: true, repeated: false }, expanded: false, level: 1 },
    { tag: { name: 'AdvP', optional: true, repeated: true }, expanded: false, level: 1 },
    { tag: { name: 'PP', optional: true, repeated: true }, expanded: false, level: 1 },
    { tag: { name: 'AdvP', optional: true, repeated: true }, expanded: false, level: 1 },
    { tag: { name: 'VP', optional: true, repeated: false }, expanded: true, level: 0 }
  ])
})
