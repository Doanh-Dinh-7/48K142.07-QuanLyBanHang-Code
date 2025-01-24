-- MODULE 1: Kiểm tra sự tồn tại của nguyên liệu
create or alter function fCheckNameOfNguyenLieu(
    @TenNL nvarchar(50)   -- Tên nguyên liệu cần kiểm tra
)
returns bit
as
begin
    declare @KetQua bit

    -- Kiểm tra xem tên nguyên liệu đã tồn tại trong bảng NguyenLieu hay chưa
    if exists (select 1 from NguyenLieu where TenNL = @TenNL)
        set @KetQua = 1  -- Nguyên liệu đã tồn tại
    else
        set @KetQua = 0  -- Nguyên liệu chưa tồn tại

    return @KetQua
end

-- Kết quả 1:
select dbo.fCheckNameOfNguyenLieu(N'Nguyen lieu 1000')

-- Kết quả 0:
select dbo.fCheckNameOfNguyenLieu(N'Nguyen lieu 1100')
--===========================================================

-- MODULE 2: Kiểm tra mức tồn kho và trả về cảnh báo:
create or alter function fNotiQuantityNguyenLieu (
	@MaNL varchar(10), @MucTonKhoToiThieu int
)
returns nvarchar(100)
as
begin
    declare @SoLuong int,
			@CanhBao nvarchar(100)
    
    select @SoLuong = SoLuong from NguyenLieu where MaNL = @MaNL;

    if @SoLuong < @MucTonKhoToiThieu
        set @CanhBao = N'Cảnh báo: Nguyên liệu ' + @MaNL + N' có số lượng dưới mức tồn kho tối thiểu!'
    else
        set @CanhBao = N'Nguyên liệu ' + @MaNL + N' có số lượng đủ.'
    
    return @CanhBao
end

--test:
-- Đủ số lượng
select dbo.fNotiQuantityNguyenLieu ('NL00000009', 30)

-- Cảnh báo
select dbo.fNotiQuantityNguyenLieu ('NL00000001', 30)

--===========================================================


-- MODULE 3: Cập Nhật Giá Nhập Mới của Nguyên Liệu:
create or alter proc spUpdatePriceNguyenLieu
    @MaNL char(10),         -- Mã nguyên liệu cần cập nhật
    @GiaNhapMoi INT         -- Giá nhập mới của nguyên liệu
as
begin
    declare @GiaNhapHienTai int,
			@TyLeThayDoi float,
			@TenNL nvarchar(50),
			@SoLuong int,
			@DonViTinh char(10)

    -- Kiểm tra xem nguyên liệu có tồn tại không
    if not exists (select 1 from NguyenLieu where MaNL = @MaNL)
    begin
		print N'Nguyên liệu không tồn tại.'
		return
    end
    -- Lấy thông tin chi tiết về nguyên liệu
    select @TenNL = TenNL, @SoLuong = SoLuong, @GiaNhapHienTai = DonGiaNhap, @DonViTinh = DonViTinh
    from NguyenLieu 
	where MaNL = @MaNL

    -- Hiển thị thông tin chi tiết về nguyên liệu
    print N'Thông tin nguyên liệu:';
    print N'----------------------';
    print N'Mã nguyên liệu: ' + @MaNL;
    print N'Tên nguyên liệu: ' + @TenNL;
    print N'Số lượng tồn: ' + CAST(@SoLuong as nvarchar);
    print N'Đơn giá hiện tại: ' + CAST(@GiaNhapHienTai as nvarchar);
    print N'Đơn vị tính: ' + @DonViTinh;

    -- Tính tỷ lệ thay đổi giá nhập
    set @TyLeThayDoi = ABS(@GiaNhapMoi - @GiaNhapHienTai) * 1.0 / @GiaNhapHienTai;

    -- Kiểm tra nếu mức thay đổi vượt quá 50%
    IF @TyLeThayDoi > 0.5
    begin
        print N'Cảnh báo: Giá nhập thay đổi vượt quá 50%. Cập nhật không thành công.'
    end
    else
    begin
        -- Cập nhật giá nhập mới
        UPDATE NguyenLieu
        set DonGiaNhap = @GiaNhapMoi
        where MaNL = @MaNL;

		if @@rowcount <= 0 
		begin 
			print N'Cập nhật thất bại' 
			return 
		end 
        print N'Cập nhật giá nhập thành công.';
        print N'Giá nhập mới: ' + CAST(@GiaNhapMoi as nvarchar)
    end
end

-- test:
-- Nguyên liệu không tồn tại:
exec spUpdatePriceNguyenLieu 'NL10000001', 5719

-- Trường hợp thành công:
exec spUpdatePriceNguyenLieu 'NL00000001', 5719

-- Trường hợp không thành công:
exec spUpdatePriceNguyenLieu 'NL00000001', 10000000
--===========================================================

