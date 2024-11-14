import pyodbc
# Thay đổi các thông số bên dưới để phù hợp với thông tin SQL Server của bạn
server = 'ACERN5\SQLEXPRESS'
database = 'HighlandsCoffee'
# username = 'Tên_User'
# password = 'Mật_Khẩu'
# Chuỗi kết nối với Windows Authentication (không cần username và password)
connection_string = f'DRIVER={{SQL Server}};SERVER={server};DATABASE={database};Trusted_Connection=yes;'

# Hàm Tạo kết nối đến database
def get_db_connection():
    conn = pyodbc.connect(connection_string)
    return conn

# Hàm Kiểm tra sự tồn tại của id
def get_info_by_id(table, colId, id):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        # Sử dụng f-string để xây dựng câu lệnh SQL
        query = f"SELECT * FROM {table} WHERE {colId} = ?"
        cursor.execute(query, (id,))
        result = cursor.fetchone()
        return result  # Trả về None nếu không tìm thấy
    except Exception as e:
        raise e
    finally:
        cursor.close()
        conn.close()
        

# CRUD Bang NhanVien
def create_nhanVien(hoTenNV, ngaySinh, gioiTinh, diaChi, ngayVaoLam):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO NhanVien (MaNV, HoTenNV, NgaySinh, GioiTinh, DiaChi, NgayVaoLam) VALUES (dbo.fBornNhanVienId(), ?, ?, ?, ?, ?)", (hoTenNV, ngaySinh, gioiTinh, diaChi, ngayVaoLam))
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
        
        cursor.execute("UPDATE NhanVien SET HoTenNV = ?, NgaySinh = ?, GioiTinh = ?, DiaChi = ?, NgayVaoLam = ? WHERE MaNV = ?", (hoTenNV, ngaySinh, gioiTinh, diaChi, ngayVaoLam, maNV))
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
    
    
# CRUD Bang NhaCungCap
def create_nhaCungCap(tenNCC, diaChi):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO NhaCungCap (MaNCC, TenNCC, DiaChi) VALUES (dbo.fBornNhaCungCapId(), ?, ?)", (tenNCC, diaChi))
    conn.commit()
    cursor.close()
    conn.close()

def get_all_nhaCungCap():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM NhaCungCap")
    nhaCungCap = [
        {"MaNCC": row[0], "TenNCC": row[1], "DiaChi": row[2]}
        for row in cursor.fetchall()
    ]
    cursor.close()
    conn.close()
    return nhaCungCap

def update_nhaCungCap(maNCC, tenNCC, diaChi):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE NhaCungCap SET TenNCC = ?, DiaChi = ? WHERE MaNCC = ?", (tenNCC, diaChi, maNCC))
    conn.commit()
    cursor.close()
    conn.close()

def delete_nhaCungCap(maNCC):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM NhaCungCap WHERE MaNCC = ?", (maNCC,))
    conn.commit()
    cursor.close()
    conn.close()

# CRUD Bang NguyenLieu
def create_nguyenLieu(tenNL, soLong, donGiaNhap, donViTinh):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO NguyenLieu (MaNL, TenNL, SoLuong, DonGiaNhap, DonViTinh) VALUES (dbo.fBornValueNguyenLieuId(), ?, ?, ?, ?)", (tenNL, soLong, donGiaNhap, donViTinh))
    conn.commit()
    cursor.close()
    conn.close()

def get_all_nguyenLieu():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM NguyenLieu")
    nguyenLieu = [
        {"MaNL": row[0], "TenNL": row[1], "SoLuong": row[2], "DonGiaNhap": row[3], "DonViTinh": row[4]}
        for row in cursor.fetchall()
    ]
    cursor.close()
    conn.close()
    return nguyenLieu

def update_nguyenLieu(maNL, tenNL, soLuong, donGiaNhap, donViTinh):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE NguyenLieu SET TenNL = ?, SoLuong = ?, DonGiaNhap = ?, DonViTinh = ? WHERE MaNL = ?", (tenNL, soLuong, donGiaNhap, donViTinh, maNL))
    conn.commit()
    cursor.close()
    conn.close()
    
def delete_nguyenLieu(maNL):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM NguyenLieu WHERE MaNL = ?", (maNL,))
    conn.commit()
    cursor.close()
    conn.close()
    
# CRUD Bang SanPham
def create_sanPham(tenSP, donGiaBan):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO SanPham (MaSP, TenSP, DonGiaBan) VALUES (dbo.fBornSanPhamId(), ?, ?)", (tenSP, donGiaBan))
    conn.commit()
    cursor.close()
    conn.close()

def get_all_sanPham():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM SanPham")
    sanPham = [
        {"MaSP": row[0], "TenSP": row[1], "DonGiaBan": row[2]}
        for row in cursor.fetchall()
    ]
    cursor.close()
    conn.close()
    return sanPham

def update_sanPham(maSP, tenSP, donGiaBan):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE SanPham SET TenSP = ?, DonGiaBan = ? WHERE MaSP = ?", (tenSP, donGiaBan, maSP))
    conn.commit()
    cursor.close()
    conn.close()
    
def delete_sanPham(maSP):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM SanPham WHERE MaSP = ?", (maSP,))
    conn.commit()
    cursor.close()
    conn.close()
    
