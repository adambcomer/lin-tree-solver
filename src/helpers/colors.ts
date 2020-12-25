export const colors = ['#2d7ff9', '#18bfff', '#20d9d2', '#ff08c2', '#f82b60', '#ff6f2c', '#fcb400', '#20c933', '#8b46ff']

export function getColor (hash: number): string {
  return colors[hash % colors.length]
}
