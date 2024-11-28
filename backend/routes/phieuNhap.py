from flask import Blueprint, jsonify, request
from models import create_phieuNhap, get_all_phieuNhap, update_phieuNhap, delete_phieuNhap

# Tạo Blueprint cho các API liên quan đến phiếu nhập
phieuNhap_bp = Blueprint('phieuNhap', __name__)

@phieuNhap_bp.route('/api/phieunhap', methods=['POST'])
def create_phieuNhap_api():
    try:
        data  = request.json
        create_phieuNhap(data['NgayLap'], data['TongTien'], data['TienVAT'], data['TongCong'], data['PhuongThucThanhToan'], data['MaNCC'], data['MaNV'])
        return jsonify({'message': 'PhieuNhap created successfully'}), 201
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@phieuNhap_bp.route('/api/phieunhap', methods=['GET'])
def get_all_phieuNhap_api():
    try:
        all_phieuNhap = get_all_phieuNhap()
        return jsonify(all_phieuNhap), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@phieuNhap_bp.route('/api/phieunhap/<string:maHD>', methods=['PUT'])
def update_phieuNhap_api(maHD):
    try:
        data = request.json
        result = update_phieuNhap(maHD, data['NgayLap'], data['TongTien'], data['TienVAT'], data['TongCong'], data['PhuongThucThanhToan'], data['MaNCC'], data['MaNV'])
        
        if result is None:
            return jsonify({"error": "PhieuNhap not found"}), 404
        
        return jsonify({'message': 'PhieuNhap updated successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@phieuNhap_bp.route('/api/phieunhap/<string:maHD>', methods=['DELETE'])
def delete_phieuNhap_api(maHD):
    try:
        result = delete_phieuNhap(maHD)
        
        if result is None:
            return jsonify({"error": "PhieuNhap not found"}), 404
        
        return jsonify({'message': 'PhieuNhap deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500
    