![](https://images.viblo.asia/4afe0c5c-6941-4410-8a4c-7f0c91c18128.jpg)


`Trình biên dịch` là trình dịch chuyển đổi từ ngôn ngữ nguồn (các ngôn ngữ lập trình bậc cao) thành ngôn ngữ đối tượng (ví dự như ngôn ngữ máy).  Ngược lại với `trình biên dịch`, `trình thông dịch`  là một chương trình bắt chước việc thực hiện của các chương trình được viết bằng ngôn ngữ nguồn. 

Rõ ràng, khả năng nhận thức của con người và một thiết bị điện tử như máy tính là khác nhau. Con người có thể hiểu bất cứ điều gì thông qua các ngôn ngữ tự nhiên, nhưng một máy tính thì không thể. Máy tính cần một trình dịch để chuyển đổi các ngôn ngữ được viết ở dạng ngôn ngữ mà con người có thể đọc thành dạng ngôn ngữ mà máy tính có thể đọc.

`Trình biên dịch` và `trình thông dịch` là các loại `trình dịch ngôn ngữ`.  Vậy `trình dịch ngôn ngữ` là gì?

`Trình dịch ngôn ngữ` là một phần mềm dịch các chương trình từ một ngôn ngữ nguồn ở dạng có thể đọc được bởi con người thành một chương trình tương đương bằng ngôn ngữ đối tượng. Ngôn ngữ nguồn nói chung là ngôn ngữ lập trình cấp cao và ngôn đối tượng thường là ngôn ngữ máy.

## Bảng so sánh


| Tiêu chí | Trình biện dịch | Trình thông dịch |
| -------- | -------- | -------- |
| Đầu vào     | Toàn bộ trường trình     | Chỉ một dòng code     |
| Đầu ra     | Mã đối tượng trung gian     | Không tạo ra bất kì mã đối tượng trung gian nào     |
| Cơ chế hoạt động     | Việc biên dịch sẽ phải hoàn thành công việc trước khi thực thi     | Việc biên dịch và thực thi sẽ là đồng thời     |
| Tốc độ     | Nhanh hơn     | Chậm hơn     |
| Bộ nhớ     | Yêu cầu bộ nhớ nhiều hơn do việc tạo mã đối tượng     | Nó đòi hỏi ít bộ nhớ hơn vì nó không tạo mã đối tượng trung gian     |
| Errors     | Hiển thị tất cả các lỗi sau khi biên dịch, tất cả cùng một lúc     | Hiển thị lỗi của từng dòng một     |
| Phát hiện error     | Rất khó khăn     | Tương đối dễ     |
| Các ngôn ngữ lập trình     | C, C++, C#, Scala, typescript     | PHP, Perl, Python, Ruby     |

## Định nghĩa `trình biên dịch`

`Trình biên dịch` là một trình dịch đọc một chương trình được viết bằng ngôn ngữ cấp cao và chuyển đổi nó thành ngôn ngữ máy hoặc ngôn ngữ cấp thấp và báo cáo các lỗi có trong chương trình. Nó chuyển đổi toàn bộ mã nguồn trong một lần hoặc có thể mất nhiều lượt để làm như vậy, nhưng cuối cùng, người dùng sẽ nhận được mã được biên dịch sẵn sàng để thực thi.

![](https://images.viblo.asia/b68e7915-c582-41d5-bba7-be677041fceb.jpg)

`Trình biên dịch` hoạt động theo từng giai đoạn, các giai đoạn khác nhau có thể được nhóm thành hai phần đó là:

* **Giai đoạn phân tích** của `trình biên dịch` cũng được gọi là phần đầu; trong đó chương trình được chia thành các phần cấu thành cơ bản và kiểm tra ngữ pháp, ngữ nghĩa và cú pháp của mã sau khi mã trung gian được tạo. Giai đoạn phân tích bao gồm phân tích từ vựng, phân tích ngữ nghĩa và phân tích cú pháp.
* **Giai đoạn tổng hợp** của `trình biên dịch` còn được gọi là phần cuối; trong đó mã trung gian được tối ưu hóa và mã đích được tạo. Giai đoạn tổng hợp bao gồm trình tối ưu hóa mã và trình tạo mã.

### Các giai đoạn biên dịch

Bây giờ hãy để chi tiết hiểu về hoạt động của từng giai đoạn.

1. **Trình phân tích từ vựng**: Nó quét mã dưới dạng nhóm ký tự, nhóm chuỗi ký tự thành từ vựng và đưa ra chuỗi mã thông báo có tham chiếu đến ngôn ngữ lập trình.
2. **Trình phân tích cú pháp**: Trong giai đoạn này, các mã thông báo được tạo trong giai đoạn trước được kiểm tra theo ngữ pháp của ngôn ngữ lập trình, cho dù các biểu thức có đúng về mặt cú pháp hay không.
3. **Trình phân tích ngữ nghĩa**: Nó xác minh xem các biểu thức và câu lệnh được tạo trong giai đoạn trước có tuân theo quy tắc của ngôn ngữ lập trình hay không và nó tạo ra các cây phân tích chú thích.
4. **Trình tạo mã trung gian**: Nó tạo ra một mã trung gian tương đương của mã nguồn. Có nhiều cách trình bày mã trung gian, nhưng TAC (Mã địa chỉ ba) được sử dụng rộng rãi nhất.
5. **Trình tối ưu hóa mã**: Nó cải thiện yêu cầu về thời gian và không gian của chương trình. Để làm như vậy, nó loại bỏ mã dự phòng có trong chương trình.
6. **Trình tạo mã**: Đây là giai đoạn cuối cùng của trình biên dịch trong đó mã đích cho một máy cụ thể được tạo. Nó thực hiện các hoạt động như quản lý bộ nhớ, gán đăng ký và tối ưu hóa cụ thể cho máy.

![](https://images.viblo.asia/c85c5360-940e-4936-9773-68840382678b.jpg)


`Symbol table (bảng ký hiệu)` là một cấu trúc dữ liệu quản lý các mã định danh cùng với loại dữ liệu có liên quan mà nó đang lưu trữ. Trình xử lý lỗi phát hiện, báo cáo, sửa các lỗi gặp phải giữa các giai đoạn khác nhau của trình biên dịch.

### Định nghĩa trình thông dịch

`Trình thông dịch` là một thay thế để thực thi một ngôn ngữ lập trình và thực hiện công việc tương tự như một trình biên dịch. `Trình thông dịch` thực hiện kiểm tra từ vựng, phân tích cú pháp và kiểm tra các kiểu tương tự như `trình biên dịch`. Nhưng `trình thông dịch` xử lý cây cú pháp trực tiếp để truy cập các biểu thức và thực thi câu lệnh thay vì tạo mã trung gian.

Một `trình thông dịch` có thể yêu cầu xử lý cùng một cây cú pháp nhiều lần, đó là lý do tại sao tốc độ sẽ đối chậm hơn so với thực hiện chương trình được biên dịch.

Việc biên dịch và thông dịch kết hợp để có thể thực thi ngôn ngữ lập trình. Trong đó một trình biên dịch tạo mã ở cấp trung gian, sau đó mã được diễn giải thay vì được biên dịch thành mã máy.

Sử dụng một `trình thông dịch` thì sẽ thuận lợi trong quá trình phát triển chương trình, trong đó phần quan trọng nhất là có thể kiểm tra việc sửa đổi chương trình một cách nhanh chóng thay vì chạy chương trình một cách hiệu quả.

## Tổng kết

Cả `trình biên dịch` và `trình thông dịch` đều có cùng một công việc nhưng khác nhau về quy trình vận hành, `Trình biên dịch` lấy mã nguồn theo cách tổng hợp trong khi `Trình thông dịch` lấy các phần cấu thành của mã nguồn.

Mặc dù cả `trình biên dịch` và `trình thông dịch` đều có những ưu điểm và nhược điểm nhất định. Với `trình thông dịch` thì mã  nguồn có thể thực thi ở mọi nơi mà không cần phải biên dịch trước. Nhưng bù lại thì `trình biên dịch` sẽ tiết kiệm thời gian thực thi hơn.