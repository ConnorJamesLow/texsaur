import jsx from 'texsaur';
import 'components';

const selector = (
    <custom-selector empty-text='How do you hello?'
        onchange={(event) => event instanceof CustomEvent && console.log('selected value:', event.detail.value)}
        value="starwars"
    >
        <option value="code">Hello, world!</option>
        <option value="starwars">Hello, there!</option>
        <option value="disturbed">Hello darkness, my old friend.</option>
    </custom-selector>
);

let customInputs = 0;
const input = <input type="text" onchange={() => {
    selector.append(<option value={`custom${customInputs++}`}>{input.value}</option>);
    input.value = '';
}} /> as HTMLInputElement

export default (
    <main>
        <h1>Hello there</h1>
        <h2>Counter</h2>
        <custom-counter></custom-counter>
        <h2>Selector</h2>
        <label style={{ marginBottom: '1rem', display: 'block' }}>
            <span>Add item</span>
            {input}
        </label>
        <div style={{ width: '300px' }}>
            {selector}
        </div>
    </main>
);
