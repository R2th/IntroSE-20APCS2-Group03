Những ngày hè nóng nực thế này, có lẽ chẳng có ai lại muốn ngồi code hay đọc 1 đống tài liệu, lí thuyết cả. Chính vì vậy hôm nay mình sẽ chia sẻ 1 tip trong Android khá là hay và hữu ích nhưng lại ít được mọi anh em coder chú ý đến. :))) nghe cho có tí nguy hiểm thôi

Khi debug ứng dụng bằng Android Studio, đôi khi chúng ta thường đặt các lệnh Log để show ra thông tin cần thiết trong quá trình fix bug (vấn đề muôn thủa). Sau đây sẽ là 1 hình ảnh minh họa 
![](https://images.viblo.asia/3c6f266c-75fe-44a1-86eb-d8d9ad6198a5.png)

Nhìn ví dụ trên thì có vẻ OK đó, nhưng vấn đề xảy ra là nếu chúng ta quên xóa Log trước khi commit và push lên repo thì sẽ sao nhỉ?? :))) Tất nhiên rồi, sẽ bị ăn gạch đá rất nhiều từ các reviewers "trainer" :))). Và điều quan trọng hơn là cách làm việc của chúng ta chưa thật sự chuyên nghiệp. 

Một cách thực hành tốt là không để lại các các Log sau khi đã gỡ lỗi, ngay cả khi bạn sử dụng ProGuard để loại bỏ chúng, thì chúng cũng có tác động bất lợi đến codebase Signal-to-Noise ratio của bạn. Đôi khi các câu lệnh Log có thể không đồng bộ với mã xung quanh, trở nên vô nghĩa nhất hoặc gây hiểu lầm cho người khác khi mới xem code. Điều này thật tồi tệ phải không nào. 

Vậy câu hỏi đặt ra là có cách nào để giải quyết vấn để trên hay không? 
### *What if there was a way to have debug-only logging without adding any code?*

Vâng thưa anh em, câu trả lời là có :))). IntelliJ IDEA và Android Studio cho phép ta tạo các breakpoint mà không bị suspend khi chạy. 

![](https://images.viblo.asia/cac0a80e-7116-4c59-9e7d-9309ea767c2f.png)

Làm thế nào để bạn tạo một non-suspending breakpoint? Trước tiên, bạn tạo một breakpoint bình thường, bằng cách nhấp vào 1 line hoặc bằng cách sử dụng phím tắt Cmd-F8 tại dòng mà bạn muốn đặt breakpoint. Sau đó, bạn có thể chỉnh sửa breakpoint bằng cách nhấp chuột phải vào nó hoặc bằng cách sử dụng phím tắt Cmd-Shift-F8. 

Ví dụ: tôi có thể thay thế một trong hai câu lênh Log cuối cùng bằng 1 non-suspending breakpoint như thế này:

![](https://images.viblo.asia/67bd6c1d-1898-4a60-83a1-521255bd0273.png)

Toàn bộ code sau đó sẽ trông như thế này khi tất cả các breakpoint được thay thế:

![](https://images.viblo.asia/db33199d-1e6e-4ac5-b432-eacebc1955f9.png)

Tốt hơn nhiều, phải không? Bây giờ đi và sử dụng các non-suspending breakpoint! Tất cả những gì bạn cần làm là chạy ứng dụng ở chế độ debug và được đính kèm và các thông báo sẽ hiển thị trong bảng điều khiển debug

Sự phong phú của chức năng breakpoint trong IDE cũng không bị giới hạn bởi loại Log. Bạn có thể thêm các điều kiện vào các breakpoint, sử dụng kết hợp các breakpoint để chỉ bật các breakpoint nhất định sau khi breakpoint  khác được chạy  và còn nhiều hơn thế :))))

Mình tin rằng có rất nhiều điều tuyệt vời mà trình gỡ lỗi IDEcó thể làm, và  đây mới chỉ là 1 phần rất nhỏ mà IDE của Android Studio mang đến cho anh em, nhưng lại vô cùng hữu ích phải không nào :))). Mặc dù tính năng ghi Log của các non-suspending breakpoint đã được có từ lâu, nhưng vẫn còn được nhiều người sử dụng và yêu thích, bất kể cho có các tool mới liên tục xuất hiện 

OK. Mình hy vọng tip nhanh này sẽ khuyến khích nhiều người tìm hiểu các công cụ mà chúng ta có sẵn và nhận ra chúng mạnh đến mức nào! Đồng thời cũng mong anh em thấy thoải mái khi không phải đọc lí thuyết nhàm chán :D


Nguồn: [Tip](https://tips.seebrock3r.me/quick-android-studio-tip-debug-logs-without-code-3b703b20390b)