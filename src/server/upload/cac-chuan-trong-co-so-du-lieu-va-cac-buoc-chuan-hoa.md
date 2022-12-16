# Mục đích 
Trong đa số các ứng dụng web và mobile đều cần có một bộ cơ sở dữ liệu để xử lý, lưu trữ và kết xuất thông tin. Hầu hết các chức năng trong một ứng dụng động cần thao tác với cơ sở dữ liệu. Vì thế, nếu một cơ sở dữ liệu không được thiết kế đúng chuẩn, nó sẽ không chỉ gây lãng phí không gian lưu trữ của hệ thống mà còn gây ảnh hưởng nghiêm trọng đến tốc độ của ứng dụng. 
# Các dạng chuẩn hóa chính
Có 4 dạng chuẩn hóa chính để xử lý cơ sở dữ liệu:
* Dạng chuẩn 1(1NF)
* Dạng chuẩn 2(2NF)
* Dạng chuẩn 3(3NF)
* Chuẩn Boyce-Codd(BCNF)
# Các khái niệm cơ bản
1. Phụ thuộc hàm<br>
  Trong một quan hệ, nếu giá trị của bộ thuộc tính A có thể suy ra được nếu biết giá trị của bộ thuộc tính B thì ta nói A phụ thuộc hàm vào B <br>
  VD: HocSinh(MaHS, TenHS, NgaySinh)<br>
TenHS và NgaySinh đều là những thuộc tính phụ thuộc hàm vào MaHS
2. Phụ phụ thuộc đầy đủ, phụ thuộc bộ phận<br>
     Trong một quan hệ, bộ thuộc tính A phụ thuộc hàm vào bộ thuộc tính B. Nếu loại bỏ một thuộc tính bất kì trong bộ thuộc tính B mà A vẫn phụ thuộc hàm vào B thì A được gọi là phụ thuộc hàm đầy đủ vào B. Ngược lại, A được gọi là phụ thuộc bộ phận vào B.  <br>
3. Phụ thuộc bắc cầu<br>
    Trong một quan hệ, nếu thuộc tính A phụ thuộc hàm vào thuộc tính B, thuộc tính B phụ thuộc hàm vào thuộc tính C thì thuộc tính A được gọi là phụ thuộc bắc cầu vào thuộc tính C thông qua thuộc tính B.  <br>
# Dạng chuẩn 1(1NF)
### Khái niệm
*Một quan hệ gọi là 1NF nếu<br>
    -Miền giá trị của mỗi thuộc tính chỉ chứa giá trị đơn nguyên tử, không thể phân tách ra được<br>
    -Giá trị của mỗi thuộc tính trong mỗi bộ phải là giá trị đơn<br>*
### Chuẩn hóa
-*Miền giá trị của mỗi thuộc tính chỉ chứa giá trị đơn nguyên tử, không thể phân tách ra được*<br>

**Xử lý: Tách các thuộc tính có miền giá trị đa nguyên tử thành các thuộc tính có miền giá trị đơn nguyên tử**<br>
VD: HOCSINH(MaHS, Tuoi, HoTen)<br>
Thuộc tính HoTen trong bảng trên là một thuộc tính chứa giá trị đa nguyên tử. HoTen bao gồm Họ và Tên.<br>
HOCSINH(MaHS, Tuoi, Ho, Ten)<br>
-*Giá trị của mỗi thuộc tính trong mỗi bộ phải là giá trị đơn*<br>
**Xử lý: Tách các thuộc tính chứa giá trị đa trị ra thành một bảng riêng**<br>
VD: NhanVien_ChucVu(MaNV, MaChucVu, ThoiGianNhanChuc)
| MaNV | MaChucVu | ThoiGianNhanChuc
| -------- | -------- | -------- |
| 1 | 2   3 | 15-8-2019 16-8-2019|
ChucVu(MaChuVu, TenChucVu)
| MaChucVu | TenChucVu |
| -------- | -------- | 
| 3 | GiamDoc |
| 2 | BaoVe |
NhanVien_ChucVu(MaNV, MaChucVu, ThoiGianNhanChuc)
 MaNV | MaChucVu | ThoiGianNhanChuc
