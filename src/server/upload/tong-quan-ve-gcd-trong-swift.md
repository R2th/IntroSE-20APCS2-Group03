# Multithreading trong IOS
Mỗi một ứng dụng IOS khi được chạy đều có một Main Thread. Thread này được sử dụng để xử lý các task liên quan đến UI như cập nhật giao diện, xử lý các tương tác của người dùng như scroll, zoom, ... Nếu Thread này bị block thì app của bạn sẽ rơi vào 1 trạng thái mà dân gian vẫn gọi là bị "đơ". Đây chính là lúc chúng ta cần đến multithreading

Nguyên nhân của việc main thread bị block thường là do chúng ta không cẩn thận chạy các task nặng và tốn thời gian trên đó. Để tránh điều này thì trong các app IOS còn có những thread khác gọi là background thread sử dụng để chạy các task tốn thời gian như request data từ API, read/write dữ liệu,...
![](https://images.viblo.asia/dc5b6bb8-f9ce-4485-b5c4-31995efb9ae1.jpg)

# Queue
Trong Swift, khái niệm **Queue** được hiểu là các hàng đợi chứa những block code để đợi các thread thực thi.
Theo cách các task được thread lấy ra để thực thi, ta có thể chia queue làm 2 loại:
* Serial Queue: Các task được thực thi lần lượt, kết thúc task này mới bắt đầu task khác
* Concurrent Queue: Các task có thể được lấy ra và thực thi mà không cần đợi task trước đó kết thúc

![](https://images.viblo.asia/65004556-8fa1-4158-8759-4fffba98b7d3.png)

Vào những thời điểm xa xưa, các lập trình viên đã phải rất vất vả đối với những vấn đề liên qua đến các thread. Xử lý đồng bộ và bất đồng bộ giữa các thread luôn là một bộ môn khó nhằn. Tuy nhiên, ngày nay với sự xuất hiện của GCD, các dev Swift gần như chỉ cần quan tâm đến các queue còn việc quản lý các thread đã có hệ thống lo.

# GCD

GCD là viết tắt của Grand Central Dispatch. Đây là một low-level API chịu trách nhiệm quản lý các queue trong Swift. Chức năng chính của GCD là:

* Tạo queue
* Đưa các block code vào queue

GCD cho phép chúng ta tạo và sử dụng 2 loại queue chính là:

* Main queue: Là 1 serial queue. Các task trong queue này sẽ được thực thi ở main thread. Các task liên quan tới giao diện thường sẽ được đưa vào đây để thực thi
* Global queue: Là Concurrent queue. Các task trong queue này sẽ được thực thi ở background thread.Thường dùng để xử lý các tác vụ tốn thời gian, không tác động đến UI
* Ngoài ra chúng ta còn có thể custom các thuộc tính của queue theo nhu cầu của mình để sử dụng cho những mục đích cụ thể

Mặc dù khi đã đưa các task vào queue thì chúng ta không thể can thiệp được đến việc thread thực thi các task nữa nhưng chúng ta vẫn có thể điều chỉnh được độ ưu tiên để hệ thống ưu tiên thực hiện các task quan trọng hơn trước với QoS - Quality of Service. Có 5 mức QoS với độ ưu tiên lần lượt từ cao đến thấp là:

* UserInteractive
* UserInitated
* Default
* Utility
* Background 

# Dispatch Group
Khi làm việc với các ứng dụng trong thực tế, bạn sẽ rất thường xuyên gặp phải trường hợp cần đợi kết quả từ nhiều task để thực hiện một chức năng nào đó, ví dụ như app của bạn cần request nhiều API một lúc để lấy dữ liệu hiện thị nên View, lúc này mỗi request sẽ là một task riêng biệt. Tất nhiên là bạn hoàn toàn có thể request lần lượt từng API một và cứ khi nào nhận được kết quả thì reload lại view. Ứng dụng của bạn vẫn sẽ hoạt động bình thường với cách triển khai như vậy, tuy nhiên đối với người dùng thì đó lại không hẳn là một trải nghiệm tuyệt vời cho lắm.

Và để giải quyết vấn đề này Swift đã cung cấp cho chúng ta một giải pháp tuyệt vời mang tên Dispatch Group. Về cơ bản, DispatchGroup sẽ giúp chúng ta nhóm các task cần xử lý bất đồng bộ lại thành 1 nhóm và nhận được thông báo khi các task đó hoàn thành. Cách sử dụng cũng rất đơn giản, các bạn có thể tham khảo thử đoạn code sau đây
![](https://images.viblo.asia/278daf7f-1a1d-4497-91ec-b6ba8c30acdb.png)
1. Đầ tiên mình tạo ra 1 DispatchGroup đặt tên là fetchGroup
```
    let fetchGroup = DispatchGroup()
```
2. Tiếp theo các bạn có thể nhìn thấy một biến list - đây là một array chứa các URL, với mỗi url này mình sẽ tạo 1 task request data cho nó và add vào trong fetchGroup bằng đoạn code sau
```
    fetchGroup.enter()
      AF.request(url)
        .validate()
        .responseDecodable(of: T.self) { (response) in
          guard let value = response.value else { return }
          items.append(value)
      }
      fetchGroup.leave()
```
3. Cuối cùng sau khi các task trên đã thực hiện xong, mình sẽ gửi 1 notify đến main thread để update lại dữ liệu trên view
```
    fetchGroup.notify(queue: .main) {
      self.listData = items
      self.listTableView.reloadData()
    }
```

Ở đây mình sẽ chỉ hướng dẫn các bạn cách sử dụng, còn về bản chất cách các hàm enter, leave, notify hoạt động thì mình xin phép sẽ chia sẻ trong 1 bài viết khác nếu có dịp. Hoặc bạn nào tò mò thử có thể thử đọc qua một số bài viết khác trên Viblo về chủ đề này, mình có thấy một số bài giải thích cũng khá dễ hiểu.


# Tổng kết
Trên đây là một số hiểu biết cơ bản về Thread và GCD. Mong rằng, bài viết này có thể giúp mọi người có thể giúp mọi người tiếp cận dễ dàng hơn khi bắt đầu tìm hiểu về khái niệm này. Hẹn gặp lại mọi người trong những bài viết tiếp theo!