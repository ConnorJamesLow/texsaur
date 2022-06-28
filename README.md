# Texsaur
A simple jsx to DOM `Node` parser.  

[![View npm package](https://img.shields.io/npm/v/texsaur.svg?style=for-the-badge&color=blueviolet)](https://www.npmjs.com/package/texsaur)

## Usage
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


### Resuability
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
    {Header({ title: 'Hello there' })}
  </div>
)
```

To work with JSX, the function must implement `Component`:

```ts
interface Component {
  (properties?: { [key: string]: any }, children?: Node | Node[]): Element
}
```

## Getting Started
JSX requires a compiler/bundler.  


### Via a Bundler
You will need to install a bundler like [Babel](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) or [Vite](https://vitejs.dev/guide/features.html#jsx).  

For example, in Vite, add the `esbuild.jsx` property:

```js
export default {
  esbuild: {
    jsxFactory: 'jsx',
  }
}
```


### For Typescript Users
First, configure your tsconfig:

```jsonc
"compilerOptions": {
  "jsx": "react",
  "jsxFactory": "jsx", 
}
```

Then, import _Texsaur_ in any **.tsx** file:

```tsx
import jsx from 'texsaur';
```
