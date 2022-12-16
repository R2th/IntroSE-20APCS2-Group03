1. Giới thiệu
2. Cải thiện performance như thế nào?
3. Các công cụ
4. Kết luận
## 1. Giới thiệu
- Performance là một chủ đề được nhiều dev quan tâm, các ngôn ngữ lập trình, các cơ sở dữ liệu hay các công nghệ khác đều được quan tâm. Thông thường performance không được ưu tiên đầu tiên khi bắt đầu một dự án, nó được nhắc tới nhiều hơn khi dự án đã bắt đầu đi vào hoạt động và khi đó chúng ta cần xem xét quy mô mở rộng cho nhiều người dùng hơn và xử lý hiệu quả hơn cho những người dùng đó.
- Vậy làm thế nào để sử dụng tài nguyên hệ thống hiệu quả, như dung lượng bộ nhớ mà ứng dụng chiếm đóng, nó ngày càng trở nên quan trọng khi hệ thống bổ sung thêm máy chủ
- Thời gian khởi động ứng dụng cũng rất quan trọng, thời gian khởi động chậm có thể là một dấu hiệu cho thấy ứng dụng đang tải nhiều hơn mức cần thiết.
- Thời gian tải trang cũng là trọng tâm của rất nhiều công cụ đo lường giúp xác định phần nào trong ứng dụng của chúng ta đang chiếm nhiều thời gian nhất
- Trong bài viết này mình sẽ để cập một số cách để đo lường hiệu suất trong rails.
## 2. Cải thiện performance như thế nào?
- Việc xem xét thời gian tải trang thông qua trình biên dịch hiển thị tài nguyên trang nào đang tải lâu hơn chỉ là một quan sát ở mức độ bề mặt về những gì diễn ra chậm.
- Google dev tool có một công cụ đo trực tiếp hiệu suất trang web tại [developers.google.com](https://developers.google.com/speed/pagespeed/insights/?hl=vi)  nhưng ngay cả khi thực hiện các cải tiến hiệu suất đơn giản trực tiếp trên các tài nguyên chậm hơn, vẫn có khả năng có một khu vực hiệu quả hơn có thể được cải thiện dựa trên đó không tập trung vào thời gian tải của một tài nguyên riêng lẻ.
- Khi xem xét tác động của việc cải thiện hiệu suất mà bạn đang cố gắng đạt được, bạn có thể tập trung vào refactor code nhiều hơn hơn cho tài nguyên tải chậm của mình. Hoặc bạn có thể cân nhắc tìm một vài phương pháp mà ứng dụng của bạn sử dụng hàng nghìn lần và tạo ra tác động toàn cầu hơn đến việc cải thiện hiệu suất trong toàn bộ ứng dụng bằng cách cải thiện chúng.
## 3. Các công cụ
- Hiện này các nhà phát triển đã nghiên cứu và đưa ra khá nhiều công cụ hữu ích trong việc đo lường hiệu suất của ứng dụng.
- Mỗi công cụ này đều tận dụng lợi thế của các thư viện khác để đơn giản hóa và kích hoạt tốt hơn các công cụ cung cấp cho bạn số liệu trong từng danh mục cho số liệu hiệu suất.

**[derailed_benchmarks ](https://github.com/schneems/derailed_benchmarks)** công cụ để đo bộ nhớ trong quá trình tải, phân bổ bộ nhớ, sử dụng bộ nhớ theo thời gian, thu gom rác và một vài mục hiệu suất khác. Nó cung cấp một hồ sơ về phương pháp mà ứng dụng dành nhiều thời gian nhất trong quá trình tải trang chính. Theo mình, đây là một phương pháp hữu ích về những gì chúng ta cần.

Ví dụ kết quả: 
```
$ bundle exec derailed bundle:mem
TOP: 54.1836 MiB
  mail: 18.9688 MiB
    mime/types: 17.4453 MiB (Also required by: fog/storage)
    mail/field: 0.4023 MiB
    mail/message: 0.3906 MiB
```
**[rack-mini-profiler](https://github.com/MiniProfiler/rack-mini-profiler)** giúp cung cấp nhiều số liệu thống kê trong trình duyệt với format dễ nhìn để phân tích ứng dụng của bạn

Ví dụ kết quả:
![image.png](https://images.viblo.asia/a1c143fa-0d94-45ce-bb28-f9458b5abb85.png)

**Benchmarking** giúp chúng ta chứng minh sự khác biệt về hiệu suất trong hai hoặc nhiều đường dẫn code khác nhau. Benchmarking là một cách đo lường hiệu suất của code. Thông thường, nó được sử dụng để so sánh hai hoặc nhiều đường dẫn mã giống nhau để xem đường dẫn code nào là nhanh nhất. 

Ví dụ: 
```
def some_method
  sleep(1)
end

Benchmark.bm do |x|
  x.report("method") { some_method }
end

#kết quả: 
| user       |   system   |   total     |   real       |
| 0.000040   |   0.000030 |  0.000070   | (  1.002846) |
```

- User, system và total là tất cả các phép đo khác nhau về thời gian của CPU. User đề cập đến thời gian làm việc trong không gian của người dùng . Tương tự, system biểu thị thời gian làm việc trong không gian hạt nhân. Total là tổng thời gian của CPU và real là số đo thời gian trên tường mà chúng ta đã thấy Benchmark.realtime.

## 4. Kết luận
- Trên đây là những cách nhận biết và cách đo lường hiệu suất của hệ thống thông qua các công cụ, nó sẽ rất cần thiết khi ứng dụng của bạn đã trải qua thời gian dài sử dụng khiến lượng dữ liệu, người dùng tăng cao.
- Ngoài các công cụ trên hiện nay cũng có các công cụ có sẵn tích hợp vào ứng dụng khiến việc đo lương trở nên dễ dàng hơn nhất nhiều như : [New Relic](https://newrelic.com/application-monitoring/features) hay [Scout](http://help.apm.scoutapp.com/#scoutprof)