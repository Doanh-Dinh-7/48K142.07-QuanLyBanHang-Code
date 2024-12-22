from app import app
from routes.nhanVien import nhanVien_bp  # Import Blueprint từ nhanVien.py
from routes.nhaCungCap import nhaCungCap_bp  # Import Blueprint từ nhaCungCap.py
from routes.nguyenLieu import nguyenLieu_bp  # Import Blueprint từ nguyenLieu.py
from routes.sanPham import sanPham_bp  # Import Blueprint từ sanPham.py
from routes.chiTietHoaDon import chiTietHoaDon_bp  # Import Blueprint từ chiTietHoaDon.py
from routes.hoaDon import hoaDon_bp  # Import Blueprint từ hoaDon.py
from routes.chiTietPhieuNhap import chiTietPhieuNhap_bp  # Import Blueprint từ chiTietPhieuNhap.py
from routes.phieuNhap import phieuNhap_bp  # Import Blueprint từ phieuNhap.py
from routes.routerR4 import r4_bp  # Import Blueprint từ routerR4.py

# Đăng ký Blueprint vào Flask app
app.register_blueprint(nhanVien_bp)
app.register_blueprint(nhaCungCap_bp)
app.register_blueprint(nguyenLieu_bp)
app.register_blueprint(sanPham_bp)
app.register_blueprint(chiTietHoaDon_bp)
app.register_blueprint(hoaDon_bp)
app.register_blueprint(chiTietPhieuNhap_bp)
app.register_blueprint(phieuNhap_bp)
app.register_blueprint(r4_bp)
