from flask import Blueprint, jsonify, request
from models import create_nhaCungCap, get_all_nhaCungCap, update_nhaCungCap, delete_nhaCungCap

# Tạo Blueprint cho các API liên quan đến nhân viên
nhaCungCap_bp = Blueprint('nhaCungCap', __name__)

@nhaCungCap_bp.route('/api/nhacungcap', methods=['POST'])
def create_nhaCungCap_api():
    try:
        data  = request.json
        create_nhaCungCap(data['TenNCC'], data['DiaChi'])
        return jsonify({'message': 'NhaCungCap created successfully'}), 201
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500
    
@nhaCungCap_bp.route('/api/nhacungcap', methods=['GET'])
def get_all_nhaCungCap_api():
    try:
        all_nhaCungCap = get_all_nhaCungCap()
        return jsonify(all_nhaCungCap), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@nhaCungCap_bp.route('/api/nhacungcap/<string:maNCC>', methods=['PUT'])
def update_nhaCungCap_api(maNCC):
    try:
        data  = request.json
        update_nhaCungCap(maNCC, data['TenNCC'], data['DiaChi'])
        return jsonify({'message': 'NhaCungCap updated successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500
    
@nhaCungCap_bp.route('/api/nhacungcap/<string:maNCC>', methods=['DELETE'])
def delete_nhaCungCap_api(maNCC):
    try:
        delete_nhaCungCap(maNCC)
        return jsonify({'message': 'NhaCungCap deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500