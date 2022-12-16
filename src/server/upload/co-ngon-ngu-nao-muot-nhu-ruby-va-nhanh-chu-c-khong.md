Trong hành trình không bao giờ kết thúc để tìm sự hài hòa giữa tốc độ làm việc (tốc độ phát triển) và tốc độ của sự việc (hiệu suất), tôi đã bắt gặp một dự án trong các giai đoạn phát triển mà tôi nghĩ: "Đây là ngôn ngữ duy nhất đối với tôi"

Đó là sự mê đắm từ cái nhìn đầu tiên với `Crystal` , một ngôn ngữ lập trình được xây dựng cho con người và máy tính. Thật là một sự nghiệp cao quý. Đã từng hâm mộ vẻ đẹp của cú pháp Ruby, lời hứa về cú pháp giống Ruby với tốc độ của C thật hấp dẫn - thậm chí thay đổi cuộc sống.

Kể từ ngày hôm đó, tôi đã theo sát sự tiến bộ của Crystal và hôm nay, tôi sẽ đưa ra một lý do tại sao bạn nên quan tâm. Đó thực sự là một trong những ngôn ngữ thú vị nhất với lời hứa cho tiềm năng lớn.

Trước khi chúng tôi tham gia, hãy nhớ rằng Crystal chưa sẵn sàng để sản xuất, nhưng bạn vẫn có thể tìm thấy nhiều dự án đã sử dụng nó - [như phiên bản Sidekiq này](https://github.com/mperham/sidekiq.cr) , được viết bằng Crystal.

# Tại sao lại là Crystal?

Vì vậy, tại sao mọi người nên quan tâm đến một ngôn ngữ lập trình khác? Chà, bởi vì Crystal đã kết hợp của các thành phần vô cùng hấp dẫn mà bạn sẽ không tìm thấy trong nhiều ngôn ngữ khác.

## Cú pháp đẹp

Một trong những điều hấp dẫn nhất về Crystal là cú pháp giống như Ruby sạch và dễ đọc. Những người tạo ra ngôn ngữ đã hiểu sự hấp dẫn của Ruby là một trong những ngôn ngữ hấp dẫn nhất và họ lấy đó làm nguồn cảm hứng cho Crystal.

Vì vậy, nếu bạn đến từ thế giới Ruby, việc chuyển sang Crystal sẽ trở nên đơn giản. Hầu hết thời gian, bạn sẽ có thể chạy mã Ruby trực tiếp trong Crystal hoặc chạy các chương trình Crystal trong Ruby shell.

Để hoàn thiện tất cả, bạn thậm chí có thể làm nổi bật cú pháp Ruby với Crystal. Tương tự như hầu hết các ngôn ngữ được giải thích, Crystal sẽ cho phép bạn xây dựng trí tưởng tượng điên rồ nhất của mình trong một vài dòng mã.

## Hiệu suất nhanh

Crystal là một ngôn ngữ được biên dịch tĩnh được xây dựng dựa trên khung LLVM và có thể giữ ngôn ngữ của riêng nó chống lại các ngôn ngữ như C, C ++ và Rust .

Chỉ cần để nó chìm trong một chút, tốc độ phát triển của cú pháp Ruby với tốc độ phù hợp với C.

Nó vô cùng hấp dẫn và hy vọng bạn có hứng thú như tôi khi tôi lần đầu tiên nghe tuyên bố đó. Đừng tin tôi? Chỉ cần kiểm tra một số điểm chuẩn mới nhất, [đây](https://github.com/tbrand/which_is_the_fastest) hoặc [cái này](https://github.com/drujensen/fib)

## Hiệu suất siêu cao với các ràng buộc C dễ dàng

Nếu một phần trong ứng dụng hoặc thuật toán của bạn yêu cầu hiệu năng cực cao, một chiến lược là giảm tải chức năng cho tiện ích mở rộng hoặc thư viện C.

Với Crystal, liên kết với các thư viện C hiện có hoặc thư viện C của riêng bạn có thể được thực hiện mà không cần viết một dòng mã C.

Hãy xem xét một ví dụ nhanh về thư viện C hello.cmà chúng ta có thể xây dựng bằng trình biên dịch `GCC gcc -c hello.c -o hello.o`.

```c
#include <stdio.h>
void hello(const char * name){
  printf("Hello %s!\n", name);
}
```

Sau khi xây dựng nhị phân, bạn có thể dễ dàng liên kết nhị phân bằng cách sử dụng `Link` và xác định `lib` khai báo nhóm các chức năng và loại thuộc thư viện đó - tiếp theo là gọi hàm của bạn.

```ruby
#hello.cr
@[Link(ldflags: "#{__DIR__}/hello.o")]
lib Say 
  fun hello(name : LibC::Char*) : Void
end
Say.hello("your name")
```

## Static typing

Crystal là một ngôn ngữ được gõ tĩnh, cho phép nó loại trừ nhiều lỗi liên quan đến loại tại thời gian biên dịch và thiết lập giai đoạn tối ưu hóa không thể thực hiện được trong các ngôn ngữ được gõ động như Ruby hoặc Python.

Điều này trực tiếp góp phần vào hiệu suất của Crystal và điều ấn tượng hơn nữa là trình biên dịch trong Crystal chỉ yêu cầu bạn chỉ định rõ ràng các loại trong trường hợp không rõ ràng - thời gian còn lại bạn có thể làm việc với nó như bất kỳ ngôn ngữ động nào.

## Macro

Macro là một cách để sửa đổi cú pháp trừu tượng được tạo trong giai đoạn mã hóa và phân tích cú pháp của ngôn ngữ lập trình, cho phép chúng ta thêm các phương thức vào thời gian biên dịch hoặc tạo và sửa đổi các lớp.

Ưu điểm chính của điều này là tốc độ - vì bạn tiết kiệm được rất nhiều thời gian của trình biên dịch để gọi / gọi các hàm.

Crystal cho phép bạn sử dụng phần lớn ngôn ngữ khi viết macro, điều đó có nghĩa là bạn có thể thực hiện các thuật sĩ điên rồ mà thông thường sẽ không nghe thấy trong một ngôn ngữ được biên dịch tĩnh.

## Web frameworks

Mọi sự so sánh sẽ không hoàn thành nếu không nói về các khung web có sẵn bằng ngôn ngữ và nếu bạn đã yêu thích Rails và Phoenix - bạn sẽ cảm thấy như đang ở nhà với khung web Amber của Crystal .

Nó được thiết kế từ dưới lên để theo Rails nhưng rõ ràng là một thứ tự có độ lớn nhanh hơn Rails - với thời gian tải tính bằng micro giây không phải là mili giây.

Nếu bạn rơi vào trại của những người yêu thích Sinatra , đừng sợ vì bạn đã có được sự đơn giản của khung Kemal .

Tôi có đề cập đến việc máy chủ HTTP tích hợp của Crystal có thể xử lý hơn 2 triệu yêu cầu mỗi giây trong thử nghiệm điểm chuẩn không? Và hầu hết các khung cũng cung cấp thời gian phản hồi dưới một phần nghìn giây cho các ứng dụng web.

# Chờ một chút, còn gì chưa ổn ở đây?

Là kỹ sư phần mềm, chúng tôi luôn đánh đổi khi chọn ngôn ngữ lập trình hoặc khung và giống như bất kỳ ngôn ngữ nào, Crystal không phải là câu trả lời cho tất cả những mong đợi của bạn và đi kèm với những hạn chế của riêng nó.

* Crystal vẫn còn tương đối mới và chưa trưởng thành dẫn đến thiếu cộng đồng và các gói tại thời điểm đặc biệt này.
* Điều này cũng dẫn đến sự khan hiếm các công cụ phát triển có sẵn mặc dù chúng đã sẵn sàng.
* Nếu bạn đang nhắm đến việc làm một cái gì đó cực kỳ cụ thể, bạn sẽ gặp khó khăn khi tìm tài liệu nhưng điều này chỉ có nghĩa là chúng tôi có cơ hội là người đầu tiên chấp nhận và cùng nhau hack các dự án tuyệt vời.
* Mặc dù đồng thời được tích hợp vào Crystal, công việc vẫn đang được thực hiện khi song song là một công dân hạng nhất.
* Do trạng thái tiền sản xuất của ngôn ngữ, có khả năng phá vỡ các thay đổi cho đến khi đạt được v1.0.
* Nó cũng không có khả năng tương thích Windows tuyệt vời nhưng khá trung thực, đó không phải là một điều tiêu cực đối với tôi.

# Chốt lại

Có lẽ vẫn còn một thời gian nữa cho đến khi Crystal sẵn sàng để sử dụng sản xuất, với các công cụ tuyệt vời và một cộng đồng thịnh vượng đằng sau nó. Nhưng thật thoải mái khi biết rằng một ngôn ngữ tuyệt vời như Crystal nằm trong các tác phẩm đằng sau hậu trường.

Nhìn vào tất cả các tính năng mà Crystal mang lại với nhau, nó xứng đáng nhận được rất nhiều sự chú ý và phổ biến. Nếu tôi khơi gợi sự quan tâm của bạn, tôi sẽ khuyến khích bạn kiểm tra Crystal và đưa ra quyết định của riêng bạn.

# Tham khảo
Bài viết được dịch từ 
[https://medium.com/better-programming/slick-like-ruby-fast-like-c-does-such-...](https://medium.com/better-programming/slick-like-ruby-fast-like-c-does-such-a-language-exist-9066fc16e6f1)

> Cuộc đời cơ bản đã đủ phức tạp và buồn rồi. Vậy nên hãy làm sao cho mọi chuyện thật đơn giản nhé :v: