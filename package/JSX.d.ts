/// <reference lib="dom" />

declare namespace JSX {
    type Children = Element | Element[];
    type Element = globalThis.Element;
    type Fragment = Node[];
    interface IntrinsicElements extends IntrinsicElementMap { }

    type HTMLElementCommonAttributes = Partial<{
        style: Partial<CSSStyleDeclaration> | string
    }>

    type CommonEvents = {
        [E in keyof GlobalEventHandlers]?: GlobalEventHandlers[E]
    }

    type GlobalAttributes = CommonEvents & Partial<{

        // per https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
        accesskey: string
        autocaptialize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'
        autofocus: boolean
        class: string
        contenteditable: boolean | 'false'
        contextmenu: string
        dir: 'ltr' | 'rtl' | 'auto'
        draggable: 'true' | 'false'
        enterkeyhint: string
        hidden: boolean
        id: string
        inputmode: string  
        is: string
        itemid: string
        itemprop: string
        itemref: string
        itemscope: string
        itemtype: string
        lang: string
        nonce: string
        part: string
        role: string
        slot: string
        spellcheck: boolean | 'false'
        tabindex: string | number
        title: string
        translate: true | 'yes' | 'no'
    }>;


    type IntrinsicElementMap =
        {
            [K in keyof HTMLElementTagNameMap]: HTMLElementCommonAttributes & GlobalAttributes & Record<string, any>;
        } & {
            [K in keyof SVGElementTagNameMap]: GlobalAttributes & Record<string, any>;
        };

    type Tag = keyof JSX.IntrinsicElements
    type HTMLTag = keyof HTMLElementTagNameMap;
    type SVGTag = keyof SVGElementTagNameMap;

    interface Component<T = undefined | {}> {
        (properties: T, children?: Node | Node[]): Element
    }
}

type AllElementTagNameMap = HTMLElementTagNameMap & SVGElementTagNameMap;

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
