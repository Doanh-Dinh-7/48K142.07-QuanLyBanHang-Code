from models.models import get_db_connection, get_info_by_id  # Import hàm kết nối từ models.py

# CRUD Bang ChiTietHoaDon
def create_chiTietHoaDon(maHD, maSP, soLuong, thanhTien):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("EXEC AddChiTietHoaDon @MaHD = ?, @MaSP = ?, @SoLuong = ?, @ThanhTien = ?;", 
                   (maHD, maSP, soLuong, thanhTien))
    conn.commit()
    cursor.close()
    conn.close()

def get_chiTietHoaDon(maHD):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("EXEC GetChiTietHoaDon @MaHD = ?;", (maHD))
    chiTietHoaDon = [
        {"MaHD": row[0], "MaSP": row[1], "SoLuong": row[2], "ThanhTien": row[3]}
        for row in cursor.fetchall()
    ]
    cursor.close()
    conn.close()
    return chiTietHoaDon

def update_chiTietHoaDon(maHD, maSP, soLuong, thanhTien):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        # Kiểm tra hoá đơn hoặc sản phẩm có tồn tại không
        if not get_info_by_id("HoaDon", "MaHD", maHD) or not get_info_by_id("SanPham", "MaSP", maSP):
            return None
        
        cursor.execute("EXEC UpdateChiTietHoaDon @MaHD = ?, @MaSP = ?, @SoLuong = ?, @ThanhTien = ?;", 
                        ( maHD, maSP, soLuong, thanhTien))
        conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cursor.close()
        conn.close()

def delete_chiTietHoaDon(maHD, maSP):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        # Kiểm tra hoá đơn hoặc sản phẩm có tồn tại không
        if not get_info_by_id("HoaDon", "MaHD", maHD) or not get_info_by_id("SanPham", "MaSP", maSP):
            return None
        
        cursor.execute("DELETE FROM ChiTietHoaDon WHERE MaHD = ? AND MaSP = ?", (maHD, maSP))
        conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cursor.close()
        conn.close()   

def delete_all_chiTietHoaDon(maHD):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM ChiTietHoaDon WHERE MaHD = ?", (maHD))
    conn.commit()
    cursor.close()
    conn.close()

# def delete_all_chiTietHoaDon(maHD):
#     conn = get_db_connection()
#     try:
#         cursor = conn.cursor()
        
#         # Kiểm tra hoá đơn có tồn tại không
#         if not get_info_by_id("HoaDon", "MaHD", maHD):
#             return None
        
#         cursor.execute("DELETE FROM ChiTietHoaDon WHERE MaHD = ?", (maHD))
#         conn.commit()
#         return True
#     except Exception as e:
#         conn.rollback()
#         raise e
#     finally:
#         cursor.close()
#         conn.close()