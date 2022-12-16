Đã bao giờ bạn thắc mắc rằng, làm sao trình duyệt có thể đọc và thực thi code JavaScript? Hmmm :thinking::thinking::thinking:? Hãy thử làm 1 việc nhé: mở browser console trên Chrome và nhìn vào tab **Source**. Ở cửa sổ này, bên tay phải chúng ta sẽ thấy vài ô, và thứ chúng ta cần để ý đến là ô có title **Call Stack**.

![](https://images.viblo.asia/4d252571-5e9f-4bba-a9dd-954c54d4170c.png)

Vậy, **Call Stack** là gì? Có vẻ như tại đây, có nhiều thứ được chạy, mặc dù file script JavaScript chỉ có vài dòng. JavaScript, thực chất không phải lúc nào cũng tự chạy chính nó.

Một thành phần quan trọng được biết tới như là công cụ biên dịch và thông dịch mã JavaScript của chúng ta đó là JavaScript engine, phổ biến nhất được biết tới là *V8*, được sử dụng bởi Google Chrome và Node.js, hay *SpiderMonkey* dùng cho Firefox và *JavaScriptCore* được Safari/Webkit sử dụng.

JavaScript engine ngày nay trở thành 1 công cụ tuyệt vời, và quả thật rất khó để có thể cover toàn bộ các khía cạnh của khái niệm này. Tuy nhiên có 1 phần nhỏ thuộc về JavaScript engine mà chúng ta nên hiểu về chúng. 1 trong những "phần nhỏ" đó là **Call Stack**, **Global Memory (bộ nhớ toàn cục)** và **Execution Context (bối cảnh thực thi)**, là những thành phần thực thi mã javaScript.

# JavaScript engines và Global Memory
Ta nói JavaSciprt là ngôn ngữ lập trình biên dịch và thông dịch đồng thời. 
> JavaScript engine thực chất thực thi việc biên dịch mã chỉ vài microseconds trước khi đoạn mã đó được thực thi.

![](https://images.viblo.asia/fbb679d7-dd80-43b9-9340-b2dffec4c80a.gif)

Sound magic, rite? Khái niệm này được gọi là **JIT** (Just in time compilation). Tuy nhiên chúng ta sẽ không bàn về quá trình compile ở đây, mà sẽ skip tới phần mã JavaScript được executed.

Đầu tiên, hãy xem đoạn code này:

```js
var num = 2;

function pow(num) {
    return num * num;
}
```

Nếu bạn được hỏi rằng đoạn mã trên sẽ được thực thi như thế nào trên trình duyệt, bạn sẽ trả lời ra sao? Mình đoán 1 số bạn sẽ trả lời rằng

> Trình duyệt "đọc" đoạn mã

hoặc

> Trình duyệt "thực thi" đoạn mã

Thực chất mọi thứ diễn ra phức tạp hơn. Trước nhất, phải đính chính lại rằng không phải là trình duyệt đọc đoạn code đó, mà là engine. JavaScript engine là yếu tố thực hiện việc đọc mã, và ngay khi đọc tới dòng đầu tiên nó đồng thời thực hiện việc đặt 1 vài tham chiếu vào bộ nhớ toàn cục.

Bộ nhớ toàn cục (aka Heap) là một vùng mà JavaScript engine lưu trữ các biến cũng như function được định nghĩa. Lưu ý rằng, mặc dù điều này nghe có vẻ tầm thường, nhưng trong JavaScript việc khai báo hàm không giống như cách chúng được gọi. Một định nghĩa hàm đơn thuần chỉ là 1 mô tả về những gì hàm đó nên chấp nhận, cũng như cách mà nó được gọi. Mặt khác, một lệnh gọi hàm là sự thực thi thực tế của 1 hàm đã khai báo trước đó.

So, quay lại với ví dụ trước đó. Khi engine đọc đoạn code này, bộ nhớ toàn cục được triển khai với 2 phép gán:
![](https://images.viblo.asia/be11bef3-efb6-4888-96b9-95523bf33fdf.png)

Tại thời điểm này, chưa có gì được thực thi cả. Nhưng nếu chúng ta thử gọi hàm đã được khai báo theo cách dưới đây:
```js
var num = 2;

function pow(num) {
    return num * num;
}

pow(num);
```

Hmmmm. Điều gì sẽ xảy ra tiếp theo nhỉ? Khi 1 function được gọi, JavaScript engine sẽ tạo thêm khoảng trống cho 2 "chiếc hộp":
* một Global Execution Context (bối cảnh thực thi toàn cục)
* một Call Stack

Hãy tìm hiểu về 2 "chiếc hộp" này trong phần tiếp theo

# Global Execution Context và Call Stack
Bên trên mình đã đề cập đến cách thức mà JavaScript engine đọc biến và các khai báo hàm. Chúng chung quy lại sẽ được lưu vào bộ nhớ toàn cục. Bây giờ thứ mà chúng ta quan tâm là cách thức mà engine thực hiện việc thực thi 1 hàm đã được định nghĩa sẵn. Có một thành phần cơ bản trong bất kì JavaScript engine nào, được gọi là **Call Stack**. Call stack là một *stack data structure* (cấu trúc dữ liệu ngăn xếp): có nghĩa là 1 phần tử có thể được "push" vào từ bên trên, nhưng không thể được "pop out" nếu có 1 phần tử nào khác ở trên chúng. Hàm JavaScript thực thi theo cơ chế tương tự như vậy. Sau khi được thực thi, chúng không thể rời Call Stack nếu có chức năng khác vẫn chưa được thực thi xong. 

Okay, quay trở về với ví dụ của chúng ta. Khi function được gọi, engine sẽ push function đó vào Call Stack:
![](https://images.viblo.asia/f93d08df-4237-40f4-bc60-a403bc4c9a56.png)

Hãy nghĩ đến Call Stack như là 1 ống khoai tây Slide (hoặc Pringles). Chúng ta không thể ăn miếng khoai ở đáy ống mà chưa ăn những miếng ở bên trên. Tương tự, các hàm JavaScript cũng vậy. Và, các hàm này được phát khởi đống thời. Điều này có thể được hiểu như hình sau:
![](https://images.viblo.asia/c9cb27fa-85fd-4a8e-8030-404b338fa077.png)

Tưởng tượng rằng Global Execution Context là biển còn các hàm JavaScript toàn cục thì như những chú cá. Tuy nhiên đó chỉ là 1 nửa câu chuyện. Điều gì sẽ xảy ra nếu hàm của chúng ta có các biến lồng nhau, hoặc một hoặc nhiều hàm bên trong đó? Ngay cả đối với 1 biến thể đơn giản như sau, JavaScript engine luôn tạo ra 1 Local Execution Context:
```js
var num = 2;

function pow(num) {
    var fixed = 89;
    return num * num;
}

pow(num);
```

Để ý rằng mình đã thêm vào 1 biến ```fixed``` bên trong hàm ```pow```.  Trong trường hợp này, Local Execution Context sẽ lưu giữ biến ```fixed```. Bây giờ hãy nhìn vào hình bên trên và tưởng tượng, Local Execution Contexxt sẽ xuất hiện gần ```pow```, bên trong hộp màu xanh đậm nằm trong Global Execution Context. Và càng nhiều nested function được tạo trong nested function thì engine sẽ tạo ra càng nhiều Local Execution Context.

# JavaScript là đơn luồng
Chúng ta cho rằng JavaScript là single-threaded vì có duy nhất 1 Call Stack xử lý function. Do đó. các function không thể rời khỏi Call Stack nếu có hàm khác đang chờ để được thực thi.

Đó không phải là vấn đề khi xử lý code phát khởi đồng thời. Lấy ví dụ, 1 phép tính tổng 2 số được xác định và chạy đồng thời chỉ trong vài microseconds. Tuy nhiên, JavaScript engine được thiết kế để bất đồng bộ theo mặc định. Kể cả khi chúng có thể thực thi 1 hàm tại 1 thời điểm, vẫn luôn có 1 cách để hàm này xử lý với 1 đỗ trễ bởi 1 yếu tố ngoại - cụ thể ở đây là trình duyệt của chúng ta. Tuy nhiên chúng ta sẽ bàn về vấn đề này sau.

Đến đây, mình sẽ tóm tắt quá trình mà trình duyệt load code JavaScript và sau đó engine đọc từng dòng 1 và thực hiện các bước sau:
* đưa vào bộ nhớ toàn cục các biến và các khai báo hàm
* push mọi lệnh gọi hàm vào Call Stack
* tạo ra Global Execution Context - nơi mà các hàm toàn cục sẽ được gọi
* tạo ra nhiều Local Execution Context tùy với số lượng nested variable và nested function

Đó là bức tranh toàn cảnh về cơ chế đồng bộ ở mức cơ bản của mọi JavaScript engine.

# JavaScript bất đồng bộ, hàng đợi Callback và vòng lặp sự kiện
Global Memory, Execution Context và Call Stack giải thích cơ chế code JavaScript được chạy trên trình duyệt. Tuy nhiên chúng ta đã bỏ lỡ 1 thứ: nếu có 1 function nào đó yêu cầu phải chạy bất đồng bộ thì sao? Khi nhắc đến yêu cầu bất đồng bộ, ý mình là tất cả các tương tác từ bên ngoài mà cần nhiều thời gian để xử lý. Gọi tới REST api hoặc sử dụng timer là 2 ví dụ điển hình của xử lý bất đồng bộ, vì nó tốn nhiều hơn một vài giây để thực hiện. Với các yếu tố và sự giải thích từ đầu bài, không có 1 cách nào để chúng ta thực hiện các xử lý như vậy mà không chặn đứng Call Stack, cũng như trình duyệt.

Cần lưu ý rằng, Call Stack chỉ có thể thực thi 1 hàm tại 1 thời điểm, và chỉ cần còn 1 function kẹt lại trong Call Stack cũng có thể đóng băng trình duyệt theo nghĩa đen. Đó là lý thuyết, tuy nhiên trên thực tế, khi chúng ta chạy 1 function bất đồng bộ, trình duyệt sẽ nhận chức năng đó và xử lý. Hãy xem ví dụ dưới đây:
```js
setTimeout(callback, 10000);

function callback(){
    console.log('hello timer!');
}
```
Mình chắc rằng nhiều bạn tuy đã nhìn thấy hàm ```setTimeout``` này rất nhiều lần rồi, nhưng không biết rằng đó không phải là 1 hàm built-in của JavaScript. Khi được phát triển, không hề có hàm ```setTimeout``` nào được tích hợp vào JavaScript cả. Trên thực tế, ```setTimeout``` là 1 phần của thứ được gọi là browser APIs - một bộ công cụ tiện ích mà trình duyệt cung cấp. Vậy, trong thực tế nó có ý nghĩa như thế nào? Vì ```setTimeout``` là 1 browser api, do đó nó sẽ được trình duyệt xử lý trực tiếp (nó xuất hiện trong Call Stack trong giây lát nhưng bị xóa ngay lập tức). Sau 10 giây, trình duyệt sẽ xử lý các callback mà ta truyền vào và đưa vào trong Callback Queue. Đoạn code bên dưới
```js
var num = 2;

function pow(num) {
    return num * num;
}

pow(num);

setTimeout(callback, 10000);

function callback(){
    console.log('hello timer!');
}
```

sẽ được minh họa như sau:
![](https://images.viblo.asia/2132736d-811e-4503-9249-62b4c55b0fd4.png)

Như bạn thấy, hàm ```setTimeout``` được thực thi trong browser api context. Sau 10 giây, bộ đếm được kích hoạt và callback function sẵn sàng để được thực thi. Nhưng trước hết nó cần đi qua Callback Queue. Callback Queue là 1 cấu trúc dữ liệu hàng đợi. Tất cả các hàm bất đồng bộ đều phải được duyệt qua Callback Queue trước khi đi vào Call Stack. Nhưng thành phần nào đẩy hàm đó vào? Ở đây chúng ta sẽ nói về 1 thành phần nữa được gọi là Event Loop.

Event Loop chỉ có 1 nhiệm vụ duy nhất: kiểm tra xem Call Stack có rỗng không. Nếu còn lại một vài function ở trong Callback Queue và Call Stack rỗng, thì đây là lúc đẩy các callback vào Call Stack. Dưới đây là bức tranh toàn cảnh cách thức JavaScript engine xử lý hàm đồng bộ và bất đồng bộ:
![](https://images.viblo.asia/5d3feae6-0c39-4e63-99f2-2a5de8c26a32.png)

Giả sử rằng ```callback()``` sẵn sàng để chạy. Khi ```pow()``` thực hiện xong, Call Stack rỗng, Event Loop sẽ đẩy ```callback()``` vào. Đó là tất cả những gì chúng ta cần biết (tại thời điểm này)



-----
*(còn tiếp)*
*Nguồn của bài viết: [JavaScript Engines: How Do They Even Work?](https://dev.to/valentinogagliardi/javascript-engines-how-do-they-even-work-4i04)*