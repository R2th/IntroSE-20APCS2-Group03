Đây là bài dịch từ của một chia sẻ trên trang [medium](https://medium.com), bài viết nguồn mời các bạn xem tại đây: https://medium.com/@abhimuralidharan/ios-content-hugging-and-content-compression-resistance-priorities-476fb5828ef

Độ ưu tiên là một vấn đề rất quan trọng khi xử lý **Autolayout**. Mọi ràng buộc đều có một ưu tiên. Nó chỉ là một số có phạm vi từ 0 - 1000.
> Theo tài liệu của *Apple*: Độ ưu tiên bố trí dùng để chỉ ra cho hệ thống bố trí dựa trên ràng buộc biết ràng buộc là quan trọng hơn, cho phép hệ thống thực hiện sự đáp ứng phù hợp với toàn bộ các ràng buộc.

> Độ ưu tiên thực sự cần thiết chỉ khi hai ràng buộc khác nhau xung đột. Hệ thống sẽ dành tầm quan trọng cho ràng buộc có mức độ ưu tiên cao hơn. Vì vậy, độ ưu tiên là công cụ phá vỡ các quan hệ ràng buộc bằng nhau trong thế giới Autolayout.

![](https://images.viblo.asia/50599128-4667-49ae-a2aa-a45b42ec7604.png)

### Độ ưu tiên Content hugging
**Content hugging** là việc thiết lập độ ưu tiên với một view chống lại việc lớn hơn kích thước nội tại của nó. Thiết lập giá trị lớn hơn cho mức ưu tiên này có nghĩa là chúng ta không muốn view lớn hơn nội dung của nó.
Xem xét tình huống trên trong đó hai view được đặt theo chiều ngang mà không có ràng buộc thích hợp nào cho chiều rộng. Điều này sẽ tạo ra một xung đột. Trong tình huống này, chúng ta cần đặt mức độ ưu tiên **Content hugging** của một view lớn hơn so với view còn lại.

![](https://images.viblo.asia/bd9f41ea-7128-4b17-8e98-ddfcab399375.png)

Hãy xem xét hình ảnh này. Hai Label được thả vào một view và các ràng buộc được đưa ra ở *top*, *leading*, *trailing* của cả hai Label. Chiều rộng của cả hai Label này không được thiết lập, điều này tạo ra xung đột giữa Label này. Ở đây, cả hai Label đều có mức độ ưu tiên **Content hugging** ngang bằng với 251. Như tôi đã đề cập trước đây, một view nên có ràng buộc ưu tiên cao hơn so với view khác để phá vỡ mối quan hệ.
Hãy đặt độ ưu tiên **Content hugging** ngang của label màu xanh lá cây thành 250 và để mức độ ưu tiên của label màu xanh da trời không thay đổi. Trong trường hợp này, như đã đề cập trước đó, một view có mức độ ưu tiên **Content hugging** ngang cao hơn sẽ không vượt quá kích thước nội dung của nó. Điều đó có nghĩa là label màu xanh lá cây sẽ to ra và label màu xanh da trời sẽ bám vào kích thước nội dung bên trong của nó.

![](https://images.viblo.asia/2cb6bec0-226c-4f27-9f05-ae8f67ae62b8.png)

Tương tự, nếu màu xanh lá cây có giá trị cao hơn có nghĩa là label màu xanh sẽ phát triển vượt quá kích thước nội dung bên trong của nó.

![](https://images.viblo.asia/79c1e103-3e47-462f-b601-5c420dd81087.png)

> Vì vậy, độ ưu tiên **Content hugging** lớn hơn, các view bị ràng buộc sẽ ôm chặt vào nội dung bên trong hơn ngăn chặn view phát triển vượt quá kích thước nội dung bên trong của nó.

### Độ ưu tiên Content compression resistance
Đặt mức độ ưu tiên mà view chống lại được thực hiện nhỏ hơn kích thước nội tại của nó. Đặt giá trị cao hơn có nghĩa là chúng ta không muốn khung nhìn thu nhỏ hơn kích thước nội dung bên trong.
**Content compression resistance** là khá rõ ràng. Không có nhiều sự phức tạp ở đây. Ưu tiên cao hơn có nghĩa là khả năng chống lại sự bị thu hẹp là lớn hơn.

Dưới đây là một ví dụ: Xem xét một butt có tên thực sự dài.
Để tên là button là “Button with a larger name”. Chúng ta sẽ thêm một ràng buộc đơn giản để giữ độ rộng của button ở mức 44 points. Autolayout thực hiện như đã nói và thu gọn nút của chúng tôi khiến nó hoàn toàn không thể đọc được. 

![](https://images.viblo.asia/f8354e5f-847c-4c1f-8cba-3d304d865049.png)

Không cần phải lo lắng, chúng ra sẽ sử dụng **Compression Resistance** để giải quyết vấn đề này. Hãy thiết lập mức độ ưu tiên của **Compression Resistance Priority** ngang là 1000. Và thay đổi mức độ ưu tiên của ràng buộc chiều rộng là bất kì giá trị nào từ 0 đến 999, nghĩa là nhỏ hơn giá trị mức độ ưu tiên **Compression Resistance Priority** ngang của button. Bây giờ, Autolayou sẽ cho phép button của chúng ta có kích thước nội dung nội tại vượt quá giới hạn về chiều rộng là 44 mà chúng ta đã thiết lập ở trên.

![](https://images.viblo.asia/9c79871c-6f9d-4b7a-a511-27bd626704a1.png)

Enjoy!!!