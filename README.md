# 🦖 Texsaur
A simple jsx to DOM `Node` parser.  

[![View npm package](https://img.shields.io/npm/v/texsaur.svg?style=for-the-badge&color=blueviolet)](https://www.npmjs.com/package/texsaur)

## 🚀 Usage
To create a DOM element in JavaScript, we *could* use `document.createElement`:

```ts
const div = document.createElement('div');
div.classList.add('example');
div.innerText = 'hello there';
div.addEventListener('click', () => console.log('clicked!'));
```

*Texsaur* lets you do this with jsx instead:

```tsx
import jsx from 'texsaur';

const div = (
  <div class="example" 
       onclick={() => console.log('clicked!')}>
    Hello there
  </div>
) as HTMLElement;
```

[Here's a playground](https://www.typescriptlang.org/play?target=2&module=1#code/PQKgsAUABCUAICsDOAPKyWRsSkCWAtgA4D2ATgC7qpQBmZJBUA5BQKYpICGArmcwG5cEWjwB2AYwp4SYqACU2E8gBMAFAG8o7FFQC+ALihadFI0gpk8YgOZQ9ASmNYorsmwp85AHiREuYgB8GqZ63sB+AYFCEHrCymIWUABGPBQUslAAvFBqLq7eqemZshIANngSANZZGmpOWYFQDCQUAHRcRERsYioAwgAWeGXq3orKZCraHBRZAER9FdVsUxQDbFAAQmkZYm1zUMCBDnqB+a4X28Vi5+FFu2cQDvGySS1UOXnQF94EXNaPC5A4z3WRxb4FYB-AGQZ4QSAqEgSHgEHrtZIkFQATw6XR6-SGIzU7wcAiAA).


### ♻️ Resuability
You can create a reusable component by creating a function:

```tsx
function Header({ title }: { title: string }) {
  return <header>
    <h1>{title}</h1>
  </header>
}

document.body.appendChild(
  <div>
    <Header title="Hello there" />
    {/* Same as */}
    {Header({ title: 'Hello there.' })}
  </div>
)
```

To work with JSX, the function must implement `Component`:

```ts
interface Component {
  (properties?: { [key: string]: any }, children?: Node | Node[]): Element
}
```

## 📦 Bundlers
JSX requires a compiler/bundler. Here are a few example set-ups (note: checkout the examples/ directory for corresponding sample projects):

### ⚡ Vite

In `vite.config.js`, add the `esbuild.jsx` property:

```js
export default {
  esbuild: {
    jsxFactory: 'jsx',
    jsxFragment: 'jsx.Fragment', // optional - enables fragments (<></>)
  }
}
```

_However_, if your project contains a tsconfig, vite should read these properties from there as of version 4 - no vite configuration required!

**Examples**:

 - [TypeScript](//github.com/ConnorJamesLow/texsaur/tree/main/examples/vite-ts-project)
 - [JavaScript](//github.com/ConnorJamesLow/texsaur/tree/main/examples/vite-project)

### 🛠️ Webpack

To use Texsaur with Webpack, add the following to your `webpack.config.js` and `tsconfig.json`:

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      { test: /tsx?$/, loader: 'ts-loader' },
      // ...
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    extensionAlias: { '.js': ['.js', '.ts'] }
  },
  // ...
};
```

```jsonc
// tsconfig.json
"compilerOptions": {
  "jsx": "react-jsx",
  "jsxImportSource": "texsaur",
  // ...
}
```

Then use JSX as normal:

```tsx
// src/index.ts
import { content } from './example';
document.body.appendChild(content);
```

See [`examples/webpack-ts-project`](./examples/webpack-ts-project) for a full setup.

## 💙 Typescript Usage
Texsaur supports a few models of JSX code generation (determined the `jsx` property in your tsconfig):
- `"react"`,
- `"react-jsx"`,
- and `"preserve"`.

The differences between these are outlined in the following sections.

### Method 1: `"jsx": "react"`
First, configure your `tsconfig.json`:

```jsonc
"compilerOptions": {
  "jsx": "react",
  "jsxFactory": "jsx", 
  "jsxFragmentFactory": "jsx.Fragment" // optional - enables fragments (<></>)
}
```

Then, import _Texsaur_ in any **.tsx** file:

```tsx
import jsx from 'texsaur'

const div = <div>Hello there.</div>
```

### Method 2: `"jsx": "react-jsx"`
This method comes with a few more quirks, but it allows you to drop the `import jsx` statements in your `tsx` files.  

In your `tsconfig.json`:

```jsonc
"compilerOptions": {
  "moduleResolution": "node16", // or nodenext
  "jsx": "react-jsx",
  "jsxImportSource": "texsaur"
}
```

By using `node16` module resolution, your package will be able to take advantage of the `exports` field in texsaur's package.json. However, this requires you use the file suffix in imports:

```tsx
import Foo from './components/foo'

// becomes

import Foo from './components/foo.js' // .js even if it's .tsx or .ts
```

### Method 3: `"jsx": "preserve"`
Please note that this repository does not contain any examples of this, nor have we tested it. In theory, this should work.  

Configure your `tsconfig.json`:

```jsonc
"compilerOptions": {
  "jsx": "preserve",
}
```

This will output the jsx code as-is. You will need another bundler/compiler (e.g. babel) to transform it before it can be used in a browser.


### Declare Custom Elements

Add custom elements to the [`JSX.IntrinsicElements`](https://www.typescriptlang.org/docs/handbook/jsx.html#intrinsic-elements) interface:

```ts
namespace JSX {
  interface IntrinsicElements {
    ['my-element']: HTMLElement // or another type representing your custom element
  }
 }
```
