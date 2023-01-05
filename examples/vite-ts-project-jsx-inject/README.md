# Sample Project - Vite | Typescript | Injected JSX Imports
This project demonstrates how to configure vite to support the .tsx file type with texsaur. This project also demonstrates how to configure vite to automatically inject the required `import jsx from 'texsaur'` line.

For more information general TypeScript configuration in vite for Texsaur, see the [vite-ts-project](../vite-ts-project).

## Injected JSX Imports
You will need to make the following changes in order to omit the `import jsx from 'texsaur'` line in every `.tsx` or `.jsx` file.

### Types
In any global ambient type file (`.d.ts`), add the following reference:

```typescript
/// <reference types="texsaur">
```

### Vite
Update **vite.config.js** so that in contains the following configuration:

```javascript
export default {
    esbuild: {
        jsxInject: `import jsx from 'texsaur'`
    }
}
```
