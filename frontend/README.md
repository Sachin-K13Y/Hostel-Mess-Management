Frontend (React + Vite)

Overview
This folder contains the React frontend built with Vite. It uses Redux Toolkit for state management and React Router for navigation.

Quick setup
1. Install dependencies
   - npm install

2. Run development server
   - npm run dev

Build
 - npm run build
 - npm run preview (serve the production build locally)

Important files
- `src/main.jsx` — app bootstrapping
- `src/App.jsx` — routes and top-level components
- `src/api/` — Axios instances and API wrappers
- `src/features/` — Redux slices
- `src/pages/` — page components

Notes
- Vite requires Node.js v16+. Tailwind and other tooling are configured in package.json.
- Update `src/api/axios.js` base URL if backend runs on a non-default host/port.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
