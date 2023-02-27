import jsx from 'texsaur';

export class CustomSelector extends HTMLElement {
    emptyText: string = 'Select a value.';
    private observer: MutationObserver;
    private _value?: string | null;
    private _options: [string, string][] = [];
    private root: ShadowRoot;
    elements: { current: Element; input: Element, style: Element };

    set value(next: string | null) {
        console.log('set value:', next);
        this._value = next;
        this.renderSelection();
        this.dispatchEvent(new CustomEvent('change', { detail: { value: next }, bubbles: false }));
    }

    get value(): string {
        return this._value ?? '';
    }

    get options() {
        const { children } = this;
        return Array.from(children)
            .filter(c => c instanceof HTMLOptionElement)
            .map(c => [(c as HTMLOptionElement).value, c.textContent ?? (c as HTMLOptionElement).value]);
    }

    constructor() {
        super();
        this.observer = new MutationObserver(this.render.bind(this));
        this.root = this.attachShadow({ mode: 'open' });
        this.elements = {
            current: <div class="input__current"></div> as HTMLDivElement,
            input: <div class="input"></div> as HTMLDivElement,
            style: <style>{`
            :host {
                --gray-color: #00000090;
                --blue-color: #4080d0;
            }

            .input {
                box-shadow: inset 0 0 0 var(--border-width, 1px) var(--border-color, var(--gray-color));
                border-radius: 3px;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                transition: box-shadow 150ms ease-in-out;
            }

            .input.--open {
                --border-color: var(--blue-color);
                --border-width: 2px;
            }

            button {
                all: unset;
                box-sizing: border-box;
                cursor: pointer;
                display: block;
                width: 100%;
            }

            .input.--open .input__toggle {
                border-bottom: 1px solid var(--gray-color);
            }

            .input__current {
                padding: 0.5rem;
            }

            .input.--empty .input__current{
                color: var(--gray-color);
            }

            .input__options {
                display: none;
                flex-direction: column;
            }

            .input.--open .input__options {
                display: flex;
            }

            .input__options + .input__options {
                margin-top: 0.25rem;
            }

            .option {
                padding: 0.5rem;
                transition: background 150ms ease-in-out;
            }

            .option:hover {
                background: #2060f040;
            }
        `}</style>
        };
    }

    connectedCallback() {
        console.log('connectedCallback');
        const { observer, _value, elements: { current } } = this;
        observer.observe(this, { childList: true, subtree: true });
        if (this.isConnected) {
            const emptyText = this.getAttribute('empty-text');
            console.log('empty-text:', emptyText)
            if (emptyText) {
                this.emptyText = emptyText;
            }
            current.textContent = _value ?? this.emptyText;
            this.render().then(this.renderSelection.bind(this));
        }
    }

    disconnectedCallback() {
        console.log('disconnectedCallback');
        const { observer } = this;
        observer.disconnect();
    }

    private async render() {
        console.log('render', this.children);
        const { root, children } = this;
        this._options = Array.from(children)
            .filter(c => c instanceof HTMLOptionElement)
            .map(c => [(c as HTMLOptionElement).value, c.textContent ?? (c as HTMLOptionElement).value]);

        const { _options: options, elements: { current, input, style } } = this;
        input.replaceChildren(
            <button class="input__toggle" onclick={() => { input.classList.toggle('--open') }}>
                {current}
            </button>,
            <div class="input__options">
                {options.map(([value, label]) => (
                    <button class="option"
                        data-value={value}
                        onclick={({ target }) => {
                            this.value = (target as HTMLButtonElement).dataset.value ?? '';
                            input.classList.remove('--open');
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>
        );

        // Display content
        root.replaceChildren(style, input);

        await new Promise<number>(r => window.requestAnimationFrame(r));
    }

    private renderSelection() {
        const { elements: { current, input }, _options, value } = this;
        if (value) {
            input.classList.remove('--empty');
        } else {
            input.classList.add('--empty');
        }
        const [_, label] = _options.find(i => i[0] === value) ?? [];
        current.textContent = label ?? this.emptyText;
    }
}

customElements.define('custom-selector', CustomSelector);

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [`custom-selector`]: Partial<CustomSelector>
        }
    }
}