-- Module 4: Tự động cập nhật các tổng tiền phiếu nhập khi thêm mới thông tin chi tiết phiếu nhập
create or alter trigger tgCalculateTotalPhieuNhap
on ChiTietPhieuNhap
after insert
as
	declare @MaPN varchar(10),
			@VAT decimal(4,2),
			@TongTien int,
			@TienVAT int,
			@TongCong int
begin
	-- Lấy mã phiếu nhập từ bảng ChiTietPhieuNhap đã bị thay đổi
	select @MaPN = MaPN from inserted
	
	-- Lấy tổng tiền và tổng tiền thuế của các chi tiết phiếu nhập liên quan đến phiếu nhập
	select @TongTien = SUM(ThanTien),
			@TienVAT = SUM(ThanTien*ThueTax)
	from ChiTietPhieuNhap
	where MaPN = @MaPN

	-- Tính tổng cộng
	set @TongCong = @TongTien + @TienVAT

	-- Cập nhật lại bảng PhieuNhap với tổng tiền hàng, tiền VAT và tổng cộng tiền thanh toán
	UPDATE PhieuNhap
	set TongTien = TongTien + @TongTien,
    	TienVAT = TienVAT + @TienVAT,
    	TongCong = TongCong + @TongCong
	where MaPN = @MaPN

	if @@rowcount <= 0 
		begin 
			print N'Cập nhật thất bại' 
			return 
		end 
end

--test:
-- Kiểm tra thông tin Mã PN: PN00000003 trước và sau thay đổi
select distinct MaPN, --PN00000003	
		TongTien, --trc:755855	/ sau:844395
		TienVAT, --trc:60463	/ sau:67546
		TongCong --trc:816318	/ sau:911941
from PhieuNhap
where MaPN = 'PN00000003'

-- Thêm dữ liệu ChiTietPhieuNhap
insert into ChiTietPhieuNhap (MaPN, MaNL, SoLuong, ThanTien, ThueTax)
values ('PN00000003','NL00000136', 2, 300, 0.08)
--===========================================================


-- Module 5: Tự động cập nhật số lượng nguyên liệu tồn kho khi thêm mới thông tin chi tiết phiếu nhập
create or alter trigger tgCalculateQuantityNguyenLieu
on ChiTietPhieuNhap
after insert
as
	declare @MaNL varchar(10),
			@SoLuong int
begin
	--Lấy mã nguyên liệu và số lượng
	select @MaNL = MaNL, @SoLuong = SoLuong from inserted

	-- Cập nhật Số lượng nguyên liệu
	UPDATE NguyenLieu
	set SoLuong = SoLuong + @SoLuong
	where MaNL = @MaNL

	if @@rowcount <= 0 
		begin 
			print N'Cập nhật thất bại' 
			return 
		end
end

--test
-- Kiểm tra thông tin Mã NL: NL00000007 trước và sau thay đổi
select MaNL, --NL00000007
		SoLuong -- trc: 35 / sau: 37
from NguyenLieu 
where MaNL = 'NL00000007'

-- Thêm dữ liệu ChiTietPhieuNhap
insert into ChiTietPhieuNhap (MaPN, MaNL, SoLuong, ThanTien, ThueTax)
values ('PN00000993','NL00000007', 2, 300, 0.08)
--===========================================================


-- Module 6: Tự động cập nhật Tổng tiền hoá đơn khi thêm mới thông tin chi tiết hoá đơn
create or alter trigger tgCalculateTotalHoaDon
on ChiTietHoaDon
after insert
as
	declare @MaHD varchar(10),
			@ThanhTien int,
			@TongThanhTien int
begin
	-- Lấy mã hoá đơn từ bảng ChiTietHoaDon đã bị thay đổi
	select @MaHD = MaHD from inserted
	
	-- Lấy tổng thành tiền của các chi tiết hoá đơn liên quan đến hoá đơn
	select @TongThanhTien = SUM(ThanhTien)
	from ChiTietHoaDon
	where MaHD = @MaHD

	-- Cập nhật lại bảng HoaDon với tổng thành tiền thanh toán
	UPDATE HoaDon
	set TongTien = TongTien + @TongThanhTien
	where MaHD = @MaHD

	if @@rowcount <= 0 
		begin 
			print N'Cập nhật thất bại' 
			return 
		end 
end

--test
--Kiểm tra thông tin Mã HD: HD00000001 trước và sau thay đổi
select MaHD,	--HD00000001
		TongTien -- trc:81981	/ sau:82281

from HoaDon
where MaHD = 'HD00000001'

-- Thêm dữ liệu ChiTietHoaDon
insert into ChiTietHoaDon (MaHD, MaSP, SoLuong, ThanhTien)
values ('HD00000001', 'SP00000001', 2, 300)
--===========================================================


