from models.models import get_db_connection, get_info_by_id  # Import hàm kết nối từ models.py

# CRUD Bang ChiTietPhieuNhap
def create_chiTietPhieuNhap(maPN,maNL, soLuong, thanhTien, thueTax):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("EXEC AddChiTietPhieuNhap @MaPN = ?, @MaNL = ?, @SoLuong = ?, @ThanhTien = ?, @ThueTax = ?;", 
                   (maPN, maNL, soLuong, thanhTien, thueTax))
    conn.commit()
    cursor.close()
    conn.close()

def get_chiTietPhieuNhap(maPN):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("EXEC GetChiTietPhieuNhap @MaPN = ?;", (maPN))
    chiTietPhieuNhap = [
        {"MaPN": row[0], "MaNL": row[1], "SoLuong": row[2], "ThanhTien": row[3], "ThueTax": row[4]}
        for row in cursor.fetchall()
    ]
    cursor.close()
    conn.close()
    return chiTietPhieuNhap

def update_chiTietPhieuNhap(maPN, maNL, soLuong, thanhTien, thueTax):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        # Kiểm tra phiếu nhập hoặc nguyên liệu có tồn tại không
        if not get_info_by_id("PhieuNhap", "MaPN", maPN) or not get_info_by_id("NguyenLieu", "MaNL", maNL):
            return None
        
        cursor.execute("EXEC UpdateChiTietPhieuNhap @MaPN = ?, @MaNL = ?, @SoLuong = ?, @ThanhTien = ?,  @ThueTax = ?;", 
                        ( maPN, maNL, soLuong, thanhTien, thueTax))
        conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cursor.close()
        conn.close()

def delete_chiTietPhieuNhap(maPN, maNL):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        # Kiểm tra phiếu nhập hoặc nguyên liệu có tồn tại không
        if not get_info_by_id("PhieuNhap", "MaPN", maPN) or not get_info_by_id("NguyenLieu", "MaNL", maNL):
            return None
        
        cursor.execute("DELETE FROM ChiTietPhieuNhap WHERE MaPN = ? AND MaNL = ?", (maPN, maNL))
        conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cursor.close()
        conn.close()   

def delete_all_chiTietPhieuNhap(maPN):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM ChiTietPhieuNhap WHERE MaPN = ?", (maPN))
    conn.commit()
    cursor.close()
    conn.close()

# def delete_all_chiTietPhieuNhap(maPN):
#     conn = get_db_connection()
#     try:
#         cursor = conn.cursor()
        
#         # Kiểm tra phiếu nhập có tồn tại không
#         if not get_info_by_id("PhieuNhap", "MaPN", maPN):
#             return None
        
#         cursor.execute("DELETE FROM ChiTietPhieuNhap WHERE MaPN = ?", (maPN))
#         conn.commit()
#         return True
#     except Exception as e:
#         conn.rollback()
#         raise e
#     finally:
#         cursor.close()
#         conn.close()