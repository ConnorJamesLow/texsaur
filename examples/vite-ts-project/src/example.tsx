import jsx from 'texsaur';

interface ExampleProps {
    onClick(ev: MouseEvent): any
}

const Example: JSX.Component<ExampleProps> = ({ onClick }, children) => (
    <div class="example" onclick={onClick}>{children}</div>
);

const div = <div>Hello there.</div> as HTMLElement;
const content = <>
    {div}
    <Example onClick={() => alert('clicked!')}>
        Hello from inside the Example component!
    </Example>
</> as any as HTMLElement[];

export default <main>{content}</main>;
