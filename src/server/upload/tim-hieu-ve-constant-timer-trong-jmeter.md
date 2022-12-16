## 1. Timer
### 1.1 Ngữ cảnh
2.Đầu tiên, mình muốn bạn xem 2 ảnh GIF bên dưới:

![](https://images.viblo.asia/00cb542b-4322-4fd4-9954-3aa918793ee1.gif)

![](https://images.viblo.asia/718817d7-e59a-417f-8867-75b0965b4707.gif)

GIF 1 đại diện cho giá trị mặc định của JMeter, tất cả các request sẽ được gửi mà không cần tạm dừng giữa chừng.
Điều này có thể dễ gây quá tải với máy chủ do tạo quá nhiều request chỉ trong vài giây.

Thực tế sẽ không có trường hợp người dùng truy cập vào trang web cùng một lúc và cũng không thực hiện các hành động liên tục.
Họ cần một chút thời gian để chờ tải trang, xem nội dung trên trang trước khi chuyển sang bước hay hành động tiếp theo.
Ví dụ: khi người dùng ở trang Đăng ký, họ có thể mất một vài phút để hoàn thành việc nhập thông tin và sau đó nhấp vào nút Submit.
Một ví dụ khác, người dùng truy cập vào bài đăng A, đọc nội dung trong vài giây trước khi chuyển sang bài đăng tiếp theo.

Do vậy mà người dùng sẽ có thao tác ở những thời điểm khác nhau, giữa mỗi request thì lại có thời gian trì hoãn. Trong thế giới kiểm thử độ tải (load testing), thời gian trì hoãn này gọi là User’s Think Time.

Qua ngữ cảnh trên, khi phát triển Test Plan trong JMeter, ta không nên chạy kiểm thử mặc định. Thay vào đó ta cần 1 phần tử giúp giả lập xử lý thời gian thực. Đó là TIMER.

Timers có thể giúp giả lập “thời gian suy nghĩ” của người dùng ảo.
Timers cho phép JMeter trì hoãn giữa từng request mà 1 thread tạo ra.

### 1.2 Qui tắc:

Rule 1: Timers được thực hiện trước khi thực hiện sampler nhưng sau PreProcessor

![](https://images.viblo.asia/d891e69f-f112-4d77-b474-805cf70ca7c3.png)

Rule 2: Timer có thể áp dụng cho nhiều phần tử anh chị em(sibling) và con. Hoặc có thể áp dụng cho chỉ với sampler cha.

Example 1: timer_sibling

![](https://images.viblo.asia/591f6499-f4bd-4f11-80f5-668b45729c0f.png)

Timer 1 áp dụng cho Request 1 và Request 2 (các phần tử sibling với Timer)

Example 2:timer_child

![](https://images.viblo.asia/0fde07d1-7d47-4cf1-b2ff-9e018d775567.png)

Timer 1 cũng được áp dụng cho Request 1, Request 2 và Request 3 trong trường hợp này.

Example 3: timer_parent

![](https://images.viblo.asia/54dcb793-dc48-4d3a-8a46-ae9f97a0eb30.png)

Timer 1 không được áp dụng cho Request 0 vì sampler đó ở level trên với timer.

Example 4: timer_sampler

![](https://images.viblo.asia/015bd17f-f096-45b0-ab31-4a494aa645ae.png)

Timer 1 chỉ áp dụng cho Request 1, không áp dụng cho Request 2. Hãy nhớ rằng nếu timer ở dưới sampler , nó sẽ áp dụng chỉ cho sampler đó mà thôi.
Rule 3: Nếu có nhiều timer áp dụng cho sampler, thời gian dừng cho sampler đó sẽ bằng với tổng của tất cả timer.

Example: timer_total
![](https://images.viblo.asia/12257b1f-acd8-400d-95cc-1af71b098f52.png)

Ở trường hợp này, thời gian trì hoãn trước khi thực hiện Request A là tổng thời gian của Timer 1 + Timer 2 + Timer 3 + Timer 4

Rule 4: Thời gian trả về của sampler không bao gồm thời gian thực hiện của Timer.

Ví dụ: Sampler cần 5 giây để thực hiện và nó có Timer là 2 giây. Điều đó có nghĩa là tổng thời gian chạy cho kiểm thử này sẽ là 7 giây. Nhưng Response Time của sampler vẫn chỉ là 5 giây thôi.

![](https://images.viblo.asia/90ec399a-3e57-4895-a52b-7e5bce9f0c44.png)

Lưu ý: trường hợp bạn cũng muốn bao gồm thời gian thực hiện vào thời gian trả về, hãy đặt tất cả chúng vào Transaction Controller.

## 2. Constant Timer
Có rất nhiều timers được cung cấp trong JMeter: Constant Timer, Gaussian Random Timer, Uniform Random Timer, Synchronizing Timer, etc. Trong bài này , ta chỉ tập trung vào Constant Timer thôi vì theo mình nó là đơn giản nhất.

Mục đích của Constant Timer là dùng cùng 1 khoảng thời gian giữa các request trong từng thread
Đây là bảng config Constant Timer:
![](https://images.viblo.asia/038a5475-983e-4c43-a247-4fe8f456fddc.png)

Chỉ có 1 tham số cho Timer: Thread Delay (in milliseconds). Nó là số milliseconds tạm dừng. Ví dụ, cầu hình trên sẽ thêm 300ms trì hoãn trước khi thực hiện từng sampler.
Nếu bạn muốn dừng 5 giây thì nhập 5000 hoặc 1 phút thì nhập 60000…

### 2.1 Áp dụng cho tất cả request
Nếu tất cả request cần phải có cùng thời gian trì hoãn, bạn có thể cân nhắc đến việc sử dụng Constante Timer trong Thread Group. Hãy xem Test Plan dưới đây nhé.
![](https://images.viblo.asia/a0ea5a91-690c-4dea-8a9c-4d3403ecf86a.png)

Và đây là kết quả khi chạy 

![](https://images.viblo.asia/badd4b5d-60d7-4211-a6b6-240e3eed7d18.gif)

### 2.2 Tạm dừng trước khi chạy sampler
Trong khi chạy request A, bạn muốn đợi 5s trước khi thực hiện. Hãy đặt Constant Timer dưới request và đặt Thread Delay (in milliseconds) = 5000.
![](https://images.viblo.asia/7fd45de6-13cb-428a-aa59-8a4e745bda58.png)

Chạy và xem nó làm việc thế nào nhé:

![](https://images.viblo.asia/25b40a78-cf11-4d60-87ae-1b33b2b58c60.gif)

Sau khi bắt đầu, kiểm thử sẽ đợi 5s trước khi request chạy.

### 2.3 Tạm dừng sau khi chạy sampler
Đôi khi bạn sẽ cần kiểm thử tạm dừng trong 1 khoảng thời gian sau khi chạy các request đã định. Ở trường hợp này, bạn nên đặt Constant Timer dưới request tiếp theo như thế này:

![](https://images.viblo.asia/c0b8d7f5-497f-4caa-a039-feb0df0fc76d.png)

Thực ra thì cái này giống với phần 2.2 ở trên. Chỉ khác về cách thức và mục đích sử dụng thôi.
![](https://images.viblo.asia/920efac9-a607-4d64-86a5-e100afb84156.gif)

Hãy nhìn vào ảnh GIF, Request A chạy ngay lập tức sau khi click vào nút run, và sau đó kiểm thử tạm dừng 5000ms (5 seconds) sau đó thì Request B được thực hiện.

### 2.3 Tham số hóa thời gian trì hoãn

Cũng có khi bạn không muốn cố định thời gian trì hoãn. Nó có thể phụ thuộc vào kiểm thử của bạn, lần này thì 3 giây, lần sau thì 5 giây. Khi đó bạn sẽ cần tham số hóa timer.
Đầu tiên bạn sẽ tạo User Defined Variables và đặt biến gọi là TIMER hoặc tùy ý bạn muốn
![](https://images.viblo.asia/6a2131be-5616-45e2-9de4-cb2bda0bcf0c.png)

Bước tiếp theo là gọi biến TIMER ở trên bằng cách sử dụng kí hiệu ${TIMER}
![](https://images.viblo.asia/b8a06e0f-f743-4ee7-ba01-e53a0a35f881.png)

Bây giờ thì nếu bạn muốn thay đổi Timer, chỉ có 1 chỗ bạn phải thay đổi đó là giá trị TIMER trong User Defined Variable thôi.

### 2.4 Ngẫu nhiên thời gian trì hoãn
Mình tin là bạn cũng muốn có case này trong kiểm thử của mình. Bạn sẽ nhập 1 giá trị ngẫu nhiên vào Constant Timer thay vì giá trị cụ thể.
Khi đó bạn sẽ cần sự trợ giúp từ hàm _Ramdom của JMeter.

${__Random(1000,5000,)} –> sẽ trả về giá trị ngẫy nhiên từ 1000 đến 5000.
Sử dụng hàm này để tạo test plan bên dưới.

![](https://images.viblo.asia/d6e640c8-8556-4126-954d-b231c4a9fd6c.png)

![](https://images.viblo.asia/376570ac-f4c2-4be0-9755-35fdfb31a444.png)

Mỗi lần bạn chạy kiểm thử thì nó sẽ tạm dừng 1 khoảng thời gian ngẫu nhiên từ 1 giây đến 5 giây trước khi thực hiện Request A. Sau đó lại tạm dùng khoảng thời gian ngẫu nhiên từ 1 giây đến 5 giây trước khi thực hiện Request B.

Nhưng cách này có 1 nhược điểm. Nếu bạn muốn áp dụng Timer cho tất cả các request, bạn cần phải đặt Constant Timer dưới mỗi request, nó sẽ khiến bạn mất nhiều công sức. Nếu chỉ đặt Constant Timer dưới Thread Group, nó sẽ chỉ ngẫu nhiên 1 lần thôi và áp dụng giá trị giống nhau cho tất cả các request.
Ở bài sau, mình sẽ chỉ cho bạn cách hữu dụng để làm điều này nhé.

Nguồn dịch: https://jmetervn.com/2017/06/04/constant-timer/