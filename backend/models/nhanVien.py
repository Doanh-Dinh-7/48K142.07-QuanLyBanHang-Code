from models.models import get_db_connection, get_info_by_id  # Import hàm kết nối từ models.py

# CRUD Bang NhanVien
def create_nhanVien(hoTenNV, ngaySinh, gioiTinh, diaChi, ngayVaoLam):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("EXEC AddNhanVien @HoTenNV = ?, @NgaySinh = ?, @GioiTinh = ?, @DiaChi = ?, @NgayVaoLam = ?;", 
                       (hoTenNV, ngaySinh, gioiTinh, diaChi, ngayVaoLam))
        
        conn.commit()
    except Exception as e:
        conn.rollback() # Rollback trong trường hợp có lỗi
        raise e # Ném lỗi ra cho API xư lý
    finally:
        cursor.close()
        conn.close()
    
def get_all_nhanVien():
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM NhanVien")
        nhanVien = [
            {"MaNV": row[0], "HoTenNV": row[1], "NgaySinh": row[2], "GioiTinh": row[3], "DiaChi": row[4], "NgayVaoLam": row[5]}
            for row in cursor.fetchall()
        ]
        return nhanVien
    except Exception as e:
        raise e
    finally:
        cursor.close()
        conn.close()

def update_nhanVien(maNV, hoTenNV, ngaySinh, gioiTinh, diaChi, ngayVaoLam):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        # Kiểm tra nhân viên có tồn tại không
        if not get_info_by_id("NhanVien", "MaNV", maNV):
            return None
        cursor.execute("EXEC UpdateNhanVien @MaNV = ?, @HoTenNV = ?, @NgaySinh = ?, @GioiTinh = ?, @DiaChi = ?, @NgayVaoLam = ?;",
                        (maNV, hoTenNV, ngaySinh, gioiTinh, diaChi, ngayVaoLam))
        conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cursor.close()
        conn.close()
    
def delete_nhanVien(maNV):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        # Kiểm tra nhân viên có tồn tại không
        if not get_info_by_id("NhanVien", "MaNV", maNV):
            return None
        
        cursor.execute("DELETE FROM NhanVien WHERE MaNV = ?", (maNV,))
        conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cursor.close()
        conn.close()   
        
if __name__ == '__main__':
    all_nhanVien = get_all_nhanVien()
    print(all_nhanVien)
