Sau khi thiết lập kết nối được từ Database Oracle trên Websphere Application Server, đồng thời khai báo kết nối đó trong mục biến môi trường trong Process App (bài trước). Ta sẽ tiến hành tích hợp với các service BPM để thao tác với Database.

*Xem bài viết gốc tại: https://viblo.asia/p/bpm-tutorial-thao-tac-voi-batabase-tren-ibm-bpm-djeZ1wX85Wz*

## Chuẩn bị:
- Coachview kèm với Business Object tương ứng
- Database và một bảng dữ liệu
## Các bước tiến hành:
### 1. Chuẩn bị coachview, Clientside human service và Table Database
- Ví dụ:
![](https://images.viblo.asia/faef5072-fc0f-48a8-b2dd-d5dc93d43df5.JPG)
hình 1: Business Object
![](https://images.viblo.asia/a3575f6a-dc7e-4e33-b696-a593ac2c38e8.JPG)
hình 2: View
![](https://images.viblo.asia/f2eafaf9-0af7-4bfb-830f-64fd0a80a764.JPG)
hình 3: Lookup table
### 2. Khởi tạo Client Side Human Service
- Tạo CSHS, tạo variable, thêm vào trong coach View mà bạn đã tạo ở bước trên (lưu ý các bước này mình sẽ mặc định là các bạn đã biết làm, chi tiết cách xây dựng UI đơn giản đã nằm trong tutorial series trước đó *https://viblo.asia/s/ibm-bpm-tutorial-RNZqg8gG50n*

![](https://images.viblo.asia/a74755f8-3983-4dc5-bfdd-056a7d029c55.JPG)
hình 4: CSHS flow và script khởi tạo (tránh lỗi null)
![](https://images.viblo.asia/0e0a4524-7673-47e3-97a0-56d2243e14d8.JPG)
hình 5: Thêm View Danh sách giao dịch
### 3. Tạo Service Flow để lấy dữ liệu
#### Bước 1:  Khởi tạo
![](https://images.viblo.asia/c81caa83-c32a-406f-8578-dce765ec1258.JPG)
#### Bước 2: Chọn loại service
- Chọn từ palette một activity tên là **Linked Service Flow**, đổi tên thành **SQL Execute Statement**.
- Mục **Implementation**, phần Called service ta chọn **Select** rồi chọn **SQL Execute Statement**.
#### Bước 3: Thêm variable
Chuyển sang tab **Variable**, ta thêm một số biến **Private**:

| Tên biến | Kiểu dữ liệu | Ý nghĩa |
| -------- | -------- | -------- |
| sql     | String     | Câu lệnh SQL     |
| parameters     | list of SQLParameter     | Các tham số truyền vào trong câu lệnh SQL     |
| maxRows     | Integer     | Số kết quả tối đa bạn muốn     |
| returnType     | String     | Kiểu dữ liệu trả về     |
| dataSourceName     | String     | Tên kết nối Database     |
| results     | list of ANY     | Kết quả trả về     |

- Bind hết các biến trên vào phần Input mapping của service  **SQL Execute Statement**, trừ biến **results** bind vào Output Mapping.
- Thêm biến Output **transaction** Kiểu dữ liệu **Transaction**
![](https://images.viblo.asia/9c6d1eec-eb76-4273-beb5-b7965a513749.JPG)

#### Bước 4: Viết script chuẩn bị
- Kéo một Script Task từ Palette, đổi tên thành **preparation**, điền code sau:
```
tw.local.sql = 'SELECT * FROM DANH_SACH_GIAO_DICH WHERE LOAI_TIEN_CHUYEN = ?';
tw.local.returnType = 'Record';
tw.local.dataSourceName = tw.env.DATA_SOR_NAME;
tw.local.parameters = new tw.object.listOf.SQLParameter();
tw.local.parameters[0] = new tw.object.SQLParameter();
tw.local.parameters[0].mode = 'IN';
tw.local.parameters[0].type = 'VARCHAR';
tw.local.parameters[0].value = 'VND';
```
Giải thích:


| Dòng |  Ý nghĩa |
| -------- | -------- |
| 1     | Câu lệnh SQL, dấu ? sẽ tương ứng với tham số được truyền vào bên dưới     |
| 2     | Kiểu dữ liệu trả về đặt là Record, lưu ý có rất nhiều cách xử lý dữ liệu trả về, mình chọn cách đơn giản nhất     |
| 3     | Gán với biến môi trường Tên kết nối Database     |
| 4     | Khai báo list tham số (list of SQL Parameter)     |
| 5     | Khai báo tham số (SQL Parameter) thứ nhất     |
| 6     | Định nghĩa thuộc tính mode: loại dữ liệu vào ra: IN     |
| 7     | Định nghĩa thuộc tính type: kiểu dữ liệu: VARCHAR     |
| 8     | Gán giá trị cho tham số     |
#### Bước 5: Viết Script gán dữ liệu trả về
- Kéo một Script Task từ Palette, đổi tên thành **mapping data**, điền code sau:
```
tw.local.transaction = new tw.object.listOf.Transaction();
if (tw.local.results.length > 0){
	for (var i = 0; i < tw.local.results.length; i++){
		tw.local.transaction[i] = new tw.object.Transaction();
		tw.local.transaction[i].cusId = tw.local.results[i].ID_KHACH_HANG;
		tw.local.transaction[i].cusName = tw.local.results[i].TEN_NGUOI_HUONG;
		tw.local.transaction[i].caseId = tw.local.results[i].CASE_ID;
		tw.local.transaction[i].branchId = tw.local.results[i].MA_CHI_NHANH;
		tw.local.transaction[i].date = tw.local.results[i].NGAY_GIAO_DICH;
		tw.local.transaction[i].amount = tw.local.results[i].SO_TIEN_CHUYEN;
		tw.local.transaction[i].beneficiaryBank = tw.local.results[i].NGAN_HANG_HUONG;
		tw.local.transaction[i].currencyType = tw.local.results[i].LOAI_TIEN_CHUYEN;
		
	}
}
```
#### Bước 6: Test service
- Nhấn biểu tượng **Debug** ở góc màn hình: ![](https://images.viblo.asia/deae1651-fa6b-4e88-8600-e405eca7c2d2.JPG)
- Bảng điều khiển bên phải màn hình, ta mở mục Data để xem dữ liệu đã thay đổi như thế nào. Tiếp đó ta nhấn nút Step Over để qua từng bước
![](https://images.viblo.asia/30dd1c41-8295-434b-9fb1-051e3e63c6d6.JPG)
- Kết thúc Debug, ta mở data của variable **transaction** ra nếu có dữ liệu như hình là được:

![](https://images.viblo.asia/9f5d82bb-5d4b-4112-8a59-215f921fca36.JPG)
#### Bước 7: Gắn vào luồng CSHS
- Gắn service vào luồng như hình
![](https://images.viblo.asia/e185fef9-674b-4be9-9220-dababf8e685b.JPG)

- Binding output của service là biến của CSHS
- Nhấn Run để mở màn hình, nếu có kết quả như hình là được

![](https://images.viblo.asia/1d6d5b31-6181-4c5a-996a-ce655fd5cb79.JPG)
## Lưu ý:
- Có rất nhiều cách để xử lý kết quả trả về, không nhất thiết kiểu dữ liệu trả về (tw.local.returnType) phải là Record, nó có thể là XMLElement hoặc thậm chí một Business Object trực tiếp. Vấn đề ở đây nằm ở cách tiếp cận nào đơn giản cho mô hình dữ liệu của bạn đang có, bởi vì trong bài viết này, mình đã lựa chọn cách thông dụng và đơn giản nhất.
- Lỗi có thể xảy ra ở khắp mọi nơi, lưu ý luôn đọc kĩ và làm cẩn thận từng bước. Các bạn có thể đặt câu hỏi về lỗi tại mục comment.
- Đối với thêm, sửa, xóa, mình cảm thấy nó cũng đơn giản như select nên bài tiếp theo sẽ nói về thao tác với procedure, thêm sửa xóa DB các bạn tự vận động tư duy nha.