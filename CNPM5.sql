CREATE TABLE LOAISANH (
		MaLoaiSanh VARCHAR(10) PRIMARY KEY,
		TenLoaiSanh VARCHAR(50),
		DonGiaBanToiThieu NUMERIC,
		TinhTrang VARCHAR(255)
	);

	CREATE TABLE SANH (
		MaSanh VARCHAR(10) PRIMARY KEY,
		TenSanh VARCHAR(50),
		MaLoaiSanh CHAR(10),
		SoLuongBanToiDa INT,
		GhiChu TEXT,
		TinhTrang VARCHAR(255),
		FOREIGN KEY (MaLoaiSanh) REFERENCES LOAISANH(MaLoaiSanh)
	);

	CREATE TABLE CA (
		MaCa VARCHAR(10) PRIMARY KEY,
		TenCa VARCHAR(50),
		GioBatDau TIME,
		GioKetThuc TIME,
		TinhTrang VARCHAR(255)
	);

	CREATE TABLE PHIEUDATTIEC (
		SoPhieuDatTiec SERIAL PRIMARY KEY,
		TenChuRe VARCHAR(50),
		TenCoDau VARCHAR(50),
		SDT VARCHAR(50),
		NgayDatTiec DATE,
		NgayDaiTiec DATE,
		MaSanh VARCHAR(10),
		MaCa VARCHAR(10),
		TienDatCoc NUMERIC(15, 2),
		SoLuongBan INT,
		SoBanDuTru INT,
		DonGiaBan  NUMERIC(15, 2),
		TongTienBan NUMERIC(15, 2),
		FOREIGN KEY (MaSanh) REFERENCES SANH(MaSanh),
		FOREIGN KEY (MaCa) REFERENCES CA(MaCa),
		CONSTRAINT CK_NgDatTiec_NgDaiTiec CHECK (NgayDaiTiec >= NgayDatTiec)
	);

	CREATE TABLE HOADON (
		MaHoaDon SERIAL PRIMARY KEY,
		SoPhieuDatTiec SERIAL,
		NgayLapHoaDon DATE,
		NgayThanhToan DATE,
		TongTienDichVu NUMERIC(15, 2),
		TongTienHoaDon NUMERIC(15, 2),
		ConLai NUMERIC(15, 2),
		TinhTrang VARCHAR(255),
		FOREIGN KEY (SoPhieuDatTiec) REFERENCES PHIEUDATTIEC(SoPhieuDatTiec)
	);

	CREATE TABLE DICHVU (
		MaDichVu VARCHAR(10) PRIMARY KEY,
		TenDichVu VARCHAR(50),
		DonGia NUMERIC(15, 2),
		TinhTrang VARCHAR(255)
	);

	CREATE TABLE CHITIETDICHVU (
		MaDichVu VARCHAR(10),
		SoPhieuDatTiec SERIAL,
		SoLuong INT,
		DonGia NUMERIC(15, 2),
		ThanhTien NUMERIC(15, 2),
		GhiChu TEXT,
		PRIMARY KEY(MaDichVu, SoPhieuDatTiec),
		FOREIGN KEY (MaDichVu) REFERENCES DICHVU(MaDichVu),
		FOREIGN KEY (SoPhieuDatTiec) REFERENCES PHIEUDATTIEC(SoPhieuDatTiec)
	);

	CREATE TABLE MONAN (
		MaMonAn CHAR(10) PRIMARY KEY,
		TenMonAn VARCHAR(50),
		DonGia NUMERIC(15, 2),
		TinhTrang VARCHAR(255)
	);

	CREATE TABLE CHITIETMONAN (
		MaMonAn CHAR(10) NOT NULL,
		SoPhieuDatTiec SERIAL NOT NULL,
		SoLuong INT,
		DonGia NUMERIC(15, 2),
		ThanhTien NUMERIC(15, 2),
		GhiChu TEXT,
		PRIMARY KEY (MaMonAn, SoPhieuDatTiec),
		FOREIGN KEY (MaMonAn) REFERENCES MONAN(MaMonAn),
		FOREIGN KEY (SoPhieuDatTiec) REFERENCES PHIEUDATTIEC(SoPhieuDatTiec)
	);

	CREATE TABLE BAOCAODOANHSO (
		Thang SMALLINT NOT NULL,
		Nam SMALLINT NOT NULL,
		TongDoanhThu NUMERIC(15, 2),
		PRIMARY KEY (Thang, Nam)
	);

	CREATE TABLE CHITIET_BCDS (
		Ngay SMALLINT NOT NULL,
		Thang SMALLINT NOT NULL,
		Nam SMALLINT NOT NULL,
		SoLuongTiecCuoi INT,
		DoanhThu NUMERIC(15, 2),
		TiLe FLOAT,
		PRIMARY KEY (Ngay, Thang, Nam),
		FOREIGN KEY (Thang, Nam) REFERENCES BAOCAODOANHSO(Thang, Nam)
	);

	CREATE TABLE CHUCNANG (
		MaChucNang VARCHAR(10) PRIMARY KEY,
		TenChucNang VARCHAR(50),
		TenManHinhDuocLoad VARCHAR(50)
	);

	CREATE TABLE NHOMNGUOIDUNG (
		MaNhom VARCHAR(10) PRIMARY KEY,
		TenNhom VARCHAR(50)
	);

	CREATE TABLE PHANQUYEN (
		MaNhom VARCHAR(10) NOT NULL,
		MaChucNang VARCHAR(10) NOT NULL,
		PRIMARY KEY (MaNhom, MaChucNang),
		FOREIGN KEY (MaNhom) REFERENCES NHOMNGUOIDUNG(MaNhom),
		FOREIGN KEY (MaChucNang) REFERENCES CHUCNANG(MaChucNang)
	);

	CREATE TABLE NGUOIDUNG (
		TenDangNhap VARCHAR(20) NOT NULL PRIMARY KEY,
		MatKhau VARCHAR(255),
		TenNguoiDung VARCHAR(255),
		MaNhom VARCHAR(10),
		Email VARCHAR(255),
		SDT VARCHAR(10),

		FOREIGN KEY (MaNhom) REFERENCES NHOMNGUOIDUNG(MaNhom)
	);

	CREATE TABLE THAMSO (
		TenThamSo VARCHAR(255) NOT NULL PRIMARY KEY,
		GiaTri FLOAT
	);

	INSERT INTO LOAISANH (MaLoaiSanh, TenLoaiSanh, DonGiaBanToiThieu, TinhTrang)
	VALUES 
		('A', 'A', 1000000, 'Còn phục vụ'),
		('B', 'B', 1100000, 'Còn phục vụ'),
		('C', 'C', 1200000, 'Còn phục vụ'),
		('D', 'D', 1400000, 'Còn phục vụ'),
		('E', 'E', 1600000, 'Còn phục vụ'),
   		('F', 'F', 1500000, 'Ngưng phục vụ');

	INSERT INTO CA (MaCa, TenCa, GioBatDau, GioKetThuc, TinhTrang)
	VALUES 
		('001', 'Trưa', '11:00:00', '14:00:00', 'Còn phục vụ'),
		('002', 'Tối', '18:00:00', '21:30:00', 'Còn phục vụ'),
		('003', 'Sáng', '07:00:00','10:00:00', 'Ngưng phục vụ');

	INSERT INTO SANH (MaSanh, TenSanh, MaLoaiSanh, SoLuongBanToiDa, GhiChu, TinhTrang)
	VALUES 
		('001', 'Bạch Kim I', 'A', 25, 'Concept Nhật Bản thời xưa', 'Còn phục vụ'),
		('002', 'Bạch Kim II', 'A', 25, NULL, 'Còn phục vụ'),
		('003', 'Kim Cương I', 'B', 35, NULL, 'Còn phục vụ'),
		('004', 'Ruby I', 'C', 45, NULL, 'Còn phục vụ'),
		('005', 'Amethyst I', 'D', 55, 'Không gian xanh nhiều', 'Còn phục vụ'),
		('006', 'Sapphire I', 'E', 65, 'Hệ thống máy lạnh hiện đại', 'Còn phục vụ'),
		('007', 'Hồng Ngọc I', 'F', 70, 'Ánh sáng sân khấu đẹp','Ngưng phục vụ'),
		('008', 'Hồng Ngọc II', 'D', 50, NULL,'Ngưng phục vụ');
 
	INSERT INTO MONAN (MaMonAn, TenMonAn, DonGia, TinhTrang)
	VALUES
		('001', 'Chem Chép New Zealand Xốt Tiêu', 550000, 'Còn phục vụ'),
		('002', 'Heo Sữa Quay (1/2 con) – Bánh Bao', 440000, 'Còn phục vụ'),
		('003', 'Bồ Câu Tiềm Thảo Mộc Hạt Sen', 580000, 'Còn phục vụ'),
		('004', 'Tôm Hùm Baby Rang Hương Bách Thảo (1/2 con/khách)', 370000, 'Còn phục vụ'),
		('005', 'Bò Steak Sốt Vang Marzano', 510000, 'Còn phục vụ'),
		('006', 'Cá Tuyết Đút Lò Xốt XO', 760000, 'Còn phục vụ'),
		('007', 'Chân Ngỗng Sò Điệp Sốt Bào Ngư', 250000, 'Ngưng phục vụ'),
		('008', 'Lẩu Thượng Uyển – Bún Gạo', 370000, 'Còn phục vụ'),
		('009', 'Chè Thượng Uyển', 580000, 'Còn phục vụ'),
		('010', 'Chả Mực Vinh Quy', 790000, 'Còn phục vụ'),
		 ('011', 'Vịt Tì Bà Quay Ngũ Vị (1/2 con) – Bánh Bao', 520000, 'Còn phục vụ'),
		('012', 'Súp Bào Ngư Vi Cá', 430000, 'Còn phục vụ'),
		('013', 'Cua Lột Chiên Giòn, Gỏi Xoài Xốt Thái', 520000, 'Ngưng phục vụ'),
		('014', 'Bò Úc Sốt Nấm Rượu Vang Chardonnay', 730000, 'Ngưng phục vụ'),
		('015', 'Tôm Càng Rang XO', 530000, 'Còn phục vụ'),
		('016', 'Hải Sâm Hầm Tứ Bửu', 890000, 'Ngưng phục vụ'),
		('017', 'Lẩu Nhất Phẩm – Mì Hấp', 400000, 'Còn phục vụ'),
		('018', 'Chè Huyết Yến Hạt Sen', 310000, 'Còn phục vụ'),
		('019', 'Càng Cua Xốt Berry', 530000, 'Còn phục vụ'),
		('020', 'Sườn BBQ Nam Mỹ', 610000, 'Còn phục vụ'),
		('021', 'Bò Cuộn Phô Mai Kim Tiền', 460000, 'Còn phục vụ'),
		('022', 'Chả Cua Cuộn Rong Biển', 280000, 'Còn phục vụ'),
		('023', 'Súp Hải Sản Hạt Sen', 520000, 'Còn phục vụ'),
		('024', 'Gà Quay (1 con) – Bánh Bao', 470000, 'Còn phục vụ'),
		('025', 'Cá Tầm Nướng Sa Tế Giấy Bạc', 790000, 'Còn phục vụ'),
		('026', 'Chân Gà Hầm Bóng Cá Đông Cô', 460000, 'Còn phục vụ'),
		('027', 'Lẩu Thả Sài Gòn – Bún Gạo/ Mỳ Trứng', 350000, 'Còn phục vụ'),
		('028', 'Nho Đen', 140000, 'Còn phục vụ'),
		('029', 'Cánh Gà Nướng Thái', 250000, 'Còn phục vụ'),
		('030', 'Đà Điểu Cajun Xiên Que', 380000, 'Ngưng phục vụ'),
		('031', 'Tôm Rang Bách Thảo', 330000, 'Còn phục vụ'),
		('032', 'Gỏi Mực Vinh Quy', 760000, 'Còn phục vụ'),
		('033', 'Sườn Non Tiềm Sâm Bạch Qủa', 280000, 'Còn phục vụ'),
		('034', 'Cá Bống Mú Hấp Tương Tàu Xì', 250000, 'Còn phục vụ'),
		('035', 'Bò Áp Chảo Macau- Khoai Tây', 340000, 'Còn phục vụ'),
		('036', 'Đậu Hủ Cá Mặn Tay Cầm', 160000, 'Còn phục vụ'),
		('037', 'Lẩu Nấm Hải Sản Metropole – Miến Trắng', 400000, 'Ngưng phục vụ'),
		('038', 'Dâu Tây Nhúng Socola', 150000, 'Còn phục vụ'),
		('039', 'Mực Chiên Giòn Muối Bách Thảo', 730000, 'Còn phục vụ'),
		('040', 'Gà Kim Chi Nấm Hương', 310000, 'Còn phục vụ'),
		('041', 'Tôm Rang Bơ Tiêu Xanh', 280000, 'Còn phục vụ'),
		('042', 'Vịt Nướng Tiêu Đen Cà Tím', 340000, 'Còn phục vụ'),
		('043', 'Sườn Non Tiềm Bách Hợp Đông Trùng', 350000, 'Còn phục vụ'),
		('044', 'Cá Tầm Xốt Nấm Tiêu Đen Đút Lò', 490000, 'Còn phục vụ'),
		('045', 'Thăn Bò Áp Chảo Hạt Dẻ Hawaii', 580000, 'Còn phục vụ'),
		('046', 'Bóng Cá Sò Điệp Hầm Tóc Tiên', 460000, 'Còn phục vụ'),
		('047', 'Miến Cua Tay Cầm XO', 400000, 'Còn phục vụ'),
		('048', 'Bánh Phú Sỹ Hoa Tuyết', 240000, 'Ngưng phục vụ'),
		('049', 'Tàu Hủ Ky Cuộn Tôm – Xoài XO', 670000, 'Còn phục vụ'),
		('050', 'Gỏi Sứa Cầu Tam Bảo', 550000, 'Còn phục vụ'),
		('051', 'Sò Điệp Xào Trân Châu Tổ Chim', 380000, 'Còn phục vụ'),
		('052', 'Bò Xiên Mignon', 490000, 'Còn phục vụ'),
		('053', 'Vi Cá Tiềm Bách Hợp Hạt Sen', 580000, 'Ngưng phục vụ'),
		('054', 'Cá Bống Mú Hấp Kỳ Lân', 450000, 'Còn phục vụ'),
		('055', 'Bồ Câu Quay Mật Ong – Xôi Chiên', 310000, 'Còn phục vụ'),
		('056', 'Sò Điệp Hầm Bạch Qủa Đông Cô', 250000, 'Còn phục vụ'),
		('057', 'Lẩu Thọ Hỷ – Bún Gạo/ Mỳ Sợi', 700000, 'Còn phục vụ'),
		('058', 'Bánh Cup Cake Socola', 160000, 'Còn phục vụ'),
		('059', 'Bánh Hải Sản Vol Au Vent', 220000, 'Còn phục vụ'),
		('060', 'Gỏi Hải Sản Metropole', 260000, 'Còn phục vụ'),
		('061', 'Thịt Vịt Nấu Chao', 480000, 'Còn phục vụ'),
		('062', 'Mực Non Xào XO', 490000, 'Còn phục vụ'),
		('063', 'Súp Vi Cá Thịt Cua', 760000, 'Ngưng phục vụ'),
		('064', 'Cá Tầm Thượng Uyển', 540000, 'Ngưng phục vụ'),
		('065', 'Bò Úc Áp Chảo Sốt Vang – Khoai Tây', 730000, 'Còn phục vụ'),
		('066', 'Măng Tây Xào Nấm XO', 250000, 'Còn phục vụ'),
		('067', 'Cơm Thố Bào Ngư Quay', 350000, 'Còn phục vụ'),
		('068', 'Chè Hồ Đào', 110000, 'Còn phục vụ'),
		('069', 'Chem Chép NZ Nướng Tiêu', 430000, 'Còn phục vụ'),
		('070', 'Gỏi Ngự Tiến', 430000, 'Còn phục vụ'),
		('071', 'Heo Quay Sứa Biển', 340000, 'Còn phục vụ'),
		('072', 'Vịt Nướng Nấm Linh Chi Tiêu Đen', 420000, 'Còn phục vụ'),
		('073', 'Bò Nướng Tiềm Trân Châu Hải Thảo', 340000, 'Còn phục vụ'),
		('074', 'Tôm Càng Rang Xốt Ngũ Vị', 350000, 'Còn phục vụ'),
		('075', 'Bò Úc Xốt Nấm Rượu Vang Chi Lê', 760000, 'Ngưng phục vụ'),
		('076', 'Sứa Biển Hầm Hải Thảo', 730000, 'Còn phục vụ'),
		('077', 'Lẩu Hải Sản Nami – Mì Udon', 410000, 'Còn phục vụ'),
		('078', 'Trái Cây Tứ Qúy', 80000, 'Còn phục vụ'),
		('079', 'Chả giò bách hoa sốt chua ngọt', 280000, 'Còn phục vụ'),
		('080', 'Tôm cuộn cua Nhật sốt BBQ', 340000, 'Còn phục vụ'),
		('081', 'Bắp bò tiềm đông trùng thảo', 570000, 'Còn phục vụ'),
		('082', 'Cá tầm sốt cam', 250000, 'Còn phục vụ'),
		('083', 'Gà ta hấp bạch linh và cải thìa', 340000, 'Còn phục vụ'),
		('084', 'Mì xá xíu hoa kim ngân', 250000, 'Còn phục vụ'),
		('085', 'Chè đậu đỏ vị gừng tươi', 160000, 'Còn phục vụ'),
		('086', 'Mực rang muối dùng với salad xoài', 460000, 'Còn phục vụ'),
		('087', 'Tôm cuộn cua Nhật Teriyaki', 490000, 'Còn phục vụ'),
		('088', 'Súp sườn hạnh nhân', 550000, 'Còn phục vụ'),
		('089', 'Cá chẽm sốt Singapore', 490000, 'Ngưng phục vụ'),
		('090', 'Bắp bò sốt rượu vang đỏ dùng với bánh mì', 520000, 'Còn phục vụ'),
		('091', 'Mì gà quay', 280000, 'Còn phục vụ'),
		('092', 'Bánh trứng pudding Nhật', 240000, 'Còn phục vụ'),
		('093', 'Chả giò cua cá hồi', 520000, 'Còn phục vụ'),
		('094', 'Cá chẽm đút lò sốt phô mai', 450000, 'Còn phục vụ'),
		('095', 'Súp bắp cua măng tây', 200000, 'Còn phục vụ'),
		('096', 'Tôm phong sa dùng với salad', 300000, 'Còn phục vụ'),
		('097', 'Sườn non nấu đậu dùng với bánh mì', 280000, 'Còn phục vụ'),
		('098', 'Lẩu nấm sườn non dùng với mì udon', 400000, 'Còn phục vụ'),
		('099', 'Bánh mousse dừa', 190000, 'Còn phục vụ'),
		('100', 'Tôm phủ bánh ngô sốt phô mai cay', 520000, 'Còn phục vụ');
 
	INSERT INTO DICHVU (MaDichVu, TenDichVu, DonGia, TinhTrang)
	VALUES
		('001', 'Tung hoa', 250000, 'Còn phục vụ'),
		('002', 'Khăn voan tung bay', 300000, 'Còn phục vụ'),
		('003', 'Cupid nhí', 350000, 'Còn phục vụ'),
		('004', 'Bong bóng bay', 200000, 'Còn phục vụ'),
		('005', 'Đổ cát', 100000, 'Còn phục vụ'),
		('006', 'Tháp ly', 450000, 'Còn phục vụ'),
		('007', 'Thổi nến + bánh', 350000, 'Còn phục vụ'),
		('008', 'Dàn nhạc giao hưởng', 650000, 'Còn phục vụ'),
		('009', 'Múa mì', 200000, 'Còn phục vụ'),
		('010', 'Múa lân', 350000, 'Còn phục vụ'),
		('011', 'Chụp ảnh', 550000, 'Còn phục vụ'),
		('012', 'Thuê váy cưới', 1500000, 'Còn phục vụ'),
		('013', 'Trang điểm ngày cưới', 450000, 'Còn phục vụ'),
		('014', 'Trang trí tiệc cưới theo phong cách', 600000, 'Còn phục vụ'),
		('015', 'Trọn gói bia', 1050000, 'Còn phục vụ'),
		('016', 'Độc tấu Piano', 400000, 'Còn phục vụ'),
		('017', 'MC', 400000, 'Còn phục vụ'),
		('018', 'Karaoke trong 2 giờ', 400000, 'Còn phục vụ'),
		('019', 'Ban nhạc Aucostic', 500000, 'Còn phục vụ'),
		('020', 'Violin đón dâu', 600000, 'Còn phục vụ'),
		('021', 'Ca sĩ hát live', 500000, 'Ngưng phục vụ'),
		('022', 'Đèn sân khấu đa góc', 1000000, 'Ngưng phục vụ');

	INSERT INTO PHIEUDATTIEC (TenChuRe, TenCoDau, SDT, NgayDatTiec, NgayDaiTiec, MaSanh, MaCa, TienDatCoc, SoLuongBan, SoBanDuTru, DonGiaBan, TongTienBan)
	VALUES 
		('Võ Vũ Trường Giang', 'Trần Thị Nhã Phương', '0946139641', '2024-05-05', '2024-05-13', '001', '001', 5000000, 15, 7, 1530000, 33660000),
		('Huỳnh Trấn Thành', 'Hari Won', '0980159392', '2024-05-08', '2024-05-13', '001', '002', 8000000, 21, 7, 1350000, 37800000),
		('Ông Cao Thắng', 'Mai Hồng Ngọc', '0969160756', '2024-06-03', '2024-06-14', '002', '001', 12000000, 16, 6, 1610000, 35420000),
		('Kim Aron Lý', 'Hồ Thị Ngọc Hà', '0944986100', '2024-06-20', '2024-07-02', '004', '002', 10000000, 26, 4, 1560000, 46800000),
		('Lê Công Vinh', 'Trần Thị Thủy Tiên', '0976408712', '2024-07-07', '2024-07-12', '005', '001', 9000000, 30, 5, 1790000, 62650000),
		('Hoàng Kim Uyên', 'Võ Nguyễn Lan Trinh', '0972223639', '2024-07-25', '2024-08-03', '006', '002', 12000000, 16, 2, 1980000, 35640000),
		('Hứa Văn Đạt', 'Lâm Vĩ Dạ', '0975680505', '2024-07-28', '2024-08-07', '002', '001', 12000000, 35, 7, 1400000, 58800000),
		('Nguyễn Tuấn Kiệt', 'Nguyễn Kiều Cẩm Thơ', '0985075141', '2024-08-01', '2024-08-07', '002', '002', 7000000, 25, 3, 1480000, 41440000),
		('Phạm Nhật Minh', 'Phạm Thị Thanh Hằng', '0983231894', '2024-08-11', '2024-08-25', '006', '001', 8000000, 21, 4, 2130000, 53250000),
		('Nguyễn Hoàng', 'Nguyễn Khoa Tóc Tiên', '0957236314', '2024-05-01', '2024-05-20', '005', '001', 50000000, 30, 5, 2220000, 77700000);

	INSERT INTO CHITIETMONAN (MaMonAn, SoPhieuDatTiec, SoLuong, DonGia, ThanhTien, GhiChu)
	VALUES 
		('001', '1', 1, 550000, 550000, 'Ít cay'),
		('056', '1', 1, 250000, 250000, NULL),
		('018', '1', 1, 310000, 310000, NULL),
		('028', '1', 1, 140000, 140000, NULL),
		('022', '1', 1, 280000, 280000, NULL),
		('001', '2', 1, 550000, 550000, NULL),
		('028', '2', 1, 140000, 140000, NULL),
		('029', '2', 1, 250000, 250000, 'Nướng vừa phải, không cháy'),
		('034', '2', 1, 250000, 250000, NULL),
		('036', '2', 1, 160000, 160000, NULL),
		('066', '3', 1, 250000, 250000, 'Không bột ngọt'),
		('015', '3', 1, 530000, 530000, NULL),
		('068', '3', 2, 110000, 220000, NULL),
		('073', '3', 1, 340000, 340000, 'Không bỏ hành'),
		('078', '3', 1, 80000, 80000, NULL),
		('099', '3', 1, 190000, 190000, NULL),
		('078', '4', 3, 80000, 240000, NULL),
		('091', '4', 1, 280000, 280000, NULL),
		('088', '4', 1, 550000, 550000, NULL),
		('044', '4', 1, 490000, 490000, NULL),
		('009', '5', 1, 790000, 790000, NULL),
		('036', '5', 1, 160000, 160000, 'Dùng đậu hủ non'),
		('038', '5', 1, 150000, 150000, NULL),
		('041', '5', 1, 280000, 280000, NULL),
		('082', '5', 1, 250000, 250000, NULL),
		('085', '5', 1, 160000, 160000, NULL),
		('022', '6', 1, 280000, 280000, NULL),
		('091', '6', 1, 280000, 280000, 'Mì tươi và nước luộc'),
		('100', '6', 1, 520000, 520000, 'Ít cay'),
		('041', '6', 1, 280000, 280000, NULL),
		('028', '6', 2, 140000, 280000, NULL),
		('035', '6', 1, 340000, 340000, NULL),
		('082', '7', 1, 250000, 250000, 'Nhiều sốt thêm'),
		('085', '7', 1, 160000, 160000, 'Ít gừng và nhiều đá'),
		('038', '7', 2, 150000, 300000, NULL),
		('041', '7', 1, 280000, 280000, NULL),
		('058', '7', 1, 160000, 160000, NULL),
		('084', '7', 1, 250000, 250000, NULL),
		('073', '8', 1, 340000, 340000, NULL),
		('066', '8', 1, 250000, 250000, 'Xào chín măng'),
		('068', '8', 1, 110000, 110000, NULL),
		('034', '8', 1, 250000, 250000, NULL),
		('015', '8', 1, 530000, 530000, NULL),
		('006', '9', 1, 760000, 760000, NULL),
		('041', '9', 1, 280000, 280000, NULL),
		('060', '9', 2, 260000, 520000, NULL),
		('067', '9', 1, 350000, 350000, 'Thêm cơm cháy'),
		('068', '9', 2, 110000, 220000, NULL),
		('009', '10', 1, 580000, 580000, NULL),
		('039', '10', 1, 730000, 730000, 'Chiên ít dầu'),
		('041', '10', 1, 280000, 280000, NULL),
		('077', '10', 1, 410000, 410000, 'Không dùng tôm để chế biến'),
		('068', '10', 2, 110000, 220000, NULL);

	INSERT INTO CHITIETDICHVU (MaDichVu, SoPhieuDatTiec, SoLuong, DonGia, ThanhTien, GhiChu)
	VALUES 
		('001', '1', 3, 250000, 750000, 'hoa hồng Đà Lạt và hoa Tulip'),
		('005', '1', 3, 100000, 300000, NULL),
		('008', '2', 1, 650000, 650000, NULL),
		('010', '3', 1, 350000, 350000, NULL),
		('009', '3', 2, 200000, 400000, NULL),
		('012', '3', 1, 1500000, 1500000, NULL),
		('017', '4', 1, 400000, 400000, 'MC song ngữ'),
		('005', '4', 3, 100000, 300000, NULL),
		('018', '5', 2, 400000, 800000, NULL),
		('019', '5', 1, 500000, 500000, NULL),
		('004', '5', 2, 200000, 400000, NULL),
		('001', '6', 1, 250000, 250000, 'hoa trà mi cánh nhỏ'),
		('015', '6', 1, 1050000, 1050000, NULL),
		('008', '7', 1, 650000, 650000, NULL),
		('012', '7', 3, 1500000, 4500000, 'váy đầm xòe trắng hồng phấn'),
		('013', '7', 1, 450000, 450000, NULL),
		('020', '8', 1, 600000, 600000, 'list song sẽ gửi sau'),
		('001', '9', 3, 250000, 750000, 'tung 3 đợt khi cô dâu bước vào'),
		('011', '9', 1, 550000, 550000, NULL),
		('014', '9', 1, 600000, 600000, 'phong cách cổ điển'),
		('019', '10', 1, 500000, 500000, 'Tự chuẩn bị list song'),
		('001', '10', 4, 250000, 1000000, 'Hoa theo mùa ở Đà Lạt'),
		('017', '10', 2, 400000, 800000, 'Dẫn chương trình bằng song ngữ');

	INSERT INTO HOADON (SoPhieuDatTiec, NgaylapHoaDon, NgayThanhToan, TongTienDichVu, TongTienHoaDon, ConLai, TinhTrang)
	VALUES 
		( '1', '2024-05-13', '2024-05-13', 1050000, 34710000, 29710000, 'Chưa thanh toán'),
		( '2', '2024-05-13', '2024-05-13', 650000, 38450000, 30450000, 'Chưa thanh toán'),
		( '3', '2024-06-14', '2024-06-14', 2250000, 37670000, 25670000,'Chưa thanh toán'),
		( '4', '2024-07-02', '2024-07-02', 700000, 47500000, 37500000, 'Chưa thanh toán'),
		( '5', '2024-07-12', '2024-07-12', 1700000, 64350000, 55350000, 'Chưa thanh toán'),
		( '6', '2024-08-03', '2024-08-03', 1300000, 36940000, 24940000, 'Chưa thanh toán'),
		( '7', '2024-08-07', '2024-08-07', 5600000, 64400000, 52400000, 'Chưa thanh toán'),
		( '8', '2024-08-07', '2024-08-07', 600000, 42040000, 35040000, 'Chưa thanh toán'),
		( '9', '2024-08-25', '2024-08-25', 1900000, 55150000, 47150000, 'Chưa thanh toán'),
		( '10', '2024-05-20', '2024-05-21', 2300000, 80000000, 30000000, 'Đã thanh toán');

	INSERT INTO THAMSO (TenThamSo, GiaTri)
	VALUES 
		('TileTienPhat', 0.01),
		('ApDungQuyDinhPhat', 1);

	INSERT INTO NHOMNGUOIDUNG (MaNhom, TenNhom)
	VALUES 
		(0, 'Admin'),
		(1, 'Staff'),
		(2, 'User');

	INSERT INTO NGUOIDUNG (TenDangNhap, MatKhau, TenNguoiDung, MaNhom, Email, SDT)
	VALUES 
		('tannt', 'duytan1', 'Nguyễn Duy Tân', 0, 'tannt@gmail.com', '0797459425'),
		('daoddp', 'phuongdao2', 'Dương Đình Phương Dao', 1, 'daoddp@gmail.com', '0797565457'),
		('yenph', 'yen3', 'Phương Hoàng Yến', 1, 'yenph@gmail.com', '0797671489'),
		('sangnh', 'sang4', 'Nguyễn Hữu Sang', 2, 'sangnh@gmail.com', '0797777521'),
		('hantg', 'han5', 'Tăng Gia Hân', 2, 'hantg@gmail.com', '0797883553');