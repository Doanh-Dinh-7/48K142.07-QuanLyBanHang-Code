from models.models import get_db_connection, get_info_by_id  # Import hàm kết nối từ models.py
from .chiTietPhieuNhap import delete_all_chiTietPhieuNhap

# CRUD Bang PhieuNhap
def create_phieuNhap(ngayLap, tongTien, tienVAT, tongCong, phuongThucThanhToan, maNCC, maNV):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("EXEC AddPhieuNhap @NgayLap = ?, @TongTien = ?, @TienVAT = ?, @TongCong = ?, @PhuongThucThanhToan = ?, @MaNCC = ?, @MaNV = ?;",
                    (ngayLap, tongTien, tienVAT, tongCong, phuongThucThanhToan, maNCC, maNV))
    maxMaPN = cursor.execute("SELECT MAX(MaPN) FROM PhieuNhap").fetchone()[0]
    conn.commit()
    cursor.close()
    conn.close()
    return maxMaPN
    
def get_all_phieuNhap():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM PhieuNhap")
    phieuNhap = [
        {"MaPN": row[0], "NgayLap": row[1], "TongTien": row[2], "TienVAT": row[3], "TongCong": row[4], "PhuongThucThanhToan": row[5], "MaNCC": row[6], "MaNV": row[7]}
        for row in cursor.fetchall()        
    ]
    cursor.close()
    conn.close()
    return phieuNhap

def update_phieuNhap(maPN, ngayLap, tongTien, tienVAT, tongCong, phuongThucThanhToan, maNCC, maNV):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        # Kiểm tra phiếu nhập có tồn tại không
        if not get_info_by_id("PhieuNhap", "MaPN", maPN):
            return None
        
        cursor.execute("EXEC UpdatePhieuNhap @MaPN = ?, @NgayLap = ?, @TongTien = ?, @TienVAT = ?, @TongCong = ?, @PhuongThucThanhToan = ?, @MaNCC = ?, @MaNV = ?;", 
                   (maPN, ngayLap, tongTien, tienVAT, tongCong, phuongThucThanhToan, maNCC, maNV))
        conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cursor.close()
        conn.close()

def delete_phieuNhap(maPN):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        # Kiểm tra phiếu nhập có tồn tại không
        if not get_info_by_id("PhieuNhap", "MaPN", maPN):
            return None
        
        delete_all_chiTietPhieuNhap(maPN)
        cursor.execute("DELETE FROM PhieuNhap WHERE MaPN = ?", (maPN,))
        conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cursor.close()
        conn.close()