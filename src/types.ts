export interface Node {
  node: string
  terminals: number
  children: Array<Node | string>
}
