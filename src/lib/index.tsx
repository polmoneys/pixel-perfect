import {
  ElementType,
  useMemo,
  ReactNode,
  useRef,
  AriaAttributes,
  cloneElement,
  isValidElement,
} from 'react'
import useResizeObserver from './useResizeObserver'

interface Grid {
  gap?: string
  cols: number
  rows: number
  minY?: string
}

type WithCommonProps<T> = T & { className?: string; id?: string }

export interface PxPProps extends AriaAttributes {
  grid: Grid
  items: Items | Record<'portrait' | 'landscape', Items>
  as?: 'section' | 'article' | 'nav' | 'aside' | 'div' | 'main'
  breakpoint?: number
  debug?: boolean
}

export interface Item {
  id: string
  col: Record<number, number>
  row: Record<number, number>
  as?: 'div' | 'article'
  placement?: 'end' | 'start' | 'stretch' | 'center'
  children: ReactNode
}

export interface Items extends Array<Item> {}

export type Orientation = 'portrait' | 'landscape'

const cloneWithOrientation = (
  child: ReactNode,
  orientation: Orientation,
): ReactNode => {
  if (isValidElement(child)) {
    return cloneElement(child, { orientation } as any)
  }
  return child
}

const PxP = (props: WithCommonProps<PxPProps>) => {
  const {
    as,
    items,
    grid: { gap = '.5em', cols, rows, minY = '10em' },
    debug = false,
    breakpoint = 522,
    // id, className, AriaAttributes
    ...rest
  } = props

  const ref = useRef(null)
  const parentSize = useResizeObserver(ref)

  const gridStyles = useMemo(() => {
    return {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${rows}, minmax(0, ${minY}))`,
      gap,
    }
  }, [cols, rows, gap, minY])

  const gridItems = useMemo(() => {
    const isPortrait =
      parentSize == null ||
      parentSize.width === undefined ||
      parentSize.width > breakpoint
        ? false
        : true

    const cells = Array.isArray(items)
      ? items
      : isPortrait
      ? items.portrait
      : items.landscape
    const orientation = isPortrait ? 'portrait' : 'landscape'

    return cells?.map(item => {
      const { id, col, row, as, children, placement } = item
      const itemStyles = {
        display: 'grid',
        width: '100%',
        height: '100%',
        gridRow: `${row[0]}/ ${row[1]} `,
        gridColumn: `${col[0]}/ ${col[1]} `,
        alignContent: placement === undefined ? 'stretch' : placement,
        border: debug ? '.5px solid rgba(0,0,0,.3)' : 'none',
      }
      const Tag = as || ('div' as ElementType)

      return (
        <Tag style={itemStyles} key={id}>
          {cloneWithOrientation(children, orientation)}
        </Tag>
      )
    })
  }, [debug, items, parentSize, breakpoint])

  const Tag = as || ('div' as ElementType)

  return (
    <Tag {...rest} style={{ ...gridStyles }} ref={ref}>
      {gridItems}
    </Tag>
  )
}

export default PxP
