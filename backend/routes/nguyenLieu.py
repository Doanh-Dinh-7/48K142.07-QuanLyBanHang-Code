from flask import Blueprint, jsonify, request
from models import create_nguyenLieu, get_all_nguyenLieu, update_nguyenLieu, delete_nguyenLieu

# Tạo Blueprint cho các API liên quan đến nhân viên
nguyenLieu_bp = Blueprint('nguyenLieu', __name__)

@nguyenLieu_bp.route('/api/nguyenlieu', methods=['POST'])
def create_nguyenLieu_api():
    try:
        data  = request.json
        create_nguyenLieu(data['TenNL'], data['Soluong'], data['DonGiaNhap'], data['DonViTinh'])
        return jsonify({'message': 'NguyenLieu created successfully'}), 201
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500
    
@nguyenLieu_bp.route('/api/nguyenlieu', methods=['GET'])
def get_all_nguyenLieu_api():
    try:
        all_nguyenLieu = get_all_nguyenLieu()
        return jsonify(all_nguyenLieu), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@nguyenLieu_bp.route('/api/nguyenlieu/<string:maNL>', methods=['PUT'])
def update_nguyenLieu_api(maNL):
    try:
        data  = request.json
        result = update_nguyenLieu(maNL, data['TenNL'], data['Soluong'], data['DonGiaNhap'], data['DonViTinh'])
        
        if result is None:
            return jsonify({"error": "NguyenLieu not found"}), 404
        
        return jsonify({'message': 'NguyenLieu updated successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500
    
@nguyenLieu_bp.route('/api/nguyenlieu/<string:maNL>', methods=['DELETE'])
def delete_nguyenLieu_api(maNL):
    try:
        result = delete_nguyenLieu(maNL)
        
        if result is None:
            return jsonify({"error": "NguyenLieu not found"}), 404
        
        return jsonify({'message': 'NguyenLieu deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500