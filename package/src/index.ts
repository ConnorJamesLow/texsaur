/// <reference path="../JSX.d.ts" />
import JsxDom from './dom';
import * as svg from './svg';

function __jsx<T extends JSX.HTMLTag = JSX.HTMLTag>(tag: T, properties: RecursivePartial<JSX.IntrinsicElements[T]> | null, ...children: Node[]): HTMLElement
function __jsx<T extends JSX.SVGTag = JSX.SVGTag>(tag: T, properties: RecursivePartial<JSX.IntrinsicElements[T]> | null, ...children: Node[]): SVGElement
function __jsx(tag: JSX.Component, properties: Parameters<typeof tag> | null, ...children: Node[]): Node
function __jsx(tag: JSX.Tag | JSX.Component, properties: { [key: string]: any } | null, ...children: Node[]) {
    const { document, Node } = JsxDom;

    if (typeof tag === 'function') {
        return tag(properties ?? {}, children);
    }

    if (svg.isSvgTag(tag)) {
        return svg.parseSvgElement(tag, properties ?? {}, ...children);
    }

    const element = document.createElement(tag);

    let map = (properties ?? {}) as RecursivePartial<JSX.IntrinsicElements[typeof tag]>;
    let prop: keyof JSX.IntrinsicElements[typeof tag];
    for (prop of Object.keys(map)) {
        const warn = (expected: string, actual: any) => console.warn(
            tag,
            `received incorrect value type for property '${prop}': expected `,
            expected,
            `instead of`,
            typeof actual
        );

        // Extract values:
        prop = prop.toString();
        const value = map[prop] as any;

        // Map known properties:
        switch (prop) {
            case "style": {
                if (typeof value === 'object') {
                    for (const [k, v] of Object.entries(value)) {
                        const styleProperty = k as any;
                        if (typeof v !== 'string') {
                            continue;
                        }
                        element.style[styleProperty] = v;
                    }
                } else if (typeof value === 'string') {
                    break;
                } else {
                    warn('object | string', typeof value);
                }
                continue;
            }
        }

        // Event callbacks:
        if (/^on/.test(prop)) {
            if (typeof value === 'function') {
                element.addEventListener(prop.substring(2), map[prop] as any);
            } else {
                warn('function', typeof value);
            }
            continue;
        }

        // Everything else:
        try {
            const anyReference = element as any;
            if (typeof anyReference[prop] === 'undefined') {
                // As a fallback, attempt to set an attribute:
                element.setAttribute(prop, value);
            } else {
                anyReference[prop] = value;
            }
        } catch (error) {
            console.error(`Could not set ${prop} on ${element.tagName}`, error)
            warn(typeof (element as any)[prop as any], typeof value)
        }
    }

    // append children
    for (let child of children.flat()) {
        if (child instanceof Node) {
            element.appendChild(child);
            continue;
        }
        if (Array.isArray(child)) {
            element.append(...child);
            continue;
        }
        element.append(child);
    }
    return element;
}

function Fragment(_: {}, children: Node[]): JSX.Fragment {
    return children;
}

const jsx: typeof __jsx & { Fragment?: typeof Fragment } = __jsx;
jsx.Fragment = Fragment;

export { default as JsxDom } from './dom';
export default jsx;
