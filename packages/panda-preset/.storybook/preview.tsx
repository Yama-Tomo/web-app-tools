import './app.css'

import { default as addonThemes, withThemeByClassName } from '@storybook/addon-themes'
import { type Decorator, definePreview } from '@storybook/react-vite'

import { css } from '#panda/css'

const TableDecorator: Decorator = (Story, { args, parameters: { tableDecorator } }) => {
  if (tableDecorator) {
    return (
      <table
        className={css({ '& td:not(:first-child),th:not(:first-child)': { pb: '4', pr: '4' } })}
      >
        <thead>
          <tr className={css({ _empty: { display: 'none' } })}>
            {tableDecorator.cols?.length && <td />}
            {tableDecorator.cols?.map((col) => (
              <td key={col}>{col}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableDecorator.rows.map((row, rowIdx) => (
            <tr key={`${row.name}-${rowIdx}`}>
              <th className={row.name && css({ fontWeight: 'normal', pb: '4', pr: '6' })}>
                {row.name}
              </th>
              {row.items.map((item, colIdx) => (
                <td key={`${item.name}-${colIdx}`}>
                  <Story args={{ ...args, ...item }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return <Story />
}

export default definePreview({
  addons: [addonThemes()],
  decorators: [
    TableDecorator,
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  argTypes: {
    root: { table: { disable: true } },
    control: { table: { disable: true } },
    label: { table: { disable: true } },
    input: { table: { disable: true } },
    group: { table: { disable: true } },
    value: { table: { disable: true } },
    triggerGroup: { table: { disable: true } },
    trigger: { table: { disable: true } },
    popup: { table: { disable: true } },
    positioner: { table: { disable: true } },
    indicator: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
})
