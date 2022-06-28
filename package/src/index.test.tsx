import jsx, { JSXDOM } from './index';
import 'mocha';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
const { document, HTMLDivElement, HTMLElement, Node } = new JSDOM(`<!DOCTYPE html>`).window;

// Need to polyfill these without a browser:
JSXDOM.useDocument(document);
JSXDOM.useNode(Node);


describe('jsx: intrinsic elements', () => {
    it('do not return null', () => expect(<div />).to.not.be.null);
    it('can render an instance of an HTMLDivElement', () => expect(<div />).to.be.instanceOf(HTMLDivElement));
});

describe('jsx: components', () => {
    const Foo = ({ bar }: { bar?: string }, children: any) => <div>{bar ?? ''} {children}</div>;
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