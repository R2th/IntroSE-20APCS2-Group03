# Giới thiệu
Chào mừng các bạn quay trở lại với series của chúng ta. Hôm nay chúng ta sẽ tìm hiểu thêm về hai loại CTDL* mới **Stacks** và **Queues**. Chúng ta sẽ tìm hiểu cả hai vì chúng rất giống nhau.<br>
Cả hai đều là CTDL **tuyến tính**, nghĩa là chúng chỉ cho chúng ta đi qua từng phần tử một. Trong đó chỉ có thể truy cập trực tiếp một phần tử dữ liệu. Chúng ta cùng làm rõ trong phần tiếp theo.

Stacks và Queues giống nhau vì chúng có thể được triển khai theo các cách tương tự nhau và khác biệt chỉ là cách xoá hoặc lấy phần tử từ các loại CTDL này. Không giống như **Arrays**, **HashTables**, **Stacks** và **Queues**  không có các hành động như chèn, xoá vào hoặc truy cập ngẫu nhiên, mọi thao tác đều với phần tử đầu hoặc cuối của CTDL.
# Lý do sử dụng
Tại sao chúng ta lại cần một loại CTDL như thế này.<br>
Trong khoa học máy tính, chúng ta có thể tạo ra Stacks và Queues bằng Arrays hoặc Linked Lists. Và đôi khi thật tốt khi có thể xây dựng một loại CTDL  dựa trên những loại CTDL khác, đó thật là một điều tuyệt của KHMT. Chúng ta tạo ra một loại CTDL hạn chế hành động như vậy để có thể hạn chế các hành động của người dùng trên CTDL của bạn, bất kì ai sử dụng CTDL này đều phải tuân theo những quy định của bạn. Việc kiểm soát sẽ đơn giản hơn nhiều khi bạn chỉ cho phép người dùng thao tác 2, 3 hành động trên CTDL thay vì rất nhiều hành động trên CTDL của bạn.
# Stack
Là một loại CTDL mà bạn có thể tưởng tượng mỗi phần tử của nó như một cái đĩa. Đó là một phần dữ liệu sau đó thêm một phần dữ liệu xếp chồng lên trên. Sau đó tiếp tục xếp chồng dữ liệu lên trên. Bạn có thể tưởng tượng như một chồng đĩa xếp chồng lên nhau và ta chỉ có thể chạm vào cái đĩa trên cùng. Stacks cũng vậy ta chỉ có thể xem được phần tử trên cùng. Bạn không thể chạm vào phần tử cuối cùng mà chỉ có thể từ thao tác từ trên xuống dưới. Người ta gọi điều này là **LITHO** hay **First In, Last Out**.

Suy nghĩ một chút các bạn có thể thấy hầu hết các ngôn ngữ lập trình hiện nay được mô hình hoá theo kiến trúc **Stacks**. Khi một hàm được gọi trong một hàm, chúng sẽ tuân theo quy tắc đó. hàm viết cuối cùng sẽ được thực hiện trước.<br>
Một ví dụ khác là quay đi quay lại khi vào một trang Web, hoặc hoàn tác khi đang làm một việc gì đó.

Stacks có 3 hàm chính là **push**, **pop** và **peek**. Chúng đều có độ phức tạp là **O(1).**
# Queues
Ta có thể tưởng tượng nó như một lối vào, ví dụ khi bạn xếp hàng đi mua vé, người xếp hàng đầu tiên sẽ được mua vé đầu tiên, người xếp cuối cùng sẽ được mua vé cuối cùng. Tức là phần từ được thêm vào đầu tiên có thể lấy và xem đầu tiên, điều này trái ngược với Stacks. Queues là **FIFO**, hay gọi là **First in**, **first out.**.<br>
Queues cũng có khá nhiều ứng dựng, ví dụ các bạn tưởng tượng như ứng dụng đặt xe Grap, User... những người đặt xe trước sẽ được phục vụ trước, đặt xe sau sẽ được phục vụ sau và một ứng dụng phổ biến nhất là máy in. Ví dụ có 3 máy tính cùng kết nối đến một in, thì máy nào đặt lệnh in trước sẽ được phục vụ in trước, đặt sau thì in sau.<br>
Ba hàm chính của Queues là **enqueue**, **dequeue**, và **peek**. Chúng đều có độ phức tạp là **O(1)**.

# Tạm kết
Chém gió liên thiên cũng nhiều rồi, trong bài tiếp theo mình sẽ cùng các bạn tìm hiểu các cách implement Stacks, Queues theo nhiều cách khác nhau và cách implement Queues bằng Stacks.<br>
Hẹn gặp lại các bạn.
# Chú thích
CTDL : Cấu trúc dữ liệu.
KHMT : Khoa học máy tính

  [Bài trước](https://viblo.asia/p/doubly-linked-list-maGK7BPO5j2)
  
  [Bài sau](https://viblo.asia/p/stacks-va-queues-phan-2-63vKjW8yZ2R)
  
 [Link github](https://github.com/hieu-dd/data-structures-algorithms/tree/master/bin/datastructures)