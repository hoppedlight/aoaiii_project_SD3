from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import google.generativeai as genai
import json
from decouple import config

genai.configure(api_key = config("GEMINI_API_KEY"))

@csrf_exempt
def ai_pc_builder(request):
  if request.method == "POST":
    try:
      data = json.loads(request.body)
      history = data.get("history", [])
      prompt = build_prompt_from_history(history)
      
      model = genai.GenerativeModel("models/gemini-1.5-pro")
      response = model.generate_content(prompt)
      return JsonResponse({"response" : response.text})
    except Exception as e:
      print(e)
      return JsonResponse({"error" : str(e)}, status = 500)
  return JsonResponse({"error" : "Only POST allowed"}, status = 405)

def build_prompt_from_history(history):
  conversation = ""
  for msg in history:
    sender = "User" if msg["sender"] == "user" else "AI"
    conversation += f"{sender}: {msg['text']}\n"
  conversation += "AI:"
  return conversation