from django.shortcuts import render



def dashboard(request):
    stats = [
        {'title': 'Total de recetas', 'value': '28', 'icon': '📖', 'color': '#e8f5e9'},
        {'title': 'Recetas dulces', 'value': '12', 'icon': '🧁', 'color': '#fce4ec'},
        {'title': 'Recetas saladas', 'value': '16', 'icon': '🥣', 'color': '#fff3e0'},
        {'title': 'Favoritas', 'value': '7', 'icon': '❤️', 'color': '#f3e5f5'},
    ]
    return render(request, 'dashboard/dashboard.html', {'stats': stats})

def recipe_detail(request, pk):
    return render(request, 'recipe_detail.html')

def recipes_list(request):
    return render(request, 'recipes/recipes.html')

def favorites_list(request):
    return render(request, 'favorites/favorites.html')

