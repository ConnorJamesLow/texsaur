/// <reference path="../JSX.d.ts" />
import * as svg from './svg';

function jsx<T extends JSX.HTMLTag = JSX.HTMLTag>(tag: T, properties: RecursivePartial<JSX.IntrinsicElements[typeof tag]> | null, ...children: Node[]): HTMLElement
function jsx<T extends JSX.SVGTag = JSX.SVGTag>(tag: T, properties: RecursivePartial<JSX.IntrinsicElements[typeof tag]> | null, ...children: Node[]): SVGElement
function jsx(tag: JSX.Component, properties: Parameters<typeof tag> | null, ...children: Node[]): Node
function jsx(tag: JSX.Tag | JSX.Component, properties: { [key: string]: any } | null, ...children: Node[]) {
    if (typeof tag === 'function') {
        return tag(properties ?? {}, children);
    }

    if(svg.isSvgTag(tag)) {
        return svg.parseSvgElement(tag, properties ?? {}, ...children);
    }
    
    type Tag = typeof tag;
    const element : JSX.IntrinsicElementMap[Tag] = document.createElement(tag);

    let map = (properties ?? {}) as RecursivePartial<JSX.IntrinsicElements[typeof tag]>;
    let prop: keyof JSX.IntrinsicElements[typeof tag];
    for (prop of Object.keys(map)) {
        const warn = (expected: string, actual: any) => console.warn(
            tag,
            `received incorrect value type for property '${prop}': expected `,
            expected,
            `got ${typeof actual}` 
        );

        // Extract values:
        prop = prop.toString();
        const value = map[prop] as any;

        // Map known properties:
        switch (prop) {
            case "class": {
                if (typeof value === 'string') {
                    element.className = value;
                } else {
                    warn('string', typeof value);
                }
                continue;
            }
            case "style": {
                if (typeof value === 'object') {
                    for (const [k, v] of Object.entries(value)) {
                        const styleProperty = k as any;
                        if (typeof v !== 'string') {
                            continue;
                        }
                        element.style[styleProperty] = v;
                    }
                } else {
                    warn('object', typeof value);
                }
                continue;
            }
        }

        // Event callbacks:
        if (/^on/.test(prop)) {
            if (typeof value === 'function') {
                element.addEventListener(prop.substr(2), map[prop] as any);
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
    for (let child of children) {
        if (typeof child === 'string') {
            element.innerText += child;
            continue;
        }
        if (Array.isArray(child)) {
            element.append(...child);
            continue;
        }
        element.appendChild(child);
    }
    return element;
}

export default jsx;
