from models.models import get_db_connection, get_info_by_id  # Import hàm kết nối từ models.py

# CRUD Bang SanPham
def create_sanPham(tenSP, donGiaBan):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("EXEC AddSanPham @TenSP = ?, @DonGiaBan = ?;", 
                    (tenSP, donGiaBan))
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
    cursor.execute("EXEC UpdateSanPham  @MaSP = ?, @TenSP = ?, @DonGiaBan = ?;", 
                    (maSP, tenSP, donGiaBan))
    conn.commit()
    cursor.close()
    conn.close()
    
def delete_sanPham(maSP):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM SanPham WHERE MaSP = ?", (maSP))
    conn.commit()
    cursor.close()
    conn.close()