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

        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            return Response({"error": f"Failed to fetch data, status code: {response.status_code}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        soup = BeautifulSoup(response.content, "html.parser")
        products = []

        # Find all product list items
        product_items = soup.find_all("ul", class_="list-unstyled")

        for product in product_items:
            name_tag = product.find("p", class_="search_results--link")
            price_tag = product.find("p", class_="search_results--price")
            image_tag = product.find("p", class_="search_results--img")

            if name_tag and price_tag:
                product_data = {
                    "name": name_tag.get_text(strip=True),
                    "price": price_tag.get_text(strip=True),
                    "url": "https://pcpartpicker.com" + name_tag.find("a")['href'],  # Get the product page URL
                    "image": "https:" + image_tag.find("img")['src'] if image_tag else "",  # Get the image URL
                }
                products.append(product_data)

        if not products:
            return Response({"error": "No parts found."}, status=status.HTTP_404_NOT_FOUND)

        return Response({"parts": products})
