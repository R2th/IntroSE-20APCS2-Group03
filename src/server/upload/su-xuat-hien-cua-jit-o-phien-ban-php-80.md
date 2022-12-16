![](https://images.viblo.asia/4fd4cec9-3980-4094-8540-95d7b32be637.png)

PHP hiện tại là một trong những ngôn ngữ thông dụng trong việc xây dựng server cho các trang web từ nhỏ đến lớn. Theo một thống kê mới được cập nhật gần đây thì hiện tại đang chiếm khoảng 80% thị phần, vượt trội hoàn toàn so với các ngôn ngữ lập trình khác.
![](https://images.viblo.asia/f3c9132e-903e-4b9a-bce9-e1200b824dd7.png)

<div align="center">

Thông kê các ngôn ngữ lập trình phổ biến

</div>
PHP luôn luôn có những bước cập nhật để đáp ứng được nhu cầu người dùng hiện có, và trong phiên bản tiếp theo PHP 8.0.0, JIT compiler sẽ được trình làng, dự đoán đây sẽ là một công cụ giúp gia tăng hiệu năng đáng kể cho PHP.

Bạn có thể thao dõi tiến trình cập nhật JIT vào core của PHP tại đường link này: [https://wiki.php.net/rfc/jit](https://wiki.php.net/rfc/jit)

# PHP hoạt động như thế nào

PHP là một "scripting language", điều đó có nghĩa là những dòng code của chúng ta không được biên dịch thẳng thành mã máy.

Khi bạn chạy một chương trình, PHP sử dụng một virtual machine gọi là Zend VM. Zend Engine trong Zend VM sẽ phân tích toàn bộ đoạn code thành Abstract Syntax Tree (AST) hay tiếng Việt gọi là là cây cú pháp trừu tượng và sau đó được chuyển thể thành các opcode. Những opcode là dạng ngôn ngữ gần với mã máy nhất nên có thời gian thực thi nhanh hơn nhiều so với code PHP thông thường. Bên cạnh đó, để tăng tốc thực thi, PHP đã có thêm một extension tên là OPcache ở trong phần Core. OPcache có nhiệm vụ cache lại toàn bộ đoạn opcode để có thể giúp những đoạn code PHP của chúng ta chạy nhanh hơn.

# Jit là gì

"JIT" viết tắt cho Just In Time. JIT là một kĩ thuật giúp chung ta tối ưu lại nhưng đoạn code.
> Jit compiler chạy sau khi chương trình được khởi tạo và biên dịch lại những đoạn code (thường là bytecode hoặc là một dạng tương tự để các Virtual Machine có thể hiểu được) giúp cho ứng dụng chạy nhanh hơn. Jit có thể truy xuất vào các câu truy xuất tại thời điểm "Runtime" trong khi các compiler khác không thể và từ đó chọn lọc được ra những function mà thường xuyên được sử dụng từ đó có thể tối ưu giúp chương trình thực thi hiệu quả và nhanh hơn.

Đây là phương thức phổ biến mà được sử dụng rất nhiều từ Java Virtual Machine (JVM), V8 JavaScript VM, CLR (.net) hay HHVM (Một phiên bản PHP được cách tân bởi Facebook).

Để biết thêm về cách thức hoạt động của JIT, bạn có thể tham khảo thêm một bài viết chính chủ của Mozilla tại đường link này: [https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/](https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/)

Zeev, một trong như core developer của PHP đã có một demo khá là trực quan cho những gì JIT có thể mang lại.


{@embed: https://www.youtube.com/watch?v=dWH65pmnsrI}

# Tại sao PHP cần JIT
## PHP đã đến cực đại

Đã có rất nhiều cải tiến cho PHP từ phiên bản 7.0 như tối ưu HashTable (một kiến trúc lưu trữ data trong php), tối ưu Zend VM,... Sau tất cả những cải tiến đó, PHP đã đến cực đại để có thể phát triển thêm.
## PHP dành cho những tác vụ khác

Nói tới PHP, ta nghĩ ngay tới một ngôn ngữ dành cho phát triển Web. Tuy nhiên, những tác vụ liên quan tới việc tính toán cần sử dụng CPU thì ít khi được sử dụng.

## Phát triển các tính năng khác cho PHP

Với việc sử dụng JIT, đội ngũ phát triển có thể sử dụng chính PHP để tạo ra các tính năng mới thay vì việc sử dụng ngôn ngữ C như bây giờ mà không có sự khác biệt quá nhiều về hiệu năng.

# Tham khảo
https://hub.packtpub.com/php-8-and-7-4-to-come-with-just-in-time-jit-to-make-most-cpu-intensive-workloads-run-significantly-faster/

https://stackoverflow.com