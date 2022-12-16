Lúc trước đi phỏng vấn có một câu hỏi là hãy kể tên các phương thức xử lý bất đồng bộ trong javascript, mình chỉ nhớ mỗ async await vì đã đọc qua ở đâu đó rồi. Nhưng lại không nhớ cú pháp chính xác. Nên sau buổi hôm đó mình quyết định sẽ tìm hiểu về các phương thức xử lý bất dồng bộ trong javascript và các vấn đề liên quan. Hôm nay mình xin viết một bài về vấn đề này.
# Sync với Async
Trước khi vào vấn đề chúng ta cùng tìm hiểu xem đồng bộ và bất đồng bộ là gì?
Đồng bộ: Hiểu đơn giản thì đồng bộ có nghĩa là thực hiện các công việc một cách tuần tự, công việc này xong thì mới được thực hiện các công việc khác. Ví dụ có 2 công việc A và B thì khi có nghĩa là A thực hiện xong trước rồi mới tới lượt B. Như vậy tổng thời gian hoàn thành sẽ như bên dưới. 
![](https://images.viblo.asia/a4c460bb-d717-48b2-8d2b-2265beab6dff.png)
Điều này nó sẽ ảnh hưởng đến hiệu suất của người dùng. Giả sử một request gửi lên server yêu cầu server thực hiện chức năng như import file hoặc đọc ghi file thì lúc này server sẽ mất nhiều thời gian để xử lý những việc này. Điều đó cũng đồng nghĩa với việc trong lúc server thực hiện chức năng đó thì sẽ không thể thực hiện thêm một hành động nào khác. Chưa kể trong lúc server đang thực hiện những hiện việc đó thì lại có thể có nhiều request được gởi đến trong khi server chưa thực hiện xong, điều này có thể gây crash server.
# Multi-thread
Để khắc phục tình trạng này, các ngôn ngữ lập trình như C/C++, Java,... sẽ sử dụng cơ chế đa luồng (multi-thread). Nghĩa là mỗi công việc tốn thời gian sẽ được thực hiện trên một thread riêng biệt mà không can thiệp vào thread chính. Bạn vẫn có thể thực hiện các công việc tốn thời gian mà vẫn có thể bắt các sự kiện ở thread chính.
![](https://images.viblo.asia/c4dcb16e-458c-4e18-a194-4b4287c81333.png)
# Javascript và cơ chế bất đồng bộ
Đối với javascript thì nó là ngôn ngữ là ngôn ngữ Single threed, các bạn có thể đọc thêm single threed ở link sau: https://viblo.asia/p/javascript-single-thread-lieu-da-loi-thoi-gAm5yxwkldb
Tức là nó chỉ có 1 thredd duy nhất, nên các bạn không thể sử dụng multi thread như những ngôn ngữ khác mà phải sử dụng cơ chế xử lý bất đồng bộ
![](https://images.viblo.asia/827717a9-487a-45c1-8665-6888fe258f2f.png)
Với cách xử lý bất đồng bộ, khi A bắt đầu thực hiện, chương trình tiếp tục thực hiện B mà không đợi A kết thúc. Việc mà bạn cần làm ở đây là cung cấp một phương thức để chương trình thực hiện khi A hoặc B kết thúc.

Cơ chế giúp bạn thực hiện việc này trong JavaScript có thể là sử dụng Callback, Promise hoặc Async/await.
# Callback
Callback là một đoạn code được truyền như một tham số của một hàm(function) và chờ để được gọi vào thực thi.
ví dụ:  
![](https://images.viblo.asia/cf948869-3643-4082-b70a-05d6f18774da.png)

Tức là ở đây mình mong đợi hành động đầu tiên sẽ là in ra màn hình chữ "Hello, world", ngay sau khi in xong thì tiếp tục in tiếp dòng chữ "My name is..."
Chúng ta sẽ cũng xem kết quả
![](https://images.viblo.asia/d53ec675-5a9d-4738-a8dd-01c5cc273182.png)

Ngoài ra thì callback còn được dùng khi các bạn sử dụng ajax,. Khi gửi request đến server thành công và server sẽ respone về thành công thì một hàm success sẽ được gọi. sau đó chúng ta chỉ việc viết code để xử lý cái callback này. 
# Callback hell
Chúng ta đã hiểu về callback rồi, tuy nhiên trong trường hợp có quá nhiều callback được lồng vào nhau, kiểu như là khi thực hiện xong một callback này thì mới được thực hiện một callback khác, ví dụ như:
![](https://images.viblo.asia/ed10e982-506f-482d-94b0-409ce23911d8.png)

Sẽ rất khó coi nếu như chương trình của chúng ta có hàng chục callback như vậy.Mình sẽ khó hiểu và khó maintenance hơn. Đây chính là Callback hell và chúng ta cần tránh điều này khi lập trình.
Có nhiều cách để phòng chống callback hell, mình sẽ nói đến môt vài cách phòng chống callback hell phổ biến.
# Promise
Promise là một cơ chế trong JavaScript giúp bạn thực thi các tác vụ bất đồng bộ mà không rơi vào callback hell hay pyramid of doom, là tình trạng các hàm callback lồng vào nhau ở quá nhiều tầng. Các tác vụ bất đồng bộ có thể là gửi AJAX request, gọi hàm bên trong setTimeout, setInterval hoặc requestAnimationFrame, hay thao tác với WebSocket hoặc Worker… Dưới đây là một callback hell điển hình.

Promise sinh ra để xử lý kết quả của một hành động cụ thể, kết quả của mỗi hành động sẽ là thành công hoặc thất bại và Promise sẽ giúp chúng ta giải quyết câu hỏi "Nếu thành công thì làm gì? Nếu thất bại thì làm gì?". Cả hai câu hỏi này ta gọi là một hành động gọi lại (callback action).

Khi một Promise được khởi tạo thì nó có một trong ba trạng thái sau:
* Fulfilled Hành động xử lý xong và thành công
* Rejected Hành động xử lý xong và thất bại
* Pending Hành động đang chờ xử lý hoặc bị từ chối

Trong đó hai trạng thái Reject và Fulfilled ta gọi là Settled, tức là đã xử lý xong.
![](https://images.viblo.asia/6c3372c8-a86c-4e0f-8591-dfa73721a007.png)
## Cách tạo một promise
```markdown
var promise = new Promise(callback)
```
Trong đó callback là một function có 2 tham số truyền vào như sau:
 ```
     var promise = new Promise(function(resolve, reject){  
    });
 ```
 Trong đó: 
resolve: là một hàm callback xử lý cho hành động thành công.
reject là: một hàm callback xử lý cho hành động thất bại.
Một ví dụ minh họa cho việc sử dụng promise để đọc file:
![](https://images.viblo.asia/c6fe479c-210a-45d9-8bad-3e13796aaaa2.png)
Ở ví dụ trên mình đã sử dụng một module của nodejs cho việc đọc file, và công việc mình muốn thực hiện đó là sau khi mình đọc xong nội dung của file 1 và in ra nội dung của file 1 thì lúc này minh mới được tiến hành đọc nội dung của file 2. Như vậy mình đã xử lý bằng cách truyền các callback vào lần lượt trong từng hàm then và lưu ý thì để hàm then phía sau có thể thực hiện được thì callback trong hàm then trước đó phải trả về một promise.
# Async/await
Promise đã giải quyết khá tốt những vấn đề của callback.  Tuy nhiên, dùng promise đôi khi ta vẫn thấy hơi khó chịu vì phải truyền callback vào hàm then và catch. Code cũng sẽ hơi dư thừa và khó debug, vì toàn bộ các hàm then chỉ được tính là 1 câu lệnh nên không debug riêng từng dòng được. Và khi ES7 ra đời, có một tính năng đó là async/await đã gải quyết được vấn đề này
## Cách sử dụng asyn/await
Để sử dụng hàm async, ta cần khai báo từ khóa async ngay trước từ khóa định nghĩa hàm. Tức là, với hàm định nghĩa với từ khóa function ta phải khai báo ngay trước function, với hàm mũi tên (arrow function) ta phải khai báo trước tập tham số đầu vào.
![](https://images.viblo.asia/7db7f923-6c70-4b0b-a9c3-1180bdcee5ac.png)
Với từ khóa async này, ta có thể đợi các Promise (thao tác bất đồng bộ) xử lý trong hàm đó mà không tạm dùng luồng chính bằng từ khóa await như ví dụ trên.

Kết quả trả ra của hàm async luôn là một Promise dù bạn có gọi await - có xử lý bất đồng bộ hay không. Promise này sẽ ở trạng thái thành công với kết quả được trả ra với từ khóa return của hàm async, hoặc trạng thái thất bại với kết quả được đẩy qua từ khóa throw trong hàm async.
Như vậy,chúng ta có thể thấy bản chất của hàm async chính là Promise.

Với Promise, ta có thể xử lý ngoại lệ với catch khá đơn giản. Tuy nhiên cũng không dễ dàng theo dõi và dễ đọc. Nhưng với hàm async, việc này cực kì đơn giản bằng từ khóa try catch hệt như các thao tác đồng bộ.
![](https://images.viblo.asia/44e02f04-5886-437e-b346-3701393f0b97.png)
## Tóm tắt
Tóm lại mình xin tóm tắt một vài ý chính liên quan đến async/await như sau:
*  await luôn luôn nằm trong hàm async như ví dụ trên ( await không thể nằm trong hàm không được khai báo từ khóa async phía trước)
*  Thứ tự thực hiện các câu lệnh trong js nói chung hay nodejs nói riêng đều là chạy từ trên xuống dưới (nghĩa là chạy sync chứ không phải async), trừ những hàm liên quan tới I/O thì mới được chạy async (Tham khảo thêm ở bài viết event loop trong js )
*  Khi gặp await, nó sẽ convert hàm đó thành promise với callback là tất cả những phần code phía sau await đó. Bản chất await là một promise, phần code nằm sau await thực chất là code nằm trong callback của hàm await đó.