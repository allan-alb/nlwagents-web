# NLW Agents

NLW Agents is an interactive Q&A web application that enables users to ask questions about a given spoken content. Users can record and send audio messages, which are automatically transcribed by the system. After the transcription, users can submit questions related to the audio content, and the application generates relevant answers based on the transcribed information. This workflow allows for a seamless, voice-first Q&A experience, making it easy to extract knowledge from spoken input and interact with the system using natural language.

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