| -------- | -------- | -------- |
| 1 | 2 | 15-8-2019 |
| 1 | 3 | 16-8-2019 |
# Dạng chuẩn 2(2NF)
### Khái niệm
*Một quan hệ gọi là 2NF nếu<br>
    - Quan hệ đó thỏa mãn chuẩn 1<br>
    - Mọi thuộc tính không khóa của quan hệ phụ thuộc hàm đầy đủ vào khóa chính<br>*
### Chuẩn hóa
* Tách các thuộc tính không khóa phụ thuộc bộ phận vào khóa chính thành quan hệ riêng, khóa của quan hệ mới là khóa bộ phận tương ứng ban đầu
* Loại bỏ thuộc tính không khóa ra khỏi quan hệ gốc
VD: MuonTra(**SoThe, MaSach**, TenNguoiMuon, TenSach, NgayMuon, NgayTra)<br>
TenNguoiMuon và TenSach phụ thuộc bộ phận vào khóa.
Sach(**MaSach**, TenSach)<br>
NguoiMuon(**SoThe**, TenNguoiMuon)<br>
MuonTra(**Sothe, MaSach**, NgayMuon, NgayTra)<br>
# Dạng chuẩn 3(3NF)
### Khái niệm
*Một quan hệ gọi là 3NF nếu<br>
    - Quan hệ đó thỏa mãn chuẩn 2<br>
    - Không có thuộc tính không khóa nào phụ thuộc bắc cầu vào khóa chính.<br>*
### Chuẩn hóa
- Tách quan hệ mới gồm các thuộc tính phụ thuộc bắc cầu và thuộc tính không khóa mà nó phụ thuộc vào<br>
- Loại bỏ các thuộc tính phụ thuộc bắc cầu vào khóa chính trong quan hệ ban đầu<br>
VD: NV(**MaNV**, HoTen, MaDV, TenDV)<br>
Ta thấy TenDV phụ thuộc bắc cầu vào khóa chính thông qua thuộc tính không khóa MaDV<br>
NV(MaNV, HoTen)<br>
DV(MaDV, TenDV)<br>
# Dạng chuẩn Boyce-Codd
### Khái niệm
*Một quan hệ được gọi là ở dạng chuẩn Boyce-Codd (BCNF) nếu:
- Thỏa mãn dạng chuẩn 3NF 
- Không có thuộc tính khóa phụ thuộc hàm vào thuộc tính không khóa.*
### Chuẩn hóa
- Tách các thuộc tính không khóa và thuộc tính khóa phụ thuộc hàm vào nó thành quan hệ mới, thuộc tính không khóa đó trở thành khóa trong quan hệ mới.<br>
- Loại bỏ các thuộc tính khóa ở bước 1 khỏi lược đồ gốc<br>
- Bổ sung các thuộc tính không khóa mà thuộc tính khóa (đã loại bỏ ở bước 2) phụ thuộc vào vào khóa của quan hệ gốc
# Kết luận
Chuẩn hóa cơ sở dữ liệu là điều quan trọng cần làm trong quá trình thiết kế cơ sở dữ liệu. Nó giúp loại bỏ các dữ liệu thừa và các dữ liệu dị thường ra khỏi bộ nhớ. Có 4 dạng chuẩn hóa cơ bản thường được áp dụng là 1NF, 2NF, 3NF, Boyce-Codd. Ngoài ra còn rất nhiều dạng chuẩn hóa khác với mức độ yêu cầu về cấu trúc cơ sở dữ liệu cao hơn.<br>
*Tài liệu tham khảo*<br>
Giáo trình: Nhập môn cơ sở dữ liệu (Vũ Bá Duy)