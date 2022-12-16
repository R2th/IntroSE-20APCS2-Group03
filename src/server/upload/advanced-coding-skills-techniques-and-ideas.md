Một dev tốt đựơc xác định bởi các dòng code họ viết ra. Trong ngành công nghiệp phần mềm, viết code đẹp có nghĩa là tiết kiệm tiền có thể được đầu tư vào thử nghiệm, cập nhật, mở rộng hoặc sửa lỗi. Trong bài viết này, tôi sẽ cho bạn thấy các ví dụ thực tế về một số kỹ thuật và ý tưởng sẽ giúp bạn dọn sạch code của mình và cấu trúc lại nó để làm cho nó mạnh mẽ hơn và module hóa. Những kỹ thuật này không chỉ giúp bạn cấu trúc lại code cũ mà còn cung cấp cho bạn những ý tưởng tuyệt vời về cách viết clean code từ bây giờ.

### Tái cấu trúc là gì và tại sao chúng ta cần nó?
Tái cấu trúc đề cập đến các kỹ thuật và các bước giúp bạn viết clean code. Điều này rất quan trọng đối với các nhà phát triển khác, những người sau đó sẽ có thể đọc, mở rộng và sử dụng lại code mà không cần phải chỉnh sửa nhiều.

Các dòng tiếp theo sẽ cho bạn thấy một số ví dụ về tái cấu trúc mã kế thừa và làm cho nó tốt hơn.

### Không bao giờ cấu trúc lại code mà không có Unit Test

Lời khuyên đầu tiên của tôi là đừng bao giờ bắt đầu tái cấu trúc code mà không có Unit Test. Tôi đoán lý do rất rõ ràng: Bạn sẽ kết thúc tái cấu trúc với các chức năng bị hỏng vì bạn sẽ không thể tìm ra những gì bị hỏng hoặc bạn biến đổi mất độ chính xác của đoạn code ban đầu. Do đó, nếu bạn cần cấu trúc lại nó, hãy bắt đầu với Unit Test nó trước. Hãy chắc chắn rằng phần bạn sẽ tái cấu trúc đều vượt qua được Unit Test.

### Bắt đầu tái cấu trúc từ điểm sâu nhất của code của bạn

Hãy nhìn vào bức tranh tiếp theo. Đây là một dự án thực sự cho một hệ thống quản lý khách sạn mà tôi tìm thấy trên Github. Đây là một dự án nguồn mở thực sự nên nguồn đóng có thể tồi tệ nhất.
![](https://images.viblo.asia/115b9bde-4601-4cb1-9af9-861f9d50fa3f.png)

Như bạn có thể thấy trong phương pháp này, có ba cấp độ được đánh dấu màu đỏ. Điểm sâu nhất phải là câu lệnh `if / else` lồng trong điều kiện `if` đầu tiên. Thông thường, điểm sâu nhất là tập trung vào một logic duy nhất giúp dễ dàng cấu trúc lại.

### Làm cho các `method` của bạn ngắn hơn bằng cách chia chúng thành các `method` nhỏ hơn hoặc `class`/`DB`

Có lẽ, trong trường hợp này, chúng ta có thể trích xuất nó sang một `method` nhỏ như sau:

![](https://images.viblo.asia/ad798ed9-e66b-4ebb-a918-870a398b0b1a.png)

Điểm sâu nhất tiếp theo sẽ là tìm nạp dữ liệu bài đăng và tải lượt xem. Bây giờ, hãy xem phương thức add () sau khi tái cấu trúc các phần khác. Nó là nhiều sạch hơn, có thể đọc và kiểm tra.
![](https://images.viblo.asia/f0b827b5-298c-4ceb-a7fd-a07d190990d8.png)

### Luôn sử dụng `{}` trong `if-statement`

Hầu hết các ngôn ngữ lập trình đều hỗ trợ một câu lệnh if và một số nhà phát triển sử dụng nó vì nó đơn giản, tuy nhiên, nó không thể đọc được và dễ gây ra sự cố vì chỉ một dòng trống có thể phá vỡ điều kiện và bắt đầu gặp sự cố. Xem sự khác biệt giữa hai ví dụ:

![](https://images.viblo.asia/bbd68bc2-3e5e-4dee-bb38-11030551df86.png)

### Không sử dụng `magic number` hoặc `magic string`:

Trong ví dụ tiếp theo, bạn nhận thấy nếu các phòng lớn hơn 250, nó sẽ trả về một thông báo lỗi. Trong trường hợp này, 250 được coi là `macgic number`. Nếu bạn không phải là nhà phát triển đã viết nó, sẽ rất khó để tìm ra những gì nó đại diện.

![](https://images.viblo.asia/ebf3c4aa-5ad1-4423-9e63-7590c3c565e5.png)

Để cấu trúc lại phương pháp này, chúng ta có thể hình dung ra 250 là số phòng tối đa. Do đó, thay vì mã hóa nó, chúng ta có thể trích xuất nó thành biến `$maxAvailableRooms`. Bây giờ, nó dễ hiểu hơn đối với các nhà phát triển khác.

![](https://images.viblo.asia/1405523e-aabb-4751-ac1b-ed05add31329.png)


### Không sử dụng `else` nếu bạn không cần:

Trong cùng một hàm `availablerooms()` bạn nhận thấy câu lệnh if, trong đó chúng ta có thể dễ dàng thoát khỏi phần khác và logic vẫn sẽ giống nhau.

![](https://images.viblo.asia/1405523e-aabb-4751-ac1b-ed05add31329.png)

### Sử dụng tên có ý nghĩa cho `method`, `variable` của bạn

Trong ví dụ sau, bạn có thể thấy rằng có hai phương thức từ hệ thống quản lý khách sạn có tên là `Index index()` và `room_m ()`. Đối với tôi, tôi không thể xác định mục đích của họ là gì. Tôi nghĩ sẽ dễ hiểu hơn nếu tên của họ được mô tả.

![](https://images.viblo.asia/931c27e8-ce20-46fb-9270-52841c4fc80f.png)



### Kết Luận

Hi vọng bài dịch này sẽ giúp đựoc bạn.
Nguồn: https://medium.com/@maladdinsayed/advanced-techniques-and-ideas-for-better-coding-skills-d632e9f9675