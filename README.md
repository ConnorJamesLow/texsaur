# Texsaur
A simple jsx to `Node` parser.  



## Example
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



## Installation/Usage
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
