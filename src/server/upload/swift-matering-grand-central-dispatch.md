Hôm nay mình sẽ giới thiệu chuỗi bài viết về Grand Central Dispatch của tác giả Bart Jacobs "Mastering Grand Central Dispatch". Đây là chuỗi bài viết rất hay và chi tiết về Grand Central Dispatch. Mình hy vọng thông qua chuỗi bài viết này có thể giúp các bạn tự tin sử dụng Grand Central Dispatch.

# Phần 1: Grand Central Dispatch là gì?
Có lẽ bạn đã nghe về Grand Central Dispatch và rất có thể bạn đã sử dụng nó trong một số dự án của bạn. Loạt bài này có cái nhìn cận cảnh về Grand Central Dispatch. Trước khi khám phá API của Grand Central Dispatch, chúng ta tìm hiểu xem nó là gì và nó giải quyết vấn đề gì.

Trước khi bạn bắt đầu sử dụng Grand Central Dispatch, điều quan trọng là bạn phải làm quen với khái niệm cơ bản. Grand Grand Central là gì? Nó giải quyết vấn đề gì? Và tại sao bạn nên sử dụng nó?

Hầu hết các thiết bị máy tính hiện đại được cung cấp bởi bộ xử lý đa luồng. Tính khả dụng của nhiều nhân cho phép các thiết bị này thực hiện công việc đồng thời, nghĩa là cùng một lúc. Điều đó cho phép điện thoại của bạn tải xuống video ở chế độ nền trong khi vẫn giữ được phản hồi từ giao diện người dùng.

Hầu hết các ứng dụng hỗ trợ một loạt các thiết bị. Làm thế nào bạn có thể tối ưu hóa ứng dụng của mình để tận dụng phần cứng đa lõi của thiết bị? Đó là nơi Grand Central Dispatch phát huy tác dụng.

Apple đã giới thiệu Grand Central Dispatch gần mười năm trước. Nó lần đầu tiên xuất hiện trong Mac OS X Snow Leopard. Ngày nay, nó có sẵn trên iOS, tvOS, macOS và watchOS. Grand Central Dispatch giúp viết code đa luồng dễ dàng hơn, bất kể nền tảng hoặc thiết bị mà ứng dụng của bạn chạy trên đó.

Grand Central Dispatch là một công nghệ được thiết kế để thực hiện các tác vụ trên hiệu suất phần cứng đa lõi. Nó có thể làm điều này bởi vì nó hoạt động ở cấp hệ thống. Ứng dụng của bạn hoạt động trong một sandbox, điều đó có nghĩa là nó không biết về các quy trình khác đang chạy trên hệ thống cùng một lúc. Bởi vì Grand Central Dispatch hoạt động ở cấp hệ thống, nó có một cái nhìn chính xác về các quy trình đang chạy và các tài nguyên có sẵn.

Bằng cách tận dụng Grand Central Dispatch, ứng dụng của bạn không cần biết về nền tảng hoặc thiết bị mà nó chạy. Không cần phải tính đến các quy trình khác cạnh tranh cho cùng một tài nguyên. Grand Central Dispatch cho phép các ứng dụng lên lịch làm việc để thực thi thông qua API dễ sử dụng. Nhiệm vụ của Grand Central Dispatch là quyết định thời gian và cách thức thực hiện công việc theo lịch trình.

## Dispatch Queues

Một ứng dụng tương tác với Grand Central Dispatch thông qua queues. Như tên của nó, dispatch queues là một queues mà công việc có thể được lên lịch để thực hiện. Một công việc xếp hàng enqueues và dequeues hoạt động theo thứ tự FIFO, nghĩa là, đầu tiên vào trước, ra trước. Điều này có nghĩa là công việc được gửi đến dispatch queues được thực hiện theo thứ tự mà nó được gửi. Chúng ta nói nhiều hơn về điều đó trong phần tiếp theo.

Là một nhà phát triển, bạn có một số tùy chọn để sắp xếp công việc dispatch queue. Đẩy một block vào dispatch queue là một tùy chọn phổ biến. Trong Swift, một block không có gì khác hơn là một closure không có đối số và trả về Void hoặc một tuple trống.  Đừng lo lắng về cú pháp bây giờ. Chúng ta khám phá API Grand Central Dispatch chi tiết hơn sau trong loạt bài này.
```
DispatchQueue.main.async {
    print("Hello World")
}
```
Chúng ta yêu cầu lớp DispatchQueue tham chiếu đến dispatch queue được liên kết với luồng chính. Chúng ta khám phá điều này chi tiết hơn sau. Chúng tôi gửi một closure cho dispatch queue bằng cách gọi phương thức async (execute :). Điều này còn được gọi là công việc gửi lên dispatch queue. Như tôi đã đề cập trước đó, block này là một closure không có đối số và trả về Void hoặc một bộ dữ liệu trống.

