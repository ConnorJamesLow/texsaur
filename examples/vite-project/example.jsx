/**
 * @param {{ onClick: (ev: MouseEvent) => any}} param0 
 * @param {...} children 
 * @returns {HTMLElement}
 */
const Example = ({ onClick }, ...children) => (
    <div class="example" onclick={onClick}>{children}</div>
);

const div = <div>Hello there.</div>;

/** @type {HTMLElement} */
const element = <main>
    {div}
    <Example onClick={() => alert('clicked!')}>
        Hello from inside the Example component!
    </Example>
</main>;

export default element;
