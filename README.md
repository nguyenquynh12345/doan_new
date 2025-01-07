# Getting Started with Vite

This project was bootstrapped with [Vite](https://vitejs.dev/).

This project use:
- Node v20.12.2
- Typescript v5.4.5
- React v18.2.0
- Redux v9.1.2
- Redux Toolkit v2.2.4
- React Router Dom v6.23.1

Template:
- CoreUI Pro v5.1.0
- CoreUI Icon v3.0.0
- CoreUI Chart v2.1.2
- CoreUI React v5.1.0

Libraries:
- vite v5.2.0
- Sass v1.77.1
- Bootstrap v5.3.3
- Axios v1.6.8
- Formik v2.4.6
- Yup v1.4.0
- React-Toastify v10.0.5
- Lodash v4.17.21

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
"# doan_new" 
