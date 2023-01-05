# Sample Project - Vite | Typescript
This project demonstrates how to configure vite to support the .tsx file type with texsaur. 

## Typescript
First, configure your `tsconfig.json`:

```jsonc
"compilerOptions": {
  "jsx": "preserve", // also works with "react"
  "jsxFactory": "jsx", 
  "jsxFragmentFactory": "jsx.Fragment" // optional - enables fragments (<></>)
}
```

## Vite
In `vite.config.js`, add the `esbuild.jsx` property:

```js
/** @type {import('vite').UserConfig} */ // <-- not required, but helpful
export default {
  esbuild: {
    jsxFactory: 'jsx',
    jsxFragment: 'jsx.Fragment', // optional - enables fragments (<></>)
  }
}
```
