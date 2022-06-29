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
const test = <>
    some text
    <NoProps />
    <OptionalProps />
    <OptionalProps foo='bar' />
    <RequiredProps foo='bar' />
    <Children>
        <Children>
            <input type="button" onclick={console.log} />
        </Children>
    </Children>
</>;
//#endregion

describe('jsx: intrinsic elements', () => {
    it('do not return null', () => expect(<div />).to.not.be.null);
    it('can render an instance of an HTMLDivElement', () => expect(<div />).to.be.instanceOf(HTMLDivElement));
});

describe('jsx: fragments', () => {
    it('return arrays', () => expect(Array.isArray(<></>)).to.be.true);
    it('preserve children', () => {
        const fragment = (<><div>1</div><div>2</div></> as unknown as HTMLElement[]);
        expect(fragment.length).to.equal(2);
        expect(fragment[0].textContent).to.equal('1');
        expect(fragment[1].textContent).to.equal('2');
    })
});

describe('jsx: components', () => {
    const Foo: JSX.Component<{ bar?: string }> = ({ bar }, children) => <div>{bar ?? ''} {children}</div>;
    it('do not return null', () => expect(<Foo />).to.not.be.null);
    it('can render an instance of an HTMLElement', () => expect(<Foo />).to.be.instanceOf(HTMLElement));
    it('can receive named props', () => expect((<Foo bar='baz' />).textContent?.trim()).to.equal('baz'));
    it('can receive children', () => expect((<Foo><div>bar</div><div>baz</div></Foo>).childElementCount).to.equal(2));
    it('can be nested in other elements', () => expect((<div><Foo bar='baz' /></div>).textContent?.trim()).to.equal('baz'));
    it('can be nested in other components', () => expect((<Foo><Foo bar='baz' /></Foo>).textContent?.trim()).to.equal('baz'));
});

describe('jsx: interpolation', () => {
    const date = new Date();
    it('can render strings', () => expect((<div>{'foo'}</div>).textContent).to.equal('foo'));
    it('can render simple arrays', () => expect((<div>{['foo', 'bar']}</div>).textContent).to.equal('foobar'));
    it('can render mixed arrays', () => expect(<div>{['foo', <span>bar</span>]}</div>).to.satisfy((el: HTMLElement) => {
        return el.childElementCount === 1 && el.textContent === 'foobar';
    }));
    it('can render numbers', () => expect((<div>{100}</div>).textContent).to.equal('100'));
    it('can render booleans', () => expect((<div>{true}</div>).textContent).to.equal('true'));
    it('can render Date objects', () => expect(new Date((<div>{date}</div>).textContent!).toUTCString())
        .to.equal(date.toUTCString()));
});
