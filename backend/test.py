import pyodbc
# Thay đổi các thông số bên dưới để phù hợp với thông tin SQL Server của bạn
server = 'ACERN5\SERVER'
database = 'HighlandsCoffee'
username = 'sa'
password = '1111'
# Chuỗi kết nối với Windows Authentication (không cần username và password)
connection_string = f'DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password};Trusted_Connection=yes;'

try:
    # Lựa chọn kiểu kết nối
    # conn = pyodbc.connect(connection_string_trusted)  # Dùng khi sử dụng Trusted Connection
    conn = pyodbc.connect(connection_string)  # Dùng khi sử dụng username và password
    
    print("Kết nối thành công tới cơ sở dữ liệu!")
    
    # Ví dụ thực hiện truy vấn
    cursor = conn.cursor()
    cursor.execute("SELECT TOP 5 * FROM NhanVien")  # Thay "YourTable" bằng tên bảng của bạn
    rows = cursor.fetchall()
    
    for row in rows:
        print(row)
    
    # Đóng kết nối
    cursor.close()
    conn.close()

except pyodbc.Error as e:
    print("Kết nối thất bại:", e)