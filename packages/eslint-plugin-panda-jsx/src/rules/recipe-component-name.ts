import type { Rule } from 'eslint'

type CallExpressionNode = Extract<Rule.Node, { type: 'CallExpression' }>
const getRecipeName = (
  node: CallExpressionNode,
  sourceCode: Rule.RuleContext['sourceCode'],
  targetImportPath: string,
) => {
  if (node.callee.type !== 'Identifier') return null

  const scope = sourceCode.getScope(node)
  const reference = scope.references.find((ref) => ref.identifier === node.callee)
  const variable = reference?.resolved
  if (!variable) return null

  const def = variable.defs[0]
  if (!def || def.type !== 'ImportBinding') return null

  const importDecl = def.parent
  const isImportRecipe =
    typeof importDecl.source.value === 'string' &&
    importDecl.source.value.includes(targetImportPath)
  if (!isImportRecipe) return null

  return node.callee.name
}

type NodeArg = CallExpressionNode['arguments'][number]
type PropertyOrSpreadEle = Extract<NodeArg, { type: 'ObjectExpression' }>['properties'][number]
type PropertyValue = Extract<PropertyOrSpreadEle, { type: 'Property' }>['value']
const isDynamicArg = (arg: NodeArg | PropertyOrSpreadEle | PropertyValue): boolean => {
  if (arg.type === 'Literal') {
    return false
  }
  if (arg.type === 'TemplateLiteral') {
    return arg.expressions.length > 0
  }
  if (arg.type === 'ConditionalExpression') {
    return isDynamicArg(arg.consequent) || isDynamicArg(arg.alternate)
  }
  if (arg.type === 'ObjectExpression') {
    return arg.properties.some(isDynamicArg)
  }
  if (arg.type === 'Property') {
    return isDynamicArg(arg.value)
  }
  if (arg.type === 'LogicalExpression') {
    return isDynamicArg(arg.right)
  }

  return true
}

const isComponentName = (name: string) => /^[A-Z]/.test(name)

export const recipeComponentName: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce component naming conventions for Panda CSS recipes to enable JSX auto-tracking.',
      url: 'https://github.com/Yama-Tomo/web-app-tools/blob/main/packages/eslint-plugin-panda-jsx/docs/rules/recipe-component-name.md',
    },
    schema: [
      {
        type: 'object',
        properties: {
          importPath: { type: 'string' },
          allowList: {
            type: 'object',
            additionalProperties: { type: 'array', items: { type: 'string' } },
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      mismatch:
        "To prevent Panda CSS from purging styles, the component using the '{{recipeName}}' recipe must be named '{{expectedName}}'. Current name: '{{actualName}}'.",
    },
  },
  create(context) {
    const options = context.options[0] || {}
    const allowList: Partial<Record<string, string[]>> = { ...options.allowList }
    const targetImportPath = options.importPath
      ? String(options.importPath)
      : 'styled-system/recipes'

    return {
      CallExpression(node) {
        const recipeName = getRecipeName(node, context.sourceCode, targetImportPath)
        if (!recipeName) return

        const nodeArg = node.arguments.at(0)
        if (!nodeArg || !isDynamicArg(nodeArg)) return

        const expectedName = recipeName.charAt(0).toUpperCase() + recipeName.slice(1)
        const allowedNames = [expectedName, ...(allowList[recipeName] || [])]
        // Fallback when we cannot statically determine a component name
        let actualName = '(unknown component name)'

        let currentNode: typeof node.parent | null = node.parent
        // If this call expression is directly assigned to a variable
        // (e.g. `const className = button(...)`), that variable is just
        // a local binding for the recipe result and not a component name.
        // Start climbing from its parent instead.
        if (currentNode?.type === 'VariableDeclarator' && currentNode.init === node) {
          currentNode = currentNode.parent
        }

        while (currentNode) {
          if (
            (currentNode.type === 'VariableDeclarator' ||
              currentNode.type === 'FunctionDeclaration') &&
            currentNode.id.type === 'Identifier'
          ) {
            actualName = currentNode.id.name
            if (isComponentName(actualName)) break
          }

          currentNode = currentNode.parent
        }

        const isMatch = allowedNames.some((allowed) => actualName === allowed)
        if (!isMatch) {
          const data = { recipeName, expectedName, actualName }
          context.report({ node, messageId: 'mismatch', data })
        }
      },
    }
  },
}
