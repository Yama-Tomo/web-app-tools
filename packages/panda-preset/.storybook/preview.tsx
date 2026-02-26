import './app.css'

import { default as addonThemes, withThemeByClassName } from '@storybook/addon-themes'
import { type Decorator, definePreview } from '@storybook/react-vite'

import { css, cx } from '#panda/css'

const TableDecorator: Decorator = (Story, { args, parameters: { tableDecorator } }) => {
  if (tableDecorator) {
    return (
      <table
        className={cx(
          css({
            '& th:first-child': { display: 'none' },
            '& th, td': { pr: '4', pb: '4' },
            '&:has(th:first-child:not(:empty))': {
              '& th:first-child': { display: 'unset' },
            },
          }),
        )}
      >
        <thead>
          <tr>
            <th scope="col" />
            {tableDecorator.cols?.map((col) => (
              <th key={col} scope="col">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableDecorator.rows.map((row, rowIdx) => (
            <tr key={`${row.name}-${rowIdx}`}>
              <th scope="row">{row.name}</th>
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
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  argTypes: {
    root: { table: { disable: true } },
    viewport: { table: { disable: true } },
    scrollbar: { table: { disable: true } },
    thumb: { table: { disable: true } },
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
    itemIndicator: { table: { disable: true } },
    className: { table: { disable: true } },
    groupLabel: { table: { disable: true } },
    separator: { table: { disable: true } },
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
