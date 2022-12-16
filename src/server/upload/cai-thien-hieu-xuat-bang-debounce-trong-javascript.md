![Tiêu đề](https://miro.medium.com/max/700/1*-r8hP_iDBPrj-odjIZajzw.gif)
Bạn có nhận thấy rằng, khi bạn nhập nội dung vào mục tìm kiếm, sẽ có một độ trễ nhất định trước khi cho ra kết quả tìm kiếm mong muốn, chính xác họ đã sử dụng kỹ thuật **debounce** mà mình sẽ nói tới trong bài này. Kỹ thuật này sẽ trì hoãn quá trình xử lý sự kiện bạn đang thao tác như các sự kiện *keyup*, *keypress*, *scroll*... cho đến khi người dùng ngừng thao tác một khoản thời gian định trước. và **search autocomplete** là một ví dụ điển hình để áp dụng kỹ thuật này.

**Debounce** sẽ giúp ngăn chặn việc giao diện phải xử lý mọi sự kiện được gọi và làm giảm đáng kể số lần gọi lên API khi người dùng thao tác. Việc xử lý mọi thao tác được nhập vào từ người dùng có thể gây hại cho hiệu xuất và thêm tải không cần thiết cho server của bạn.

Không dài dòng thêm nữa, giờ chúng ta hãy đi sâu vào xem debounce nó như nào:

```javascript

function debounce(fn, ms) {
    let timer
    
    return () => {
        clearTimeout(timer);
        
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, ms)
    }
}

```

Như ví dụ về đoạn code phía trên, debounce là một **Higher-Order Functions**,  hàm này trả về một hàm khác bên trong nó, trong đoạn code này là đoạn code xử lý *timeout* phía trên. debounce function nhận vào 2 tham số để xử lý.
* **fn**: Tham số này nhận vào một hàm bạn muốn thực thi sau khi setTimeout thực thi
* **ms**: Khoảng thời gian bạn muốn hàm debounce đợi sau khi nhận thao tác cuối cùng trước khi thực thi **fn**.
* **timer**: Giá trị dùng để lưu biến timeout mỗi khi hàm được gọi. Biến **timer** được đặt trong hàm đầu tiên để tránh bị tạo mới giá trị, dùng để lưu giá trị của phiên xử lý.

Và bây giờ, để hiểu hơn về hàm debounce hoạt động thế nào, hãy cùng mình xem demo bên dưới. 

## Xem ví dụ bên dưới:
![](https://images.viblo.asia/0430f2b2-a6c1-4ff0-9605-da7373d04f1c.png)
![](https://images.viblo.asia/d0c35204-6484-4683-9bf5-638e4f11e166.png)

[Ví dụ trên Codepen.io](https://codepen.io/CodeEN/embed/oNLOxWg?default-tab=&theme-id=)

Cuối cùng, mình cũng xin cảm ơn các bạn đã dành 1 ít thời gian ra đọc.

Nguồn tham khảo: https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086