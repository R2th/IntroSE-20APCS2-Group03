Đầu tiên, có thể các bạn sẽ đau đầu với vấn đề mở rộng sản phẩm. Tuy nhiên, theo mình thì đó lại là một điều rất tốt vì nó có nghĩa là bạn có lưu lượng truy cập trên trang web rất lớn. Trước khi bạn quyết định rằng có vẻ Rails không đáp ứng đủ nhu cầu đó và bắt đầu viết lại project với công nghệ có khả năng thực hiện nhiều tính năng hơn, có lẽ bạn nên kiểm tra lại các truy vấn cơ sở dữ liệu của bạn trước. Dưới đây mình có tìm hiểu và mô tả một số công cụ và kỹ thuật mà bạn có thể sử dụng, chẩn đoán và tối ưu hóa truy vấn SQL Active Record chưa có tốc độ tốt nhất.

# Đầu tiên chúng ta cùng tìm hiểu các vấn đề với Active Record
Mình bắt đầu bước chân vào lập trình từ ruby on rails ở trường đại học và nhờ Active Record mà mình có thể bắt đầu ngay với lập trình mà không quá khó khăn với các câu truy vấn.
\
\
Active Record cho phép bạn viết các truy vấn cơ sở dữ liệu khá phức tạp mà không hiểu được SQL bên dưới. Đó là tính năng tốt nhất của nó và cùng với đó chính là một lỗi lớn nhất nó gây ra. Bởi vì với những người mới lập trình và dùng luôn Active Record như mình thì mình sẽ hoàn toàn không thể nắm rõ được các câu truy vấn dưới nền của Rails.
\
\
Dưới đây mình sẽ nêu ra một số các công cụ và kỹ thuật mình tìm hiểu và sử dụng để giải quyết các vấn đề về truy vấn cơ sở dữ liệu trong các ứng dụng Rails. Làm quen với chúng có thể giúp bạn hiểu SQL ở tầng sâu hơn so với các API của Active Record.
# Theo dõi hiệu suất của các câu truy vấn bị nghẽn
Thực ra phần này mình chưa được thực hành nhiều nhưng có tìm hiểu 2 phương pháp sử dụng để theo dõi các câu truy vấn bị nghẽn đó là [New Relic](https://newrelic.com/) và [PG Hero](https://github.com/ankane/pghero) trong các ứng dụng của rails
\
Đầu tiên chúng ta đi tìm hiểu New Relic trước nhé.
## New Relic
Điều mình chú ý đầu tiên đối với công cụ có thể phải trả phí này là ngay cả phiên bản miễn phí của nó cũng cung cấp cho bạn nhiều hiểu biết hữu ích vào ứng dụng của bạn. Mình thấy người sử dụng (trên mạng mà mình tham khảo) thường sử dụng thanh trình đơn "Transactions" và sắp xếp kết quả theo "Most time consuming". Tiếp tục dựa theo nguyên tắc 80/20 để xác định vấn đề hàng đầu, điều này có thể đủ để mang lại hiệu suất tối ưu cho hệ thống của bạn.
\
\
Dưới đây sẽ có một ví dụ về vấn đề N + 1 queries mà New Relic cung cấp chi tiết cho chúng ta.
\
![](https://pawelurbanek.com/assets/newrelic-stats-0cbefe818dc2115893a0dc889d184dc2da0547699427139be91f47bff3ba16b8.png)
\
Mặc dù phiên bản miễn phí không cung cấp thông tin chi tiết về mức độ nghẽn cơ sở dữ liệu, nhưng bảng phân tích cho thấy thời gian thực hiện thường xảy ra đủ để người dùng có thể theo dõi vấn đề.
## PG Hero
Bạn có thể kết nối PgHero vào ứng dụng của mình để có được những hiểu biết sâu hơn về hiệu suất truy vấn cơ sở dữ liệu của bạn. Nhưng có một điểm trừ nho nhỏ là nó không hiển thị nơi các câu queries đó được viết và bạn khá mất thời gian để tìm chỗ đấy.
\
\
Một tính năng tuyệt vời là nó sẽ tự động cảnh báo bạn về các truy vấn chậm diễn ra trong database.
\
\
Hơn nữa, nó cho phép bạn chạy `EXPLAIN` và `ANALYZE` ngay từ giao diện mà không cần phải truy cập cơ sở dữ liệu CLI.
\
\
Một mẹo bạn có thể sử dụng ở đây là cho phép hiển thị các bản ghi SQL trong giao diện điều khiển Rails:
```
ActiveRecord::Base.logger = Logger.new(STDOUT)
```
![](https://pawelurbanek.com/assets/active-record-logs-e8f82f6ea9f0bc51db72f94472bea618749413d31bc930b0e1cd81897eb99241.png)
\
Và sau đó hãy cop kết quả thu được bên trên vào PG Hero nhé.
\
![](https://pawelurbanek.com/assets/pghero-explain-663a02b62bf8b508713277fe8dd251b7fd34ee2aaacfad673adff02d492c9f5b.png)
\
\
Ngoài ra, bạn có thể sử dụng phương pháp `to_sql` để dịch truy vấn Active Record thành một SQL cơ bản.
## Một số phương pháp khác nữa
> EXPLAIN ANALYZE trong Rails
>
>>Rails cũng có xây dựng method `explain` mà bạn có thể sử dụng trong Active Record Query. `ANALYZE` tốt hơn bởi vì nó thực hiện các truy vấn thực tế và cung cấp cái nhìn sâu hơn vào thời gian thực hiện thực tế chứ không phải chỉ là chi phí giả thiết. Các bạn có thể xem thêm về phần thêm các option vào method `explain` và `ANALYZE` tại [đây](https://github.com/rails/rails/pull/31374/).
>\
>>Nếu bạn muốn sử dụng `ANALYZE` ngay bây giờ vào console của rails thì có thể tìm hiểu để sử dụng gem [ activerecord-analyze](https://github.com/pawurb/activerecord-analyze).
>>\
>>![](https://pawelurbanek.com/assets/active-record-analyze-2b2a6bd82bad8391d769af37ec47ad442b110426895de0657033d2569490730a.png)

> Kiểm tra kết quả truy vấn cơ sở dữ liệu truy vấn
>\
>\
>Một khi bạn theo dõi và tối ưu hóa các truy vấn, bạn nên kiểm tra kết quả thực tế.
>\
>Cách tiếp cận tốt nhất là thực hiện các `benchmarks` trên cơ sở dữ liệu giống với production. Vấn đề ở đây là bạn có thể không muốn DDOS trang web production của bạn. Ngoài ra, `benchmarks` từ xa có thể không đáng tin cậy vì các điều kiện mạng khác nhau. Trong trường hợp đó, giải pháp tốt nhất có thể là thực hiện các `benchmarks` trên máy tính cục bộ, với các cài đặt giống với một trang web production thật sự.
>>Đương nhiên là kéo theo đó bạn sẽ phải coppy một bản database từ trên production về để kiểm tra rồi.

> Sử dụng Siege cho `local benchmarks`
> Khi bạn đã sẵn sàng về việc thiết lập cơ sở dữ liệu của mình, bạn có thể bắt đầu đo `benchmarks` trên local. Hãy nhớ chạy ứng dụng Rails của bạn trong môi trường production, bởi vì trong môi trường development, nhiều sự tối ưu hóa đã bị vô hiệu hóa.
> >[Siege](https://github.com/JoeDog/siege) là một công cụ đo `benchmarks` tuyệt vời và đơn giản. Nó cung cấp cho bạn một báo cáo chi tiết về cách một điểm cuối cụ thể và cách thực hiện đo:
```
Transactions:               32782 hits
Availability:              100.00 %
Elapsed time:               59.94 secs
Data transferred:         5186.03 MB
Response time:               0.01 secs
Transaction rate:          546.91 trans/sec
Throughput:                 86.52 MB/sec
Concurrency:                 19.97
Successful transactions:     32782
Failed transactions:             0
Longest transaction:          0.16
Shortest transaction:         0.00
```

# Tổng kết
Mặc dù kỹ thuật tối ưu hóa mức cơ sở dữ liệu có giới hạn nhưng chúng có thể giúp bạn lâu dài trong việc cải thiện hiệu suất của ứng dụng. mình hy vọng rằng các kỹ thuật mình tìm hiểu được sẽ giúp bạn có được cái nhìn sâu sắc hơn về các truy vấn cơ sở dữ liệu của bạn. Hãy cho mình biết nếu bạn biết một số công cụ khác hữu ích khi làm việc với SQL trong Rails nhé.
\
\
Trên đây là một chút tìm hiểu của mình, có thể nó chưa hoàn toàn chính xác, mong các bạn có thể cho mình thêm nhiều góp ý để bài viết trở nên hữu ích hơn.
\
\
Xin cảm ơn mọi người đã theo dõi !!!