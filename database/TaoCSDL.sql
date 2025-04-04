﻿USE master;  
GO  
IF DB_ID ('HighlandsCoffee') IS NOT NULL  
DROP DATABASE HighlandsCoffee;  
GO 

-- Tạo database HighlandsCoffee
CREATE DATABASE HighlandsCoffee
GO

USE HighlandsCoffee
GO

-- Tạo bảng NhanVien
CREATE TABLE NhanVien (
    MaNV CHAR(10) CONSTRAINT PK_NhanVien_MaNV PRIMARY KEY,
    HoTenNV NVARCHAR(50) NOT NULL,
    NgaySinh DATETIME NOT NULL,
    GioiTinh BIT NOT NULL,
    DiaChi NVARCHAR(100) NOT NULL,
    NgayVaoLam DATETIME NOT NULL,
	AnhMinhHoa NVARCHAR(MAX) NULL
);

-- Tạo bảng DanhMucSanPham
CREATE TABLE DanhMucSanPham (
    MaDanhMuc CHAR(10) CONSTRAINT PK_DanhMucSanPham_MaDanhMuc PRIMARY KEY,
    TenDanhMuc NVARCHAR(50) NOT NULL
);

-- Tạo bảng SanPham
CREATE TABLE SanPham (
    MaSP CHAR(10) CONSTRAINT PK_SanPham_MaSP PRIMARY KEY,
    TenSP NVARCHAR(50) NOT NULL,
    DonGiaBan INT NOT NULL,
	AnhMinhHoa NVARCHAR(MAX) NULL,
	MaDanhMuc CHAR(10) NOT NULL,
	CONSTRAINT FK_SanPham_DanhMucSanPham FOREIGN KEY (MaDanhMuc) REFERENCES DanhMucSanPham(MaDanhMuc)
);

-- Tạo bảng NguyenLieu
CREATE TABLE NguyenLieu (
    MaNL CHAR(10) CONSTRAINT PK_NguyenLieu_MaNL PRIMARY KEY,
    TenNL NVARCHAR(50) NOT NULL,
    SoLuong INT NOT NULL,
	DonGiaNhap INT NOT NULL,
    DonViTinh CHAR(10) NOT NULL,
	AnhMinhHoa NVARCHAR(MAX) NULL
);

-- Tạo bảng NhaCungCap
CREATE TABLE NhaCungCap (
    MaNCC CHAR(10) CONSTRAINT PK_NhaCungCap_MaNCC PRIMARY KEY,
    TenNCC NVARCHAR(100) NOT NULL,
    DiaChi NVARCHAR(100) NOT NULL
);

-- Tạo bảng HoaDon
CREATE TABLE HoaDon (
    MaHD CHAR(10) CONSTRAINT PK_HoaDon_MaHD PRIMARY KEY,
    NgayLap DATETIME NOT NULL,
    TongTien INT NOT NULL,
    PhuongThucThanhToan BIT NOT NULL,
    MaNV CHAR(10) NOT NULL,
    CONSTRAINT FK_HoaDon_NhanVien FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);

-- Tạo bảng ChiTietHoaDon
CREATE TABLE ChiTietHoaDon (
    MaSP CHAR(10) NOT NULL,
    MaHD CHAR(10) NOT NULL,
    SoLuong INT NOT NULL,
    ThanhTien INT NOT NULL,
    PRIMARY KEY (MaSP, MaHD),
    CONSTRAINT FK_ChiTietHoaDon_SanPham FOREIGN KEY (MaSP) REFERENCES SanPham(MaSP),
    CONSTRAINT FK_ChiTietHoaDon_HoaDon FOREIGN KEY (MaHD) REFERENCES HoaDon(MaHD)
);

-- Tạo bảng PhieuNhap
CREATE TABLE PhieuNhap (
    MaPN CHAR(10) CONSTRAINT PK_PhieuNhap_MaPN PRIMARY KEY,
    NgayLap DATETIME NOT NULL,
    TongTien INT NOT NULL,
    TienVAT INT NOT NULL,
    TongCong INT NOT NULL,
    PhuongThucThanhToan BIT NOT NULL,
    MaNCC CHAR(10) NOT NULL,
    MaNV CHAR(10) NOT NULL,
    CONSTRAINT FK_PhieuNhap_NhaCungCap FOREIGN KEY (MaNCC) REFERENCES NhaCungCap(MaNCC),
    CONSTRAINT FK_PhieuNhap_NhanVien FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);

-- Tạo bảng ChiTietPhieuNhap
CREATE TABLE ChiTietPhieuNhap (
    MaPN CHAR(10) NOT NULL,
    MaNL CHAR(10) NOT NULL,
    SoLuong INT NOT NULL,
    ThanTien INT NOT NULL,
    ThueTax DECIMAL(4,2) NOT NULL,
    PRIMARY KEY (MaPN, MaNL),
    CONSTRAINT FK_ChiTietPhieuNhap_PhieuNhap FOREIGN KEY (MaPN) REFERENCES PhieuNhap(MaPN),
    CONSTRAINT FK_ChiTietPhieuNhap_NguyenLieu FOREIGN KEY (MaNL) REFERENCES NguyenLieu(MaNL)
);

-- Tạo bảng TaiKhoan
CREATE TABLE TaiKhoan (
    MaTK CHAR(10) CONSTRAINT PK_TaiKhoan_MaTK PRIMARY KEY,
    TenDangNhap NVARCHAR(50) NOT NULL UNIQUE,
    MatKhau NVARCHAR(MAX) NOT NULL,
    VaiTro NVARCHAR(20) NOT NULL CHECK (VaiTro IN ('Admin', 'NhanVien')),
    TrangThai BIT NOT NULL DEFAULT 1,  -- 1: Hoạt động, 0: Khóa
    MaNV CHAR(10) NULL,
    CONSTRAINT FK_TaiKhoan_NhanVien FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);