from django.urls import path
from .views import get_todos, add_todo, update_todo, delete_todo

urlpatterns = [
    path('todos/', get_todos),
    path('todos/add/', add_todo),
    path('todos/<int:id>/update/', update_todo),
    path('todos/<int:id>/delete/', delete_todo),
]