Chúng tôi rất vui mừng được thông báo rằng **Angular DevTools** - một tiện ích mở rộng của Chrome DevTools mà bạn có thể sử dụng để kiểm tra cấu trúc của các ứng dụng của mình và lập hồ sơ hiệu suất của chúng.
Bạn có thể tìm thêm về Angular DevTools trong video bên dưới và cài đặt nó từ Cửa hàng Chrome trực tuyến.

{@embed: https://www.youtube.com/watch?v=bavWOHZM6zE}

**Trải nghiệm Angular Debugging tốt hơn**
Chúng tôi đã thực hiện một cuộc khảo sát bên trong Google, xác nhận từ những kết quả quan sát mà chúng tôi nhận được từ các nhà phát triển bên ngoài - phần lớn mọi người cần các công cụ tốt hơn để debug ứng dụng của họ.

![image.png](https://images.viblo.asia/a00dcd22-f799-4e69-af29-4bb7179a31b8.png)

Dựa trên kết quả nhận được từ các nghiên cứu bên ngoài và bên trong, chúng tôi đã xác định các lĩnh vực sau đây cần chú ý nhất:
* Cải thiện thông báo lỗi
* Hiểu được việc thực thi phát hiện thay đổi
* Hiểu được việc hệ thống phân cấp và khởi tạo các provider
* Visualization các cấu trúc thành phần
Là một phần của dự án nhằm cải thiện trải nghiệm việc debug, chúng tôi đã giới thiệu các API mới cho đối tượng `ng global`. Chúng tôi cũng đã khắc phục các thông báo lỗi của Angular tốt hơn bằng cách cung cấp thêm thông tin và hướng dẫn hữu ích về cách khắc phục chúng. Để cung cấp thông tin chi tiết tốt hơn cho các nhà phát triển về cách họ có thể lập hồ sơ ứng dụng của mình, chúng tôi đã cung cấp nội dung về lập hồ sơ với Công cụ dành cho nhà phát triển của Chrome DevTools.


{@embed: https://www.youtube.com/watch?v=FjyX_hkscII}


**Các tính năng của Angular DevTools**
Để giải quyết các mối quan tâm còn lại và cung cấp chế độ xem dành riêng cho Angular dựa trên các tính năng của Chrome DevTools, chúng tôi đã phát triển Angular DevTools với sự cộng tác của **Rangle.io**. Nhóm nghiên cứu tại Rangle đã xây dựng công cụ gỡ lỗi đầu tiên cho Angular - Augury, công cụ này đã phục vụ cộng đồng trong nhiều năm. Làm việc cùng nhau, chúng tôi đã phát triển Angular DevTools ngay từ đầu, sử dụng lại các bài học kinh nghiệm từ Augury.
Trong bản phát hành hiện tại, Angular DevTools tập trung vào:
* Visualization cấu trúc thành phần
* Hiểu việc thực thi phát hiện thay đổi

Tương tự như Augury, Angular DevTools cung cấp trình component explorer cho phép bạn xem trước cấu trúc ứng dụng của mình:
![image.png](https://images.viblo.asia/c692ca15-4997-47fc-80de-2f8289b04734.png)

Nó cũng cung cấp cho bạn cái nhìn tổng quan về các chu kỳ phát hiện thay đổi, giúp bạn tìm thấy đâu là điểm thắt nút chai để bạn có thể mang đến trải nghiệm 60fpscho người dùng của mình.

![image.png](https://images.viblo.asia/6a1acf95-f40a-4ec1-8aea-8b268ac46bf4.png)
Angular DevTools Explorer

Angular DevTools hỗ trợ các ứng dụng được xây dựng với Angular v9 trở lên với Ivy được bật.

Chuỗi công cụ phát triển hoàn chỉnh
Trong Angular, chúng tôi đã làm việc chăm chỉ để cung cấp một chuỗi công cụ hoàn chỉnh cho nhà phát triển Web hiện đại. Cùng với Angular CLI, dịch vụ ngôn ngữ, công cụ PWA và các thành phần, Angular DevTools cung cấp một phần quan trọng còn thiếu giúp bạn hiểu rõ hơn về cấu trúc và hiệu suất thời gian chạy của ứng dụng.
Trong các bản phát hành Angular DevTools trong tương lai, chúng tôi sẽ làm việc để rút ngắn  về khoảng cách so với chức năng của Augury có tính đến các tính năng có tác động mạnh nhất dựa trên yêu cầu của bạn. Chúng tôi rất vui được chia sẻ tác phẩm này với bạn! Chúng tôi hy vọng nó sẽ mang lại mức độ tin cậy và minh bạch cao hơn cho quá trình phát triển của bạn.
Xin gửi lời cảm ơn đặc biệt tới Aleksander Bodurri và Sumit Arora, những người đã làm việc cùng với nhóm Angular trên DevTools.

Nguồn: https://blog.angular.io/introducing-angular-devtools-2d59ff4cf62f