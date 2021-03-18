export interface Tag {
  values: string[]
  optional: boolean
  repeated: boolean
}

export function tagToString(tag: Tag): string {
  if (tag.optional && tag.repeated) {
    if (tag.values.length === 1) {
      return `(${tag.values[0]}+)`
    }
    return `({${tag.values.join('/')}}+)`
  } else if (tag.optional) {
    if (tag.values.length === 1) {
      return `(${tag.values[0]})`
    }
    return `({${tag.values.join('/')}})`
  }
  if (tag.values.length === 1) {
    return tag.values[0]
  }
  return `{${tag.values.join('/')}}`
}

export class Expression {
  name: string
  tags: Tag[] = []

  constructor(name: string, rule: string) {
    this.name = name

    rule.match(/(\({[a-zA-Z/+]+}\)|{[a-zA-Z/+]+}|\([a-zA-Z+]+\)|[a-zA-Z]+)/g)?.forEach(t => {
      if (t.startsWith('({') && t.endsWith('}+)')) {
        this.tags.push({ values: t.slice(2, t.length - 3).split('/'), optional: true, repeated: true })
      } else if (t.startsWith('({') && t.endsWith('})')) {
        this.tags.push({ values: t.slice(2, t.length - 2).split('/'), optional: true, repeated: false })
      } else if (t.startsWith('{') && t.endsWith('}')) {
        this.tags.push({ values: t.slice(1, t.length - 1).split('/'), optional: false, repeated: false })
      } else if (t.startsWith('(') && t.endsWith('+)')) {
        this.tags.push({ values: [t.slice(1, t.length - 2)], optional: true, repeated: true })
      } else if (t.startsWith('(') && t.endsWith(')')) {
        this.tags.push({ values: [t.slice(1, t.length - 1)], optional: true, repeated: false })
      } else {
        this.tags.push({ values: [t], optional: false, repeated: false })
      }
    })
  }

  tagsToString(): string {
    return this.tags.map(t => tagToString(t)).join(' ')
  }
}

export class RuleSet {
  name: string
  root: Set<string> = new Set()
  pos: Set<string> = new Set()
  rules: Map<string, Expression> = new Map()

  constructor(name: string) {
    this.name = name
  }

  addPos(pos: string): void {
    this.pos.add(pos)
  }

  addRule(name: string, rule: string): void {
    this.rules.set(name, new Expression(name, rule))
  }

  addRoot(name: string): void {
    this.root.add(name)
  }

  has(name: string): boolean {
    return this.pos.has(name) || this.rules.has(name)
  }

  hasRule(name: string): boolean {
    return this.rules.has(name)
  }

  hasPos(name: string): boolean {
    return this.pos.has(name)
  }

  getRule(name: string): Expression | undefined {
    return this.rules.get(name)
  }

  getPosIndex(name: string): number {
    return [...this.pos].indexOf(name)
  }

  getPos(): Set<string> {
    return this.pos
  }

  getRules(): Map<string, Expression> {
    return this.rules
  }

  getRoot(): Set<string> {
    return this.root
  }

  grammar(): string {
    let g = `main -> ${[...this.root].join('|')}`

    for (const [name, exp] of this.rules.entries()) {
      const tags = []
      for (const tag of exp.tags) {
        if (tag.optional && tag.repeated) {
          if (tag.values.length === 1) {
            if (this.hasPos(tag.values[0])) {
              tags.push(`"${tag.values[0]}":*`)
            } else {
              tags.push(`${tag.values[0]}:*`)
            }
          } else {
            tags.push(`(${tag.values.map(v => this.hasPos(v) ? `"${v}"` : v).join('|')}):*`)
          }
        } else if (tag.optional) {
          if (tag.values.length === 1) {
            if (this.hasPos(tag.values[0])) {
              tags.push(`"${tag.values[0]}":?`)
            } else {
              tags.push(`${tag.values[0]}:?`)
            }
          } else {
            tags.push(`(${tag.values.map(v => this.hasPos(v) ? `"${v}"` : v).join('|')}):?`)
          }
        } else {
          if (tag.values.length === 1) {
            if (this.hasPos(tag.values[0])) {
              tags.push(`"${tag.values[0]}"`)
            } else {
              tags.push(`${tag.values[0]}`)
            }
          } else {
            tags.push(`(${tag.values.map(v => this.hasPos(v) ? `"${v}"` : v).join('|')})`)
          }
        }
      }

      const f = `{% 
        (data) => {
          const children = []
          for (let i = 0; i < data.length; i++) {
            if (data[i] !== null) {
              if (Array.isArray(data[i])) {
                if (data[i].length > 0) {
                  children.push(data[i][0])
                }
              } else {
                children.push(data[i])
              }
            }
          }
          return {
            node: '${name}',
            terminals: 0,
            children: children
          }
        }
      %}`

      g += `\n${name} -> ${tags.join(' ')} ${f}`
    }
    return g
  }
}
