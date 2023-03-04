import __jsx from '../dist';
export const jsx = (t, p) => __jsx(t, Object.fromEntries(Object.entries(p)
    .filter(([n]) => n !== 'children')
), ...(Array.isArray(p.children) ? p.children : [p.children]));
export const jsxs = jsx;
export const Fragment = __jsx.Fragment;
