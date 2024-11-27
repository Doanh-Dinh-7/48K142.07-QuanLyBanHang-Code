from models.models import get_db_connection, get_info_by_id  # Import hàm kết nối từ models.py

# CRUD Bang NhaCungCap
def create_nhaCungCap(tenNCC, diaChi):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("EXEC AddNhaCungCap @TenNCC = ?, @DiaChi = ?;", 
                    (tenNCC, diaChi))
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
    cursor.execute("EXEC UpdateNhaCungCap @MaNCC = ?, @TenNCC = ?, @DiaChi = ?;",
                    (maNCC, tenNCC, diaChi))
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

if __name__ == '__main__':
    all_nhaCungCap = get_all_nhaCungCap()
    print(all_nhaCungCap)