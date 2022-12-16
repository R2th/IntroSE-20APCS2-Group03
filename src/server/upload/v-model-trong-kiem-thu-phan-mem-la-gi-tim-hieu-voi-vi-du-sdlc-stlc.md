# Trước hết để tìm hiểu V model, chúng ta cần biết:

## SDLC là gì?

SDLC (Software Development Life Cycle) hay còn gọi là chu kì phát triển phần mềm. Nó là chuỗi các hoạt động do nhà phát triển thực hiện để thiết kế và phát triển phần mềm.

Mặc dù SDLC sử dụng thuật ngữ “Development”, không chỉ là các công việc mã hóa được thực hiện bởi deverloper mà nó còn kết hợp các công việc được đóng góp bởi kiểm thử viên và các bên liên quan. Testcases được tạo ở SDLC.

![](https://images.viblo.asia/434d1fdb-044f-458d-b664-dde45444e6a4.jpg)

Nguồn: http://en.wikipedia.org/wiki/File:SDLC_-_Software_Development_Life_Cycle.jpg


##  STLC là gì?

STLC (Software Testing Life Cycle) hay còn được là vòng đời kiểm thử phần mềm. Nó bao gồm một loại các hoạt động được thực hiện bởi người kiểm thử để kiểm tra sản phẩm phần mềm của bạn.

Mặc dù STLC sử dụng thuật ngữ “testing” nhưng nó không chỉ liên quan đến kiểm thử viên. Trong một số trường hợp nó còn liên quan đến các nhà phát triển.

Trong STLC testsase được thực thi

## Mô hình thác nước (Waterfall Model) là gì?

Mô hình thác nước là một mô hình tuần tự các giai đoạn khác nhau của hoạt động phát triển phần mềm. Mỗi giai đoạn được thiết kế để thực hiện các hoạt động trong chu kì phát triển phần mềm. Giai đoạn kiểm thử trong mô hình này chỉ được bắt đầu khi đã triển khai hệ thống xong.
Kiểm thử được hoàn thành trong SDLC.

## V model là gì?

Vmodel là sự mở rộng của mô hình thác nước. Không giống như mô hình thác nước. Ở V model, tương ứng với một giai đoạn kiểm thử là một giai đoạn phát triển phần mềm, thử nghiệm trong mô hình chữ V được thực hiện song song với chu kì phát triển phần mềm.

## Ví dụ để hiểu hơn về V model 

Giả sử, bạn được giao một nhiệm vụ là phát triển một phần mềm cho khách hàng. Bây giờ, không nói đến nền tảng kỹ thuật của bạn. Hãy thử đưa ra một  giả thiết về trình tự các bước bạn sẽ thực hiện để hoàn thành nhiệm vụ.

![](https://images.viblo.asia/d68d01de-be60-4b3a-987b-394988b96bdb.png)

Trình tự đúng sẽ là:




|Các giai đoạn khác nhau trong chu trình phát triển phần mềm |Các hoạt động được thực hiện trong từng giai đoạn | 
| -------- | -------- | -------- |
|  Lấy yêu cầu    | Thu thập càng nhiều càng tốt thông tin chi tiết và thông số kỹ thuật của phần mềm từ mong muốn của khách hàng. Ở giai đoạn này chỉ tiến hành thu thập yêu cầu| 
| Thiết kế hệ thống    | Lên kế hoạch lựa chọn ngôn ngữ lập trình như JAVA, PHP… cơ sở dữ liệu như Oracle, My SQL….     | 
|   Giai đoạn xây dựng   | Sau giai đoạn thiết kế hệ thống đó là giai đoạn tiến hành xây dựng. Ở giai đoạn này sẽ thực hiện triển khai thực hiện mã hóa code     | 
| Giai đoạn kiểm thử   |Tiếp đến bạn thực hiện kiểm thử để xác minh rằng nó được xây dựng dực theo thông số kỹ thuật được cung cấp bởi khách hàng    | 
|Giai đoạn triển khai  | Thực hiện triển khai ứng dụng trong môi trường thật     | 
| Giai đoạn bảo trì     |Giai đoạn bảo trì.	Khi hệ thống của bạn đã sẵn sàng để sử dụng. Bạn có thể thực hiện nâng cấp bảo trì thay đổi code theo yêu cầu của khách hàng  | 



Tất cả các bước này tạo thành mô hình thác nước trong vòng đời phát triển phần mềm 
# Vấn đề với mô hình thác nước

Như các bạn đã thấy, việc kiểm thử trong mô hình này được tiến hành sau khi code xong

Nhưng khi bạn làm việc trong dự án lớn, các hệ thống phức tạp, bạn có thể sẽ bỏ lỡ các chi tiết chính trong giai đoạn lấy yêu cầu. Trong trường hợp như vậy, một sản phẩm không chính xác sẽ được bàn giao cho khách hàng. Bạn có thể phải làm lại từ đầu hoặc cho dù bạn có quản lý các yêu cầu một cách chính xác nhưng gặp lỗi nghiêm trọng trong thiết kế và kiến trúc phần mềm bạn sẽ phải thiết kế lại toàn bộ phần mềm để sửa lỗi.

Đánh giá của hàng nghìn dự án đã chỉ ra rằng khiếm khuyết được tìm ra trong các yêu cầu và thiết kế chiến 1/2 tổng số lỗi.

![](https://images.viblo.asia/3cd3b106-104f-4386-8eda-a6eeeecb30b8.png)


Ngoài ra chi phí sửa chữa một bug tăng lên trong suốt vòng đời phát triển phần mềm, Phát hiện càng sớm ra một lỗi chi phí để sửa nó càng rẻ. 

# Giải pháp: Mô hình chữ V (V Model)

Để giải quyết vấn đề từ mô hình thác nước, mô hình chữ V được phát triển trong đó ở mỗi giai đoạn phát triển là giai đoạn kiểm thử được thực hiện tương ứng
![](https://images.viblo.asia/d5aced76-e9ae-4c29-bb13-72415c90391c.png)

* Bên trái của mô hình là vòng đời phát triển phần mềm - SDLC
* Toàn bộ hình trông giống chữ V, do đó có tên là V model

Ngoài mô hình V, còn có các mô hình phát triển iterative  trong đó hoạt động phát triển được thực hiện theo từng giai đoạn, với mỗi giai đoạn thực hiện thêm một chức năng cho phần mềm. Mỗi giai đoạn bao gồm tập hợp của các hoạt động phát triển và thử nghiệm.

Ví dụ điển hình về vòng đời phát triển theo phương pháp iterative là rapid và Agile

# Kết luận:
Có rất nhiều mô hình phát triển phần mềm. Việc lựa chọn mô hình phát triển phụ thuộc vào mục đích và mục tiêu của dự án

* Kiểm thử không phải là một hoạt động độc lập, nó được điều chỉnh tùy vào mô hình phát triển được chọn cho dự án 
* Trong bất kỳ một mô hình nào, việc kiểm tra phải được thực hiện ở tất cả các cấp, tức là ngay từ khi có yêu cầu cho đến khi bảo trì nâng cấp.

Nguồn: 
https://www.guru99.com/v-model-software-testing.htm