## Quản lý đa luồng(Manager threads)
Nếu chỉ thực hiện công việc trong background rất là tẻ nhạt. Tạo và quản lý nhiều luồng có thể trở nên phức tạp. Grand Central Dispatch làm cho điều này dễ dàng hơn nhiều. Nó quản lý một nhóm hoặc tập hợp các luồng và quyết định luồng nào được sử dụng để thực thi một khối lệnh. Đó là một chi tiết triển khai mà nhà phát triển không cần phải lo lắng.

Grand Central Dispatch không đảm bảo rằng luồng nào được sử dụng để thực thi một khối lệnh. Mặc dù, có một ngoại lệ. Như tôi đã đề cập trước đó, Grand Central Dispatch quản lý một dispatch queue được gắn với luồng chính của ứng dụng. Công việc được gửi đến dispatch queue chính được đảm bảo được thực hiện trên luồng chính.

Tại sao điều đó quan trọng? Giao diện người dùng phải luôn được cập nhật trên luồng chính. Nếu bạn gửi một khối lệnh trong đó giao diện người dùng được cập nhật vào main dispatch queue, bạn muốn đảm bảo rằng bản cập nhật được thực hiện trên main thread. Grand Central Dispatch đảm bảo điều đó.

Hầu hết các nhà phát triển chỉ tương tác với dispatch queue nhưng Grand Central Dispatch có nhiều thứ hơn để cung cấp. Có các API thuận tiện để định cấu hình công việc một lịch trình ứng dụng vào dispatch queue và bạn có thể tận dụng các nhóm điều phối để quản lý sự phức tạp. Grand Central Dispatch cũng định nghĩa các semaphores để đảm bảo bạn không gặp phải các vấn đề luồng.

Thư viện  của Apple đã trưởng thành qua nhiều năm và nó cung cấp một API phong phú khiến các tác vụ phức tạp trở nên đơn giản. Hiểu cách Grand Central Dispatch hoạt động là điều cần thiết nếu mục tiêu của bạn là xây dựng các ứng dụng mạnh mẽ và hiệu quả.

## Tại sao sử dụng Grand Central Dispatch?

Như tôi đã đề cập trước đó, Grand Central Dispatch giúp viết mã đa luồng dễ dàng hơn. Nhưng có nhiều điều hơn. Điều quan trọng là phải hiểu tại sao nó có lợi cho ứng dụng của bạn để tận dụng Grand Central Dispatch.

IPA
Các thiết bị máy tính hiện đại có kiến trúc phức tạp và chúng có hiệu suất đáng kinh ngạc. Là nhà phát triển, đôi khi chúng ta quên rằng chúng ta cần cẩn thận cách sử dụng tài nguyên của các thiết bị này. Phần cứng của Apple đã trở nên mạnh mẽ đến mức chúng ta thường bỏ bê hiệu năng hoặc thời lượng pin. Ứng dụng của bạn sẽ phản hồi như thế nào nếu người dùng kích hoạt Chế độ năng lượng thấp trên thiết bị của họ? Nó thậm chí có thể đưa nó vào tài khoản?Nó có thể như một vấn đề của thực tế.

Bởi vì Grand Central Dispatch hoạt động ở cấp hệ thống, nó nhận thức được khả năng của thiết bị và tài nguyên của thiết bị. Bộ xử lý hiện đại là những mảnh phức tạp của kỹ thuật. Ví dụ, bộ xử lý có thể ưu tiên hiệu suất hơn hiệu quả nếu năng lượng không bị giới hạn. Nhưng nếu điện thoại của bạn sắp hết năng lượng, hệ thống có thể quyết định giảm hiệu suất để đổi lấy hiệu quả.

Grand Central Dispatch tính đến điều này. Nó cung cấp các API để thông báo cho hệ thống về tầm quan trọng của các tác vụ mà ứng dụng của bạn đang thực hiện. Tôi muốn kết thúc phần này bằng cách nhấn mạnh rằng ứng dụng của bạn cần phải là một thành phần tốt trên nền tảng mà nó chạy. Bạn có thể thực hiện điều đó bằng cách không chỉ sử dụng Grand Central Dispatch mà còn bằng cách hiểu cách thức hoạt động của nó. Đó là trọng tâm của loạt bài này.

## Điều gì ở bài tiếp theo?

Bây giờ bạn đã biết Grand Central Dispatch là gì và các ứng dụng của bạn có thể hưởng lợi từ nó như thế nào, đã đến lúc bắt đầu làm việc với các queue. Đó là trọng tâm của tập tiếp theo.

# Tổng kết
Tài liệu tham khảo: https://cocoacasts.com/mastering-grand-central-dispatch-what-is-grand-central-dispatch