Chào các bạn, hôm nay mình sẽ viết về Dispatch group trong Swift. Dispatch group cho phép nhóm nhiều task vụ với nhau và chờ cho chúng hoàn thành hoặc nhận thông báo khi chúng hoàn thành mới thực hiện tiếp login của bạn. Những task vụ này có thể chạy đồng bộ hoặc bất đồng bộ và có thể chạy trên nhiều queue khác nhau. Ví dụ: khi open 1 màn hình, bạn cần phải call nhiều api để lấy dữ liệu, sau khi hoàn thành call tất cả api này mới update data lên giao diện. 

Dispatch group cung cấp hàm *wait()* , hàm này block thread hiện tại cho tới khi các task vụ trong group được hoàn thành. Cách sử dụng dispath group như sau:
```
func loadData() {
    // 1
    DispatchQueue.global(qos: .userInitiated).async {
        // 2
        let dispatchGroup = DispatchGroup()
        
        // 3
        dispatchGroup.enter()
        self.loadData1()
        // 5a
        dispatchGroup.leave()

        // 4
        dispatchGroup.enter()
        self.loadData2()
        // 5b
        dispatchGroup.leave()

        // 6
        dispatchGroup.wait()

        // 7
        DispatchQueue.main.async {
            self.tableView.reloadData()
        }
    }
}
```

Giải thích:
1. Vì dùng *.wait()*  bị block thread hiện tại nên mình sử dụng *async* đưa toàn bộ hàm vào background queue, để không bị block main thread.
2. Tạo 1 dispatch group.
3. Gọi method *enter()* để báo với dispatch group rằng một task đã được bắt đầu. Phải đảm bảo rằng số lượng enter() bằng số lượng gọi *leave()* , nếu không app sẽ bị crash.
4. Gọi method *enter()* cho task thứ 2.
5. 5a. 5b. Gọi method *leave()* để thông báo với dispath group rằng task vụ đã thực hiện xong.
6. Gọi method *wait()* để block thread hiện tại trong khi chờ các task vụ hoàn thành. Chúng ta có thể sử dụng *wait(timeout: )* để chỉ định thời gian chờ tránh việc đợi quá lâu.
7. Tại thời điểm này, tất cả các task vụ đều đã thực hiện xong hoặc timeout, mình thực hiện reload data của tableView ở main thread.

Việc sử dụng wait() không phải là giải pháp tốt vì phải block thread hiện tại. Có 1 cách tốt hơn đó là dispatch group có thể thông báo cho bạn biết khi nào các task vụ trong group hoàn thành. Mình thay đổi đoạn code trên như sau:

```
func loadData() {
    let dispatchGroup = DispatchGroup()
    dispatchGroup.enter()
    self.loadData1()
    dispatchGroup.leave()

    dispatchGroup.enter()
    self.loadData2()
    dispatchGroup.leave()

    // 1
    dispatchGroup.notify(queue: .main, execute: { [weak self] in
         self?.tableView.reloadData()
    }
}
```

Trong lần implement này, mình không cần đặt đoạn code trong background queue vì dùng notify không block thread hiện tại.
1. Dispatch queue sẽ thông báo cho chúng ta biết khi các task vụ trong group hoàn thành xong, chúng ta thực hiện update UI trong main thread.

Hi vọng bài viết có thể giúp ích cho các bạn khi tìm hiểu về dispath group. Cảm ơn các bạn đã đọc bài viết :)