/// <reference lib="dom" />

declare namespace JSX {
    type Children = Element | Element[];
    type Element = globalThis.Element;
    type Fragment = Node[];
    interface IntrinsicElements extends IntrinsicElementMap { }

    type CommonProperties = Partial<{
        style: Partial<CSSStyleDeclaration>
        class: string
    }>

    type CommonEvents = {
        [E in keyof GlobalEventHandlers]?: GlobalEventHandlers[E]
    }

    type IntrinsicElementMap = {
        [K in keyof HTMLElementTagNameMap]: CommonEvents & CommonProperties & {
            [k: string]: any
        }
    } & {
        [K in keyof SVGElementTagNameMap]: {
            [k: string]: any
        }
    }

    type Tag = keyof JSX.IntrinsicElements
    type HTMLTag = keyof HTMLElementTagNameMap;
    type SVGTag = keyof SVGElementTagNameMap;

    interface Component<T = undefined | {}> {
        (properties: T, children?: Node | Node[]): Element
    }
}

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
