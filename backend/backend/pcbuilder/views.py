# views.py
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseNotAllowed
import google.generativeai as genai
import json
from decouple import config

genai.configure(api_key = config("GEMINI_API_KEY"))

@csrf_exempt
def ai_pc_builder(request):
  if request.method != "POST":
    return HttpResponseNotAllowed(["POST"], "Only POST method allowed")
  
  try:
    data = json.loads(request.body)
    prompt = data.get("prompt", "").strip()
    
    if not prompt:
      return JsonResponse({"error": "Empty prompt"}, status = 400)
    
    model = genai.GenerativeModel("models/gemini-1.5-pro")
    formatted_prompt = f"You are an AI PC builder. Help with : {prompt}"
    response = model.generate_content(formatted_prompt)
    
    return JsonResponse({"response" : response.text})
  
  except Exception as e:
    import traceback
    traceback.print_exc()
    return JsonResponse({"error" : str(e)}, status=500)
