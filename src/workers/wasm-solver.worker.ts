import { RuleSet, Tree } from '../tree-solver'
const wasmSolver = import('../wasm-tree-solver/pkg')

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

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any

ctx.onmessage = (e: MessageEvent<Array<{ word: string, pos: string }>>) => {
  console.log(e.data)

  wasmSolver.then(wasm => {
    const solver = new wasm.TreeSolver(e.data.map(w => w.pos), { pos: [...ruleSet.getPos()], rules: Object.fromEntries(ruleSet.getRules()) })
    const trees: Tree[] = solver.get_trees(['TP'])

    trees.forEach(t => t.nodes.push({ tag: { name: t.root, optional: false, repeated: false }, level: 0, expanded: true }))

    postMessage({ trees: trees, searched: solver.get_searched() })
  }).catch((e) => { console.error(e) })
}
