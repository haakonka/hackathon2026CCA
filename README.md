# Project Hub

A full-stack internal tool for tracking consulting projects, capturing lessons learned, and collecting team evaluations.

## Tech Stack

| Layer     | Technology                     |
|-----------|--------------------------------|
| Backend   | Python · FastAPI · Uvicorn     |
| Frontend  | React 18 · Vite · CSS          |
| Storage   | In-memory (seeded sample data) |

---

## Getting Started

### Prerequisites

- **Python 3.11+**
- **Node.js 18+** and **npm**

---

### 1 · Backend

```bash
cd backend

# Create and activate a virtual environment (recommended)
python -m venv .venv
source .venv/bin/activate       # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the API server (hot-reload)
uvicorn main:app --reload --port 8000
```

The API will be available at **http://localhost:8000**.  
Interactive docs: **http://localhost:8000/docs**

---

### 2 · Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173**.  
Requests to `/api/*` are automatically proxied to the backend at `http://localhost:8000`.

---

## Features

| Feature | Description |
|---------|-------------|
| **Project list** | Grid of cards showing name, status, client, tech stack, and team |
| **Search** | Full-text search on project name and description |
| **Tech filter** | Comma-separated technology filter (e.g. `React, Azure`) |
| **Status filter** | Filter by Active / Completed |
| **Project detail** | Side panel with full project info, lessons, and evaluations |
| **Add lesson** | Consultants can record a lesson learned on any project |
| **Add evaluation** | Consultants can submit a star rating + comment |
| **New project** | Form to create a new project entry |

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/projects` | List projects (`?search=`, `?tech=`, `?status=`) |
| `GET` | `/projects/{id}` | Get single project |
| `POST` | `/projects` | Create project |
| `PUT` | `/projects/{id}` | Update project |
| `POST` | `/projects/{id}/lessons` | Add lesson learned |
| `POST` | `/projects/{id}/evaluations` | Add evaluation |

---

## Project Structure

```
.
├── backend/
│   ├── main.py           # FastAPI app + in-memory data store
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       ├── api.js
│       └── components/
│           ├── ProjectList.jsx
│           ├── ProjectCard.jsx
│           ├── ProjectDetail.jsx
│           ├── ProjectForm.jsx
│           ├── SearchBar.jsx
│           ├── LessonForm.jsx
│           └── EvaluationForm.jsx
└── README.md
```
