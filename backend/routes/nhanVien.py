from flask import Blueprint, jsonify, request
from models import create_nhanVien, get_all_nhanVien, update_nhanVien, delete_nhanVien

# Tạo Blueprint cho các API liên quan đến nhân viên
nhanVien_bp = Blueprint('nhanVien', __name__)

@nhanVien_bp.route('/api/nhanvien', methods=['POST'])
def create_nhanVien_api():
    try:
        data  = request.json
        create_nhanVien(data['HoTenNV'], data['NgaySinh'], data['GioiTinh'], data['DiaChi'], data['NgayVaoLam'])
        return jsonify({'message': 'NhanVien created successfully'}), 201
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@nhanVien_bp.route('/api/nhanvien', methods=['GET'])
def get_all_nhanVien_api():
    try:
        all_nhanVien = get_all_nhanVien()
        return jsonify(all_nhanVien), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@nhanVien_bp.route('/api/nhanvien/<string:maNV>', methods=['PUT'])
def update_nhanVien_api(maNV):
    try:
        data = request.json
        result = update_nhanVien(maNV, data['HoTenNV'], data['NgaySinh'], data['GioiTinh'], data['DiaChi'], data['NgayVaoLam'])
        
        if result is None:
            return jsonify({"error": "NhanVien not found"}), 404
        
        return jsonify({'message': 'NhanVien updated successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@nhanVien_bp.route('/api/nhanvien/<string:maNV>', methods=['DELETE'])
def delete_nhanVien_api(maNV):
    try:
        result = delete_nhanVien(maNV)
        
        if result is None:
            return jsonify({"error": "NhanVien not found"}), 404
        
        return jsonify({'message': 'NhanVien deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500
    