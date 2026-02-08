/** @jsx jsx */
/** @jsxFrag jsx.Fragment */
import { JSDOM } from 'jsdom';
import jsx, { JsxDom } from '../src/index';

// Initialize JSDOM
const { document, Node } = new JSDOM(`<!DOCTYPE html>`).window;
JsxDom.document = document;
JsxDom.Node = Node;

console.log('Running benchmarks...');

const ITERATIONS = {
    simple: 100000,
    nested: 10000,
    attributes: 10000
};

// Benchmark 1: Simple Elements
console.time('Simple Elements (100k)');
for (let i = 0; i < ITERATIONS.simple; i++) {
    const el = <div />;
}
console.timeEnd('Simple Elements (100k)');

// Benchmark 2: Nested Tree
console.time('Nested Tree (10k)');
for (let i = 0; i < ITERATIONS.nested; i++) {
    const el = (
        <div>
            <span>child 1</span>
            <span>child 2</span>
            <div>
                <p>nested child</p>
            </div>
        </div>
    );
}
console.timeEnd('Nested Tree (10k)');

// Benchmark 3: Attributes & Styling
console.time('Attributes & Styling (10k)');
for (let i = 0; i < ITERATIONS.attributes; i++) {
    const el = (
        <div
            id="test"
            class="container"
            style={{ color: 'red', display: 'flex' }}
            data-test="value"
        />
    );
}
console.timeEnd('Attributes & Styling (10k)');

console.log('Benchmarks completed.');
