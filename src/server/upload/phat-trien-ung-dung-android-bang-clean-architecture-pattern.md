### Clean Architecture là gì?
Tôi sẽ không đi vào chi tiết quá nhiều ở đây vì có những bài viết giải thích nó tốt hơn nhiều so với tôi có thể. Nhưng đoạn tiếp theo cung cấp mấu chốt của những gì bạn cần biết để hiểu Clean.

Nói chung trong Clean, mã được tách thành các lớp theo hình củ hành với một quy tắc phụ thuộc: Các lớp bên trong không nên biết gì về các lớp bên ngoài. Có nghĩa là các phụ thuộc nên chỉ vào bên trong.

Đây là đoạn trước được hình dung:

![](https://images.viblo.asia/a74a831f-0eea-4ac3-bfad-619e8ec9a24b.jpeg)

Clean Architecture, như đã đề cập trong các bài viết được cung cấp, làm cho mã của bạn:

* **Độc lập với khung**
* **Có thể kiểm tra.**
* **Độc lập với UI.**
* **Độc lập với cơ sở dữ liệu.**
* **Độc lập với bất kỳ cơ quan bên ngoài.**

Tôi hy vọng sẽ làm cho bạn hiểu làm thế nào những điểm này đạt được với các ví dụ dưới đây. Để giải thích chi tiết hơn về Clean tôi thực sự khuyên bạn nên bài viết này và video này. https://vimeo.com/43612849

### Điều này có ý nghĩa gì với Android

Nói chung, ứng dụng của bạn có thể có số lượng lớp tùy ý nhưng trừ khi bạn có logic nghiệp vụ toàn doanh nghiệp mà bạn phải áp dụng trong mọi ứng dụng Android, bạn thường sẽ có 3 lớp:

* Lớp ngoài: Lớp thực hiện
* Giữa: Lớp bộ điều hợp giao diện
* Bên trong: Lớp logic nghiệp vụ

Lớp thực hiện là nơi mọi thứ cụ thể xảy ra. Mã cụ thể của khung bao gồm mọi dòng mã không giải quyết được vấn đề bạn đặt ra để giải quyết, bao gồm tất cả nội dung của Android như tạo các hoạt động và đoạn, gửi ý định và mã khung khác như mã mạng và cơ sở dữ liệu.

Mục đích của lớp bộ điều hợp giao diện là hoạt động như một trình kết nối giữa logic nghiệp vụ của bạn và mã cụ thể của khung.

Lớp quan trọng nhất là lớp logic kinh doanh. Đây là nơi bạn thực sự giải quyết vấn đề bạn muốn giải quyết việc xây dựng ứng dụng của bạn. Lớp này không chứa bất kỳ mã cụ thể khung nào và bạn sẽ có thể chạy nó mà không cần trình giả lập. Bằng cách này, bạn có thể có mã logic kinh doanh dễ kiểm tra, phát triển và bảo trì. Đó là lợi ích chính của **Clean Architecture**.

Mỗi lớp, phía trên lớp lõi, cũng chịu trách nhiệm chuyển đổi các mô hình thành các mô hình lớp thấp hơn trước khi lớp thấp hơn có thể sử dụng chúng. Một lớp bên trong không thể có một tham chiếu đến lớp mô hình thuộc về lớp bên ngoài. Tuy nhiên, lớp bên ngoài có thể sử dụng và tham chiếu các mô hình từ lớp bên trong. Một lần nữa, điều này là do quy tắc phụ thuộc của chúng tôi. Nó không tạo ra chi phí nhưng cần thiết để đảm bảo mã được tách rời giữa các lớp.

```
Tại sao chuyển đổi mô hình này là cần thiết? Ví dụ: các mô hình logic kinh doanh của bạn có thể không phù hợp để hiển thị chúng trực tiếp cho người dùng. Có lẽ bạn cần hiển thị một sự kết hợp của nhiều mô hình logic kinh doanh cùng một lúc. Do đó, tôi khuyên bạn nên tạo một lớp ViewModel giúp bạn dễ dàng hiển thị nó hơn với UI. Sau đó, bạn sử dụng một lớp chuyển đổi ở lớp bên ngoài để chuyển đổi mô hình kinh doanh của bạn sang ViewModel thích hợp.
Một ví dụ khác có thể là như sau: Hãy nói rằng bạn nhận được một đối tượng Con trỏ từ ContentProvider trong lớp cơ sở dữ liệu bên ngoài. Sau đó, lớp bên ngoài sẽ chuyển đổi nó sang mô hình kinh doanh bên trong của bạn trước, sau đó gửi nó đến lớp logic kinh doanh của bạn để được xử lý.
```

Tôi sẽ thêm nhiều tài nguyên để học hỏi ở cuối bài viết. Bây giờ chúng ta đã biết về các nguyên tắc cơ bản của Clean Architecture, hãy để Lướt tay với một số mã thực tế. Tôi sẽ chỉ cho bạn cách xây dựng một chức năng ví dụ bằng cách sử dụng Clean trong phần tiếp theo.

### Làm cách nào để bắt đầu viết ứng dụng Clean?
Tôi đã thực hiện một  boilerplate project có tất cả các hệ thống ống nước được viết cho bạn. Nó hoạt động như một Clean starter pack và được thiết kế để được xây dựng ngay lập tức với hầu hết các công cụ phổ biến có trong phần đầu. Bạn có thể tự do tải xuống, sửa đổi và xây dựng ứng dụng của mình với nó.

Bạn có thể tìm thấy dự án bắt đầu tại đây: [**Android Clean Boilerplate**](https://github.com/dmilicic/Android-Clean-Boilerplate)

Còn tiếp
Nguồn:
https://medium.com/@dmilicic/a-detailed-guide-on-developing-android-apps-using-the-clean-architecture-pattern-d38d71e94029