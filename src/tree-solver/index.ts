import { RuleSet } from './ruleset'
import { Tag } from './expression'

export * from './ruleset'
export * from './expression'

export interface Node {
  tag: Tag
  level: number
  expanded: boolean

}

export class Tree {
  root: string
  nodes: Node[] = []
  ruleSet: RuleSet

  constructor (root: string, ruleSet: RuleSet) {
    this.root = root
    this.ruleSet = ruleSet
    const rule = ruleSet.getRule(root)
    if (rule !== undefined) {
      this.nodes = rule.tags.map(t => { return { tag: t, level: 0, expanded: !t.optional } })
    }
  }

  clone (): Tree {
    const t = new Tree(this.root, this.ruleSet)
    t.nodes = this.nodes.map(n => { return { ...n } })
    return t
  }

  flat (): string[] {
    return this.nodes.filter(n => !n.expanded || !this.ruleSet.hasRule(n.tag.name)).map(n => {
      if (n.expanded) {
        return n.tag.name
      } else if (n.tag.optional && n.tag.repeated) {
        return `(${n.tag.name}+)`
      }
      return `(${n.tag.name})`
    })
  }

  flatLeaf (): string[] {
    return this.nodes.filter(n => n.expanded && this.ruleSet.hasPos(n.tag.name)).map(t => t.tag.name)
  }

  expandable (index: number): boolean {
    return !this.nodes[index].expanded || this.ruleSet.hasRule(this.nodes[index].tag.name)
  }

  expand (index: number): void {
    if (this.ruleSet.hasPos(this.nodes[index].tag.name)) {
      if (this.nodes[index].tag.repeated) {
        this.nodes.splice(index, 0, { ...this.nodes[index], expanded: true })
      } else {
        this.nodes[index] = { ...this.nodes[index], expanded: true }
      }
      return
    }

    const rule = this.ruleSet.getRule(this.nodes[index].tag.name)
    const insertNodes = rule?.tags.map(t => { return { tag: t, level: this.nodes[index].level + 1, expanded: !t.optional } }) ?? []
    let i = 0
    while (i < insertNodes.length) {
      if (!insertNodes[i].tag.optional && this.ruleSet.hasRule(insertNodes[i].tag.name)) {
        const expandRule = this.ruleSet.getRule(insertNodes[i].tag.name)
        const expandLevel = insertNodes[i].level
        const expandTags = expandRule?.tags.map(t => { return { tag: t, level: expandLevel + 1, expanded: !t.optional } }) ?? []

        insertNodes[i].expanded = true
        insertNodes.splice(i, 0, ...expandTags)
      } else {
        i += 1
      }
    }

    this.nodes[index].expanded = true
    this.nodes.splice(index, 0, ...insertNodes)
  }
}

export class TreeSolver {
  tokens: string[]
  ruleSet: RuleSet
  searched: number

  constructor (tokens: string[], ruleSet: RuleSet) {
    this.tokens = tokens
    this.ruleSet = ruleSet
    this.searched = 0
  }

  getTree (initialRules: string[]): Tree | undefined {
    const stack: Tree[] = []

    initialRules.forEach(r => {
      const rule = this.ruleSet.getRule(r)
      if (rule !== undefined) {
        const t = new Tree(rule.name, this.ruleSet)
        if (t.flatLeaf().length <= this.tokens.length) {
          stack.push(t)
        }
      }
    })

    let t
    while (stack.length > 0) {
      t = stack.pop()
      if (t === undefined) return
      this.searched += 1

      const flat = t.flatLeaf()
      // console.log(`[${flat.toString()}] [${t.flat().toString()}]`)
      if (flat.length === this.tokens.length && flat.every((v, i) => v === this.tokens[i])) {
        // console.log(t.flat())
        return t
      }

      for (let i = 0; i < t.nodes.length; i++) {
        if (t.expandable(i)) {
          const newTree = t.clone()
          newTree.expand(i)

          const flat = newTree.flatLeaf()

          if (flat.length <= this.tokens.length) {
            let j = 0
            for (let i = 0; i < this.tokens.length; i++) {
              if (j === flat.length) {
                break
              }
              if (this.tokens[i] === flat[j]) {
                j += 1
              }
            }
            if (j === flat.length) {
              stack.push(newTree)
            }
          }
        }
      }
    }
  }
}
