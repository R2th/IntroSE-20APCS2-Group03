## Động lực
Tôi muốn chia sẻ quan điểm của riêng tôi về Storyboard với một số giới hạn của nó bằng kinh nghiệm trải qua một số dự án thực tế cùng các dev khác.

## Mục tiêu
Đầu tiên, bạn sẽ học được ở những trường hợp nào tôi thích sử dụng storyboard. Thứ hai, bạn sẽ học những trường hợp nào tôi không sử dụng storyboard. Cuối cùng, bạn hãy theo dõi các bài viết của tôi nhé (lol). Cùng bắt tay vào thôi

## Khi tôi thích Storyboard
Nếu bạn đọc bài viết này, bạn nhận thấy tất cả các hướng dẫn của tôi sử dụng storyboard. Đây là lý do tại sao.
### Khởi tạo nhanh
Nếu tôi không  tạo 2 viewController đi kèm với một navigation controller và thêm một button liên kết từ viewController thứ nhất đến viewController thứ hai với một segue, nó cần 30s với một storyboad. Bạn có cảm thấy nhanh không ? :D. Tuy nhiên, nếu tôi lập trình nó, nó chỉ tốn thời gian cho bước khởi tạo: khi thoát khỏi storyboard, thiết lập `UIWindow`, set contrainst, tạo đối tượng, thêm method `push` khi button được ấn. Vì thế, khi tôi tạo một hướng dẫn về điều này cho thấy các tính năng cụ thể như là `delegate` hoặc `UIAnimation`, Tôi thích Storyboard

### Nhắc lại
Khi tôi tạo một hướng dẫn, tôi chỉ sử dụng một storyboard bởi vì nó trực quan và chúng tôi thích những công cụ. Tôi không thích tạo những đối tượng tĩnh bằng cách lập trình như là UILabel và UIImageView. Nó cần nhiều cơm thay vì sử dụng các nơ-ron thần kinh

### Rào cản thấp
Khi một người mới bắt đầu và không có bất kỳ kinh nghiệm nào hỏi tôi một trong những cách học lập trình. Tôi luôn gợi ý sử dụng đầu tiên là storyboard và sau đó tiếp tục nếu họ muốn. Một storyboad cung cấp một nơi tuyệt vời cho những ai không quen với hệ sinh thái iOS như điều hướng và các tab  được cấu trúc như thế nào. Ngoài ra, nó cho phép tìm ra các đối tượng mặc định nhìn giống như là `UISegmentedControl` và `UISlider` sử dụng các thuộc tính và phương thức liên quan
Đặc biệt các designer thích Storyboad vì cảm thấy nó giống như một phiên bản chuyển động chậm của Sketch hoặc Powerpoint. Nó chỉ cảm thấy trực quan

Tóm lại, tôi thích sự dụng một Storyboad khi tôi muốn giới thiệu một hệ sinh thái iOS
## Khi tôi thích chạy bằng cơm
Tôi có thể hăng máu hơn vì tôi sợ các project với các storyboard

