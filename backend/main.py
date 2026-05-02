from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import time
import asyncio

app = FastAPI(title="JC Market Intelligence Engine API")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for hackathon simplicity
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanRequest(BaseModel):
    company_name: str
    category: str

class AgentProgress(BaseModel):
    agent_name: str
    status: str
    progress: int

@app.get("/")
def read_root():
    return {"status": "JC Market Intelligence Engine API is active"}

@app.post("/api/scan/start")
async def start_scan(request: ScanRequest):
    # Mocking a scan initiation
    return {
        "scan_id": "scan_" + str(int(time.time())),
        "message": f"Scan initiated for {request.company_name} in {request.category}"
    }

@app.get("/api/scan/{scan_id}/status")
async def get_scan_status(scan_id: str):
    # Mocking real-time progress updates for the dashboard
    # In a real app, this would query a database or cache for the crewAI status
    return {
        "status": "in_progress",
        "agents": [
            {"agent_name": "JC Research Agent", "status": "completed", "progress": 100},
            {"agent_name": "JC Competitor Agent", "status": "analyzing", "progress": 65},
            {"agent_name": "JC Contact Agent", "status": "waiting", "progress": 0},
            {"agent_name": "JC Outreach Agent", "status": "waiting", "progress": 0},
        ],
        "message": "Analyzing competitor landscape..."
    }

@app.get("/api/report/{scan_id}")
async def get_report(scan_id: str):
    # Mocked comprehensive report response
    return {
        "company_overview": "A disruptive player in the specified category...",
        "intelligence_score": 92,
        "market_threat_index": "High",
        "swot": {
            "strengths": ["Agile development", "Strong brand presence"],
            "weaknesses": ["Limited enterprise reach", "High pricing"],
            "opportunities": ["AI integration", "Global expansion"],
            "threats": ["Emerging startups", "Regulatory changes"]
        },
        "competitors": [
            {"name": "Competitor Alpha", "threat_level": "High", "match_score": 88},
            {"name": "Competitor Beta", "threat_level": "Medium", "match_score": 75}
        ]
    }
