import jsx from "texsaur";

export const Counter: JSX.Component = () => {
    let clicks = 0;
    const getMessage = () => `I have been clicked ${clicks} time${clicks++ === 1 ? '' : 's'}.`;

    let display: any;
    return (
        <div class="counter">
            <button onclick={() => display.innerHTML = getMessage()}>
                <span ref={r => display = r}>{getMessage()}</span>
            </button>
        </div>
    );
}
