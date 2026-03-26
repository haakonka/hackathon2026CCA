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

### Option A · GitHub Codespaces (zero-install)

1. Click **Code → Codespaces → Create codespace on main** in the GitHub UI.
2. The devcontainer will automatically install all Python and Node.js dependencies.
3. Open two terminal tabs and start each server:

   ```bash
   # Terminal 1 – backend
   cd backend
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   ```bash
   # Terminal 2 – frontend
   cd frontend
   npm run dev
   ```

4. Codespaces will detect the open ports and show **Open in Browser** notifications.  
   The frontend (port 5173) opens automatically; the backend API docs are at port 8000 (`/docs`).

> **Note:** The frontend's `/api/*` proxy targets `http://localhost:8000`, which resolves correctly inside the Codespace container.

---

### Option B · Local development

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
