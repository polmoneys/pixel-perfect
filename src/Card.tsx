import { ReactNode } from 'react'
import Shape from './Shape'
import { Orientation } from './lib'
import { black } from './color-utils'

const Sidebar = ({
  orientation = 'portrait',
}: {
  orientation?: Orientation
}) => (
  <Shape.Triangle
    size={orientation === 'portrait' ? 36 : 128}
    fill={black(50)}
  />
)
const Aside = ({ orientation = 'portrait' }: { orientation?: Orientation }) => (
  <Shape.Square size={orientation === 'portrait' ? 36 : 128} fill={black(50)} />
)
const Cta = ({ orientation = 'portrait' }: { orientation?: Orientation }) => (
  <Shape
    sides={5}
    size={orientation === 'portrait' ? 36 : 128}
    fill={black(50)}
  />
)
const Secondary = ({
  orientation = 'portrait',
}: {
  orientation?: Orientation
}) => (
  <Shape
    sides={6}
    size={orientation === 'portrait' ? 36 : 128}
    fill={black(50)}
  />
)

type Variant = 'sidebar' | 'cta' | 'secondary' | 'aside'

const Card = ({
  variant,
  orientation = 'portrait',
  className,
}: {
  variant: Variant
  orientation?: Orientation
  className?: string
}) => {
  const icon: Record<Variant, ReactNode> = {
    aside: <Aside orientation={orientation} />,
    sidebar: <Sidebar orientation={orientation} />,
    cta: <Cta orientation={orientation} />,
    secondary: <Secondary orientation={orientation} />,
  }

  return (
    <div className={['card', 'radius', className].filter(Boolean).join(' ')}>
      {icon[variant]}
    </div>
  )
}

export default Card
