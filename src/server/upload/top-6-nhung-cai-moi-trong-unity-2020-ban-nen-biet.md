![](https://images.viblo.asia/1c83433d-0717-4d17-8b50-676a9bbd1e6a.jpg)

Chào các bạn!

Lại là mình đây, tháng nào cũng có 1 bài nhé :v

Như các bạn cũng biết, Unity 2020 đã ra mắt được vài tháng, và hẳn là cái gì mới ra cũng sẽ có những cải tiến để chúng ta có thể thuận tiện hơn trong việc phát triển dự án.

Vậy những cái mới đó là gì, nó giúp gì được cho chúng ta trong quá trình phát triển dự án?

Hãy cùng mình tìm hiểu nhé!

P/s: Có rất rất nhiều thứ thay đổi khi chúng ta thay đổi cả 1 phiên bản theo năm thế này, nhưng mình sẽ liệt kê một số cái theo những gì mình hay dùng, hay gặp thôi các bạn nhé ^_^

### 1. Focused Inspector.

- Ở Inspector chúng ta có các component, mỗi khi chúng ta select 1 object khác thì các comment tương ứng của object đó sẽ hiển thị tại Inspector, và nếu chúng ta muốn theo dõi các component của 1 object bất kì, thì hoặc chúng ta cứ select nó mãi, hoặc chúng ta khóa nó lại (hình cái khóa ở góc phải phía trên Inspector), nhưng khi khóa thì lại không thể theo dõi các component của các object khác.
- Ở phiên bản 2020 chúng ta có thêm cái gọi là Focused Inspector, khi chúng ta muốn theo dõi 1 component của 1 object nào, chúng ta chỉ việc chuột phải vào component đó, rồi chọn properties, và như vậy component đó sẽ được tách ra 1 cửa sổ riêng để các bạn theo dõi, và các bạn hoàn toàn có thể select các object khác để cùng theo dõi trong quá trình Play Editor, thật sự quá tiện lợi để theo dõi đúng ko nào, mình đã mong có cái này từ rất rất lâu rồi, trước đây toàn phải log ra console để biết value của các component khác rất bất tiện!

![](https://images.viblo.asia/bdbef290-bd51-4899-aacb-d23960e1ff81.PNG)


### 2. Package Manager and Asset Store.

- Các bạn có khi nào cảm thấy vô cùng khó chịu mỗi khi phải đợi cái web asset store trong Unity nó load lên ko? đối với mình thì lần nào cũng vô cùng khó chịu, nó vừa chậm, vừa khó thao tác vì nó là 1 cửa sổ web nhỏ. Trong khi có 1 thứ vô cùng nhanh, tiện lợi, trực quan, cũng để chúng ta cài các plugin vào Unity đó là Package Manager thì lại giới hạn khá ít ở những thứ của riêng Unity mà thôi.
- Và giờ thì đã khác, Unity đã thấu hiểu điều đó, giờ thì tất cả những asset của bạn mua trên store sẽ đều có thể tìm thấy, download, và import vào trong project từ Package Manager, quá tuyệt phải ko nào! ^_^

![](https://images.viblo.asia/064e64dc-9d01-4086-b0bd-ded7770cc61d.PNG)


### 3. Visual Studio Editor.

- Đơn giản thì trước giờ chúng ta cũng vẫn hay cài qua trang của Microsoft, hoặc thông qua Unity Hub, nhưng đôi khi có ai đó cài Unity nhưng quên không tích vào phần cài cả Visual, thế là cái sự mò mẫm lại diễn ra (cách đây 1 tuần mình vẫn thấy có bạn hỏi trên group Unity trên facebook là sao không liên kết được Unity với Visual Studio).
- Giờ thì đơn giản quá rồi, nó được tích hợp luôn vào trong Package Manager, nơi mà bạn bắt buộc phải biết tới khi làm việc với Unity, giống như Google Play của Android hay Apple Store của IOS vậy, và thật đơn giản với chỉ 2 cái click là xong việc đúng ko nào ^_^

![](https://images.viblo.asia/09dad43a-7b5f-4846-bd32-5b17278b1fe3.PNG)


### 4. Device Simulator.

- Android cũng có giả lập thiết bị, IOS cũng có giả lập thiết bị, nhưng nói thật mình thấy cả 2 cái đó đều đáng thất vọng cả, sinh ra nhưng dùng thì còn khó chịu hơn là ko có! Tất nhiên với mấy bạn làm app chắc vậy là đủ rồi, chứ với game thì....
- Và giờ thì Unity cũng có rồi, nó thực tế hơn là việc chỉ chọn size hay độ phân giải rồi test trong Unity Editor nữa. Nhưng mình cũng chưa kịp test vụ này, để mình test rồi có gì sẽ thông tin tới các bạn xem nó có thuộc dạng "có cũng như không" như 2 thằng trên ko nhé ;)

![](https://images.viblo.asia/fdb2d079-1161-4d41-ad19-91a562b2533d.PNG)


### 5. In-Place Prefab Edit Mode.

- Nếu mình nhớ không nhầm thì từ Unity 2018 đã bắt đầu có Prefab Edit Mode rồi, nó thật sự rất tuyệt để chúng ta có thể chỉnh sửa những prefab một cách chuyên nghiệp và tiện lợi hơn, và mình thật sự thích nó vì chỉ cần sửa 1 Prefab gốc là nó sẽ update trên tất cả những Prefab ở tất cả các scene luôn. Nhưng có những thứ vẫn chưa phải là hoàn hảo, đó chính là việc khi vào Edit Mode, chúng ta chỉ thấy prefab đó, khiến đôi khi việc chỉnh sửa scale, rotation đôi khi phải back ra vào để sửa từng chút một rồi lại view lại sửa... cho đúng ý của chúng ta.
- Giờ thì ok rồi, Unity đã show cho bạn thấy cả cái Prefab đó, và cả những môi trường nó đang đứng, việc bạn sửa nó sẽ được update ngay lập tức để bạn thấy nó đang ảnh hưởng tới môi trường, khung hình như thế nào. Một bước cải tiến đầy nhân văn :v

![](https://images.viblo.asia/abeed702-8fb2-4ae6-a072-5e247fbb3b7c.PNG)


### 6. Copy/Cut and Paste in Unity Editor.

- Ở những phiên bản trước, việc chúng ta chỉ có thể copy, chứ không thể cut, nếu muốn chúng ta cần phải dùng biện pháp kéo thả các object trên Hierarchy, nhưng giờ thì đã có thể Cut rồi.
- Ngoài ra ở Inspector, trước đây muốn copy và paste value của 1 component chúng ta sẽ cần ấn vào dấu 3 chấm rồi chọn copy, và lại chọn dấu 3 chấm rồi chọn paste. nó vừa khó thao tác vì dấu đó nhỏ, vừa nhiều thao tác nữa. Giờ thì chỉ việc ấn Ctrl+C và Ctrl+V 1 cách hết sức tự nhiên là xong.

Và đây là 6 cái mình hay sử dụng và cảm thấy cần được cập nhật sửa đổi nhất thì đã có mặt trên 2020 rồi, nhất định trong thời gian tới mình sẽ upgrade những project của mình lên Unity 2020 dùng cho tiện. Hi vọng qua bài viết này bạn sẽ tìm thấy những điều mình cần nhé!

Chúc các bạn cuối tháng vui vẻ ^_^