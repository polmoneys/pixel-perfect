## TLDR

Precision `CSS grid` with `React`, sort of what `pixel perfect` means to me on 2023. [Demo](https://github.com/polmoneys)

## Props

`PxP` sets up a defined grid for `children`. 

```ts

interface Grid {
  gap?: string
  cols: number
  rows: number
  minY?: string
}

interface PxPProps extends AriaAttributes {
  grid: Grid
  items: Items | Record<'portrait' | 'landscape', Items>
  as?: 'section' | 'article' | 'nav' | 'aside' | 'div' | 'main'
  breakpoint?: number
  debug?: boolean
}

```

While `breakpoint` is a bad name, at that `number` a switch will trigger between `portrait` and `landscape` items. 

Prop `minY` adds a min height to each grid item so that you can avoid overlaps if content does not wrap.

The more precision you want the higher the `x` or `y` number. 

Prop `debug` makes its visually easier to spot grids divisions. 

For `children` we require a very specific shape: 

```ts

interface Item {
  id: string
  col: Record<number, number>
  row: Record<number, number>
  as?: 'div' | 'article'
  placement?: 'end' | 'start' | 'stretch' | 'center'
  children: ReactNode
}

interface Items extends Array<Item> {}

```

Keys `col` and `row` define the area of the children, `placement` defaults to `stretch` as it's usually what you want but tune it to your song. 


## Tips

Consume it as 'implementation detail' hidden behind your own Design System `api`, you'd use `OwnVersion` in your code base. 


```typescript


interface PxPFilledProps extends PxPProps {
    // Prop to taint background color of the grid
    fill?:string;
}

const OwnVersion = (props: PxPFilledProps) => {
    const { fill, ...rest } = props;
    return (
        <div
            {...(fill !== undefined && {
                style: {
                    backgroundColor: fill,
                },
            })}
        >
            <ArtDirection {...rest} />
        </div>
    );
};

```

## Inspiration

> Our requirements are more modest but at the same time more responsible: 
> buildings, furniture, drinking glasses may well be consumer items that 
> we can destroy without regret after they have served for some short or 
> long period, but while we use them we expect them to fullfill their role and serve us perfectly, so perfectly that we can also derive aesthetic 
> enjoyment from observing them in use. 

Erik Gunnar Asplund on **Swedish Grace**.