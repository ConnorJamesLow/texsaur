/** @jsx jsx */
/** @jsxFrag jsx.Fragment */
import jsx, { JsxDom } from './index';
import 'mocha';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
const { document, HTMLDivElement, HTMLElement, Node } = new JSDOM(`<!DOCTYPE html>`).window;

// Need to polyfill these without a browser:
JsxDom.document = document;
JsxDom.Node = Node;

//#region Make sure these typings still work.
const NoProps: JSX.Component = () => <span>foo</span>;
const OptionalProps: JSX.Component<{ foo?: string }> = ({ foo }) => <span>{foo?.length || 0}</span>;
const RequiredProps: JSX.Component<{ foo: string }> = ({ foo }) => <span>{foo.length}</span>;
const Children: JSX.Component = (_, children) => <div>{children}</div>;
const _ = <>
    some text
    <NoProps />
    <OptionalProps />
    <OptionalProps foo='bar' />
    <RequiredProps foo='bar' />
    <Children>
        <Children>
            <input type="button"
                onclick={console.log}
                style=""
                autocaptialize='off' />
            <div style={{}} contenteditable></div>
            <svg id='svg' draggable='true'>
                <g>
                    <path />
                </g>
            </svg>
        </Children>
    </Children>
</>;
//#endregion

describe('jsx: intrinsic element', () => {
    it('does not return null', () => expect(<div />).to.not.be.null);

    it('can render an instance of an HTMLDivElement', () => expect(<div />).to.be.instanceOf(HTMLDivElement));

    it('can receive an object for style attribute', () => expect(
        (<div style={{ display: 'none' }} /> as HTMLDivElement).style.display
    ).to.equal('none'));

    it('can receive a string for style attribute', () => expect(
        (<div style="display: none" /> as HTMLDivElement).style.display
    ).to.equal('none'));

    it('can accept data attributes', () => expect(
        (<div data-foo="bar" /> as HTMLDivElement).dataset.foo
    ).to.equal('bar'));

    it('can accept arbitrary attributes', () => expect(
        (<div aria-label="foo" /> as HTMLElement).getAttribute('aria-label')
    ).to.equal('foo'));

    it('can get className and classList after class attribute assignment', () => {
        const div = <div class="foo"></div>;
        expect(div.classList[0]).to.equal('foo');
        expect(div.className).to.equal('foo');
    })

    it('can accept HTMLCollections as children', () => {
        const parent = <div class="parent">
            <div class="child"></div>
            <div class="child"></div>
            <div class="child"></div>
        </div>
        const container = <section>{parent.children}</section>
        expect(container.children).to.have.a.lengthOf(3);
        expect(container.children[2].className).to.equal("child");
    })
});

describe('jsx: fragment', () => {
    it('return arrays', () => expect(Array.isArray(<></>)).to.be.true);

    it('does preserve children', () => {
        const fragment = (<><div>1</div><div>2</div></> as unknown as HTMLElement[]);
        expect(fragment.length).to.equal(2);
        expect(fragment[0].textContent).to.equal('1');
        expect(fragment[1].textContent).to.equal('2');
    });
});

describe('jsx: component', () => {
    const Foo: JSX.Component<{ bar?: string }> = ({ bar }, children) => <div>{bar ?? ''} {children}</div>;

    it('does not return null', () => expect(<Foo />).to.be.not.null);

    it('can render an instance of an HTMLElement', () => expect(<Foo />).to.be.instanceOf(HTMLElement));

    it('can receive named props', () => expect(
        (<Foo bar='baz' />).textContent?.trim()
    ).to.equal('baz'));

    it('can receive children', () => expect(
        (<Foo><div>bar</div><div>baz</div></Foo>).childElementCount
    ).to.equal(2));

    it('can be nested in other elements', () => expect(
        (<div><Foo bar='baz' /></div>).textContent?.trim()
    ).to.equal('baz'));

    it('can be nested in other components', () => expect(
        (<Foo><Foo bar='baz' /></Foo>).textContent?.trim()
    ).to.equal('baz'));
});

describe('jsx: interpolation', () => {
    const date = new Date();

    it('can render strings', () => expect(
        (<div>{'foo'}</div>).textContent
    ).to.equal('foo'));

    it('can render simple arrays', () => expect(
        (<div>{['foo', 'bar']}</div>).textContent
    ).to.equal('foobar'));

    it('can render mixed arrays', () => expect(
        <div>{['foo', <span>bar</span>]}</div>
    ).to.satisfy((el: HTMLElement) => el.childElementCount === 1 && el.textContent === 'foobar'));

    it('can render numbers', () => expect(
        (<div>{100}</div>).textContent
    ).to.equal('100'));

    it('can render Date objects', () => expect(
        new Date((<div>{date}</div>).textContent!).toUTCString()
    ).to.equal(date.toUTCString()));

    it('can render truthy booleans', () => expect(
        (<div>{true}</div>).textContent
    ).to.equal('true'));

    it('does not render falsey values', () => expect((
        <div>{false}{(1 * 1) === 2 && 'yes'}{[][0] && ""}</div>
    ).childElementCount).to.equal(0));
});
