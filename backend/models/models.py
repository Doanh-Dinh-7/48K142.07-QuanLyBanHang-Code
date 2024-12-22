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



# # ========================================================================================================


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
