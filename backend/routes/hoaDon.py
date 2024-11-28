from flask import Blueprint, jsonify, request
from models import create_hoaDon, get_all_hoaDon, update_hoaDon, delete_hoaDon

# Tạo Blueprint cho các API liên quan đến nhân viên
hoaDon_bp = Blueprint('hoaDon', __name__)

@hoaDon_bp.route('/api/hoadon', methods=['POST'])
def create_hoaDon_api():
    try:
        data  = request.json
        create_hoaDon(data['NgayLap'], data['TongTien'], data['PhuongThucThanhToan'], data['MaNV'])
        return jsonify({'message': 'HoaDon created successfully'}), 201
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@hoaDon_bp.route('/api/hoadon', methods=['GET'])
def get_all_hoaDon_api():
    try:
        all_hoaDon = get_all_hoaDon()
        return jsonify(all_hoaDon), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@hoaDon_bp.route('/api/hoadon/<string:maHD>', methods=['PUT'])
def update_hoaDon_api(maHD):
    try:
        data = request.json
        result = update_hoaDon(maHD, data['NgayLap'], data['TongTien'], data['PhuongThucThanhToan'], data['MaNV'])
        
        if result is None:
            return jsonify({"error": "HoaDon not found"}), 404
        
        return jsonify({'message': 'HoaDon updated successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@hoaDon_bp.route('/api/hoadon/<string:maHD>', methods=['DELETE'])
def delete_hoaDon_api(maHD):
    try:
        result = delete_hoaDon(maHD)
        
        if result is None:
            return jsonify({"error": "HoaDon not found"}), 404
        
        return jsonify({'message': 'HoaDon deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500
    