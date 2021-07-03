/// <reference lib="DOM" />

declare namespace JSX {
    type Element = Node;
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
    }

    type Tag = keyof JSX.IntrinsicElements
    type Component = (properties: any, children: any) => Node
    
    type PropertyValue = number | string | Date | boolean;
}

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
