# Texsaur
A simple jsx to DOM `Node` parser.  

## Overview
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

Functional components are supported too:

```tsx
const Example = ({ onClick }, children) => (
    <div class="example" onclick={onClick}>{children}</div>
);

const div = <Example onClick={() => console.log('clicked!')}>Hello there</Example>;
```

[Here's a playground](https://www.typescriptlang.org/play?target=2&module=1#code/PQKgsAUABCUAICsDOAPKyWRsSkCWAtgA4D2ATgC7qpQBmZJBUA5BQKYpICGArmcwG5cEWjwB2AYwp4SYqACU2E8gBMAFAG8o7FFQC+ALihadFI0gpk8YgOZQ9ASmNYorsmwp85AHiREuYgB8GqZ63sB+AYFCEHrCymIWUABGPBQUslAAvFBqLq7eqemZshIANngSANZZGmpOWYFQDCQUAHRcRERsYioAwgAWeGXq3orKZCraHBRZAER9FdVsUxQDbFAAQmkZYm1zUMCBDnqB+a4X28Vi5+FFu2cQDvGySS1UOXnQF94EXNaPC5A4z3WRxb4FYB-AGQZ4QSAqEgSHgEHrtZIkFQATw6XR6-SGIzU7wcAiAA).


## Documentation
Want help getting started? [Check out the GitHub repository](https://github.com/ConnorJamesLow/texsaur).
