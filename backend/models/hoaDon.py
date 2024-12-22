from models.models import get_db_connection, get_info_by_id  # Import hàm kết nối từ models.py
from .chiTietHoaDon import delete_all_chiTietHoaDon

# CRUD Bang HoaDon
def create_hoaDon(ngayLap, tongTien, phuongThucThanhToan, maNV):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("EXEC AddHoaDon @NgayLap = ?, @TongTien = ?, @PhuongThucThanhToan = ?, @MaNV = ?;", 
                    (ngayLap, tongTien, phuongThucThanhToan, maNV))
    maxMaHD = cursor.execute("SELECT MAX(MaHD) FROM HoaDon").fetchone()[0]
    conn.commit()
    cursor.close()
    conn.close()
    return maxMaHD
    
def get_all_hoaDon():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM HoaDon")
    hoaDon = [
        {"MaHD": row[0], "NgayLap": row[1], "TongTien": row[2], "PhuongThucThanhToan": row[3], "MaNV": row[4]}
        for row in cursor.fetchall()        
    ]
    cursor.close()
    conn.close()
    return hoaDon

def update_hoaDon(maHD, ngayLap, tongTien, phuongThucThanhToan, maNV):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        # Kiểm tra hoá đơn có tồn tại không
        if not get_info_by_id("HoaDon", "MaHD", maHD):
            return None
        
        cursor.execute("EXEC UpdateHoaDon @MaHD = ?, @NgayLap = ?, @TongTien = ?, @PhuongThucThanhToan = ?, @MaNV = ?;", 
                   (maHD, ngayLap, tongTien, phuongThucThanhToan, maNV))
        conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cursor.close()
        conn.close()

def delete_hoaDon(maHD):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        # Kiểm tra hoá đơn có tồn tại không
        if not get_info_by_id("HoaDon", "MaHD", maHD):
            return None
        
        delete_all_chiTietHoaDon(maHD)
        cursor.execute("DELETE FROM HoaDon WHERE MaHD = ?", (maHD,))
        conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cursor.close()
        conn.close()