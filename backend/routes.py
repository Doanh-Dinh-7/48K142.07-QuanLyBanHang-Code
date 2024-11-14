from app import app
from flask import Flask, jsonify, request
from models import (
    create_nhanVien, get_all_nhanVien, update_nhanVien, delete_nhanVien,
    create_nhaCungCap, get_all_nhaCungCap, update_nhaCungCap, delete_nhaCungCap,
    create_nguyenLieu, get_all_nguyenLieu, update_nguyenLieu, delete_nguyenLieu,
    create_sanPham, get_all_sanPham, update_sanPham, delete_sanPham,
    create_phieuNhap, get_all_phieuNhap, update_phieuNhap, delete_phieuNhap,
    create_chiTietPhieuNhap, get_all_chiTietPhieuNhap, update_chiTietPhieuNhap, delete_chiTietPhieuNhap,
    create_hoaDon, get_all_hoaDon, update_hoaDon, delete_hoaDon,
    create_chiTietHoaDon, get_all_chiTietHoaDon, update_chiTietHoaDon, delete_chiTietHoaDon,
)

# API
# Bang NhanVien
@app.route('/api/nhanvien', methods=['POST'])
def create_nhanVien_api():
    try:
        data  = request.json
        create_nhanVien(data['HoTenNV'], data['NgaySinh'], data['GioiTinh'], data['DiaChi'], data['NgayVaoLam'])
        return jsonify({'message': 'NhanVien created successfully'}), 201
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@app.route('/api/nhanvien', methods=['GET'])
def get_all_nhanVien_api():
    try:
        all_nhanVien = get_all_nhanVien()
        return jsonify(all_nhanVien), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@app.route('/api/nhanvien/<string:maNV>', methods=['PUT'])
def update_nhanVien_api(maNV):
    try:
        data = request.json
        result = update_nhanVien(maNV, data['HoTenNV'], data['NgaySinh'], data['GioiTinh'], data['DiaChi'], data['NgayVaoLam'])
        
        if result is None:
            return jsonify({"error": "NhanVien not found"}), 404
        
        return jsonify({'message': 'NhanVien updated successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@app.route('/api/nhanvien/<string:maNV>', methods=['DELETE'])
def delete_nhanVien_api(maNV):
    try:
        result = delete_nhanVien(maNV)
        
        if result is None:
            return jsonify({"error": "NhanVien not found"}), 404
        
        return jsonify({'message': 'NhanVien deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500