from fastapi import FastAPI
from dotenv import load_dotenv
from routes.bubbletea import router as bubbletea_router


app = FastAPI()
app.include_router(bubbletea_router)  # ← solo una vez

@app.get("/")
def read_root():
    return {"message": "Welcome to the Bubble Tea API"}