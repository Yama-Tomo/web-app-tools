import { ScrollArea } from '@base-ui/react/scroll-area'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

import { css, cx } from '#panda/css'
import { scrollArea } from '#panda/recipes'
import preview from '#sb/preview.tsx'

type Args = ReturnType<typeof scrollArea> & { containerClassName?: string; listClassName?: string }

const meta = preview.meta({
  args: { ...scrollArea(), containerClassName: css({ h: '[50vh]', w: '[700px]' }) },
  argTypes: {
    containerClassName: { table: { disable: true } },
  },
  component: ({ root, viewport, scrollbar, thumb, containerClassName, listClassName }: Args) => {
    return (
      <div className={containerClassName}>
        <ScrollArea.Root className={root}>
          <ScrollArea.Viewport className={viewport}>
            <ScrollArea.Content>
              <ul
                className={cx(
                  css({
                    display: 'grid',
                    gap: '1',
                    gridTemplateColumns: 'repeat(10, var(--cell-size, 8rem))',
                    gridTemplateRows: 'repeat(10, var(--cell-size, 8rem))',
                    listStyle: 'none',
                  }),
                  listClassName,
                )}
              >
                {Array.from({ length: 100 }, (_, i) => (
                  <li
                    // biome-ignore lint/suspicious/noArrayIndexKey: no better unique identifier available
                    key={i}
                    className={css({
                      alignItems: 'center',
                      bg: 'gray.muted',
                      borderRadius: 'sm',
                      color: 'gray.solid',
                      display: 'flex',
                      justifyContent: 'center',
                    })}
                  >
                    {i + 1}
                  </li>
                ))}
              </ul>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className={scrollbar}>
            <ScrollArea.Thumb className={thumb} />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar className={scrollbar} orientation="horizontal">
            <ScrollArea.Thumb className={thumb} />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      </div>
    )
  },
})

const variants = ['hover', 'always'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const

export const Basic = meta.story()

export const Variants = meta.story({
  args: {
    containerClassName: css({ h: '[50vh]', w: '[420px]' }),
    listClassName: css({ '--cell-size': '4rem' }),
  },
  parameters: {
    tableDecorator: {
      cols: variants,
      rows: [
        {
          items: [
            scrollArea({ variant: variants[0] }),
            scrollArea({ variant: variants[1] }),
          ] satisfies Args[],
        },
      ],
    },
  },
})

export const Sizes = meta.story({
  args: {
    containerClassName: css({ h: '32', w: '52' }),
    listClassName: css({ '--cell-size': '4rem' }),
  },
  parameters: {
    tableDecorator: {
      cols: sizes,
      rows: [
        {
          items: [
            scrollArea({ size: sizes[0], variant: 'always' }),
            scrollArea({ size: sizes[1], variant: 'always' }),
            scrollArea({ size: sizes[2], variant: 'always' }),
            scrollArea({ size: sizes[3], variant: 'always' }),
          ] satisfies Args[],
        },
      ],
    },
  },
})

const shadowStyles = scrollArea({ hasShadow: true })
export const Shadow = meta.story({
  args: {
    containerClassName: css({ h: '[300px]', w: '[450px]' }),
    listClassName: css({ '--cell-size': '2.5rem' }),
  },
  parameters: {
    tableDecorator: {
      cols: ['default', 'custom by CSS variables'],
      rows: [
        {
          items: [
            shadowStyles,
            {
              ...shadowStyles,
              viewport: cx(
                shadowStyles.viewport,
                css({ '--shadow-color': 'colors.fg.muted', '--shadow-size': '40px' }),
              ),
            },
          ] satisfies Args[],
        },
      ],
    },
  },
})

export const Virtualization = Basic.extend({
  render: ({ root, viewport, scrollbar, thumb, containerClassName }: Args) => {
    const scrollRef = useRef<HTMLDivElement | null>(null)

    const rows = useVirtualizer({
      count: 1000,
      estimateSize: () => 128,
      gap: 4,
      getScrollElement: () => scrollRef.current,
    })

    const columns = useVirtualizer({ ...rows.options, count: 20, horizontal: true })

    return (
      <div className={containerClassName}>
        <ScrollArea.Root className={root}>
          <ScrollArea.Viewport className={viewport} ref={scrollRef}>
            <ScrollArea.Content>
              <ul
                style={{ height: `${rows.getTotalSize()}px`, width: `${columns.getTotalSize()}px` }}
                className={css({ listStyle: 'none', position: 'relative' })}
              >
                {rows.getVirtualItems().flatMap((row) =>
                  columns.getVirtualItems().map((col) => (
                    <li
                      key={`${row.key}-${col.key}`}
                      style={{
                        height: `${row.size}px`,
                        transform: `translate(${col.start}px, ${row.start}px)`,
                        width: `${col.size}px`,
                      }}
                      className={css({
                        alignItems: 'center',
                        bg: 'gray.muted',
                        borderRadius: 'sm',
                        color: 'gray.solid',
                        display: 'flex',
                        insetInline: '0',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: '0',
                      })}
                    >
                      {row.index * columns.options.count + col.index + 1}
                    </li>
                  )),
                )}
              </ul>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className={scrollbar}>
            <ScrollArea.Thumb className={thumb} />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar className={scrollbar} orientation="horizontal">
            <ScrollArea.Thumb className={thumb} />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      </div>
    )
  },
})
