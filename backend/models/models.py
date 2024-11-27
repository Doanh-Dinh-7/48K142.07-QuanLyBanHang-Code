import pyodbc
# Thay đổi các thông số bên dưới để phù hợp với thông tin SQL Server của bạn
server = 'ACERN5\SERVER'
database = 'HighlandsCoffee'
username = 'sa'
password = '1111'
# Chuỗi kết nối với SQL SERVER Authentication
connection_string = f'DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password};Trusted_Connection=yes;'

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
        
    

    
# # CRUD Bang PhieuNhap
# def create_phieuNhap(ngayLap, tongTien, tienVAT, tongCong, phuongThucThanhToan, maNCC, maNV):
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("INSERT INTO PhieuNhap (MaPN, NgayLap, TongTien, TienVAT, TongCong, PhuongThucThanhToan, MaNCC, MaNV) VALUES (dbo.fBornPhieuNhapId(), ?, ?, ?, ?, ?, ?, ?)", (ngayLap, tongTien, tienVAT, tongCong, phuongThucThanhToan, maNCC, maNV))
#     conn.commit()
#     cursor.close()
#     conn.close()
    
# def get_all_phieuNhap():
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("SELECT * FROM PhieuNhap")
#     phieuNhap = [
#         {"MaPN": row[0], "NgayLap": row[1], "TongTien": row[2], "TienVAT": row[3], "TongCong": row[4], "PhuongThucThanhToan": row[5], "MaNCC": row[6], "MaNV": row[7]}
#         for row in cursor.fetchall()        
#     ]
#     cursor.close()
#     conn.close()
#     return phieuNhap

# def update_phieuNhap(maPN, ngayLap, tongTien, tienVAT, tongCong, phuongThucThanhToan, maNCC, maNV):
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("UPDATE PhieuNhap SET NgayLap = ?, TongTien = ?, TienVAT = ?, TongCong = ?, PhuongThucThanhToan = ?, MaNCC = ?, MaNV = ? WHERE MaPN = ?", 
#                    (ngayLap, tongTien, tienVAT, tongCong, phuongThucThanhToan, maNCC, maNV, maPN))
#     conn.commit()
#     cursor.close()
#     conn.close()
    
# def delete_phieuNhap(maPN):
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("DELETE FROM ChiTietPhieuNhap WHERE MaPN = ?", (maPN,))
#     cursor.execute("DELETE FROM PhieuNhap WHERE MaPN = ?", (maPN,))
#     conn.commit()
#     cursor.close()
#     conn.close()

# # CRUD Bang ChiTietPhieuNhap
# def create_chiTietPhieuNhap(maPN,maNL, soLuong, thanhTien, thueTax):
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("INSERT INTO ChiTietPhieuNhap (MaPN, MaNL, SoLuong, ThanhTien, ThueTax) VALUES (?, ?, ?, ?, ?)", (maPN, maNL, soLuong, thanhTien, thueTax))
#     conn.commit()
#     cursor.close()
#     conn.close()
    
# def get_all_chiTietPhieuNhap():
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("SELECT * FROM ChiTietPhieuNhap")
#     chiTietPhieuNhap = [
#         {"MaPN": row[0], "MaNL": row[1], "SoLuong": row[2], "ThanhTien": row[3], "ThueTax": row[4]}
#         for row in cursor.fetchall()        
#     ]
#     cursor.close()
#     conn.close()
#     return chiTietPhieuNhap

# def update_chiTietPhieuNhap(maPN, maNL, soLuong, thanhTien, thueTax):
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("UPDATE ChiTietPhieuNhap SET SoLuong = ?, ThanhTien = ?, ThueTax = ? WHERE MaPN = ? AND MaNL = ?", (soLuong, thanhTien, thueTax, maPN, maNL))
#     conn.commit()
#     cursor.close()
#     conn.close()
    
# def delete_chiTietPhieuNhap(maPN, maNL):
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("DELETE FROM ChiTietPhieuNhap WHERE MaPN = ? AND MaNL = ?", (maPN, maNL))
#     conn.commit()
#     cursor.close()
#     conn.close()

# # CRUD Bang HoaDon
# def create_hoaDon(ngayLap, tongTien, phuongThucThanhToan, maNV):
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("INSERT INTO HoaDon (MaHD, NgayLap, TongTien, PhuongThucThanhToan, MaNV) VALUES (dbo.fBornHoaDonId(), ?, ?, ?, ?)", (ngayLap, tongTien, phuongThucThanhToan, maNV))
#     conn.commit()
#     cursor.close()
#     conn.close()
    
# def get_all_hoaDon():
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("SELECT * FROM HoaDon")
#     hoaDon = [
#         {"MaHD": row[0], "NgayLap": row[1], "TongTien": row[2], "PhuongThucThanhToan": row[3], "MaNV": row[4]}
#         for row in cursor.fetchall()        
#     ]
#     cursor.close()
#     conn.close()
#     return hoaDon

# def update_hoaDon(maHD, ngayLap, tongTien, phuongThucThanhToan, maNV):
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("UPDATE HoaDon SET NgayLap = ?, TongTien = ?, PhuongThucThanhToan = ?, MaNV = ? WHERE MaHD = ?", (ngayLap, tongTien, phuongThucThanhToan, maNV, maHD))
#     conn.commit()
#     cursor.close()
#     conn.close()
    
# def delete_hoaDon(maHD):
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("DELETE FROM HoaDon WHERE MaHD = ?", (maHD,))
#     conn.commit()
#     cursor.close()
#     conn.close()

# # CRUD Bang ChiTietHoaDon
# def create_chiTietHoaDon(maHD, maSP, soLuong, thanhTien):
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("INSERT INTO ChiTietHoaDon (MaHD, MaSP, SoLuong, ThanhTien) VALUES (?, ?, ?, ?)", (maHD, maSP, soLuong, thanhTien))
#     conn.commit()
#     cursor.close()
#     conn.close()

# def get_all_chiTietHoaDon():
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("SELECT * FROM ChiTietHoaDon")
#     chiTietHoaDon = [
#         {"MaHD": row[0], "MaSP": row[1], "SoLuong": row[2], "ThanhTien": row[3]}
#         for row in cursor.fetchall()
#     ]
#     cursor.close()
#     conn.close()
#     return chiTietHoaDon

# def update_chiTietHoaDon(maHD, maSP, soLuong, thanhTien):
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("UPDATE ChiTietHoaDon SET SoLuong = ?, ThanhTien = ? WHERE MaHD = ? AND MaSP = ?", (soLuong, thanhTien, maHD, maSP))
#     conn.commit()
#     cursor.close()
#     conn.close()

# def delete_chiTietHoaDon(maHD, maSP):
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("DELETE FROM ChiTietHoaDon WHERE MaHD = ? AND MaSP = ?", (maHD, maSP))
#     conn.commit()
#     cursor.close()
#     conn.close()

# # ========================================================================================================

# # Model R4:
# # import model R4 từ file 







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
