# Texsaur
A simple jsx to DOM `Node` parser.  



## Usage
To create an element in js, we *could* use `document.createElement`:

```ts
const div = document.createElement('div');
div.classList.add('example');
div.innerText = 'hello there';
div.addEventListener('click', () => console.log('clicked!'));
```

*Texsaur* lets you do this with jsx instead:

```tsx
import jsx from 'texsaur';

const div: HTMLElement = <div class="example" onclick={() => console.log('clicked!')}>Hello there</div>;
```


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
    {Header({title: 'Hello there' })}
  </div>
)
```

To work with JSX, the function must implement `Component`:

```ts
interface Component {
  (properties?: { [key: string]: any }, children?: Node[]): Node
}
```

## Getting Started
JSX requires a compiler/bundler.  


### Via a Bundler
You will need to install a bundler like [Babel](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#options) or [Vite](https://vitejs.dev/guide/features.html#jsx).  

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
