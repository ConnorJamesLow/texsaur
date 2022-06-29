class JsxDom {
    private _our_document: Document | null = null;
    private _our_node: any;

    set document(d: Document) {
        this._our_document = d;
    }

    get document() {
        const { _our_document } = this;
        return _our_document ?? globalThis.document;
    }

    set Node(n: any) {
        this._our_node = n;
    }

    get Node() {
        const { _our_node } = this;
        return _our_node ?? globalThis.Node;
    }
    
    useGlobalDocument() {
        this._our_document = null;
    }

    useGlobalNode() {
        this._our_node = null;
    }
}

export default new JsxDom();
