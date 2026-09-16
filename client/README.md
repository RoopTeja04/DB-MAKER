# DBM - Database Diagram Maker

DBM is a browser-based database schema visualizer. Write a lightweight DBML schema and see the tables, columns, keys, and relationships rendered as an interactive diagram.

## Features

- Live DBML editing with local browser persistence
- Visual table nodes with primary-key and unique-column indicators
- Relationship edges between related tables
- Automatic graph layout
- Resizable schema and diagram panels
- Collapsible schema editor
- Dark and light themes
- SQL export with copy-to-clipboard support
- PNG export of the diagram
- Table and relationship counters

## Requirements

- Node.js 18 or newer
- npm

## Getting Started

From the `client` directory:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Create a production build            |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

## Supported DBML

The editor supports tables, column types, primary keys, unique columns, and references.

```dbml
Table users {
	id int [pk]
	email varchar [unique]
	created_at timestamp
}

Table orders {
	id int [pk]
	user_id int
	total decimal
}

Ref: orders.user_id > users.id
```

Column defaults can also be included when supported by the parser.

## Using the Interface

- Edit the schema in the left panel to update the diagram.
- Drag the divider between the schema and diagram panels to resize them.
- Close the schema panel to give the diagram the full workspace.
- Use **Export SQL** to generate SQL from the current schema.
- Use **Export PNG** to download the visible diagram as an image.
- Use the theme button to switch between dark and light mode.
- Use **Reset** to restore the default example schema.

## Technology

- React
- Vite
- Tailwind CSS
- React Flow
- Dagre
- Monaco Editor
- Lucide React
  If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
