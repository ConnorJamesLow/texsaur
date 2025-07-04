import JsxDom from "./dom";

const SVG_TAGS = [
    "circle",
    "clipPath",
    "defs",
    "desc",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "foreignObject",
    "g",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "metadata",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "stop",
    "svg",
    "switch",
    "symbol",
    "text",
    "textPath",
    "tspan",
    "use",
    "view",
];

const SVG_XMLNS = 'http://www.w3.org/2000/svg';

export function isSvgTag(tag: string) {
    return SVG_TAGS.includes(tag);
}

export function parseSvgElement(tag: string, attributes: { [key: string]: any }, ...children: Node[]) {
    const { document, Node } = JsxDom;
    const element = document.createElementNS(SVG_XMLNS, tag);
    let prop: keyof typeof attributes;
    for (prop of Object.keys(attributes)) {
        // Extract values:
        prop = prop.toString();
        const value = attributes[prop] as any;

        // Add attributes:
        element.setAttribute(prop, value);
    }

    // append children
    for (let child of children) {
        if (Array.isArray(child)) {
            element.append(...child);
            continue;
        }
        if (child instanceof Node) {
            element.appendChild(child);
        } else {
            element.append(child);
        }
    }
    return element;
}
