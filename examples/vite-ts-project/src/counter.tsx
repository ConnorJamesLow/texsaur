import jsx from 'texsaur';

export const Counter: JSX.Component = () => {
    let clicks = 0;
    const getMessage = () => `I have been clicked ${clicks} time${clicks++ === 1 ? '' : 's'}.`;

    let display = <span>{getMessage()}</span>;
    return (
        <div class="counter">
            <button onclick={() => display.innerHTML = getMessage()}>
                {display}
            </button>
        </div>
    );
}
