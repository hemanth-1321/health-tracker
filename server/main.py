from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
import os

genai.configure(api_key="AIzaSyBAysMEBFymd8Rn39y3cs8NsmYI3ibWb3I")

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    message: str

@app.post("/chat")
async def chat(input: UserInput):
    prompt = f"User: {input.message}\nAI (as a mental health advisor): Provide a kind, empathetic, and supportive response with self-care tips."
    
    model = genai.GenerativeModel("gemini-1.5-pro-latest")

    response = model.generate_content(prompt)

    return {"response": response.text}
