from flask import Blueprint, jsonify, request
from models import create_chiTietPhieuNhap, get_chiTietPhieuNhap, update_chiTietPhieuNhap, delete_chiTietPhieuNhap

# Tạo Blueprint cho các API liên quan đến nhân viên
chiTietPhieuNhap_bp = Blueprint('chiTietPhieuNhap', __name__)

@chiTietPhieuNhap_bp.route('/api/chitietphieunhap', methods=['POST'])
def create_chiTietPhieuNhap_api():
    try:
        data  = request.json
        create_chiTietPhieuNhap(data['MaPN'], data['MaNL'], data['SoLuong'], data['ThanhTien'], data['ThueTax'])
        return jsonify({'message': 'ChiTietPhieuNhap created successfully'}), 201
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500
    
@chiTietPhieuNhap_bp.route('/api/chitietphieunhap/<string:maPN>', methods=['GET'])
def get_chiTietPhieuNhap_api(maPN):
    try:
        all_chiTietPhieuNhap = get_chiTietPhieuNhap(maPN)
        return jsonify(all_chiTietPhieuNhap), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@chiTietPhieuNhap_bp.route('/api/chitietphieunhap/<string:maPN>-<string:maNL>', methods=['PUT'])
def update_chiTietPhieuNhap_api(maPN, maNL):
    try:
        data  = request.json
        result = update_chiTietPhieuNhap(maPN, maNL, data['SoLuong'], data['ThanhTien'], data['ThueTax'])
        
        if result is None:
            return jsonify({"error": "ChiTietPhieuNhap not found"}), 404
        
        return jsonify({'message': 'ChiTietPhieuNhap updated successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500
    
@chiTietPhieuNhap_bp.route('/api/chitietphieunhap/<string:maPN>-<string:maNL>', methods=['DELETE'])
def delete_chiTietPhieuNhap_api(maPN, maNL):
    try:
        result = delete_chiTietPhieuNhap(maPN, maNL)
        
        if result is None:
            return jsonify({"error": "ChiTietPhieuNhap not found"}), 404
        
        return jsonify({'message': 'ChiTietPhieuNhap deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500