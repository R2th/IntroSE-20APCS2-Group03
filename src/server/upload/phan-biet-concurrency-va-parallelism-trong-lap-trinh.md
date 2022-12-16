### 1.Mở đầu
Hôm nay trong giờ làm việc đột nhiên mình thấy đồng nghiệp mình thắc mắc giữa 2 khái niệm `concurrency` và `parallelism`. Nhân tiện đó mình cũng xin phép làm một bài viết chia sẻ hiểu biết của bản thân về 2 khái niệm có mối liên quan, dễ bị nhầm lẫn với nhau này :)

### 2.Concurrency và Parallelism
Chúng ta hãy thử tưởng tượng một chương trình máy tính như một dự án phần mềm. Mỗi 1 task là một request đến chương trình máy tính. Giả sử để hoàn thành dự án chúng ta cần hoàn thành 3 tasks (A, B, C).

####  Sequential (tuần tự)
Giả sử 1 nhân CPU tương đương với 1 `lập trình viên A` của đội Dev. Công việc sẽ được thực hiện 1 cách lần lượt: 
* `Lập trình viên A` thực hiện `task A`
* Xong `task A` thực hiện `task B`
* Xong `task B` thực hiện `task C`
* 
![Xử lý tuần tự](https://images.viblo.asia/9f01ff02-f4b9-4389-9430-d871dc71c799.png)

Các công việc được diễn ra một cách tuần tự xong việc này rồi mới tới việc tiếp theo, cứ như vậy công việc được thực hiện theo từng bước 1, phải chờ bước trước thực hiện xong mới thực hiện được bước tiếp theo. Trước đây máy tính thường chỉ có 1 nhân CPU (tương ứng đội Dev chỉ có 1 người), do đó chính là cách mà chương trình thực hiện dựa trên mô hình lập trình tuần tự (`sequential`).

#### Parallelism (song song)
Ngày nay máy tính thường có nhiều nhân CPU (tương ứng với đội Dev có nhiều nhân viên). Để công ty  có thể tận dụng được hết nguồn lực đó chủ cửa hàng chia ra mỗi người phụ trách 1 task khác nhau.
* `Lập trình viên A` làm `task A`.
*  `Lập trình viên B` làm `task B`.
* `Lập trình viên C` làm `task C`.
* 
![Xử lý song song](https://images.viblo.asia/fb2a30a3-3cca-4ce4-81fc-861dcf86c1a3.png)

Như vậy các task được thực hiện 1 cách song song. Đó là một ví dụ cho việc xử lý song song, các task được thực hiện trong cùng 1 thời điểm nhưng dự án chỉ hoàn thành khi cả 3 người hoàn thành task mà mình được giao.

#### Concurrency (đồng thời)
Xử lý đồng thời cũng giống với việc xử lý song song nhằm mục đích để xử lý nhiều tác vụ trong cùng một thời điểm. Tuy nhiên xử lý đồng thời lại có sự khác biệt thông qua cách thức xử lý.
Như ví dụ trên để hoàn thành dự án ta cần hoàn thành cả 3 task. Tư tưởng của xử lý đồng thời ta sẽ chia mỗi task trong 3 task đó thành những sub task nhỏ hơn, mỗi lập trình viên sẽ thực hiện một sub task (không nhất định sub task thuộc task nào miễn sao không có 2 người cùng làm 1 sub task). Khi xong 1 sub task sẽ tiếp tục làm tiếp 1 sub task tiếp theo. 
Nói một cách đơn giản tư tưởng của xử lý đồng thời là chia công việc thành nhiều phần nhỏ, tận dụng thời gian chết của mỗi lập trình viên để xử lý một subtask khác nhằm tận dụng được tối đa nguồn lực.

![Xử lý đồng thời](https://images.viblo.asia/23fe5c0b-5535-4c78-9ed5-a04fd156d429.png)

### Tổng kết 
Bài viết chia sẻ hiểu biết của bản thân mình về các khái niệm `Parallelism` và `Concurrency` trong lập trình. Hy vọng sẽ có ích cho mọi người trong việc phân biệt các khái niệm. Cảm ơn mọi người đã theo dõi bài viết.