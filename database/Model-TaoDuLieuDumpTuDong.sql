--I/ Model tạo dữ liệu dump cho bảng NhanVien:
--	Sinh mã tự động
create or alter function fBornNhanVienId ()
returns char(10)
as
begin 
	declare @newStaffId varchar(10)

	select 
		@newStaffId = MAX(MaNV) 
	from NhanVien
	if @newStaffId is null
		set @newStaffId = 'NV00000001'
	else
	begin
		set @newStaffId = 'NV' + RIGHT('00000000'+ CAST((CAST(RIGHT(@newStaffId,8) as int) + 1) as varchar(8)),8)
	end
	
	return @newStaffId
end

-- Model tạo dữ liệu dump 
create or alter proc spInsertValueNhanVien
as
begin 
	declare @i int = 1,
			@RANDomDate date,
			@dateJoin date
	while @i <= 1000
	begin
		-- Tạo ngày sinh hợp lý từ 18-60 tuổi
		-- NewId: tạo ra mã id ngẫu nhiên
		-- CheckSum: tính tổng giá trị của chuỗi ngẫu nhiên
		set @RANDomDate = DATEADD(day,
									ABS(CHECKSUM(NEWID()) % 365), -- Tính ngày ngẫu nhiên trong năm,
									DATEADD(year, 
											- (18 + ABS(CHECKSUM(NEWID()) % (60-18+1))), -- Tính năm ngẫu nhiên trong khoảng 18-60 tuổi
											GETDATE()
											)
								)

		-- Sinh ngày làm tự động với ngày vào làm nhỏ hơn ngày hiện tại và lớn hơn hoặc bằng ngày nhân viên đủ 18 tuổi
		set @dateJoin = DATEADD(day, 
								ABS(CHECKSUM(NEWID()) % 365), 
								DATEADD(year, 
									- ABS(CHECKSUM(NEWID()) % (YEAR(getdate())-YEAR(@RANDomDate)+1)), 
									GETDATE())
						)

		if  YEAR(@dateJoin) - YEAR(@RANDomDate) < 18
			set @dateJoin = GETDATE()

		insert into NhanVien  (MaNV, HoTenNV, NgaySinh, GioiTinh, DiaChi, NgayVaoLam)
		values (
				dbo.fBornNhanVienId(),
				N'Nhân viên ' + CAST(@i as varchar(5)),
				@RANDomDate,
				case when @i%2 = 0 then 0 else 1 end,
				N'Địa chỉ minh hoạ '  + CAST(@i as varchar(5)),
				@dateJoin
				)
		if @@rowcount <= 0 
		begin 
			print N'insert thất bại' 
			return 
		end 

		set @i = @i + 1
	end
end

exec spInsertValueNhanVien

select * from NhanVien


--II/ Model tạo dữ liệu dump cho bảng NhaCungCap:
-- Sinh mã tự động
create or alter function fBornNhaCungCapId ()
returns char(10)
as
begin
	declare @newSupplierId varchar(10)
	select
		@newSupplierId = MAX(MaNCC)
	from NhaCungCap

	if @newSupplierId is null
		set @newSupplierId = 'NCC0000001'
	else
		set @newSupplierId = 'NCC' + RIGHT('0000000'+ CAST((CAST(RIGHT(@newSupplierId,7) as int) + 1) as varchar(7)),7)

	return @newSupplierId
end

-- Model tạo dữ liệu dump
create or alter proc spInsertValueNhaCungCap
as
begin
	declare @i int = 1

	while @i <= 1000
	begin
		insert into NhaCungCap (MaNCC, TenNCC,DiaChi)
		values (
				dbo.fBornNhaCungCapId(),
				N'Nhà cung cấp ' + CAST(@i as varchar(5)),
				N'Địa chỉ nhà cung cấp '  + CAST(@i as varchar(5))
				)
		if @@rowcount <= 0 
		begin 
			print N'insert thất bại' 
			return 
		end 

		set @i = @i + 1
	end
end

exec spInsertValueNhaCungCap

select * from NhaCungCap

