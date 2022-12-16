## Vuex là gì?
Nếu bạn đã có cơ hội làm việc với bất kỳ thư viện hay framework Javascript nào thì có thể rằng đã nghe đến khái niệm store. Store được coi rằng là chìa khóa để có thể tạo nên các ứng dụng, trang web trong framework Javascript. Store cung cấp cho bạn khả năng kiểm soát ứng dụng web ngày càng có xu hướng phình to, khổng lồ. Việc sử dụng store cho phép bạn tổ chức, quản lý state hiệu quả hơn.

State của website là thứ cần thiết để tăn tính tương tác với người dùng. Có thể bạn đã biết đến việc dùng props để gửi dữ liệu xuống component con hay sử dụng emit để gửi lại dữ liệu cho component cha. Những gì bạn đang làm chính là quản lý state.

Việc theo dõi cũng như là quản lý state cho trang web là một điều rất quan trong. Và để hỗ trợ cho công việc như vậy thì chúng ta có Vuex.
## Tại sao cần phải dùng VueX
Vue không giới hạn bạn sử dụng một store cụ thể nào. Hiện taị có rất nhiều store sẵn có cho phép chúng ta sử dụng để quản lý state. Vuex  được xây dựng với cảm hứng từ mô hình Flux, nó còn được xây dựng để tận dụng các tính năng được Vue cung cấp. 
Điều khiến cho Vuex trở nên mạnh mẽ hơn chính là các component lấy state của chúng từ Vuex store và có thể phản ứng cũng như cập nhật một cách tức thời bất kỳ khi nào state trong store thay đổi.
### Mô hình luồng dữ liệu 1 chiều  đơn thuần
![](https://images.viblo.asia/7de8a4eb-fef5-4fc8-9f81-bedcbef8d8b7.png)
* State – Trạng thái, là nơi khởi nguồn để thực hiện ứng dụng
* View – đọc dữ liệu từ state render ra cho người dùng nhìn thấy
* Action – là những cách thức làm trạng thái thay đổi phản ứng lại các tương tác của người dùng từ View.

### Mô hình dữ liệu sử dung Vuex quản lý
![](https://images.viblo.asia/8cc942b5-77ce-43c9-91a1-7591dfb16e9c.png)

Khi ứng dụng ngày càng lớn lên, khi đó sẽ có các component con, và các component này lại phụ thuộc vào component cha. Như thế vòng tròng khép kín kia bị phá vỡ, phải chia sẻ State cho component khác, phải nhận Action từ component khác. Và còn trường hợp View phải nhận State từ component cha của component cha của component cha... Ứng dụng như thế rất khó quản lý State và khó khăn cho việc tiếp tục mở rộng. Chính vì thế VueX cần được sử dụng để quản lý State, Action của toàn bộ ứng dụng, nơi bạn làm bất kì biến đổi State nào đều được ghi lại và có thể undo một cách dễ dàng. Các bạn có thể nhìn hình vẽ dưới đây để hiểu hơn về VueX
Cấu trúc của Vuex gồm những thành phần nào?
* State: chứa các trạng thái data của ứng dụng
* Getters: thiết lập các dữ liệu cần thiết
* Mutations: thay đổi các trạng thái, data của ứng dụng
* Action: chứa các hoạt động bất đồng bộ, như lời gọi api để fetch dữ liệu, khi trả về thì commit dữ liệu tới mutations
* Module: Đây là cách tổ chức trạng thái thành module để chia nhỏ trạng thái để tiện cho quá trình phát triển và mở rộng. Tại mỗi module ta có thể khai báo đầy đủ các thành phần của Store ở trên là state, getters, mutations và actions. 

Bài viết này mình đã giới thiệu về VueX,  để hiểu rõ hơn mình sẽ giới thiệu ở các bài viết sau :)