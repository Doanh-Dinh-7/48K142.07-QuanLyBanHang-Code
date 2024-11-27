# __init__.py trong folder routes không cần nhiều nội dung
# Nếu bạn cần có thể dùng để định nghĩa các import chung cho các routes

from .routes import app  # Nếu bạn muốn truy xuất app từ routes.py

__all__ = ['app']