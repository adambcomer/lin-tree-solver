import { Expression } from './expression'

export class RuleSet {
  name: string
  private readonly pos: Set<string> = new Set()
  private readonly rules: Map<string, Expression> = new Map()

  constructor (name: string) {
    this.name = name
  }

  addPos (pos: string): void {
    this.pos.add(pos)
  }

  addRule (name: string, rule: string): void {
    this.rules.set(name, new Expression(name, rule))
  }

  isValid (): boolean {
    for (const rule of this.rules.values()) {
      for (const tag of rule.tags) {
        if (!this.pos.has(tag.name) && !this.rules.has(tag.name)) {
          return false
        }
      }
    }
    return true
  }

  has (name: string): boolean {
    return this.pos.has(name) || this.rules.has(name)
  }

  hasRule (name: string): boolean {
    return this.rules.has(name)
  }

  hasPos (name: string): boolean {
    return this.pos.has(name)
  }

  getRule (name: string): Expression | undefined {
    return this.rules.get(name)
  }

  getPosIndex (name: string): number {
    return [...this.pos].indexOf(name)
  }

  getPos (): Set<string> {
    return this.pos
  }

  getRules (): Map<string, Expression> {
    return this.rules
  }
}
