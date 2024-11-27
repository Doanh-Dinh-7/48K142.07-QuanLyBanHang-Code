from app import app
from routes.nhanVien import nhanVien_bp  # Import Blueprint từ nhanVien.py
from routes.nhaCungCap import nhaCungCap_bp  # Import Blueprint từ nhaCungCap.py
from routes.nguyenLieu import nguyenLieu_bp  # Import Blueprint từ nguyenLieu.py

# Đăng ký Blueprint vào Flask app
app.register_blueprint(nhanVien_bp)
app.register_blueprint(nhaCungCap_bp)
app.register_blueprint(nguyenLieu_bp)
