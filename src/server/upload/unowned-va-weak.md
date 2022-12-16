Mấy nay bệnh sml nên ngồi nhà rãnh đọc sách cũng như mấy bài về swift để kiếm thêm tí kiến thức và 3-4 lần trong ngày mình thấy chủ đề về ARC và Unowned/Weak/Strong hiện ra trước mắt mình. :D Thôi thì dịch tạm 1 bài tản mạn cho các bác hiểu về em nó nếu có dịp sẽ ra thêm nhiều bài khác.

-----
Mình khác chắc chắn là các bạn đọc bài đã có những người có kiến thức rất vững về bộ đếm quản lý bộ nhớ `unowned/ weak/ strong` . Nhưng có bao giờ các bạn nghĩ tới việc chúng sẽ gây crash trên các devices (thiết bị) khoảng 70% trường hợp và 30% trên các thiết bị khác hay vì sao việc sử dụng `unowned` có thể sẽ làm bạn ôn lằn trong vài trường hợp =)) ??

## Code to disscuss
Cùng bàn luận về đoạn code dưới tí nào. Tôi chắc là bạn đã dùng quá nhiều thứ này:
```
controller.choiceHandler{ [unowned self] (choice) in
   self.currentChoice = choice
   controller.dismiss(animated: true)
}
self.present(controller, animated: true)
```

Ở đây, tôi tạo ra một controller cho phép user lựa chọn (cứ cho đại là user sẽ chọn trường city ). Sau khi user đã chọn xong, tôi đi update lại currentChoice ở view-controller hiện tại và dismiss view cho phép user chọn đi.

Để tôi cho bạn thống kê mà tôi thu được nhé. Code trên sẽ giúp bạn ăn lol với:

* Thiết bị trên iPhone 7 và cũ hơn 30%
* Thiết bị trên iPhone 8 và mới hơn 70%

Vui vãi lol nhỉ =))

