Dạo gần đây mình phải làm việc rất nhiều với google spreadsheets vì ngoài redmine dự án còn quản lý tiến độ qua spreadsheets. Sau một thời gian mình thấy mất khá nhiều thời gian tay chân thủ công khi phải làm những việc này vì thế mình có nhờ vài tiền bối chỉ cho một số mẹo rất hữu dụng sau đây:

## 1. Protect Sheet & Protect range

Việc phân quyền cho cả spreadsheets chắc đã thông dụng với nhiều người, tuy nhiên google spreadsheets còn hỗ trợ sâu hơn là phân quyền cho từng sheet, thậm chí từng cột, từng ô.
Chức năng này có thể chia quyền cho từng sheet hoặc từng khu vực cho các member khác nhau trong dự án. Ví dụ QA sẽ được edit 1 khu vực, Dev được edit 1 khu vực để tránh việc nhiều người cùng truy cập 1 file và chẳng may sửa nhầm của nhau...

### Protect Sheet.
Click chuột phải vào tên sheet -> Chọn Protect Sheet.
![](https://images.viblo.asia/1d13c1bf-0e65-41c3-bcc6-c60c24be0817.png)

Hiện ra cửa sổ thiết lập "Protected sheets & ranges".
![](https://images.viblo.asia/8df4a0e0-650f-4be8-9757-8140619576d6.png)

Bạn có thể viết mô tả cho phân quyền này. Sau đó chọn sheet. Và xét quền ở nút "Set permissions"
![](https://images.viblo.asia/9c85ab6b-99e0-4e4a-9c18-d13632aec212.png)

Ngoài ra có thể tạo ra các ngoại lệ bằng cách tích vào ô "Except certian cells". Sau đó chọn khu vực ngoại lệ.
![](https://images.viblo.asia/04fbf8b7-9935-4cc8-bd77-d74c9f2b1b96.png)

### Protect Range
Cũng tương tự như protect sheet. Chọn cột hoặc khu vực muốn phân quyền rồi click chuột phải chọn "Protect range".
![](https://images.viblo.asia/858765ba-fa99-4ec8-ac17-cbad4c111739.png)

Cũng có cửa sổ tương tự hiện lên để xét quyền.
![](https://images.viblo.asia/fc17e08d-8606-47b8-944f-ede4780559d8.png)

## 2. Data validation

Khi quản lý 1 file, bạn đã vẽ ra 1 khung rất đẹp, từng ô từng ô sẽ kiểu như nào nhưng khi người khác vào lại điền mỗi người 1 kiểu, chữ hoa chữ thường, viết tắt không dấu làm bạn mất nhiều thời gian để sửa hoặc filter. Để tránh trường hợp này bạn có thể sử dụng tính năng "Data validation".

Chọn các cột hoặc các ô bạn muốn chỉnh, click chuột phải và chọn "Data validation". Cửa sổ thiết lập sẽ hiện ra.
![](https://images.viblo.asia/ea12d62a-ab8b-4678-99b3-1ab7c533fac7.png)

Trước tiện bạn có thể chỉnh là khu vực mà mình mong muốn ở hàng "Cell range".
Tiếp đến là hàng "Criteria", bạn có thể chọn kiểu dữ liệu mong muốn cho khu vực này. Ví dụ: lấy danh sách từ 1 khu vực có sẵn, tự viết danh sách các item của mình, dạng số, dạng chữ, ngày tháng,,,
![](https://images.viblo.asia/3110cb14-fc4e-4922-a59f-34256c7a432f.png)

Tiếp đến là tùy chọn khi nhập sai kiểu dữ liệu: Hiện thông báo hoặc không cho nhập.


## 3. Conditional Format
Để quản lý các công việc và tiến độ của chúng bạn sẽ nghĩ ra các thuộc tính hoặc trạng thái của nó. Mỗi trạng thái bạn lại muốn bôi màu riêng cho nó để dễ nhận biết. Hoặc 1 trường hợp khác là giữa 1 rừng dữ liệu, bạn muốn highlight những ô có giá trị đặt biệt mà mình muốn. Để làm những việc đấy bạn có thể sử dụng "Conditional Format".

Trước tiên bạn chọn cột hoặc khu vực muốn format, sau đó click chuột phải và chọn "Conditional formating". Cửa sổ thiết lập sẽ hiện lên"
![](https://images.viblo.asia/d0a60153-f2ed-4a89-ab9d-ace67e8f077b.png)

Tại đây bạn có thể chọn lại khu vực muốn thiết lập. Ở mục "Apply to range"
Tiếp đấy bạn cần thiết lập điều kiện ở mục "Format cells if...". Có rất nhiều lựa chọn. Ví dụ: ô trống, ô không trống, so sánh text chính xác, bao gồm, không bao gồm, bắt đầu và kết thúc với ký tự, là ngày bằng, trước, sau, là số bằng, lớn hơn, nhỏ hơn...
Sau khi chọn kiểu điều kiện bạn cần điền thêm giá trị để so sánh với điều kiện đó vào ô "Value of formula"
![](https://images.viblo.asia/877066c1-c7f6-48d7-b4be-d40842681f44.png)

Sau khi thiết lập xong điều kiện, bạn tiếp tục chọn style cho những khu vực đó ở mục "Formating style". Chọn màu, chọn cỡ chữ, kiểu chữ... sao cho phù hợp với từng điều kiện.

## 4. VLOOKUP

VLOOKUP là một trong những hàm tra cứu và tham chiếu, khi bạn cần tìm nội dung trong một bảng hay dải ô theo hàng.

Ở dạng đơn giản nhất, hàm VLOOKUP cho biết:

=VLOOKUP(Giá trị bạn muốn tra cứu, dải ô mà bạn muốn tìm giá trị, số cột trong dải ô chứa giá trị trả về, Kết quả khớp Chính xác hoặc Kết quả khớp Tương đối – được biểu thị là 0/FALSE hoặc 1/TRUE).

Có bốn phần thông tin mà bạn sẽ cần sử dụng để xây dựng cú pháp cho hàm VLOOKUP:

- Giá trị bạn muốn tra cứu, còn được gọi là giá trị tra cứu.

- Dải ô chứa giá trị tra cứu. 

- Số cột chứa giá trị trả về trong dải ô. Ví dụ: Nếu bạn chỉ định B2: D11 làm dải ô thì bạn nên tính B là cột đầu tiên, C là cột thứ hai và cứ tiếp tục như vậy.

- Hay bạn có thể chỉ định TRUE nếu bạn muốn có một kết quả khớp tương đối hoặc FALSE nếu bạn muốn có một kết quả khớp chính xác ở giá trị trả về. Nếu bạn không chỉ định bất cứ giá trị nào thì giá trị mặc định sẽ luôn là TRUE hay kết quả khớp tương đối.

Giả sử chúng ra có 1 bảng dữ liệu sau:
![](https://images.viblo.asia/a313203c-1873-4257-9c4a-2ea8d3b4a4cb.png)

Để tìm tuổi của người stt là 1 ta dùng hàm sau:
![](https://images.viblo.asia/8125b463-0246-4e7e-b58b-b0fc2bc44aae.png)
Kết quả trả về đúng là 18, cho người thứ nhất.

Để tìm tuổi của người có tên trùng với ô B4 ta dùng hàm sau:
![](https://images.viblo.asia/a9258329-18bc-49ac-b29a-c3fd8756dfc6.png)
Kết quả trả về đúng là 19 cho người có tên trùng với B4 là "Name3".

Ứng dụng trong dự án ta có thể dùng trong 1 vài trường hợp như liệt kê trạng thái của các công việc có độ ưu tiên nhất định. Hoặc ngược lại là liệt kê tên hoặc mã công việc có trạng thái mà mình mong muốn...