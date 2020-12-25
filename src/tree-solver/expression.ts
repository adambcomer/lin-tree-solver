
export interface Tag {
  name: string
  optional: boolean
  repeated: boolean
}

function tagToString (tag: Tag): string {
  if (tag.optional && tag.repeated) {
    return `(${tag.name}+)`
  } else if (tag.optional) {
    return `(${tag.name})`
  }
  return tag.name
}

export class Expression {
  name: string
  tags: Tag[] = []

  constructor (name: string, rule: string) {
    this.name = name

    rule.match(/(\([a-zA-Z+]+\)|[a-zA-Z]+)/g)?.forEach(t => {
      if (t.startsWith('(') && t.endsWith('+)')) {
        this.tags.push({ name: t.slice(1, t.length - 2), optional: true, repeated: true })
      } else if (t.startsWith('(') && t.endsWith(')')) {
        this.tags.push({ name: t.slice(1, t.length - 1), optional: true, repeated: false })
      } else {
        this.tags.push({ name: t, optional: false, repeated: false })
      }
    })
  }

  tagsToString (): string {
    return this.tags.map(t => tagToString(t)).join(' ')
  }
}
