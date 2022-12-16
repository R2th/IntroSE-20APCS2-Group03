## Lời nói đầu
Dưới đây là 1 số hiểu biết về điều chỉnh Nginx, Puma, Rails, Mysql.
Tuy nhiên, việc điều chỉnh các thống số trên phụ thuộc vào nhiều yếu tố khác nhau. Sẽ không có 1 thông số "chuẩn" nào cho mọi ứng dụng, sau bài viết này hy vọng các bạn sẽ tìm được giá trị phù hợp nhất với ứng dụng của mình.

Diagram dưới đây sẽ mô tả luồng chạy cơ bản của 1 ứng dụng. Chúng ta sẽ đi sâu vào xem xét kỹ hơn các cài đặt cho từng dịch vụ ở bên dưới.

![](https://images.viblo.asia/f427c0d5-e636-4785-b321-d812058f08a5.png)

## 1. Nginx

Phần lớn Web Server cho 1 ứng dụng Rails chúng ta thường sử dụng Nginx. Trong phạm vi bài viết này, hệ thống của mình cũng sẽ sử dụng Web Server là Nginx.

#### Số lượng Workers
Trong phạm vi bài viết này Nginx không phải là điểm mấu chốt mình muốn tối ưu. Và mình cũng không thực sự có nhiều kiến thức về Ngin để Recommend các bạn tối ưu nó. 

`auto` là thông số được hiệu chỉnh cho `wokers_processes` trong config nginx. Nó được tìm thấy trong mọi config mà mình tìm kiếm được trên Google cũng như từ các blog cá nhân khác, vì vậy sẽ không có lý do nào để mình thay đổi hay làm khác đi ở đây.

```nginx
#/etc/nginx.conf
worker_processes  auto ;
```

## 2. Puma
App Server cho 1 ứng dụng Rails có rất nhiều sự lựa chọn bao gồ: Mongrel (đã không còn phổ biến nữa), Unicorn, Thin, Rainbows và Puma. Mỗi App Server sẽ có những đặc tính riêng & syntax khác nhau. Nhưng cuối cùng tất cả sẽ cũng chung mục tiêu là giữ cho Rails app chạy và xử lý các Request.

Trước đây mình thường sử dụng `Unicorn` làm App Server nhưng các Project 1 năm trở lại đây thì `Puma` là sự lựa chọn của mình :D

*Bài viết này mình cũng sẽ tập trung vào việc tối ưu config Puma để mang lại hiệu suất tốt nhất cho Server*


#### Default Config Puma

Trước đây khi setup Server, cũng như Nginx thì Puma mình hay để nguyên những Config mà Puma Recommend. Mọi việc có vẻ ổn áp, tuy nhiên 1 thời gian, khi lượng Data trên App của mình trở nên nhiều (~ 10k records ở mỗi bảng), đi kèm với đó là lượng User truy cập cũng tăng dần đều.

Và chuyện gì đến cũng phải đến, ứng dụng mình liên tục nhận được mail alert từ AWS báo % CPU Usage tăng cao, 70, 80, rồi 90%. Lẽ thường thì mình nghĩ sẽ phải Scale Server (tăng CPU, tăng Ram ...) lên lớn hơn , tuy nhiên trước đó phải cải thiện Performance phía app đã xem sao. Cải thiện chán chê từ query SQL, refactor code, những xử lý có thể move vào background job thì cũng cho vào luôn ... nhưng kết quả là mail alert vẫn bắn về đều đều (haiz)

Sau đó mình xem lại config Puma (lúc này mình đang để default) xem có cải thiện được gì không?

```ruby
# config/puma.rb

threads 0,16

...

workers 0
```

bắt đầu tìm hiểu, mình phát hiện defaul puma sẽ chạy ở chế độ `Single Mode`, nghĩa là chỉ có 1 workers được sinh ra. Nghĩ thầm, `Single` chắc phải có `Multi` chứ nhỉ?. Và đúng như dự đoán có chế độ `Multi` thật :v, nhưng với cái tên là `Cluster Mode`. Với chế độ này thì App của chúng ta có thể chạy nhiều hơn 1 workers. Hehe, như vậy có chỗ để cải thiện rồi đây.

#### Số lượng Workers
Worker chỉ ra 1 luồng vật lý phụ thuộc vào số lõi CPU. Điều quan trọng ở đây là số lượng Workers không được lớn hơn số lượng lõi CPU trên Server. 

#### Số lượng Threads
Threads cho biết số lượng các luồng logic có thể chạy đồng thời trong 1 Worker. Ví dụ:

- 1 worker / 16 thread: tổng 16 thread
- 2 worker / 16 thread: tổng 32 thread

Dường như, theo tài liệu Puma cung cấp thì số lượng threads tối đa trong 1 workers không được lớn hơn 16 (các bạn có thể tìm hiểu thêm ở [đây](https://github.com/puma/puma/#thread-pool)). Và mối quan hệ giữa worker và thread được mô tả ở [đây](https://github.com/puma/puma/#clustered-mode).

Ví dụ config sẽ được viết như thế này

```ruby
# config/puma.rb

# Set the 16 environment variable RAILS_MAX_THREADS 
Threads_count  =  ENV . Fetch ( "RAILS_MAX_THREADS" )  {  5  }

...

# Set 2 environment variable WEB_CONCURRENCY 
workers The  ENV . Fetch ( "WEB_CONCURRENCY" )  {  2  }
```

Sau khi config lại Puma và làm thử 1 vài bài test tải (dùng tool Jmeter) kết hợp theo dõi trên Monitor của AWS, nhận thấy CPU luôn dưới 60%. Và trước mắt có vẻ server đã được tối ưu để phù hợp các thông số vật lý của chính nó.

Chưa dừng lại ở đó, mình tiếp tục làm các bài test nho nhỏ bằng cách thay đổi số thread trong 1 worker (< 16).  Nếu giảm số lượng thread thấp xuống thì số lượng processes được xử lý đồng thời cũng giảm. Tuy nhiên, tổng số yêu cầu Request vẫn không đổi, dẫn đến tình trạng unhealthy mặc dù tài nguyên của Server là dư thừa . Bằng chứng là lỗi 503 biểu thị việc Server quá tải được trả về trong các Response sau đó. 1 số case test như sau:

- 1 worker/ 5 thread, server trở lên unhealthy với khoảng 15% CPU
- 1 worker/ 10 thread, server trở lên unhealthy với khoảng 30% CPU
- 1 worker/ 16 thread, server trở lên unhealthy với khoảng 45% CPU
- 2 worker/ 16 thread, server trở lên unhealthy với khoảng 90% CPU

Chú ý: nếu chỉ nhìn vào việc sử dụng CPU của Server, sẽ vẫn có trường hợp không thể xử lý hết Request do áp lực của bộ nhớ. Ngoài ra có cần tối iưu vấn đề gây tải nặng ở database, do đó ngoài CPU và bộ nhớ hãy chú ý đến Database để tìm ra sự kết hợp tốt nhất.

Trong điều kiện lý tưởng nhất, nếu có đủ bộ nhớ thì 2 worker / 16 thread có thể được coi là tốt nhất (có nghĩa là bạn có thể sử dụng hết tài nguyên của mình mà không lãng phí)

## 3. Rails

#### Số lượng pool connections
Trong `database.yml` `pool` biểu thị số lượng connections với MySQL (xem lại Diagram ở đầu bài viết bạn sẽ hiểu ngay vấn đề).

Nếu số lượng `puma worker * puma thread > pool` thì lỗi `ActiveRecord::ConnectionTimeoutError` sẽ xuất hiện. Vì vậy, hãy cố gắng đảm bảo `puma worker * puma thread > pool` là ổn áp nhất.

Ngược lại, nếu bạn vượt qua số lượng kết nối của MySQL connection. `Too many connections` sẽ là lỗi MySQL trả lại khi `pool > max_connections`. Số lượng tối đa `max connection` phụ thuộc vào cài đặt MySQL và sẽ được giải thích chi tiết bên dưới.

#### Số lượng max_connections
`max_connections` là số lượng kết nối MySQL tối đa. Thực chất giá trị này sẽ phụ thuộc vào hiệu suất của từng instance DB (cụ thể trong Project của mình đang dùng AWS RDS). 1 vài con số tham khảo cho từng loại instance như sau:

- t2.micro: 66
- t2.small: 150
- t2.medium: 312

Các con số trên được Recommend bởi RDS,  thực tế giới hạn này có thể được nâng lên nhưng không được recommend.

## Tổng kết
Trên đây là những chia sẻ của mình về việc tối ưu server. Tuy nhiên, 1 lần nữa xin nhắc lại, các thông số cài đặt chuẩn chỉ nhất sẽ tùy thuộc vào tài nguyên của Server cũng như các nội dung ứng dụng được xử lý ... Vì vậy, sẽ không có gì là tuyệt đối ở đây cả, hy vọng bài viết này sẽ ít nhiều giúp các bạn có những cài đặt phù hợp với ứng dụng của mình nhát :D

## Tài liệu tham khảo
https://github.com/puma/puma

https://qiita.com/walkers/items/80b170031cbba59550c5