Xử lý các tập dữ liệu lớn thường khó khăn. Với các tài nguyên máy tính hạn chế, đặc biệt là bộ nhớ, có thể khó thực hiện các tác vụ cơ bản như đếm các phần tử riêng biệt, kiểm tra thành viên, lọc các phần tử trùng lặp, tìm tối thiểu, tối đa, phần tử trên cùng hoặc thiết lập các hoạt động như công đoàn, giao lộ, tương tự và trên.

Xác suất cấu trúc dữ liệu để giải cứu

Các cấu trúc dữ liệu xác suất có thể khá tiện dụng trong những trường hợp này, trong đó chúng làm giảm đáng kể các yêu cầu bộ nhớ, trong khi vẫn cung cấp độ chính xác chấp nhận được. Hơn nữa, bạn nhận được hiệu quả thời gian, như tra cứu (và thêm) dựa trên nhiều hàm băm độc lập, có thể được song song. Chúng tôi sử dụng các cấu trúc như bộ lọc Bloom , MinHash , Count-min sketch , HyperLogLog rộng rãi để giải quyết nhiều vấn đề khác nhau. Một ví dụ khá đơn giản được trình bày dưới đây.

### Vấn đề

Chúng tôi quản lý thông báo đẩy trên thiết bị di động cho khách hàng của chúng tôi và một trong những điều chúng tôi cần bảo vệ chống lại là gửi nhiều thông báo đến cùng một người dùng cho cùng một chiến dịch. Thông báo đẩy được chuyển đến các thiết bị / người dùng cá nhân dựa trên mã thông báo đẩy được tạo bởi nền tảng di động. Do kích thước của chúng (bất cứ nơi nào từ 32b đến 4kb), nó không thực hiện để chúng tôi lập chỉ mục mã thông báo đẩy hoặc sử dụng chúng làm khóa người dùng chính.

Trên một số nền tảng di động nhất định, khi người dùng gỡ cài đặt và sau đó cài đặt lại cùng một ứng dụng, chúng tôi mất khóa người dùng chính của chúng tôi và tạo hồ sơ người dùng mới cho thiết bị đó. Thông thường, trong trường hợp đó, nền tảng di động sẽ tạo một mã thông báo đẩy mới cho người dùng đó khi cài đặt lại. Tuy nhiên, điều đó không phải lúc nào cũng được đảm bảo. Vì vậy, trong một số ít trường hợp, chúng tôi có thể kết thúc với nhiều bản ghi người dùng trong hệ thống của chúng tôi có cùng mã thông báo đẩy.

Kết quả là, để ngăn gửi nhiều thông báo cho cùng một người dùng cho cùng một chiến dịch, chúng tôi cần lọc số lượng mã thông báo đẩy trùng lặp tương đối nhỏ từ tổng số liệu chạy từ hàng trăm triệu đến hàng tỷ bản ghi. Để cung cấp cho bạn một ý nghĩa về tỷ lệ, bộ nhớ cần thiết để lọc chỉ 100 triệu mã thông báo đẩy là 100M * 256 = 25 GB!

### Giải pháp - Bộ lọc Bloom

Ý tưởng rất đơn giản.
* Phân bổ một mảng bit có kích thước latex m
* Chọn latexk hàm băm độc lập latex h_i (x) có dải ô là latex [ 0 .. m-1 ]
* Đối với mỗi phần tử dữ liệu, tính toán băm và bật bit 

![](https://d35fo82fjcw0y8.cloudfront.net/2016/03/03210600/bloom-filter.jpg)

Lưu ý rằng các bit có thể được bật 'on' bởi các xung đột băm dẫn đến các kết quả dương tính giả i, phần tử không tồn tại ea có thể được báo cáo là tồn tại và mục tiêu là để giảm thiểu điều này.

### Hàm băm

Các hàm băm cho bộ lọc Bloom phải được phân phối độc lập và thống nhất. Các băm mật mã như MD5 hoặc SHA-1 không phải là lựa chọn tốt vì lý do hiệu suất. Một số các băm nhanh thích hợp là MurmurHash , băm FNV và Hashes của Jenkin .

Chúng tôi sử dụng MurmurHash

* Nó nhanh - nhanh hơn gấp 10 lần so với MD5
* Phân phối tốt - vượt qua kiểm tra chi bình phương cho tính đồng nhất
* Hiệu ứng Avalanche - nhạy cảm với những thay đổi đầu vào nhỏ nhất
* Đủ độc lập