-- Module 7: Tính doanh thu dựa vào bảng hoá đơn trong mốc thời gian tuỳ chọn:
create or alter proc spGetRevenueByTime
	@star datetime,
	@end datetime,
	@DoanhThu int output
as
begin
	-- Kiểm tra tính hợp lệ của thời gian (@star <= @end <= Getdate() )
	if @star <= @end and @end <= GETDATE()
	begin
		--Tính Doanh thu theo mốc thời gian
		select @DoanhThu = SUM(TongTien)
		from HoaDon
		where NgayLap between @star and @end

	end
	else
	begin
		print N'Thời gian không hợp lệ'
		return
	end
end

--test: 
-- thời gian hợp lệ
declare @revenue int
exec spGetRevenueByTime
'2020-10-01',
'2020-12-31',
@revenue out
print @revenue;

-- thời gian không hợp lệ
declare @revenue int
exec spGetRevenueByTime
'2025-10-01',
'2025-12-31',
@revenue out
print @revenue
--===========================================================

-- Module 8: Tính chi phí nhập hàng dựa vào bảng phiếu nhập trong mốc thời gian tuỳ chọn:
create or alter proc spGetImportCostsByTime
	@star datetime,
	@end datetime,
	@ChiPhi int output
as
begin
	-- Kiểm tra tính hợp lệ của thời gian (@star <= @end <= Getdate() )
	if @star <= @end and @end <= GETDATE()
	begin
		--Tính Doanh thu theo mốc thời gian
		select @ChiPhi = SUM(TongTien)
		from PhieuNhap
		where NgayLap between @star and @end

	end
	else
	begin
		print N'Thời gian không hợp lệ'
		return
	end
end

--test: 
-- thời gian hợp lệ
declare @importCosts int
exec spGetImportCostsByTime
'2020-10-01',
'2020-12-31',
@importCosts out
print @importCosts;

-- thời gian không hợp lệ
declare @importCosts int
exec spGetImportCostsByTime
'2025-10-01',
'2025-12-31',
@importCosts out
print @importCosts
--===========================================================


-- Module 9: Tự động lưu vết Hoá đơn lỗi (Hoá đơn lỗi sẽ có ngày lập là [Ngày] [11:11:11.110])
create or alter trigger tgDeleteHoaDon
on HoaDon
instead of delete
as
	declare @MaHD varchar(10),
			@NgayLap datetime
begin
	-- Lấy mã hoá đơn
	select @MaHD = MaHD
	from deleted

	-- Lấy ngày lập
	select @NgayLap = NgayLap
	from HoaDon
	where MaHD = @MaHD

	-- thay đổi thời gian 
	set @NgayLap = CAST(CONVERT(date, @NgayLap) as datetime) + CAST('11:11:11.111' as datetime)

	-- Lưu vết hoá đơn 
	UPDATE HoaDon
	set NgayLap = @NgayLap
	where MaHD = @MaHD

	if @@rowcount <= 0 
		begin 
			print N'Cập nhật thất bại' 
			return 
		end 
end

-- test
-- Lưu vết thành công
delete HoaDon where MaHD = 'HD00000001'
select * from HoaDon where MaHD = 'HD00000001'

-- Lưu vết thất bại
delete HoaDon where MaHD = 'HD10000001'
--===========================================================


-- Module 10: Tự động giảm số lượng nguyên liệu tồn kho khi tạo mới chi tiết hoá đơn:
create or alter trigger tgProcessingNguyeLieu
on ChiTietHoaDon
after insert
as
	declare @MaSP varchar(10),
			@HeSo int,
			@MaNL varchar(10),
			@end int,
			@i int
begin
	-- Lấy mã Sản phẩm
	select @MaSP = MaSP,
			@HeSo = SoLuong
	from inserted

	-- Lấy mã số thứ tự sản phẩm
	set @i = CAST(RIGHT(@MaSP,8) as int)
	set @end = @i + 3
	
	-- Lập công thức DUMP giảm số lượng tồn kho 
	while @i <= @end
	begin
		set @MaNL = 'NL' + RIGHT('00000000' + CAST(@i as varchar(8)),8)
		
		UPDATE NguyenLieu
		set SoLuong = SoLuong - @HeSo*@i
		where MaNL = @MaNL

		if @@rowcount <= 0 
		begin 
			print N'Cập nhật thất bại' 
			return 
		end 

		set @i = @i + 1
	end
end

--test
insert into ChiTietHoaDon (MaHD, MaSP, SoLuong, ThanhTien)
values ('HD00000444', 'SP00000001', 2, 300)
-- thay đổi mã HD nếu cặp mã đã tồn tại trong dữ liệu DUMP 

select * from NguyenLieu
-- Với mã SP là SP00000001 thì:
-- MaNL			SoLuong --> SoLuongSauCheBien
-- NL00000001	3				1
-- NL00000002	6				2
-- NL00000003	9				3
--===========================================================