--III/ Model tạo dữ liệu dump cho bảng SanPham:
--	Sinh mã tự động
create or alter function fBornSanPhamId()
returns char(10)
as
begin
	declare @newProductId varchar(10)

	-- MaSP: "SP00100001" (SP[xxx (dòng SP)] [xxxxx (loại SP)] (có 10 kí tự)
	select 
		@newProductId = MAX(MaSP)
	from SanPham

	if @newProductId is null
		set @newProductId = 'SP00000001'
	else
		set @newProductId = 'SP' + RIGHT('00000000'+ CAST((CAST(RIGHT(@newProductId,8) as int) + 1) as varchar(8)),8)

	return @newProductId
end

-- Model tạo dữ liệu dump
create or alter proc spInsertValueSanPham
as
begin
	declare @i int = 1

	while @i <= 1000
	begin
		insert into SanPham (MaSP,TenSP,DonGiaBan)
		values (
				dbo.fBornSanPhamId(),
				N'San pham ' + CAST(@i as varchar(5)),
				CAST((RAND()*100000) as int)
				)

		if @@rowcount <= 0 
		begin 
			print N'insert thất bại' 
			return 
		end 

		set @i = @i + 1
	end
end

exec spInsertValueSanPham
select * from SanPham

--IV/ Model tạo dữ liệu dump cho bảng NguyenLieu:
--	Sinh mã tự động
create or alter function fBornValueNguyenLieuId()
returns char(10)
as
begin
	declare @newIngredientId varchar(10)

	-- MaNL: "NL00100001" (NL[xxx (dòng NL)] [xxxxx (loại NL)] (có 10 kí tự)
	select 
		@newIngredientId = MAX(MaNL)
	from NguyenLieu
	 
	if @newIngredientId is null
		set @newIngredientId = 'NL00000001'
	else
		set @newIngredientId = 'NL' + RIGHT('00000000'+ CAST((CAST(RIGHT(@newIngredientId,8) as int) + 1) as varchar(8)),8)

	return @newIngredientId
end

-- Model tạo dữ liệu dump
create or alter proc spInsertValueNguyenLieu
as
begin
	declare @i int = 1
		
	while @i <= 1000
	begin
		insert into NguyenLieu (MaNL, TenNL, SoLuong, DonGiaNhap, DonViTinh)
		values (
				dbo.fBornValueNguyenLieuId(),
				N'Nguyen lieu ' + CAST(@i as varchar(5)),
				@i%10*5,
				CAST((RAND()*10000) as int),
				case 
					when @i%3 = 0 then 'Ky'
					when @i%3 = 1 then 'Thung'
					when @i%3 = 2 then 'Hop'
				end
				)

		if @@rowcount <= 0 
		begin 
			print N'insert thất bại' 
			return 
		end 

		set @i = @i + 1
	end
end

exec spInsertValueNguyenLieu
select * from NguyenLieu;

-- V/ Model tạo dữ liệu dump cho bảng PhieuNhap:
-- Sinh mã tự động
create or alter function fBornPhieuNhapId ()
returns char(10)
as
begin
	declare @newEntryId varchar(10)

	select 
		@newEntryId = MAX(MaPN)
	from PhieuNhap
	 
	if @newEntryId is null
		set @newEntryId = 'PN00000001'
	else
		set @newEntryId = 'PN' + RIGHT('00000000'+ CAST((CAST(RIGHT(@newEntryId,8) as int) + 1) as varchar(8)),8)

	return @newEntryId
end

-- Model tạo dữ liệu dump
create or alter proc spInsertValuePhieuNhap
as
begin
	declare	@i int = 1
			

	while @i <= 1000
	begin
		declare @dateCreate date,
				@total int
		-- Sinh ngày lập tự động trong vòng 10 năm đổ lại
		--	Ngày lập <= ngày hiện tại
		set @dateCreate = DATEADD(day, 
								- ABS(CHECKSUM(NEWID()) % 365), 
								DATEADD(year, 
									- ABS(CHECKSUM(NEWID()) % 15), --giới hạn 10 năm tính từ năm hiện tại 
									GETDATE())
						)

		set @total = CAST((RAND()*100000) as int)

		-- chèn dữ liệu vào bảng phieunhap với mã phiếu nhập tự 
		--	Tổng cộng = Tổng tiền + Tien VAT
		insert into PhieuNhap(MaPN, NgayLap, TongTien, TienVAT, TongCong, PhuongThucThanhToan, MaNCC, MaNV)
		values (
				dbo.fBornPhieuNhapId(),
				@dateCreate, 
				@total,
				@total*0.08, 
				@total*1.08,
				@i%2,
				'NCC'+ RIGHT('0000000'+CAST( (FLOOR(1 + (RAND() * 1000))) as varchar(7)),7),
				'NV'+ RIGHT('00000000'+CAST( (FLOOR(1 + (RAND() * 1000))) as varchar(8)),8)
				)
		if @@rowcount <= 0 
		begin 
			print N'insert thất bại' 
			return 
		end 

		set @i = @i + 1
	end
end

exec spInsertValuePhieuNhap
select * from PhieuNhap;

-- VI/ Model tạo dữ liệu dump cho bảng ChiTietPhieuNhap:
-- Model tạo dữ liệu dump
create or alter proc spInsertValueChiTietPhieuNhap 
as
begin 
	declare @i int = 1
	
	while @i <= 1000
	begin
		declare @MaNL varchar(10),
				@DonGiaNL int,
				@SoLuong int,
				@ThanhTien numeric(12,0)
		
		set @MaNL = 'NL'+ RIGHT('00000000'+CAST( (FLOOR(1 + (RAND() * 1000))) as varchar(8)),8)
		set @SoLuong = FLOOR(1 + (RAND() * 10))

		select @DonGiaNL = DonGiaNhap
		from NguyenLieu

		insert into ChiTietPhieuNhap (MaPN, MaNL, SoLuong, ThanTien, ThueTax)
		values (
				'PN'+ RIGHT('00000000'+CAST( (FLOOR(1 + (RAND() * 1000))) as varchar(8)),8),
				@MaNL,
				@SoLuong,
				@SoLuong*@DonGiaNL,
				0.08
				)

		set @i = @i + 1
	end
end

exec spInsertValueChiTietPhieuNhap

select * from ChiTietPhieuNhap;


-- VII/ Model tạo dữ liệu dump cho bảng HoaDon:
-- Sinh mã tự động
create or alter function fBornHoaDonId ()
returns char(10)
as
begin
	declare @newBillId varchar(10)

	select 
		@newBillId = MAX(MaHD)
	from HoaDon
	 
	if @newBillId is null
		set @newBillId = 'HD00000001'
	else
		set @newBillId = 'HD' + RIGHT('00000000'+ CAST((CAST(RIGHT(@newBillId,8) as int) + 1) as varchar(8)),8)

	return @newBillId
end

-- Model tạo dữ liệu dump
create or alter proc spInsertValueHoaDon
as
begin
	declare @i int = 1

	while @i <= 1000
	begin
		declare @dateCreate date,
				@total int
		-- Sinh ngày lập tự động trong vòng 10 năm đổ lại
		--	Ngày lập <= ngày hiện tại
		set @dateCreate = DATEADD(day, 
								- ABS(CHECKSUM(NEWID()) % 365), 
								DATEADD(year, 
									- ABS(CHECKSUM(NEWID()) % 15), --giới hạn 10 năm tính từ năm hiện tại 
									GETDATE())
						)

		set @total = CAST((RAND()*100000) as int)

		-- chèn dữ liệu vào bảng hoadon với mã phiếu nhập tự động
		insert into HoaDon (MaHD, NgayLap, TongTien, PhuongThucThanhToan, MaNV)
		values (
				dbo.fBornHoaDonId(),
				@dateCreate, 
				@total,
				@i%2,
				'NV'+ RIGHT('00000000'+CAST((FLOOR(1 + (RAND() * 1000))) as varchar(8)),8)
				)
		if @@rowcount <= 0 
		begin 
			print N'insert thất bại' 
			return 
		end 
		
		set @i = @i + 1
	end
end

exec spInsertValueHoaDon
select * from HoaDon;

--VIII/ Model tạo dữ liệu dump cho bảng ChiTietHoaDon:
-- Model tạo dữ liệu dump
create or alter proc spInsertValueChiTietHoaDon 
as
begin 
	declare @i int = 1
	
	while @i <= 1000
	begin
		declare @MaHD varchar(10),
				@DonGiaBan int,
				@SoLuong int,
				@ThanhTien numeric(12,0)
		
		set @MaHD = 'HD'+ RIGHT('00000000'+CAST( (FLOOR(1 + (RAND() * 1000))) as varchar(8)),8)
		set @SoLuong = FLOOR(1 + (RAND() * 10))

		select @DonGiaBan = DonGiaBan
		from SanPham

		insert into ChiTietHoaDon (MaHD, MaSP, SoLuong, ThanhTien)
		values (
				@MaHD,
				'SP'+ RIGHT('00000000'+CAST( (FLOOR(1 + (RAND() * 1000))) as varchar(8)),8),
				@SoLuong,
				@SoLuong*@DonGiaBan
				)

		set @i = @i + 1
	end
end

exec spInsertValueChiTietHoaDon
delete ChiTietHoaDon
select * from ChiTietHoaDon;

select * from NhanVien
select * from NhaCungCap
select * from NguyenLieu
select * from SanPham
select * from PhieuNhap
select * from ChiTietPhieuNhap
select * from HoaDon
select * from ChiTietHoaDon;