# CRUD Bang PhieuNhap
def create_phieuNhap(ngayLap, tongTien, tienVAT, tongCong, phuongThucThanhToan, maNCC, maNV):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO PhieuNhap (MaPN, NgayLap, TongTien, TienVAT, TongCong, PhuongThucThanhToan, MaNCC, MaNV) VALUES (dbo.fBornPhieuNhapId(), ?, ?, ?, ?, ?, ?, ?)", (ngayLap, tongTien, tienVAT, tongCong, phuongThucThanhToan, maNCC, maNV))
    conn.commit()
    cursor.close()
    conn.close()
    
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
    cursor = conn.cursor()
    cursor.execute("UPDATE PhieuNhap SET NgayLap = ?, TongTien = ?, TienVAT = ?, TongCong = ?, PhuongThucThanhToan = ?, MaNCC = ?, MaNV = ? WHERE MaPN = ?", 
                   (ngayLap, tongTien, tienVAT, tongCong, phuongThucThanhToan, maNCC, maNV, maPN))
    conn.commit()
    cursor.close()
    conn.close()
    
def delete_phieuNhap(maPN):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM ChiTietPhieuNhap WHERE MaPN = ?", (maPN,))
    cursor.execute("DELETE FROM PhieuNhap WHERE MaPN = ?", (maPN,))
    conn.commit()
    cursor.close()
    conn.close()

# CRUD Bang ChiTietPhieuNhap
def create_chiTietPhieuNhap(maPN,maNL, soLuong, thanhTien, thueTax):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO ChiTietPhieuNhap (MaPN, MaNL, SoLuong, ThanhTien, ThueTax) VALUES (?, ?, ?, ?, ?)", (maPN, maNL, soLuong, thanhTien, thueTax))
    conn.commit()
    cursor.close()
    conn.close()
    
def get_all_chiTietPhieuNhap():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM ChiTietPhieuNhap")
    chiTietPhieuNhap = [
        {"MaPN": row[0], "MaNL": row[1], "SoLuong": row[2], "ThanhTien": row[3], "ThueTax": row[4]}
        for row in cursor.fetchall()        
    ]
    cursor.close()
    conn.close()
    return chiTietPhieuNhap

def update_chiTietPhieuNhap(maPN, maNL, soLuong, thanhTien, thueTax):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE ChiTietPhieuNhap SET SoLuong = ?, ThanhTien = ?, ThueTax = ? WHERE MaPN = ? AND MaNL = ?", (soLuong, thanhTien, thueTax, maPN, maNL))
    conn.commit()
    cursor.close()
    conn.close()
    
def delete_chiTietPhieuNhap(maPN, maNL):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM ChiTietPhieuNhap WHERE MaPN = ? AND MaNL = ?", (maPN, maNL))
    conn.commit()
    cursor.close()
    conn.close()

# CRUD Bang HoaDon
def create_hoaDon(ngayLap, tongTien, phuongThucThanhToan, maNV):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO HoaDon (MaHD, NgayLap, TongTien, PhuongThucThanhToan, MaNV) VALUES (dbo.fBornHoaDonId(), ?, ?, ?, ?)", (ngayLap, tongTien, phuongThucThanhToan, maNV))
    conn.commit()
    cursor.close()
    conn.close()
    
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
    cursor = conn.cursor()
    cursor.execute("UPDATE HoaDon SET NgayLap = ?, TongTien = ?, PhuongThucThanhToan = ?, MaNV = ? WHERE MaHD = ?", (ngayLap, tongTien, phuongThucThanhToan, maNV, maHD))
    conn.commit()
    cursor.close()
    conn.close()
    
def delete_hoaDon(maHD):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM HoaDon WHERE MaHD = ?", (maHD,))
    conn.commit()
    cursor.close()
    conn.close()

# CRUD Bang ChiTietHoaDon
def create_chiTietHoaDon(maHD, maSP, soLuong, thanhTien):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO ChiTietHoaDon (MaHD, MaSP, SoLuong, ThanhTien) VALUES (?, ?, ?, ?)", (maHD, maSP, soLuong, thanhTien))
    conn.commit()
    cursor.close()
    conn.close()

def get_all_chiTietHoaDon():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM ChiTietHoaDon")
    chiTietHoaDon = [
        {"MaHD": row[0], "MaSP": row[1], "SoLuong": row[2], "ThanhTien": row[3]}
        for row in cursor.fetchall()
    ]
    cursor.close()
    conn.close()
    return chiTietHoaDon

def update_chiTietHoaDon(maHD, maSP, soLuong, thanhTien):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE ChiTietHoaDon SET SoLuong = ?, ThanhTien = ? WHERE MaHD = ? AND MaSP = ?", (soLuong, thanhTien, maHD, maSP))
    conn.commit()
    cursor.close()
    conn.close()

def delete_chiTietHoaDon(maHD, maSP):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM ChiTietHoaDon WHERE MaHD = ? AND MaSP = ?", (maHD, maSP))
    conn.commit()
    cursor.close()
    conn.close()

# ========================================================================================================

# Model R4:
# import model R4 từ file 







if __name__ == '__main__':
    conn = get_db_connection()
    # Tạo con trỏ
    cursor = conn.cursor()

    # Thực hiện truy vấn
    cursor.execute("SELECT * FROM ChiTietHoaDon")
    for row in cursor.fetchall():
        print(row)

    # Đóng kết nối
    cursor.close()
    conn.close()
