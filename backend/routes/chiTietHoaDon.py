from flask import Blueprint, jsonify, request
from models import create_chiTietHoaDon, get_chiTietHoaDon, update_chiTietHoaDon, delete_chiTietHoaDon

# Tạo Blueprint cho các API liên quan đến nhân viên
chiTietHoaDon_bp = Blueprint('chiTietHoaDon', __name__)

@chiTietHoaDon_bp.route('/api/chitiethoadon', methods=['POST'])
def create_chiTietHoaDon_api():
    try:
        data  = request.json
        create_chiTietHoaDon(data['MaHD'], data['MaSP'], data['SoLuong'], data['ThanhTien'])
        return jsonify({'message': 'ChiTietHoaDon created successfully'}), 201
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500
    
@chiTietHoaDon_bp.route('/api/chitiethoadon/<string:maHD>', methods=['GET'])
def get_chiTietHoaDon_api(maHD):
    try:
        all_chiTietHoaDon = get_chiTietHoaDon(maHD)
        return jsonify(all_chiTietHoaDon), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@chiTietHoaDon_bp.route('/api/chitiethoadon/<string:maHD>-<string:maSP>', methods=['PUT'])
def update_chiTietHoaDon_api(maHD, maSP):
    try:
        data  = request.json
        result = update_chiTietHoaDon(maHD, maSP, data['SoLuong'], data['ThanhTien'])
        
        if result is None:
            return jsonify({"error": "ChiTietHoaDon not found"}), 404
        
        return jsonify({'message': 'ChiTietHoaDon updated successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500
    
@chiTietHoaDon_bp.route('/api/chitiethoadon/<string:maHD>-<string:maSP>', methods=['DELETE'])
def delete_chiTietHoaDon_api(maHD, maSP):
    try:
        result = delete_chiTietHoaDon(maHD, maSP)
        
        if result is None:
            return jsonify({"error": "ChiTietHoaDon not found"}), 404
        
        return jsonify({'message': 'ChiTietHoaDon deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500