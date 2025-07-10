# NLW Agents

NLW Agents is a web application developed during a Rocketseat event. This project leverages modern web technologies and best practices for a fast, maintainable, and scalable codebase.

## Tech Stack

- **React 19** – UI library for building interactive interfaces
- **Vite** – Fast development server and build tool
- **TypeScript** – Static type checking
- **Tailwind CSS** – Utility-first CSS framework
- **React Router DOM** – Routing for React applications
- **React Query (@tanstack/react-query)** – Data fetching and caching
- **Radix UI** – Accessible UI primitives
- **Lucide React** – Icon library
- **Biome** – Code formatting and linting

## Project Structure & Patterns

- Source code is in the `src/` directory
- Pages are organized in `src/pages/`
- Components are in `src/components/`
- Uses path alias `@/` for imports from `src/`
- Styles are managed with Tailwind CSS and custom CSS variables

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```
4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Project Configuration

- **Vite** is configured in `vite.config.ts` with React and Tailwind plugins, and a path alias for `@/`.
- **TypeScript** settings are in `tsconfig.json` and `tsconfig.app.json`.
- **Tailwind CSS** is imported in `src/index.css`.
- **Biome** is configured via `biome.jsonc` for code formatting.

---
Developed during Rocketseat's NLW event.