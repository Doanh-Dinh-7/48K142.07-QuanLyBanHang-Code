from flask import Blueprint, jsonify, request
from models import get_revenue_by_time, get_cost_by_time

r4_bp = Blueprint('r4', __name__)

@r4_bp.route('/api/revenue', methods=['POST'])
def get_revenue():
    try:
        data = request.json
        revenue = get_revenue_by_time(data['ThoiGianBatDau'], data['ThoiGianKetThuc'])
        return jsonify({'revenue': revenue}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500

@r4_bp.route('/api/cost', methods=['POST'])
def get_cost():
    try:
        data = request.json
        cost = get_cost_by_time(data['ThoiGianBatDau'], data['ThoiGianKetThuc'])
        return jsonify({'cost': cost}), 200
    except Exception as e:
        return jsonify({'message_error': str(e)}), 500
