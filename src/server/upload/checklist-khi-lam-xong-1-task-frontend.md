Khi mới bắt đầu nhận 1 task giao diện, mình sẽ mở desgin của nó ra, nhìn ngắm, tính toán rồi bắt tay vào làm, nhưng sau khi hoàn thành dù đã giống bản thiết kế lắm rồi nhưng vẫn ăn bug ngập mồm. Sau những lần như thế mình đã đúc kết ra 1 số điều rất cơ bản sau sau để giảm thiểu tối đa các lỗi không đáng có :grinning:

## 1. Xử lý với các đoạn text dài luôn phải có tooltip nếu bị tràn nội dung
Trường hợp này thường xảy ra với title của 1 số item trong 1 list, thường thì ta thêm bộ 3 thuộc tính css này để tránh trường hợp text tràn ra gây vỡ giao diện
```
 text-overflow: ellipsis;
 white-space: nowrap;
 overflow: hidden;
```
nhưng như thế vẫn chưa đủ, nếu không hiện tooltip thì sẽ không thể hiển thị các thông tin bị ẩn => ăn bug :(

Giải pháp ở đây là ta có thể dùng thêm thuộc tính title của HTML tag hoặc 1 thư viện cung cấp tooltip nào đó.

![](https://images.viblo.asia/ba50c543-0db7-4298-9d97-7ecaea329a3c.gif)
## 2. Các giao diện dạng danh sách, văn bản cần phải có scroll
Với các giao diện dạng danh sách, văn bản nếu với người chưa có kinh nghiệm thì sẽ thường chỉ vẽ ra layout, fake 1 vài item vào để test. Khi đó mọi thứ đều hoàn hảo cho đến khi có dữ liệu thật với 5, 10, 100 bản ghi liệu giao diện có còn hoàn chỉnh khi chỉ quên 1 thuộc tính css cơ bản
```
overflow: auto;
```

Giải pháp ở đây là khi nhìn vào 1 giao diện dạng danh sách, văn bản cách tốt nhất là xem kỹ các trường hợp của giao diện xem scroll trong khoảng bố cục layout nào, test với đầy đủ dữ liệu dài ngắn, nhiều ít khác nhau để tránh ăn bug :grinning:
![](https://images.viblo.asia/47d5d2d0-61e3-4f5c-9fd5-764b14fc5eff.gif)

## 3. Auto focus ô input trong form và xử lý tab order
Người dùng rất lười ^^, vì điều đó nên các phần mềm của chúng ta mới ra đời để tối ưu hóa thao tác, tiết kiệm thời gian của người dùng nhất có thể. Nếu cứ mỗi lần nhảy vào 1 form nhập liệu, sau khi nhập xong lại click chuột vào ô input tiếp theo để nhập tiếp thì đúng là 1 cực hình. Chỉ vẽ ra giao diện mà không xử lý các thao tác cơ bản này => Ăn bug :(

Giải pháp ở đây là auto focus vào element nhập liệu đầu tiên của form và xử lý thuộc tính tabIndex.
![](https://images.viblo.asia/df82e134-9e01-4dcb-b5db-e5d6e60c3b42.gif)

## 4. Làm nhận diện các element có thể click được
Nếu bản thân mình vào 1 trang web mà không phân biệt được đâu là văn bản hay link, đâu là button hay hình ảnh thì mình sẽ rất ức chế vì muốn làm gì tiếp theo cũng phải click thử, mò mẫm :pout: . Đặt vào trường hợp của người dùng cũng thế, sẽ không ai muốn dùng tiếp phần mềm mà nó gây ra sự khó hiểu, mập mờ. => Ăn bug. :(

Giải pháp ở đây là đọc Style Guide của bản thiết kế hoặc xem lại rule chung của dự án hoặc nhìn thẳng vào state của element trong file thiết kế (nếu có) và sử dụng css các trạng thái hover, focus... đúng nhất với giao diện.
![](https://images.viblo.asia/c3c85a1e-b55f-45b2-b7e8-2fab49226cdd.gif)

## 5. Có tooltip cho các CTA dạng icon
Các CTA dạng icon luôn tạo ra sự thu hút người xem, khi nhìn vào người dùng có thể đoán được CTA này sẽ redirect đến đâu nhưng đó vẫn là sự thiếu rõ ràng sẽ tồi tệ hơn nếu icon này không thông dụng thì sẽ làm người dùng hiểu sai về chức năng => luôn cần có tooltip chú thích.

Giải pháp ở đây cũng giống như mục 1 là ta có thể dùng thêm thuộc tính title của HTML tag hoặc 1 thư viện cung cấp tooltip nào đó.
![](https://images.viblo.asia/aad46d39-91d7-41cc-bca8-e19476594433.gif)

## 6. Sử dụng skeleton khi gọi api lấy danh sách
Chia sẻ này là optional vì theo rule chung của 1 số dự án có thể sẽ sử dụng loading dạng spinner thay vì skeleton nhưng mục đích sử dụng của cả hai ở đây là phải có sự thể hiện đang lấy dữ liệu khi gọi api.

> Nghiên cứu của Kissmetric cho thấy, cứ mỗi 1s delay sẽ làm giảm 7% tỉ lệ bạn muốn người dùng thực hiện một hành động trên website theo ý bạn - conversion rate

Ngoài tác dụng để làm đẹp, mượt mà cho web thì đây cũng là cách thu hút sự tập trung của người dùng, người dùng rất dễ mất kiên nhẫn và chắc chắn không muốn nhìn vào 1 layout trắng xóa. Sử dụng skeleton sẽ làm cảm giác của người dùng quên đi sự nhàm chán khi phải chờ đợi 1 api nào đó đang chạy.

![](https://images.viblo.asia/0f48a1a2-e40e-4499-a1bb-a1f504a3b7a4.gif)

Trên đây là những chia sẻ về kinh nghiệm cả nhân của mình, còn với các bạn, khi code giao diện thì có những lưu ý gì? chia sẻ với mình dưới comment để mình bổ sung và hoàn thiện hơn nhé. :+1:

![](https://images.viblo.asia/f666ce6f-3159-42f8-90d2-783468d93198.jpg)