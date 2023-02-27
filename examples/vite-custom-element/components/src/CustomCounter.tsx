import jsx from 'texsaur';

export class CustomCounter extends HTMLElement {
    constructor() {
        super();

    }

    connectedCallback() {
        const root = this.attachShadow({ mode: 'open' });
        let count = 0;
        const counter = <span>0</span> as HTMLSpanElement;
        const style = <style>{`
        section {
            border: 1px solid red;
            font-family: sans-serif;
            padding: 10px;
        }

        div > span {
            font-weight: bolder;
        }

        button {
            width: 20ch;
        }
    `}</style>;
        const content = <section>
            <div>
                Current count is: {counter}
            </div>
            <button onclick={() => counter.innerText = (++count).toString()}>Increment</button>
        </section>;
        root.append(style, content);
    }
}

customElements.define('custom-counter', CustomCounter);

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [`custom-counter`]: Partial<CustomCounter>
        }
    }
}