### Merge Conflict
Cho những ai trước đây không sử dụng Github,  nó tương tự Dropbox dành cho geek
Nếu bạn và partner của bạn làm việc trên storyboard, và cố gắng upload nó lên cloud, bạn sẽ nhận được rất nhiều dòng code bị conflict vì Github không biết code của ai để ưu tiên. Kết quả là, bạn phải sửa từng dòng trước khi re-upload lại. Một storyboad bao gồm rất nhiều các dòng code để render ra UI. Ví dụ, nếu partner của bạn vừa xoá một button, và bạn cố đổi màu cho button đó, bạn sẽ phải đối mặt với hàng loạt conflict, và để merge chúng gây ra rất nhiều khó khăn. ;( ;( ;( ;( ;(
Một số ý kiến cho rằng bạn có thể tạo một storyboard cho mỗi viewController để ngăn không cho các dev khác làm việc trên viewController tương tự. I nghĩ rằng, chúng ta không sống trong một thế giới lý tưởng, và chúng ta giải quyết cái sự tẻ nhạt đó như thế nào ?
> Bro, I'm gonna work on this. Don't touch this until I say no :D
>
### Khả năng tái sử dụng
Tôi thích tạo đối tượng theo chương trình vì tất cả những gì tôi làm là sao chép và dán từ các dự án trước đó cho các UI. Ví dụ, tôi từ chối thiết kế một viewController đăng nhập nếu tôi tham gia hackathon và tôi chỉ có 24h. Tốc độ là tất cả đối với các freelancer. Ý tôi là bạn có thể vẫn sử dụng storyboard và tạo đối tượng theo chương trình, nhưng sau đó những gì là điểm sử dụng một storyboard với các viewController rỗng. Nó chỉ đi ngược lại cái tên.
> Story + Board
> 
Nó trông giống như một cái board rỗng
Tôi cũng ngại các segue. Nếu bạn có nhiều hơn 10 viewController trong một storyboard và mỗi viewController điều hướng thông qua các segue, nó sẽ trở nên ;( :( :( cho bạn để cập nhật luồng hoặc thiết kế lại. Và chính tôi cũng đã trải qua dự án với điều tương tự như thế này.
Tôi đã đề cập đến bước khởi tạo nhanh hơn khi sử dụng một storyboard. Nhưng nếu tôi có một bản mẫu nơi mà tôi có thể sao chép và dán một cách đơn giản cho giai đoạn ban đầu. Nó đang là vấn đề tranh luận rằng cách nào nhanh hơn.
### Bạn đã biết tất cả
Nếu bạn không phụ thuộc nhiều vào storyboard, bạn có nhiều khả năng để tham khảo tài liệu API thường xuyên vì bạn có thể tìm kiếm và sử dụng các phương thức và thuộc tính. Ở đó không có `IBDesignable` chon bạn thay đổi border radius. Vì thế, nhiều lúc bạn đọc qua tài liệu khác và nghiên cứu, bạn bắt đầu để làm quen với hệ sinh thái. Ví dụ, bạn sẽ có một hiểu biết chi tiết về cách hoạt động của `UITabBarController` và `UINavigationBar`. Nó cần thiết vì nhiều lúc bạn phải ghi đè các thuộc tính và phương thức đó thông qua các class con. Nếu bạn chỉ phụ thuộc vào storyboard, bạn sẽ phải đổi mặt với khủng hoảng

### Không có nhiều kiểu
Để connect vào viewController trong một storyboard nhanh chóng, bạn phải tự gõ chuỗi trên các storyboard cho các ID. Nó chỉ gây thêm phiền toái. Dĩ nhiên, khi tôi nhận được lỗi chính tả, tôi có thể lưu chúng như một hằng số. Nhưng nếu bạn thêm nhiều viewController hoặc thay đổi tên của nó, không chỉ bạn phải thay đổi tên từ Swift file, và cũng phải đổi tên trong storyboard. Nó rất tốn thời gian và lãng phí
## Một số tranh cãi
Một số tranh cãi về Storyboard cung cấp luồng chính xác của app. Nhưng với tôi, nó không chỉ giống như một cái cớ vì nếu bất kỳ một sự nguy hại về tạo app hoặc website, bạn luôn phải bắt đầu với thiết kế và các interview để chứng minh rằng nó đúng. Bạn nên biết chính xác số của viewController, animation và các mô hình hoàn thiện. 
## Các "Ông lớn" thích cái nào
Youtube, Facebook, Messenger, Instagram, không sử dụng storyboard. Tôi thấy nó sử dụng React Native để render UI. Vì thế, nếu các ông lớn từ bỏ nó, tôi đoán là không có vấn đề gì khi làm theo họ vì tôi muốn học hỏi thực tiễn tự họ. Để cung cấp cho bạn một sự tương đồng trong phát triền web, nhiều người có thể tạo các trang web thông qua kéo và thả, nhưng không có cách nào cho những người để xây dựng như Medium, Youtube và Facebook

## Lưu ý cuối cùng
Tôi tin bạn sẽ hiểu bây giờ tại sao tôi không sử dụng Storyboard.
Cảm ơn bạn đã theo dõi bài chia sẻ của tôi!
Hẹn gặp lại các bạn ở các bài viết tiếp theo