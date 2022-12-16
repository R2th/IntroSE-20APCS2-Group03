![](https://images.viblo.asia/af0ad454-2c8d-45b4-b561-3217e7ebc84f.png)
Rails 5 được relase vào cuối năm 2015, đầu 2016. Có nhiều tính năng mới tuyệt vời trong version này, nhưng việc Rails hỗ trợ WebSockets có vẻ là điểm mới và độc đáo nhất. 
## Giới thiệu về WebSockets
Trong trường hợp bạn không quen hoặc chưa nghe về WebSockets, hãy xem qua những khái niệm dưới đây để nắm cơ bản về WebSockets. 
Trong một ứng dụng web truyền thống, trình duyệt sẽ gửi request cho một trang web và máy chủ phản hồi với trang đó.
![](https://images.viblo.asia/c90300b9-06b2-4ead-baf2-2e7d57314551.png)
Khi trang được trả lại, kết nối được đóng lại. Điều này thật tuyệt nếu nội dung trang không bao giờ thay đổi, nhưng nó đặt ra một số vấn đề khi có một vài cập nhật mới trên máy chủ.

Cách duy nhất để trình duyệt nhận được những thay đổi đó là gửi 1 request khác và nhận response khác.
WebSockets được sinh ra để giải quyết vấn đề này. Trong ứng dụng WebSockets, thay vì thực hiện yêu cầu, trình duyệt sẽ kết nối với máy chủ. Kết nối này là liên tục, và nó có tính hai chiều. Tại bất kỳ thời điểm nào trong quá trình kết nối, máy chủ có thể gửi dữ liệu tới trình duyệt hoặc trình duyệt có thể gửi dữ liệu đến máy chủ.
![](https://images.viblo.asia/c8d11fca-b6e4-462b-bd42-339230973317.png)
## Action Cable
WebSockets đã xuất hiện trong nhiều năm và nhiều ứng dụng đã sử dụng nó. Trên thực tế, bạn thậm chí có thể sử dụng nó trong Rails 4, thông qua tổ hợp một số loại **gem** khác nhau, nhưng việc đó hơi tốn sức và phức tạp.
Những gì Rails 5 cung cấp là hỗ trợ tích hợp, thông qua **Action Cable**.
Có một số cài đặt ban đầu được thực hiện và bạn có thể tìm thấy những chi tiết đó [TẠI ĐÂY](https://github.com/rails/rails/tree/master/actioncable). 
Tôi sẽ không giới thiệu sâu vào việc cài đặt này bởi nó không phải là điều tôi muốn nói trong chủ đề này.
Điều tôi muốn nói là, làm thế nào **Action Cable** có thể được sử dụng để thêm khả năng thời gian thực vào các ứng dụng Rails.
Nói chung, có hai thành phần liên quan. Kênh back-end, chỉ là lớp Ruby kế thừa từ ApplicationCable :: Channel] và front-end, chỉ là một đối tượng Javascript với một số chức năng cụ thể được xác định.
## Tạo một ứng dụng Dog barking
Trong ví dụ này, tôi muốn tạo một ứng dụng cho phép chó phát tiếng sủa của chúng cho bất cứ ai nghe.
Điều đầu tiên chúng ta cần phải làm là thiết lập một **channel**. Để làm điều này, chúng ta tạo một lớp Ruby và kế thừa từ **ApplicationCable :: Channel**. Chúng ta đặt tên cho kênh này **BarkChannel**:
```
class BarkChannel < ApplicationCable::Channel
    def subscribed
        stream_from "barks"
    end
end
```

Một điều khác mà chúng tôi làm là thiết lập phương thức đã **subscribed** của chúng ta. Điều này sẽ được gọi khi một kết nối mới được thực hiện. Bên trong nó, chúng tôi gọi là **stream_from "barks"**. Điều đó nói với phía back-end rằng kết nối này sẽ nhận được tất cả các tin nhắn trên kênh **barks**.
Tiếp theo, chúng ta cần thiết lập giao diện người dùng để tạo kết nối với máy chủ. Điều này được thực hiện thông qua CoffeeScript sau:
```
App.dogs = App.cable.subscriptions.create "BarkChannel",
    connected: ->;

    disconnected: ->;
```
Phần quan trọng của code này là **App.cable.subscriptions.create "BarkChannel"**. Điều đó tạo ra một kết nối đến máy chủ, thông qua kênh Action Cable **DogChannel**. Các chức năng được kết nối và ngắt kết nối có thể được sử dụng để thực hiện mọi việc khi chúng ta bắt đầu và kết thúc liên lạc với máy chủ.
Tiếp theo, chúng ta sẽ cần một số UI cho phép nhập tiếng sủa. Tôi sẽ bỏ qua phần đó, vì nó khá đơn giản. Khi UI đã được hoàn thành, chúng ta sẽ gọi hàm **bark** trên đối tượng **App.dogs** :
```
App.dogs = App.cable.subscriptions.create "BarkChannel",
    connected: ->;

    disconnected: ->;

    bark: ->;
    var myDogsId = 1;
    @perform("bark", {id: myDogsId})
```
Chức năng **bark** trước tiên là thiết lập id cho con chó. Trong một ứng dụng Real Real, điều này có thể sẽ được truyền từ back-end khi kết nối được tạo lần đầu tiên, nhưng để đơn giản, tôi đã đơn giản mã hóa nó ở đây.
Sau đó, chúng ta gọi **@perform**, đó là một **Action Cable** đầy ma thuật. Request gửi dữ liệu ({id: myDogsId}) đến phía sau của channel, sử dụng phương thức **bark**:
```
class BarkChannel < ApplicationCable::Channel
    def subscribed
        stream_from "barks"
    end

    def bark(data)
        my_dog = Dog.find_by(id: data[:id])
        my_dog.bark
    end
end
```

Ở đây, chúng ta đã tìm thấy dog với id đã cho. Sau đó, chúng ta gọi **bark** trên đó và xử lý logic bark. Tại thời điểm này, chúng ta đã tạo ra một kết nối đầy đủ từ **front-end** tới **back-end**, có thể được sử dụng để làm bất kỳ số lượng nào truyền vào.
Đối với ứng dụng này, chúng ta sẽ muốn phát đi sự kiện sủa đó cho tất cả những con chó khác đang lắng nghe:
```
class Dog
    def bark
        ActionCable.server.broadcast "barks", {id: id}
    end
end
```
**ActionCable.server.broadcast** là phương thức được sử dụng để gửi thông điệp đến tất cả các clients khác đang nghe trên kênh của **Barks**. Chúng ta cũng đang gửi một hash bao gồm cả id của con chó đã sủa.
Điều cuối cùng chúng ta cần làm là viết code ở front-end sẽ xử lý thông điệp được phát. Chúng ta làm điều đó, bằng cách sử dụng method **received**:
```
App.dogs = App.cable.subscriptions.create "BarkChannel",
    connected: ->;

    disconnected: ->;

    received: (data) ->;
        # Handle the bark

    bark: ->;
        var myDogsId = 1
        @perform("bark", {id: myDogsId})
```
Tất cả ở trên tạo nên 1 ví dụ hoàn chình sử dụng **WebSockets** trong Rails 5. Tuy nhiên, để rõ ràng, giao tiếp không cần phải được bắt đầu bởi client. Thực tế đó là những gì làm cho **WebSockets** trở nên mạnh mẽ, máy chủ có thể gửi thông điệp cho client bất cứ lúc nào. Đó là lý do một trang web kiểu như Social Media Site có thể thông báo ngay lập tức cho người dùng về một thông báo mới. Hoặc, một ứng dụng email client dựa trên web có thể thông báo cho người dùng về các email mới mà không cần phải reload. 

Nguồn dịch:
[https://smashingboxes.com/blog/websockets-in-rails-5/](https://smashingboxes.com/blog/websockets-in-rails-5/)