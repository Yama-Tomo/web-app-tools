import { RuleTester } from '@typescript-eslint/rule-tester'
import { afterAll, describe, it } from 'vitest'

import { recipeComponentName } from './recipe-component-name.ts'

RuleTester.afterAll = afterAll
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: {
    parser: require('@typescript-eslint/parser'),
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
})

ruleTester.run(
  'recipe-component-name',
  recipeComponentName as unknown as Parameters<typeof ruleTester.run>[1],
  {
    valid: [
      // ==========================================
      // 1. Basic Component Naming & applicability
      // ==========================================
      {
        name: 'Basic: component name matches recipe name exactly',
        code: `
          import { button } from 'styled-system/recipes';
          const Button = (props) => {
            const className = button(props);
            return <button className={className} />;
          }
        `,
      },
      {
        name: 'Basic: function declaration with correct component name is valid',
        code: `
          import { button } from 'styled-system/recipes';
          function Button(props) {
            const className = button(props);
            return <button className={className} />;
          }
        `,
      },
      {
        name: 'Basic: unrelated import is ignored',
        code: `
          import { button } from 'other-library';
          const Card = (props) => {
            const className = button(props);
            return <div className={className} />;
          }
        `,
      },
      {
        name: 'Basic: locally defined function with same name as recipe is ignored',
        code: `
          const button = (props) => props.variant;
          const Card = (props) => {
            const className = button(props);
            return <div className={className} />;
          }
        `,
      },
      {
        name: 'Basic: default export via named component is respected',
        code: `
          import { button } from 'styled-system/recipes';
          const Button = (props) => {
            const className = button(props);
            return <button className={className} />;
          };
          export default Button;
        `,
      },
      {
        name: 'Basic: inner component with correct name is valid even inside another function',
        code: `
          import { button } from 'styled-system/recipes';
          const helper = () => {
            const Button = (props) => {
              const className = button(props);
              return <button className={className} />;
            };
            return Button;
          }
        `,
      },
      {
        name: 'Basic: component name is found by climbing past an intermediate lowercase VariableDeclarator',
        code: `
          import { button } from 'styled-system/recipes';
          const Button = () => {
            const inner = () => button(props);
            return inner();
          }
        `,
      },
      {
        name: 'Basic: destructured VariableDeclarator is skipped and outer component name is used',
        code: `
          import { button } from 'styled-system/recipes';
          const Button = (props) => {
            const { variant } = props;
            const className = button({ variant });
            return <button className={className} />;
          }
        `,
      },
      // ==========================================
      // 2. Options: allowList / importPath
      // ==========================================
      {
        name: 'Options: allowList accepts configured alternative names',
        code: `
          import { button } from 'styled-system/recipes';
          const SubmitBtn = (props) => {
            const className = button(props);
            return <button className={className} />;
          }
        `,
        options: [{ allowList: { button: ['SubmitBtn', 'CancelBtn'] } }],
      },
      {
        name: 'Options: allowList still allows the default expected name',
        code: `
        import { button } from 'styled-system/recipes';
        const Button = (props) => {
          const className = button(props);
          return <button className={className} />;
        }
      `,
        options: [{ allowList: { button: ['SubmitBtn'] } }],
      },
      {
        name: 'Options: importPath custom path matches and component name is correct',
        code: `
          import { button } from '@/panda/recipes';
          const Button = (props) => {
            const className = button(props);
            return <button className={className} />;
          }
        `,
        options: [{ importPath: '@/panda/recipes' }],
      },
      {
        name: 'Options: importPath custom path does not match default path so rule is not applied',
        code: `
          import { button } from '@/panda/recipes';
          const Card = (props) => {
            const className = button(props);
            return <div className={className} />;
          }
        `,
      },
      // ==========================================
      // 3. Static Extraction
      // -> If static, component name DOES NOT matter.
      // ==========================================
      {
        name: 'Static: pure literal object ignores component name mismatch',
        code: `
          import { button } from 'styled-system/recipes';
          const UnrelatedComponent = () => {
            const className = button({ variant: 'solid', size: 'lg' }); 
            return <div className={className} />;
          }
        `,
      },
      {
        name: 'Static: template literal without variables is treated as static',
        code: `
          import { button } from 'styled-system/recipes';
          const UnrelatedComponent = () => {
            const className = button({ variant: \`solid\` }); 
            return <div className={className} />;
          }
        `,
      },
      {
        name: 'Static: ternary operator with purely static outcomes is allowed',
        code: `
          import { button } from 'styled-system/recipes';
          const UnrelatedComponent = ({ isHovered }) => {
            const className = button({ variant: isHovered ? 'solid' : 'outline' }); 
            return <div className={className} />;
          }
        `,
      },
      {
        name: 'Static: logical operator (&&) with purely static outcome is allowed',
        code: `
          import { button } from 'styled-system/recipes';
          const UnrelatedComponent = ({ isHovered }) => {
            const className = button({ variant: isHovered && 'solid' }); 
            return <div className={className} />;
          }
        `,
      },
      {
        name: 'Static: nested object with all static values is treated as static',
        code: `
          import { button } from 'styled-system/recipes';
          const UnrelatedComponent = () => {
            const className = button({ container: { size: 'lg' } });
            return <div className={className} />;
          }
        `,
      },
      {
        name: 'Static: no arguments (zero-arg call) is treated as static and ignored',
        code: `
          import { button } from 'styled-system/recipes';
          const UnrelatedComponent = () => {
            const className = button();
            return <div className={className} />;
          }
        `,
      },
    ],
    invalid: [
      // ==========================================
      // 1. Basic mismatches & unsupported patterns
      // ==========================================
      {
        name: 'Mismatch: component name differs from expected recipe component name',
        code: `
          import { button } from 'styled-system/recipes';
          const Card = (props) => {
            const className = button(props);
            return <div className={className} />;
          }
        `,
        errors: [
          {
            messageId: 'mismatch',
            data: { recipeName: 'button', expectedName: 'Button', actualName: 'Card' },
          },
        ],
      },
      {
        name: 'Mismatch: dot notation (MemberExpression) is not supported by JSX tracking',
        code: `
          import { button } from 'styled-system/recipes';
          const Component = {
            Button(props) {
              const className = button(props);
              return <button className={className} />;
            }
          }
        `,
        errors: [
          {
            messageId: 'mismatch',
            data: { recipeName: 'button', expectedName: 'Button', actualName: 'Component' },
          },
        ],
      },
      {
        name: 'Mismatch: called inside a non-component function (lowercase name)',
        code: `
          import { button } from 'styled-system/recipes';
          const helperFunction = (props) => {
            const className = button(props);
          }
        `,
        errors: [
          {
            messageId: 'mismatch',
            data: {
              recipeName: 'button',
              expectedName: 'Button',
              actualName: 'helperFunction',
            },
          },
        ],
      },
      {
        name: 'Mismatch: anonymous default export cannot be tracked as a component',
        code: `
          import { button } from 'styled-system/recipes';
          export default (props) => {
            const className = button(props);
            return <button className={className} />;
          };
        `,
        errors: [
          {
            messageId: 'mismatch',
            data: {
              recipeName: 'button',
              expectedName: 'Button',
              actualName: '(unknown component name)',
            },
          },
        ],
      },
      {
        name: 'Mismatch: function declaration with wrong component name is invalid',
        code: `
          import { button } from 'styled-system/recipes';
          function helperFunction(props) {
            const className = button(props);
            return <button className={className} />;
          }
        `,
        errors: [
          {
            messageId: 'mismatch',
            data: {
              recipeName: 'button',
              expectedName: 'Button',
              actualName: 'helperFunction',
            },
          },
        ],
      },
      // ==========================================
      // 2. Options: allowList / importPath failures
      // ==========================================
      {
        name: 'Options: component name not listed in allowList fails',
        code: `
          import { button } from 'styled-system/recipes';
          const OtherBtn = (props) => {
            const className = button(props);
            return <button className={className} />;
          }
        `,
        options: [{ allowList: { button: ['SubmitBtn'] } }],
        errors: [
          {
            messageId: 'mismatch',
            data: { recipeName: 'button', expectedName: 'Button', actualName: 'OtherBtn' },
          },
        ],
      },
      {
        name: 'Options: importPath custom path matches and component name is wrong',
        code: `
          import { button } from '@/panda/recipes';
          const Card = (props) => {
            const className = button(props);
            return <div className={className} />;
          }
        `,
        options: [{ importPath: '@/panda/recipes' }],
        errors: [
          {
            messageId: 'mismatch',
            data: { recipeName: 'button', expectedName: 'Button', actualName: 'Card' },
          },
        ],
      },
      // ==========================================
      // 3. Dynamic Tracking Requirement
      // -> If dynamic, component name MUST match.
      // ==========================================
      {
        name: 'Dynamic: template literal with variables requires JSX tracking',
        code: `
          import { button } from 'styled-system/recipes';
          const UnrelatedComponent = ({ color }) => {
            const className = button({ variant: \`solid-\${color}\` });
            return <div className={className} />;
          }
        `,
        errors: [
          {
            messageId: 'mismatch',
            data: {
              recipeName: 'button',
              expectedName: 'Button',
              actualName: 'UnrelatedComponent',
            },
          },
        ],
      },
      {
        name: 'Dynamic: object spread with incoming props requires JSX tracking',
        code: `
          import { button } from 'styled-system/recipes';
          const UnrelatedComponent = (props) => {
            const className = button({ ...props, size: 'lg' });
            return <div className={className} />;
          }
        `,
        errors: [
          {
            messageId: 'mismatch',
            data: {
              recipeName: 'button',
              expectedName: 'Button',
              actualName: 'UnrelatedComponent',
            },
          },
        ],
      },
      {
        name: 'Dynamic: ternary operator with a dynamic branch requires JSX tracking',
        code: `
          import { button } from 'styled-system/recipes';
          const UnrelatedComponent = ({ isHovered, customVar }) => {
            const className = button({ variant: isHovered ? customVar : 'outline' });
            return <div className={className} />;
          }
        `,
        errors: [
          {
            messageId: 'mismatch',
            data: {
              recipeName: 'button',
              expectedName: 'Button',
              actualName: 'UnrelatedComponent',
            },
          },
        ],
      },
      {
        name: 'Dynamic: ternary operator with dynamic consequent requires JSX tracking',
        code: `
          import { button } from 'styled-system/recipes';
          const UnrelatedComponent = ({ isHovered, customVar }) => {
            const className = button({ variant: isHovered ? 'solid' : customVar });
            return <div className={className} />;
          }
        `,
        errors: [
          {
            messageId: 'mismatch',
            data: {
              recipeName: 'button',
              expectedName: 'Button',
              actualName: 'UnrelatedComponent',
            },
          },
        ],
      },
      {
        name: 'Dynamic: logical operator (&&) with dynamic right side requires JSX tracking',
        code: `
          import { button } from 'styled-system/recipes';
          const UnrelatedComponent = ({ isHovered, customVar }) => {
            const className = button({ variant: isHovered && customVar });
            return <div className={className} />;
          }
        `,
        errors: [
          {
            messageId: 'mismatch',
            data: {
              recipeName: 'button',
              expectedName: 'Button',
              actualName: 'UnrelatedComponent',
            },
          },
        ],
      },
      {
        name: 'Dynamic: nested object with dynamic value requires JSX tracking',
        code: `
          import { button } from 'styled-system/recipes';
          const UnrelatedComponent = ({ mySize }) => {
            const className = button({ container: { size: mySize } });
            return <div className={className} />;
          }
        `,
        errors: [
          {
            messageId: 'mismatch',
            data: {
              recipeName: 'button',
              expectedName: 'Button',
              actualName: 'UnrelatedComponent',
            },
          },
        ],
      },
      {
        name: 'Dynamic: variable used as a property value requires JSX tracking',
        code: `
          import { button } from 'styled-system/recipes';
          const UnrelatedComponent = ({ mySize }) => {
            const className = button({ size: mySize });
            return <div className={className} />;
          }
        `,
        errors: [
          {
            messageId: 'mismatch',
            data: {
              recipeName: 'button',
              expectedName: 'Button',
              actualName: 'UnrelatedComponent',
            },
          },
        ],
      },
      {
        name: 'Dynamic: function call result passed as a property requires JSX tracking',
        code: `
          import { button } from 'styled-system/recipes';
          const getVariant = () => 'solid';
          const UnrelatedComponent = () => {
            const className = button({ variant: getVariant() });
            return <div className={className} />;
          }
        `,
        errors: [
          {
            messageId: 'mismatch',
            data: {
              recipeName: 'button',
              expectedName: 'Button',
              actualName: 'UnrelatedComponent',
            },
          },
        ],
      },
    ],
  },
)
