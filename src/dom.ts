export let customDom: Document | null = null;
export let customNode: any;

export function useDocument(dom: Document) {
    customDom = dom;
}

export function useNode(node: any) {
    customNode = node;
}