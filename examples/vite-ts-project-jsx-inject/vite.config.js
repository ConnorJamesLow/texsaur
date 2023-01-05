/** @type {import('vite').UserConfig} */
export default {
    esbuild: {
        jsxFactory: 'jsx',
        jsxFragment: 'jsx.Fragment',
        jsxInject: 'import jsx from "texsaur"'
    }
}