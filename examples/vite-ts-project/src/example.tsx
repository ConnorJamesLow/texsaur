import jsx from 'texsaur';
import { Counter } from './counter';
import svgTest from './svg-test';

interface ExampleProps {
    onClick(ev: MouseEvent): any
}

const Example: JSX.Component<ExampleProps> = ({ onClick }, children) => (
    <div class="example" onclick={onClick} aria-label="Example">{children}</div>
);


const div = <div>Hello there.</div> as HTMLElement;
const span = <span>Hello from inside the Example component!</span>;
const content = <>
    {div}
    <Example onClick={() => alert('clicked!')}>
        {span}
    </Example>
    <Example onClick={() => console.log(svgTest)}>
        {svgTest}
    </Example>
    <Counter />
</> as any as HTMLElement[];


export default <main>{content}</main>;
