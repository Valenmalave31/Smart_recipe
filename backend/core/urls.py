from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('recipes/', views.recipes_list, name='recipes_list'), 
    path('favorites/', views.favorites_list, name='favorites_list'), 
    path('recipes/create/', views.create_recipe, name='create_recipe'),
    path('recipes/<int:pk>/', views.recipe_detail, name='recipe_detail'),
]