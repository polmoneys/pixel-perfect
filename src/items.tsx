import Card from './Card'
import { Items } from './lib'

export const slotsPortrait: Items = [
  {
    id: '0',
    children: <Card variant="sidebar" orientation="portrait" className="ddd" />,
    col: [1, 7],
    row: [1, 2],
  },
  {
    id: '3',
    children: <Card variant="aside" className="aaa" />,
    col: [1, 4],
    row: [4, 7],
  },
  {
    id: '1',
    children: <Card variant="cta" className="bbb" />,
    col: [1, 7],
    row: [2, 4],
  },
  {
    id: '2',
    children: <Card variant="secondary" className="ccc" />,
    col: [4, 7],
    row: [4, 7],
  },
]

export const slotsLandscape: Items = [
  {
    id: '0',
    children: <Card variant="sidebar" className="ddd" />,
    col: [1, 3],
    row: [1, 5],
  },
  {
    id: '3',
    children: <Card variant="aside" className="aaa" />,
    col: [1, 3],
    row: [5, 7],
  },
  {
    id: '1',
    children: <Card variant="cta" className="bbb" />,
    col: [3, 7],
    row: [1, 4],
  },
  {
    id: '2',
    children: <Card variant="secondary" className="ccc" />,
    col: [3, 7],
    row: [4, 7],
  },
]
