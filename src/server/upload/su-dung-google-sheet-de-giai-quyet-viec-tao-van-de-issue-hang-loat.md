# 1. Khi nào thì việc sử dụng là hữu ích?
Bạn có thể sử dụng Google Sheet để tạo hàng loạt các vấn đề  (issue) trên Backlog. Điều này rất hữu ích trong các trường hợp sau: 

* Khi phải tạo một vấn đề (issue) thường xuyên khi bắt đầu một dự án. 
* Khi thực hiện cácvấn đề (issue) tương tự một cách thường xuyên, chẳng hạn như vận hành và bảo trì.

# 2. Các bước để tạo vấn đề (issue) hàng loạt

**Chuẩn bị tệp Google sheet**

### 1. Sao chép tệp mẫu

Nhấp vào liên kết bên dưới để sao chép tệp.
[Tải tệp tin ](https://docs.google.com/spreadsheets/d/1gKQKleGumsOWnQc1bP2o06FaXpsa03h1gWnUVgv91WE/copy)

 Nếu bạn chưa đăng nhập vào Google, bạn có thể gặp lỗi khi sao chép. Trong trường hợp đó, vui lòng đăng nhập, đợi một lúc và thử lại.

### 2. Chờ khoảng 15 giây để tải về 
### 3. Kiểm tra menu trên thành công cụ của tệp tin

Lưu ý rằng tệp có tên  [Backlog] đã được thêm vào phía ngoài cùng bên phải của thanh menu.

![](https://images.viblo.asia/064a5fed-6cc1-4614-8a6b-2847483eda01.png)

# 3. Lấy dữ liệu từ Backlog (STEP1)

### 1. Lấy dữ liệu từ Backlog
Lấy các định nghĩa cần điền khi tạo mới một issue (tên loại, tên người dùng, v.v.) đã được thiết lập trong Backlog.

Từ menu Backlog, nhấp vào [STEP1:Backlogからデータを取得する] (BƯỚC1: Lấy dữ liệu từ Backlog). 

![](https://images.viblo.asia/f01c3832-c176-41a1-b852-f8a5dccfc222.png)

Nếu màn hình phê duyệt xuất hiện, hãy kiểm tra nội dung và nhấp vào [Tiếp tục] [Cho phép] nếu không có vấn đề gì.

![](https://images.viblo.asia/ff9920e6-d3c8-4516-8956-31f57c8fd709.png)
![](https://images.viblo.asia/97c7deb8-69e8-4335-9327-aed01c306687.png)

### 2. Nhập Space ID , v.v.

Hộp thoại nhập sau sẽ được hiển thị, hãy nhập các thông tin cần thiết.
* Backlog space ID
* Backlog API key:  Vui lòng điền[ API key ](https://viblo.asia/p/cai-dat-api-key-cua-backlog-bJzKmrOOZ9N)
* Backlog project key : điền cái mà đã được đăng kí trong dự án của bạn . 

![](https://images.viblo.asia/644bd19c-2fb6-4605-8c6f-084693f0bf1c.png)

### 3. Nhấp vào nút thực thi ( Execute button)

Lấy danh sách bao gồm các trường  đã được định nghĩa trong issue của dự án của bạn. Sau khi thành công, một cửa sổ bật lên thông báo hoàn thành sẽ xuất hiện ở góc dưới bên phải màn hình.

Nếu bạn gặp lỗi, vui lòng tham khảo **trang này**.

### 4. Xem lại tệp Google sheet 

Hãy đảm bảo rằng bạn có thể chọn các lựa chọn thông tin cần thiết như các loại , các danh mục trog backlog của dự án bạn 

# 4. Điền dữ liệu vào tệp Google sheets 

### 1. Đầu vào của tệp Google sheet
- Bạn muốn tạo hàng loạt vấn đề (issue) , hãy nhớ điền dữ liệu tương ứng với 1 issue trên một dòng 

* 「件名」( Chủ đề) và 「種別」( Loại)  là các trường bắt buộc.
* Vui lòng  chọn các option có sắn của 「種別」(Loại ) và 「担当者」( Người chỉ định - assignee) từ việc thực hiện đồng bộ hóa Backlog và Google sheet từ STEP 1 . (Nếu bạn nhập một option cái mà không có trong các lựa chọn pulldown như Backlog, sẽ xảy ra lỗi.)
* Không xóa hoặc thay đổi tiêu đề của dòng đầu tiên. (Chứa thông tin cần thiết cho quá trình tạo issue)
![](https://images.viblo.asia/ee727d13-467b-4bf2-824c-c362c204893a.png)

### 2. Chỉ định tác vụ cha (nếu cần)
Nếu tác vụ cha giữa các issue là khác nhau thì hãy điền nó . Ngoài ra, bằng cách nhập "*", các issue trong hàng loạt các issue sẽ có tác vụ cha giống nhau và giống cái đã được điền trước đó 
![](https://images.viblo.asia/ac00c415-e915-479c-adfe-a83b6d659310.png)

### 3. Nhập các thuộc tính tùy chỉnh (nếu cần)

Nếu thuộc tính tùy chỉnh được đăng ký trong dự án, thuộc tính đó sẽ được thêm vào dưới dạng cột màu xanh lam nhạt. Tuy nhiên, nhiều thuộc tính tùy chỉnh ví dụ dạng nút radio, dạng chọn nhiều lựa chọn (option) sẽ không được thêm vào.

Các thuộc tính tùy chỉnh có sẵn từ Gói cao cấp (Premium) trở lên.

# 5. Thực hiện quy trình tạo issue hàng loạt (STEP2)

### 1. Thực hiện tạo hàng loạt các vấn đề (issue)
Từ menu [Backlog], nhấp vào [STEP2:課題一括登録を実行] (BƯỚC2: Thực hiện đăng ký hàng loạt vấn đề )
![](https://images.viblo.asia/de300ced-8309-477a-b272-ae5cc499b794.png)


Hộp thoại nhập sau sẽ được hiển thị, nhưng vì nó đã được nhập ở BƯỚC 1, hãy nhấp vào nút thực thi ( Execute) để thực hiện quá trình tạo hàng loạt.

![](https://images.viblo.asia/6cdfd936-1eb2-43e7-9b4a-ce192904e076.png)

### 2. Kiểm tra kết quả trong tệp Google sheet
Khi nhấn và nút  [STEP2:課題一括登録を実行] (BƯỚC2: Thực hiện đăng ký hàng loạt vấn đề ), một sheet mới cho kết quả đầu ra được tạo và tự động chuyển sang sheet đó. Trên sheet này, bạn có thể kiểm tra danh sách các vấn đề đã được tạo trong một đợt tạo hàng loạt này.
![](https://images.viblo.asia/7f162b22-0265-4ea6-9029-022cd259b583.png)


### 3. Kiểm tra kết quả với Backlog
Nếu bạn mở danh sách vấn đề ( issue) trong Backlog, bạn có thể xác nhận rằng vấn đề (issue) đã được tạo.
![](https://images.viblo.asia/6b49187f-9b87-490f-bcfb-a7ad65af4e19.png)

### 4. Xong rồi
Cám ơn sự làm việc chăm chỉ của bạn!

# 6. Khi sử dụng lại tệp Google sheet sau khi đã tạo
Nếu bạn không thay đổi cài đặt dự án ở phía Backlog, vấn đề tạo mới chỉ là vận hành STEP2. Nếu có bất kỳ thay đổi nào như loại vấn đề hoặc danh mục, vui lòng thực hiện từ thao tác STEP1.

Cài đặt thuộc tính tùy chỉnh không được lấy tự động lại. Nên nếu tên của thuộc tính tùy chỉnh hoặc định dạng của thuộc tính tùy chỉnh bị thay đổi, hãy xóa tất cả các cột thuộc tính và thực hiện lại từ thao tác STEP1. ( Trừ những thuộc tính có sẵn của tệp mẫu)

# 7. Hạn chế
* Không thể sử dụng chức năng này nếu các giới hạn truy cập được đặt theo địa chỉ IP trong Backlog.
* Phiên bản / mốc thời gian (Versions / Milestones) sẽ không lấy dữ liệu nếu chức năng "Ẩn trên trang chủ dự án" được chọn.
* Số lượng vấn đề (issue)  tối đa có thể tạo được ở dạng danh sách là 500.
* Bạn không thể sử dụng nhiều thuộc tính tùy chỉnh ( dạng chọn nhiều lựa chọn (option) )  có thể chọn ở dạng danh sách.
* Bạn không thể sử dụng các thuộc tính tùy chỉnh cho các nút radio kiểu danh sách.
* Trong trường hợp gói miễn phí, không thể sử dụng chức năng này do giới hạn API.
* Không thể đảm bảo việc thực hiện song song chức năng này vì nó có thể vượt quá giới hạn API.

# Tài liệu tham khảo 
https://support-ja.backlog.com/hc/ja/articles/360042820873