import requests
from bs4 import BeautifulSoup
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ScrapePCPartPicker(APIView):
    def get(self, request, format=None):
        query = request.query_params.get("search", "")
        if not query:
            return Response({"error": "Search term is required"}, status=status.HTTP_400_BAD_REQUEST)

        query = query.replace(" ", "+")
        url = f"https://pcpartpicker.com/products/cpu/#s=price+asc&q={query}"

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        }

        response = requests.get(url, headers=headers)  # Add the headers here
        if response.status_code != 200:
            return Response({"error": f"Failed to fetch data, status code: {response.status_code}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        soup = BeautifulSoup(response.content, "html.parser")
        products = []

        product_items = soup.find_all("li", class_="product")
        for product in product_items:
            name = product.find("a", class_="product-name")
            price = product.find("div", class_="price")

            if name and price:
                product_data = {
                    "name": name.get_text(strip=True),
                    "price": price.get_text(strip=True),
                    "url": "https://pcpartpicker.com" + name['href'],
                }
                products.append(product_data)

        return Response({"parts": products})
