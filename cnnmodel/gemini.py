# gemini.py

import google.generativeai as genai

# Configure Gemini
genai.configure(api_key="your api key create a env file") #pranay env file ni api key insert karshil google gemini api key

# Create Gemini model instance
model = genai.GenerativeModel('gemini-1.5-flash-8b-exp-0924')

def ask_gemini(plant_name: str, question: str) -> str:
    """
    Send a combined prompt to Gemini AI and return the answer.
    """
    prompt = f"The plant is {plant_name}. User's question: {question}"
    response = model.generate_content(prompt)
    return response.text
