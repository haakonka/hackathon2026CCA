from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, timezone
import uuid

app = FastAPI(title="Project Hub API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Models ----------

class Evaluation(BaseModel):
    consultant_name: str
    rating: int = Field(..., ge=1, le=5)
    comment: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    status: str = Field(..., pattern="^(active|completed)$")
    tech_stack: list[str] = []
    client: str
    team_members: list[str] = []
    description: str = ""
    lessons_learned: list[str] = []
    evaluations: list[Evaluation] = []


class ProjectCreate(BaseModel):
    name: str
    status: str = Field(..., pattern="^(active|completed)$")
    tech_stack: list[str] = []
    client: str
    team_members: list[str] = []
    description: str = ""


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[str] = Field(None, pattern="^(active|completed)$")
    tech_stack: Optional[list[str]] = None
    client: Optional[str] = None
    team_members: Optional[list[str]] = None
    description: Optional[str] = None


class LessonCreate(BaseModel):
    lesson: str


class EvaluationCreate(BaseModel):
    consultant_name: str
    rating: int = Field(..., ge=1, le=5)
    comment: str


# ---------- In-Memory Store ----------

projects_db: dict[str, Project] = {}


def _seed():
    samples = [
        Project(
            id="proj-001",
            name="E-Commerce Platform Relaunch",
            status="completed",
            tech_stack=["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
            client="Retail Client A",
            team_members=["Alice Martin", "Bob Chen", "Clara Nguyen"],
            description=(
                "Full relaunch of a legacy e-commerce system onto a modern, "
                "cloud-native stack with a new React storefront and a Node.js "
                "microservices backend deployed on AWS ECS."
            ),
            lessons_learned=[
                "Early performance testing prevented launch-day bottlenecks.",
                "Involving the client's marketing team from sprint 1 reduced late-stage redesign requests.",
            ],
            evaluations=[
                Evaluation(
                    consultant_name="Alice Martin",
                    rating=5,
                    comment="Smooth delivery; excellent team collaboration.",
                    created_at="2024-03-10T09:00:00+00:00",
                ),
                Evaluation(
                    consultant_name="Bob Chen",
                    rating=4,
                    comment="Scope creep in the final sprint, but we managed it well.",
                    created_at="2024-03-12T14:30:00+00:00",
                ),
            ],
        ),
        Project(
            id="proj-002",
            name="Internal HR Self-Service Portal",
            status="active",
            tech_stack=["Vue", "Python", "FastAPI", "Azure", "PostgreSQL"],
            client="Financial Services Client B",
            team_members=["David Park", "Eva Schmidt", "Frank Torres"],
            description=(
                "Building a self-service HR portal that integrates with Azure AD "
                "for SSO and surfaces payslips, leave requests, and org-chart data "
                "via a FastAPI backend."
            ),
            lessons_learned=[
                "Azure AD B2C configuration is complex — plan extra time for identity integration.",
            ],
            evaluations=[
                Evaluation(
                    consultant_name="Eva Schmidt",
                    rating=4,
                    comment="Good progress so far; stakeholder availability has been a challenge.",
                    created_at="2024-11-05T11:00:00+00:00",
                ),
            ],
        ),
        Project(
            id="proj-003",
            name="IoT Sensor Dashboard",
            status="active",
            tech_stack=["React", "Python", "Azure IoT Hub", "TimescaleDB", "Grafana"],
            client="Manufacturing Client C",
            team_members=["Grace Lee", "Henry Wilson", "Irene Okafor"],
            description=(
                "Real-time monitoring dashboard for factory floor sensors. "
                "Data ingested via Azure IoT Hub into TimescaleDB and visualised "
                "in a custom React UI alongside Grafana panels."
            ),
            lessons_learned=[],
            evaluations=[],
        ),
        Project(
            id="proj-004",
            name="Mobile Banking App",
            status="completed",
            tech_stack=["React Native", "Node.js", "AWS Lambda", "DynamoDB", "Terraform"],
            client="FinTech Client D",
            team_members=["James Carter", "Karen Patel", "Leo Souza", "Mia Johnson"],
            description=(
                "Cross-platform mobile banking application with biometric login, "
                "real-time push notifications, and a serverless backend on AWS Lambda "
                "backed by DynamoDB."
            ),
            lessons_learned=[
                "Serverless cold-start latency must be measured for financial UX — keep lambdas warm.",
                "Regulatory review cycles should be built into the project timeline from day one.",
                "Feature flagging via LaunchDarkly was invaluable for phased rollout.",
            ],
            evaluations=[
                Evaluation(
                    consultant_name="Karen Patel",
                    rating=5,
                    comment="Best-run project I have been on. Clear specs and great client partnership.",
                    created_at="2023-12-01T08:00:00+00:00",
                ),
                Evaluation(
                    consultant_name="James Carter",
                    rating=4,
                    comment="Solid delivery. Terraform state management caused a few headaches early on.",
                    created_at="2023-12-03T16:00:00+00:00",
                ),
            ],
        ),
        Project(
            id="proj-005",
            name="Data Lake & Analytics Platform",
            status="completed",
            tech_stack=["Python", "Apache Spark", "AWS S3", "AWS Glue", "Tableau", "dbt"],
            client="Retail Client E",
            team_members=["Nina Reyes", "Oscar Müller", "Paula Kim"],
            description=(
                "Designed and built a scalable data lake on AWS S3 with Glue crawlers, "
                "dbt transformations, and Tableau dashboards to replace siloed spreadsheet "
                "reporting across 12 business units."
            ),
            lessons_learned=[
                "Data governance must be established before ingestion pipelines are built.",
                "dbt documentation and testing features significantly reduced QA effort.",
            ],
            evaluations=[
                Evaluation(
                    consultant_name="Nina Reyes",
                    rating=5,
                    comment="Transformative project for the client. Team executed flawlessly.",
                    created_at="2024-06-20T10:00:00+00:00",
                ),
            ],
        ),
        Project(
            id="proj-006",
            name="DevOps Transformation & CI/CD Pipeline",
            status="active",
            tech_stack=["Azure DevOps", "Kubernetes", "Helm", "Terraform", "Python", "Docker"],
            client="Insurance Client F",
            team_members=["Quinn Adams", "Rachel Benson", "Sam Dubois"],
            description=(
                "End-to-end DevOps transformation: containerising 20+ legacy services, "
                "introducing Kubernetes on AKS, and establishing GitOps CI/CD pipelines "
                "via Azure DevOps with automated security scanning."
            ),
            lessons_learned=[
                "Kubernetes RBAC planning should happen before cluster creation, not after.",
            ],
            evaluations=[],
        ),
    ]
    for p in samples:
        projects_db[p.id] = p


_seed()


# ---------- Routes ----------

@app.get("/projects", response_model=list[Project])
def list_projects(
    search: Optional[str] = Query(None, description="Full-text search on name and description"),
    tech: Optional[str] = Query(None, description="Filter by technology (comma-separated)"),
    status: Optional[str] = Query(None, description="Filter by status: active or completed"),
):
    results = list(projects_db.values())

    if status:
        results = [p for p in results if p.status == status]

    if tech:
        techs = [t.strip().lower() for t in tech.split(",") if t.strip()]
        results = [
            p for p in results
            if all(any(t in stack.lower() for stack in p.tech_stack) for t in techs)
        ]

    if search:
        term = search.lower()
        results = [
            p for p in results
            if term in p.name.lower() or term in p.description.lower()
        ]

    return results


@app.get("/projects/{project_id}", response_model=Project)
def get_project(project_id: str):
    project = projects_db.get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@app.post("/projects", response_model=Project, status_code=201)
def create_project(data: ProjectCreate):
    project = Project(**data.model_dump())
    projects_db[project.id] = project
    return project


@app.put("/projects/{project_id}", response_model=Project)
def update_project(project_id: str, data: ProjectUpdate):
    project = projects_db.get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    updated = project.model_copy(update={k: v for k, v in data.model_dump().items() if v is not None})
    projects_db[project_id] = updated
    return updated


@app.post("/projects/{project_id}/lessons", response_model=Project)
def add_lesson(project_id: str, body: LessonCreate):
    project = projects_db.get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    project.lessons_learned.append(body.lesson)
    return project


@app.post("/projects/{project_id}/evaluations", response_model=Project)
def add_evaluation(project_id: str, body: EvaluationCreate):
    project = projects_db.get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    evaluation = Evaluation(**body.model_dump())
    project.evaluations.append(evaluation)
    return project
