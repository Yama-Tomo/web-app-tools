# Enforce component naming conventions for Panda CSS recipes (`panda-jsx/recipe-component-name`)

Panda CSS features an intelligent [JSX auto-tracking system](https://panda-css.com/docs/concepts/recipes#usage-in-jsx-1). It allows the Panda compiler to automatically extract and generate styles based on the usage of your recipe functions.

However, for this auto-tracking to work when passing **dynamic properties**, Panda requires the React component using the recipe to have **the exact same name** (in PascalCase) as the recipe function itself.

If the names do not match, or if you use dot notation (e.g., `Component.Button`), Panda CSS will fail to track the dynamic values. As a result, the necessary CSS classes will **not be generated**, and the styles will not be applied.

This rule enforces that strict naming convention, preventing silently missing styles while eliminating the need to manually maintain the `jsx: [...]` array in your `panda.config.ts`.

---

## Rule Details

This rule analyzes the Abstract Syntax Tree (AST) to ensure that anytime a Panda CSS recipe is called with **dynamic arguments**, the enclosing React component name exactly matches the capitalized version of the recipe name.

**(Note: If the arguments passed to the recipe are purely static (e.g., `button({ variant: 'solid' })`), Panda CSS can extract them statically without JSX tracking. In such cases, this rule will smartly skip the check and allow any component name.)**

### ❌ Incorrect Code

```tsx
import { button } from 'styled-system/recipes';

// ❌ Mismatched name: The recipe 'button' is used, but the component is named 'Card'.
const Card = ({ customVariant }) => {
  const className = button({ variant: customVariant });
  return <button className={className}>Click me</button>;
};

// ❌ Anonymous default exports cannot be tracked by Panda CSS.
export default (props) => {
  const className = button(props);
  return <button className={className}>Click me</button>;
};

// ❌ Dot notation (MemberExpression) is NOT tracked by Panda CSS.
// Even if it ends with 'Button', Panda's compiler will fail to extract dynamic styles.
const Component = {
  Button(props) {
    const className = button(props);
    return <button className={className}>Click me</button>;
  }
};

// ❌ Called outside of a React functional component.
const helperFunction = (props) => {
  return button(props);
};
```

### ✅ Correct Code

```tsx
import { button } from 'styled-system/recipes';

// ✅ The recipe 'button' is used directly inside a component named 'Button'.
const Button = (props) => {
  const className = button(props);
  return <button className={className}>Click me</button>;
};

// ✅ Purely static usage is always allowed, regardless of the component name.
// (Panda CSS's static extractor can handle this without JSX tracking).
const UnrelatedComponent = () => {
  const className = button({ variant: 'solid' }); 
  return <button className={className}>Click me</button>;
};
```

---

## Options

This rule accepts an options object with the following properties:

```json
{
  "rules": {
    "panda-jsx/recipe-component-name": ["error", {
      "importPath": "styled-system/recipes",
      "allowList": {
        "button": ["SubmitBtn", "CancelBtn"]
      }
    }]
  }
}
```

### `importPath` (string)
**Default:** `"styled-system/recipes"`

By default, the rule looks for imports coming from `styled-system/recipes`. If you have configured a custom `outDir` in your `panda.config.ts` (or are using a path alias like `@/panda`), you can specify it here.

```json
{
  "importPath": "@/panda/recipes"
}
```

### `allowList` (object)
**Default:** `{}`

If you have specific components that must wrap a recipe but cannot follow the exact naming convention, you can explicitly allow them here. The keys are the recipe names, and the values are arrays of allowed component names.

```json
{
  "allowList": {
    "button": ["SubmitBtn", "IconButton"]
  }
}
```

---

## When Not To Use It

If you prefer to manually configure the `jsx: ['Button', 'Card', ...]` array in your `panda.config.ts` for every component and do not want to enforce a strict naming convention in your codebase, you can disable this rule.