## Một số lý thuyết
Đầu tiên, tại sao chúng ta lại dùng `weak/ strong` chi rứa? Chắc chắn 100% là phục vụ cho việc quản lý bộ nhớ rồi. Tạo 1 strong reference giữa các objects có thể trở thành vòng lặp dẫn tới  [memory leak](https://vi.wikipedia.org/wiki/R%C3%B2_r%E1%BB%89_b%E1%BB%99_nh%E1%BB%9B). iOS sử dụng một cơ chết đếm bộ nhớ (reference counting) để hổ trợ hiểu quả việc giải phóng các object mà bạn không dùng tới nữa. Và mặc dù chúng ta đã có ARC- Auto Reference Counting cho Xcode nhưng nó cũng méo phải thuốc chữa bá bệnh. ARC hoạt động khi chương trình được biên dịch, vì thế chúng đặt một số code function như retain/release để nó hoạt động.

Trong một vài trường hợp, bạn phải vẽ vòng lặp tham chiếu đối tượng ra hoặc tư duy thêm về nó để chắc chắn là các bạn không bị memory leak. Nhìn vào ảnh sau nhé:
![](https://images.viblo.asia/ef998f27-479b-42c5-becf-65a81d1deb63.png)

Trong hình, chúng ta sẽ thấy 2 object A và B và chúng được trỏ reference với nhau. Vậy sẽ có chuyện gì xãy ra nếu chúng ta release toàn bộ 2 object này? Đó là reference count của 2 object này chắc chắc sẽ luôn tồn tại ít nhất là 1 do đó hệ thống sẽ không thể xoá chúng mà chúng vẫn mãi được giữ trong bộ nhớ. Nhỡ nó là một cái gì đó khá là nặng cho bộ nhớ thì sao:  như controller với rất nhiều components UI và dữ liệu nội bộ. Ở một góc nào đó, bạn sẽ đượn ôn lằn với một cú crash thần thánh vì iOS giới hạn bộ nhớ khả dụng cho ứng dựng tuỳ thuộc vào hệ điều hành và thiết bị.

Thế thì giải quyết vấn đề này làm cách nào ? Sử dụng weak reference cho một trong các objects được huỷ đầu tiên.
![](https://images.viblo.asia/365493b1-48a7-4e58-be92-b12e68d13181.png)

Ở đây, khi object B được release, object A không còn tham chiếu vòng "mạnh" tới object B nữa và không ảnh hưởng tới reference count của object B do đó object B sẽ được release và giải toả bộ nhợ mà nó chiếm đóng.

Nhưng có chuyện gì sẽ tới với các properties của object A, property giữ tham chiếu "yếu" tới object B? Nó sẽ nil do đó nó sẽ vận hành an toàn mà không gây sự cố gì.

## Hướng giải quyết
Bây giờ, chúng ta đã biết quản lý bộ nhớ hoạt động như thế nào với reference. Như bạn đã nhớ, trong Swift thì chỉ có các biến optional mới dược nil. Nó được dùng để hổ trợ cho an toàn kiểu dữ liểu trong quá trình phát triển và xcode có thể cảnh báo cho bạn biết có gì sai nếu có lỗi xãy ra.

Chúng ta còn một khái niệm nữa đó là `unowned` . Từ khoá này để nói với compiler rằng chúng tôi đang giữ một `weak reference` nhưng nó không phải kiểu optional, nó chắc chắn có giá trị (giống như việc ta unwrapped optional vậy, nó có thể là nil trước khi gán giá trị đầu tiên).
Thế thì điều gì sai ở đây, còn nhớ đoạn code ở trên chứ ??? 

```
controller.choiceHandler{ [unowned self] (choice) in
   self.currentChoice = choice
   controller.dismiss(animated: true)
}
self.present(controller, animated: true)
```
 
 Để ý là do dùng `unowned` nên ở đây phải chắn chắn là self không được nil. Điều gì sẽ xãy ra khi mà bạn lấy giá trị ấy ra khi mà self đã bị dismiss và delocated ? Chắc chắn là bạn sẽ ăn lol, vâng crash đậm, crash hại và không có notification nào cảnh báo từ xcode cã. Việc của bạn để giải quyết vấn đề này là thay `unowned` bằng `weak` .
 
```
controller.choiceHandler{ [weak self] (choice) in
   self?.currentChoice = choice
   controller.dismiss(animated: true)
}
self.present(controller, animated: true)
```

Bây giờ thì self vẫn là weak reference và truy vấn tới nó chẳng vấn đề gì cã, hệ thống vẫn chạy ào ào mà méo có crash luôn.

Đương nhiên là bạn vẫn phải quản lý lại logic code của bạn. Vì việc không lưu lại lựa chọn của user sẽ là một chiến lược giảm thiểu chức năng tồi tệ.  Hoặc bạn có thể sữ dụng các pattern khác như:
* Delegate
* Notification
* Shared storage
* etc.

(Note: :v phần này mình méo hiểu lắm ổng đang nói gì, cho ví dụ đã xong nói ỏng nói eo. Bạn nào hiểu  comment lại giúp mình nhé)

Nhưng ít ra là các bạn đã tránh được lỗi crash và cảm giác ăn sò ( :v sò ngon thế sao chẳng ai muốn ăn nhỉ ?). Đọc bài này xong chắc bạn cũng sẽ hiểu sơ sơ về quản lý bộ nhớ, cẩn thận với chúng khi làm việc nhé.
Chúc các bạn may mắn 


-----

:v bài dịch của mình tới đây là hết. Mong là các bạn sẽ hiểu hơn về `Memory leak` và cách phòng tránh nó trong quá trình phát triển iOS app. 

Bài dịch đã được mình thêm bớt vài câu chữ của mình cho thêm sinh động. Nguồn bài viết ở đây: [Another unowned/weak article
](https://medium.com/ios-os-x-development/unowned-vs-weak-d1e44454250b)