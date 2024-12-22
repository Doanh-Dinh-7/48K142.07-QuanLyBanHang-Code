from models.models import get_db_connection, get_info_by_id  # Import hàm kết nối từ models.py

# Modle 1
def check_stock(MaNL, SoLuong):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("dbo.fNotiQuantityNguyenLieu (?, ?)", 
                    (MaNL, SoLuong))
    conn.commit()
    cursor.close()
    conn.close()
    
# Model 3
def check_change_price(MaNL, DonGiaNhap):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("exec spUpdatePriceNguyenLieu ?, ?", 
                    (MaNL, DonGiaNhap))
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    return result

# Model 7
def get_revenue_by_time(ThoiGianBatDau, ThoiGianKetThuc):
    conn = get_db_connection()
    cursor = conn.cursor()
    revnue =revnue = cursor.execute("declare @revenue int exec spGetRevenueByTime ?, ?, @revenue out; select @revenue", 
                    (ThoiGianBatDau, ThoiGianKetThuc)).fetchone()[0]
    cursor.close()
    conn.close()
    return revnue

def get_cost_by_time(ThoiGianBatDau, ThoiGianKetThuc):
    conn = get_db_connection()
    cursor = conn.cursor()
    cost = cursor.execute("declare @cost int exec spGetImportCostsByTime ?, ?, @cost out; select @cost", 
                    (ThoiGianBatDau, ThoiGianKetThuc)).fetchone()[0]
    cursor.close()
    conn.close()
    return cost

# def get_all_sanPham():
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("SELECT * FROM SanPham")
#     sanPham = [
#         {"MaSP": row[0], "TenSP": row[1], "DonGiaBan": row[2]}
#         for row in cursor.fetchall()
#     ]
#     cursor.close()
#     conn.close()
#     return sanPham
    
# def update_sanPham(maSP, tenSP, donGiaBan):
#     conn = get_db_connection()
#     try:
#         cursor = conn.cursor()
        
#         # Kiểm tra sản phẩm có tồn tại không
#         if not get_info_by_id("SanPham", "MaSP", maSP):
#             return None
#         cursor.execute("EXEC UpdateSanPham  @MaSP = ?, @TenSP = ?, @DonGiaBan = ?;", 
#                     (maSP, tenSP, donGiaBan))
#         conn.commit()
#         return True
#     except Exception as e:
#         conn.rollback()
#         raise e
#     finally:
#         cursor.close()
#         conn.close()

# def delete_sanPham(maSP):
#     conn = get_db_connection()
#     try:
#         cursor = conn.cursor()
        
#         # Kiểm tra sản phẩm có tồn tại không
#         if not get_info_by_id("SanPham", "MaSP", maSP):
#             return None
        
#         cursor.execute("DELETE FROM SanPham WHERE MaSP = ?", (maSP))
#         conn.commit()
#         return True
#     except Exception as e:
#         conn.rollback()
#         raise e
#     finally:
#         cursor.close()
#         conn.close()   
