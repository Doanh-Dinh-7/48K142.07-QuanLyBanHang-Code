from models.models import get_db_connection, get_info_by_id  # Import hàm kết nối từ models.py

# CRUD Bang NguyenLieu
def create_nguyenLieu(tenNL, soLong, donGiaNhap, donViTinh):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("EXEC AddNguyenLieu @TenNL = ?, @SoLuong = ?, @DonGiaNhap = ?, @DonViTinh = ?;", 
                   (tenNL, soLong, donGiaNhap, donViTinh))
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
    cursor.execute("EXEC UpdateNguyenLieu @MaNL = ?, @TenNL = ?, @SoLuong = ?, @DonGiaNhap = ?, @DonViTinh = ?;", 
                   (maNL, tenNL, soLuong, donGiaNhap, donViTinh ))
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