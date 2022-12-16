Hello các dev  và các đọc giả của Viblo :) Mình là cũng là một dev, nhưng chỉ dám nhận dev quèn :v Hôm nay có mạo muội chia sẻ cho quý đọc giả tiếp về kiến thức mà mình thu lượm được về mô hình Microservice - một trong những mô hình phát triển sản phẩm nhiều điểm lợi và mạnh mẽ.

## Lời Mở Đầu

Qua hai bài viết trước là [Giới Thiệu Về Microservice](https://viblo.asia/p/gioi-thieu-ve-microservices-gAm5y4Ewldb) và [Xây dựng Microservice bằng API Gateway](https://viblo.asia/p/xay-dung-microservice-bang-api-gateway-3P0lPnv4Kox) thì chúng ta có thể hình dung được phần nào về mô hình mạnh mẽ này. Và nay mình sẽ nói tiếp về sự giao tiếp của các khối services này khi chúng không cùng một khối mà lại làm việc trơn tru đến vậy :) Ko nói nhiều nữa, let's go :grinning:

## Giới Thiệu
Để có thể hiểu sau hơn chút về sự giao tiếp này, hãy cùng lật lại về mô hình chúng ta thường làm - mô hình Nguyên Khối (Monolithic Architecture). Chúng ta đều biết, trong mô hình Nguyên Khối, các thành phần đều được liên kết đến nhau thông qua các lời gọi hàm hay các phương thức tùy ngôn ngữ. Điều này làm nó ít hay nhiều phụ thuộc vào ngôn ngữ hoặc chí ít là sẽ phụ thuộc lẫn nhau. 

Đi ngược lại với quan điểm xây dựng chung trên cùng một khối, mô hình Microservice lại xây dựng nhiều khối phân tán trên các máy khác nhau. Mà thường mỗi một khối là một quá trình. Do đó các quá trình này sẽ cần một cơ chế giao tiếp giữa các quá trình (Inter‑Process Communication hay IPC) này để tương tác được với nhau.
![](https://images.viblo.asia/13cf1604-47c4-41c6-8d66-82e772712ed8.png)

Nhìn hình thấy nó liên kết cũng khá lằng nhằng chả khác vẹo gì các mô hình Nguyên Khối lắm nhỉ =))

Nhưng trước tiên muốn hiểu được hình ảnh trên chúng ta cần phải hiểu được giao tiếp giữa các quá trình xảy ra như nào đã :D
## Kiểu Tương Tác
Khi bạn đã sử dụng IPC cho service của mình, bạn sẽ thấy thích thú khi tìm hiểu về cách nó tương tác với nhau. Nó có nhiểu kiểu được chia theo nhiều cách, nhưng phần lớn đều tuân theo dạng Client - Service.

Chúng có thể chia theo chiều:
* One to one: Mỗi yêu cầu của client được xử lý bởi duy nhất một service
* One to many: Mỗi yêu cầu của client được xử lý bởi nhiều service

Hoặc chúng có thể chia theo cách xử lý đồng bộ hay bất đồng bộ:
* Đồng bộ (Synchronous): Client chỉ đinh thời gian cho phép đợi phản hồi từ dịch vụ, thâm chí có thể chặn luôn luồng trong khi đợi.
* Bất đồng bộ (Asynchronous): Client sẽ không chặn trong khi chờ đợi phản hồi, và phản hồi đó không nhất thiết là phải gửi ngay tức thì tại thời điểm đó.

Và tổng hợp cả hai cách chia trên thì chúng ta đã có một số kiểu tương tác thú zị sau: 

* One to one with Synchronous: Request/response
* One to one with Asynchronous: Notification hoặc Request/async response
* One to many with Asynchronous: Publish/subscribe hoặc Publish/async responses

Thông thường trong một ứng dụng sử dụng mô hình Microservice sẽ kết hợp các kiểu tương tác này lại với nhau để đạt hiệu quả cao nhất.

Sau đây là một ví dụ về sự kết hợp các cách tương tác của sự giao tiếp các khối dịch vụ này :
![](https://images.viblo.asia/8641d56b-5bfc-417a-8b48-611e1d51840e.png)

Điện thoại thông minh hành khách hành khách gửi thông báo đến dịch vụ Quản lý chuyến đi để yêu cầu đón khách. Dịch vụ Quản lý chuyến đi xác minh rằng tài khoản Hành khách đang hoạt động bằng cách sử dụng request/response để gọi Dịch vụ hành khách. Dịch vụ Quản lý chuyến đi sau đó tạo chuyến đi và sử dụng publish/subscribe để thông báo cho các dịch vụ khác bao gồm cả Người điều hành, nơi định vị một tài xế có sẵn.

Tiếp theo sau khi quan tâm đến kiểu tương tác thì chúng ta cần quan tâm đến API, nó như tiếng nói dùng để giao tiếp giữa các khối dịch vụ vậy.

## API Service
Theo bla bla bla thì API Service  là một bản hợp đồng giữa service và client. Bất kể là kiểu tương tác nào đi chăng nữa, thì việc xác định rõ IDL (Interface Definition Language) hay ngôn ngữ định nghĩa giao diên cũng là quan trọng nhất. Chỉ khi bạn định nghĩa được nó thì bạn mới có thể khai thác được dịch vụ của mình. Nó giúp tăng khẳ năng đáp ứng nhu cầu của client

## Sự phát triển của API Service
Một dịch vụ sử dụng API luôn luôn phải thay đổi để phù hợp với yêu cầu. Điều đó là khá dễ dàng nếu như bạn viết nó trong mô hình Nguyên Khối. Nhưng trong mô hình Microservice thì điều đó quả là khó khăn, ngay cả khi tất cả các API đó cùng nằm trong một ứng dụng.Và tất nhiên bạn cũng không thể bắt client thay đổi theo từng bước phát triển API này được =)) nghe vô lý :v Và cũng có thể bạn sẽ phải làm cách nào đó cho cả API cũ và API mới đều hoạt động được =)) 

Nếu những sự thay đổi nầy là nhỏ thì còn có thể làm được chứ nếu mà nó lớn quá thì chúng ta chỉ có thể sử dụng phân tách các phiên bản ra để xử lý. Ngoài ra, ta có thể triển khai các phiên bản khác nhau mà mỗi phiên bản xử lý một phiên bản cụ thể. Hmmm.. !?

## Kết luận
Các dịch vụ microservice phải giao tiếp bằng cơ chế giao tiếp giữa các quá trình. Khi thiết kế cách dịch vụ của bạn sẽ giao tiếp thế nào, bạn cần xem xét các vấn đề khác nhau: cách dịch vụ tương tác, cách chỉ định API cho từng dịch vụ, cách phát triển API. Có hai loại cơ chế IPC mà microservice có thể sử dụng, nhắn tin không đồng bộ và yêu cầu / phản hồi đồng bộ.

**Chia sẻ này chỉ mang tính cá nhân, hi vọng nhận được sự đóng góp tích cực từ mọi người. Xin cảm ơn <3**