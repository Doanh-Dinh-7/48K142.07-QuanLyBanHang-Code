from flask import Blueprint, jsonify, request
from models import create_sanPham, get_all_sanPham, update_sanPham, delete_sanPham

# Tạo Blueprint cho các API liên quan đến nhân viên
sanPham_bp = Blueprint('sanPham', __name__)

@sanPham_bp.route('/api/sanpham', methods=['POST'])
def create_sanPham_api():
    try:
        data  = request.json
        create_sanPham(data['TenSP'], data['DonGiaBan'])
        return jsonify({'message': 'SanPham created successfully'}), 201
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500
    
@sanPham_bp.route('/api/sanpham', methods=['GET'])
def get_all_sanPham_api():
    try:
        all_sanPham = get_all_sanPham()
        return jsonify(all_sanPham), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@sanPham_bp.route('/api/sanpham/<string:maSP>', methods=['PUT'])
def update_sanPham_api(maSP):
    try:
        data  = request.json
        result = update_sanPham(maSP, data['TenSP'], data['DonGiaBan'])
        
        if result is None:
            return jsonify({"error": "SanPham not found"}), 404
        
        return jsonify({'message': 'SanPham updated successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500
    
@sanPham_bp.route('/api/sanpham/<string:maSP>', methods=['DELETE'])
def delete_sanPham_api(maSP):
    try:
        result = delete_sanPham(maSP)
        
        if result is None:
            return jsonify({"error": "SanPham not found"}), 404
        
        return jsonify({'message': 'SanPham deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500