import { Counter } from './counter.js';
import svgTest from './svg-test.js';

interface ExampleProps {
    onClick(ev: MouseEvent): any
}

const Example: JSX.Component<ExampleProps> = ({ onClick }, children) => (
    <div class="example" onclick={onClick} aria-label="Example">{children}</div>
);


const div = <div>Hello there.</div> as HTMLElement;
const spanElement = <span>Hello from inside the Example component!</span>;
const content = <>
    {div}
    <Example onClick={() => alert('clicked!')}>
        {spanElement}
    </Example>
    <Example onClick={() => console.log(svgTest)}>
        {svgTest}
    </Example>
    <Counter />
</> as any as HTMLElement[];


export default <main>{content}</main>;
