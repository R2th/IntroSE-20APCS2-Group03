# 1. Process và Thread.

![](https://images.viblo.asia/cc1e4008-a3ca-49d8-ad26-6a5f2bef952f.png)

1. **Procses:** là những “công việc” mà hệ điều hành thực hiện.
2. **Thread** là một đơn vị cơ bản trong CPU. Một luồng sẽ chia sẻ với các luồng khác trong cùng process về thông tin data, các dữ liệu của mình. 

* Một process có thể chứa nhiều thread bên trong nó. Khi chúng ta chạy ứng dụng, hệ điều hành tạo ra một process  và bắt đầu chạy các thread chính của process đó. 

* Điểm quan trọng nhất cần chú ý là một thread có thể làm bất cứ nhiệm vụ gì một process có thể làm. Tuy nhiên, vì một process có thể chứa nhiều thread, mỗi thread có thể coi như là một process nhỏ. 

* Một điểm khác biệt nữa đó là **nhiều thread nằm trong cùng một process dùng một không gian bộ nhớ giống nhau, trong khi process thì không**. Điều này cho phép các thread đọc và viết cùng một kiểu cấu trúc và dữ liệu, giao tiếp dễ dàng giữa các thread với nhau. Giao thức giữa các process, hay còn gọi là IPC (inter-process communication) thì tương đối phức tạp bởi các dữ liệu có tính tập trung sâu hơn.

# 2. Sự khác nhau giữa single-threaded và multithreaded.

![](https://images.viblo.asia/316d3b95-70b4-4602-aa9e-ea7d878d9a1e.png)

* Phần lớn các phần mềm trong máy tính hiện đại đều có dạng multithreaded, tức đa luồng. Các ứng dụng trong máy tính đa phần đều chạy một process nhất định cùng với đó là nhiều luồng chạy bên trong.
* Các ứng dụng cũng có thể được thiết kế để tận dụng khả năng xử lý trên các hệ thống multicore, giúp thực hiện nhiều CPU task song song.

## 2.1 Multithreaded

Thread, dĩ nhiên cho phép chạy đa luồng. Minh hoạ dễ hiểu cho tính ưu việt của sự đa luồng là trình xử lý Word có thể vừa in tài liệu sử dụng một thread nền, vừa cùng lúc chạy một thread khác nhận dữ liệu vào từ người dùng để gõ một văn bản mới.

**Mỗi một process có một vùng nhớ riêng của chúng, song các thread trong cùng một process thì dùng chung địa chỉ nhớ.** Và các thread cũng dùng chung bất cứ tài nguyên nào nằm trong process đấy. Có nghĩa là rất dễ để chia sẻ dữ liệu giữa các thread, nhưng cũng rất dễ làm thread này nhảy sang thread khác, dẫn đến một số kết quả tồi tệ.

Các chương trình đa luồng cần được lập trình cẩn thận để tránh việc nhảy cóc như trên xảy ra.  Đoạn mã lệnh thay đổi cấu trúc dữ liệu chia sẻ giữa các đa luồng này được gọi là những đoạn quan trọng. Khi một đoạn quan trọng đang chạy ở thread này, cần đảm bảo không thread khác nào được phép sử dụng đoạn quan trọng này. Đây là quy đình đồng bộ hoá, nhằm tránh không bị dừng chương trình một cách bất ngờ ở đây. Và đó cũng là lý do tại sao đa luồng đòi hỏi lập trình một cách rất cẩn thận.

### 2.1.2 Lợi ích của Multithreaded: có 4 lợi ích chính:
1. **Khả năng đáp ứng:** Multithread giúp các ứng dụng tương tác có thể hoạt động tốt hơn vì ngay cả khi một phần chương trình bị block hoặc cần một thời gian dài để hoạt động, chương trình nhìn chung vẫn có thể chạy.
2. **Khả năng chia sẻ tài nguyên:** các tiến trình chỉ có thể chia sẻ dữ liệu thông qua các kĩ thuật như shared memory (vùng bộ nhớ chung) và message sharing (chia sẻ tin). 
3. **Tiết kiệm:** việc cung cấp tài nguyên và dữ liệu cho quá trình tạo process rất tốn kém. Và vì threads tự động chia sẻ data cho process mà nó thuộc về, việc tạo các thread cho việc context-switch sẽ giúp tiết kiệm chi phí rất nhiều. Không chỉ chi phí mà còn là thời gian, vì việc tạo một process mới sẽ lâu hơn nhiều so với tạo một thread mới.
4. **Scalability:** Lợi ích của multithreaded thể hiện rõ hơn trong kiến trúc đa xử lý (multiprocessor architecture), vì multithread giúp các threads hoạt động song song trong các lõi xử lý khác nhau, trong khi đối với tiến trình dạng single-threaded, một thread chỉ có thể chạy trên một bộ xử lý, không quan trọng việc có bao nhiêu thread trong hệ thống hiện tại.

# 3. Tổng kết sự khác nhau giữa Thread và Process.
* Để tạo nhiều thread thì dễ dàng hơn so với process vì chúng không cần các địa chỉ nhớ riêng rẽ.
* Việc chạy đa luồng cần được lập trình một cách chi tiết vì các thread chia sẻ các cấu trúc chung mà chỉ sử dụng được bởi từng thread vào mỗi thời điểm. **Khác với thread, các process không dùng chung địa chỉ nhớ.**
* Thread được xếp hạng “nhẹ cân” bởi vì chúng sử dụng ít tài nguyên hơn so với các process.
* Các process chạy độc lập với nhau. Các thread thì sử dụng chung các địa chỉ nhớ liên kết với nhau, vì thế cần thận trọng tránh việc thread này nhảy sang thread khác. (Điều đã được nhắc đến trong ý thứ 2 vừa trên)
* Một process có thể chứa nhiều thread. 










# Tài liệu tham khảo.
1. https://kipalog.com/posts/Process-trong-he-dieu-hanh-la-gi
2. https://stream-hub.com/thread-la-gi/
3. https://codewala.net/2015/07/29/concurrency-vs-multi-threading-vs-asynchronous-programming-explained/
4. http://www.dtp.fmph.uniba.sk/javastuff/javacourse/week11/01.html