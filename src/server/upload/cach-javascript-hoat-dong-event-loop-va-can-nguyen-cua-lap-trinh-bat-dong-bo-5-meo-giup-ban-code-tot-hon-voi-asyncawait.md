Nguồn: https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5

*Notes: Bài này là bài dịch từ blog khác, mình sẽ loại bỏ phần quảng cáo không liên quan để các bạn tập trung vào kiến thức được chia sẻ cụ thể trong bài này. Nếu muốn đọc sâu hơn và kỹ hơn thì các bạn nên đọc bài gốc. Cảm ơn ^^!*

Chào mừng các bạn đến với Phần 4 trong series khám phá sâu hơn về cách hoạt động của javaScript và cách nó xây dựng từng thành phần bên trong. 

Nếu bạn chưa đọc các bài post trước, bạn có thể tìm lại chúng dưới đây: 
1. [Cách JavaScript hoạt động: Khái niệm về Engine, Runtime và Call Stack trong JavaScript](https://viblo.asia/p/cach-javascript-hoat-dong-khai-niem-ve-engine-runtime-va-call-stack-trong-javascript-3P0lPaa45ox)
2.  [Cách JavaScript hoạt động: Chi tết về V8 Engine + 5 tips để tối ưu hoá code của bạn](https://viblo.asia/p/cach-javascript-hoat-dong-chi-tet-ve-v8-engine-5-tips-de-toi-uu-hoa-code-cua-ban-1Je5EPDjlnL)
3.  [ Cách JavaScript hoạt động: quản lý vùng nhớ + 4 cách giải quyết vấn đề thất thoát vùng nhớ](https://viblo.asia/p/cach-javascript-hoat-dong-quan-ly-vung-nho-4-cach-giai-quyet-van-de-that-thoat-vung-nho-3Q75w9Q7ZWb)

Trong bài này chúng ta sẽ đi sâu hơn vào vấn đề về các nhược điểm của môi trường single-thread (đơn luồng) và cách khắc phục nó để có thể xây dựng một ứng dụng với UIs ấn tượng hơn. Theo mô tip của các bài đăng trong series này, kết thúc chúng tôi sẽ chia sẽ 5 tips giúp các bạn viết code tốt hơn với async/await. 

# Tại sao single-thread lại hạn chế?

Với [bài post đầu tiên](https://viblo.asia/p/cach-javascript-hoat-dong-khai-niem-ve-engine-runtime-va-call-stack-trong-javascript-3P0lPaa45ox), chúng ta cùng suy ngẫm về câu hỏi chuyện gì sẽ xãy ra khi bạn gọi một loạt các functions trong Call Stack và chúng chiếm một lượng lớn thời gian để thực hiện. 

Tưởng tượng nhé, thí dụ, một chức năng với một thuật toán chuyển đổi hình ảnh vô cùng phức tạp đang chạy trên trình duyệt của bạn. 

Trong khi Call Stack chứa các functions đang phải thực thi, browser của bạn sẽ không thể làm gì khác (nghĩa là nó bị blocked). Điều này nghĩa là browser của bạn sẽ không thể render, không thể chạy các code khác, nó bị stuck. Tiếp đó vấn đề gì sẽ sãy ra? App của bạn sẽ không còn hiệu quả và làm vừa lòng người dùng được nữa. 

App của bạn bị stuck (bị đứng - thực ra là nó phải đợi các funtions trong Call Stack chạy xong thì nó mới render được).

Trong một vài trường hợp thì có lẽ điều này cũng chưa phải là một issue nghiêm trọng. Thế nhưng, sau đây là một vấn đề cực kỳ khó chịu cho người dùng. Một khi browser của bạn đang phải thực hiện quá nhiều tasks bên trong Call Stack, nó sẽ bị đứng trong một khoảng thời gian rất lâu (Tưởng tượng click một button nào đó trên website rồi nó đứng cứng ngắt không phản hồi =))) chắc đập máy). Ngay lúc đó, các browser sẽ phải hiện lên một thông báo dưới dạng alert để hỏi người dùng bước tiếp theo nên làm gì: 

Nó dòm rất gớm và lúc đó chắc vứt luôn cái gọi là UX. (Trãi nghiệm người dùng)

![](https://images.viblo.asia/013ec409-1d84-4b67-b185-4603e0a5854d.jpeg)

# Cách các blocks trong JavaScript được xây dựng

Chúng ta thường viết JavaScript app trên một file `.js` độc lập, tuy nhiên hầu hết chương trình của bạn chắc chắn sẽ bao gồm rất nhiều các blocks, chỉ có một trong số đó sẽ được thực thi ngay lập tức (**now**), và phần còn lại sẽ được thực thi sau đó (**later**). Các block phổ biến nhất đó chính là các function. 

Vấn đề của các lập trình viên mới tiếp xúc với JavaScript đó là việc phải hiểu rằng **later** không thực sự cần thiết phải thực thi một cách nghiêm ngặt và ngay lập tức sau **now**. Nói cách khác, những task được thực thi nhưng không thể hoàng thành **now** (ngay lập tức) theo định nghĩa sẽ được hoàn thành một cách bất đồng bộ. Điều này nghĩa ra bạn có thể sẽ không gặp phải tình trạng browser bị blocked như đã đề cập tới phía trên nữa. 

Hãy cùng xem đoạn code dưới đây:

```
// tưởng tượng ajax(..) là một hàm Ajax được cung cấp bởi một thư viện nào đó  
var response = ajax('https://example.com/api');

console.log(response);
// biến `response` lúc này sẽ không nhận được giá trị trả về
```

Bạn cần phải lưu ý rằng một request Ajax tiêu chuẩn không hề hoàn thành một cách bất đồng bộ, cho nên trong lúc thực thi code thì hàm `ajax(...)` sẽ không nhận được value trả về để có thể truyền vào biến `reponse`

Một cách đơn giản để "đợi" giá trị trả về của một hàm bất đồng bộ, đó là sự dụng một chức năng gọi là callback:

```
ajax('https://example.com/api', function(response) {
    console.log(response); // `response` is now available
});
```

Lưu ý: bạn thực tế cũng có thể gọi một request Ajax một cách đồng bộ nhưng chúng tôi khuyến cáo, đừng bao giờ làm như thế. Nếu bạn gọi một request Ajax một cách đồng bộ, UI của bạn sẽ bị blocked, người dùng sẽ không thể click, enter data, di chuyển đi tab khác, hay di chuyển chuột, nói chung là không thể tương tác với website của bạn trong lúc hàm Ajax đang chạy. Đó thực sự là một trãi nghiệm tồi tệ trên website của bạn. 

Đây là một ví dụ về cách gọi ajax synchronous. Nhưng một lần nữa, đừng bao giờ làm thế, đừng phá huỷ ứng dụng của bạn: 

```
// Giả sử bạn đang sử dụng JQuery
jQuery.ajax({
    url: 'https://api.example.com/endpoint',
    success: function(response) {
        // hàm call back của bạn ở đây.
    },
    async: false // tắt chế độ async (chế độ bất đồng bộ)
    // một ý tưởng tệ hại
});
```

Ajax chỉ là một ví dụ cho asynchronously (chạy bất đồng bộ - mình sẽ để nguyên từ tiếng anh để các bạn làm quen với những từ này). Bạn cũng có thể tạo ra các đoạn code asynchronously mà không phải ajax. 

Thí dụ bạn có thể dùng hàm `setTimeout(callback, milliseconds)`. Vậy hàm `setTimeout` hoạt động ra sao để có thể thiết lập nên một event (a timeout) và event này có thể chạy later (chạy sau now). Xem đoạn code dưới đây:

```
function first() {
    console.log('first');
}
function second() {
    console.log('second');
}
function third() {
    console.log('third');
}
first();
setTimeout(second, 1000); //  hàm `second` sau 1000ms
third();
```

output trong concole khi bạn chạy đoạn code trên sẽ như thế này: 

```
first
third
second
```

# Phân tích Event Loop
Chúng ta sẽ bắt đầu với một phần của một yêu cầu khá kỳ cục. Mặc dù vẫn cho phép tính asynchronously trong code (giống `setTimeout` như đoạn code trên), mãi cho tới ES6, javaScript các phiên bản trước không hề có một khái niệm cụ thể nào về sự bất đồng bộ được tích hợp bên trong nó. JavaScript engine không hề làm bất cứ điều gì ngoài việc thực thi từng đoạn code đơn lẻ tại từng thời điểm riêng biệt. 

Để biết rõ hơn mời bạn đọc lại bàn post về cách engines work ([Google’s V8](https://viblo.asia/p/cach-javascript-hoat-dong-chi-tet-ve-v8-engine-5-tips-de-toi-uu-hoa-code-cua-ban-1Je5EPDjlnL))

Vậy ai ra lệnh cho JS Engine thực thi các đoạn code trong chương trình của bạn? Trong thực tế, JS Engine không hề thực hiện việc đó một cách độc lập (isolation), nó chạy bên trong một **hosting environment**, thí dụ một số **hosting environment** mà các developer thường thấy đó là web browser hay Node.js. Đúng ra thì hiện này JavaScript đã có thể tích hợp với hầu hết các thiết bị, từ robot cho tới các bóng đèn. Từng device sẽ sử dụng các hosting environment khác nhau để chạy JS Engine.

Mẫu số chung cho tất các các môi trường đó là một cơ chế tích hợp được gọi là **event loop**, thứ này sẽ xử lý thực thi nhiều khối chương trình của bạn theo thời gian, mỗi lần thực thi sẽ gọi tới JS Engine. 

Điều đó có nghĩa là JS Engine thực tế chỉ là một môi trường thực thi theo lệnh cho bất kỳ đoạn code JS tuỳ ý nào. Nó điều chỉnh môi trường xung quanh, lên lịch các sự kiện (thực thi mã JS).

Lấy ví dụ, Khi một đoạn code JavaScript của bạn tạo một Ajax để fetch một lượng data từ server, bạn tạo một biến `response` trong hàm callback để hứng giá trị trả về, khi đó JS Engine sẽ nói với hosting environment rằng: "Ê, tao chuẩn bị sẽ tạm dừng việc thực thi lúc này, nhưng bất cứ khi nào mày hoàn thành cái network request đó và muốn nhận được data, thì lúc đó làm ơn gọi cái function callback."

Browser lúc đó sẽ thiết lập một listen để đón cái response từ network, và một khi chúng nhận được thứ gì đó để trả về cho bạn, nó sẽ bắt đầu sắp xếp các hàm callback để thực thi bằng việc đẩy các callback đó vào **event loop**

Nhìn vào sơ đồ dưới đây:

![](https://images.viblo.asia/64a0844b-77f6-4611-9683-ce91f8b66c5e.png)

Bạn có thể đọc lại về Memory Heap và Call Stack trong [bài trước](https://viblo.asia/p/cach-javascript-hoat-dong-khai-niem-ve-engine-runtime-va-call-stack-trong-javascript-3P0lPaa45ox).

Vậy thì Web APIs là gì? Bản chất chúng là các threads mà bạn có thể truy cập vào được, bạn chỉ cần gọi chúng ra để dùng là xong. Chúng là một phần của browser được khởi động đồng thời khi bạn khởi động một browser. Nếu bạn làm việc với Node.js thì các APIs này là APIs của C++.

Vậy ruốc cuộc **event loop** là gì?

![](https://images.viblo.asia/1732c1b6-917b-418c-a147-dfbe4e04beb0.png)

Event Loop có một nhiệm vụ rất đơn giản, theo dõi trạng thái của Call Stack và Callback Queue. Nếu Call Stack rỗng nó sẽ lấy event đầu tiên trong queue rồi đẩy nó vào Call Stack, lúc đó Call Stack sẽ chạy event đó. 

Sự lặp đi lặp lại này được gọi là một **tick** (làm dấu) trong Event Loop. Mỗi event thực ra là một callback function. 

```
console.log('Hi');
setTimeout(function cb1() { 
    console.log('cb1');
}, 5000);
console.log('Bye');
```

Chúng ta thử chạy tay đoạn code trên và xem điều gì sẽ xảy ra:

1.  Trạng thái rỗng, console của browser rỗng, và Call Stack lúc này cũng rỗng. 

![](https://images.viblo.asia/837068d0-d035-40bb-989f-29afc19acf45.png)

2.  `console.log('Hi')` được add vào Call Stack 

![](https://images.viblo.asia/b806947c-8f3a-4d71-85e2-cf0bafbc02e8.png)


3.   `console.log('Hi')` được thực thi và xuất ra console


![](https://images.viblo.asia/9cf5212c-d086-4a06-a232-33fcd9a6bed2.png)

4.  `console.log('Hi')` được xoá khỏi Call Stack

![](https://images.viblo.asia/9c6496e7-5bc3-4cb7-b71e-a426da5434ab.png)

5.  `setTimeout(function cb1() { ... })` được add vào Call Stack

![](https://images.viblo.asia/0f4cae73-a354-48a8-84ae-3d323ec5e763.png)

6. `setTimeout(function cb1() { ... })` được thực thi. Browser tạo ra một timer (bộ đếm) đây là một Web APIs. Hàm đếm này sẽ thực hiện việc đếm lùi. 

![](https://images.viblo.asia/3b11423d-21ab-4e98-9bf8-3c789da573bc.png)

7. `setTimeout(function cb1() { ... })` chạy xong và nó được xoá khỏi Call Stack

![](https://images.viblo.asia/a71f57ed-f598-43ad-b683-a8717d19f246.png)

8.  `console.log('Bye')` lúc này được add vào Call Stack

![](https://images.viblo.asia/6cdcf527-a139-479d-bb67-3e2a871678dd.png)

9. `console.log('Bye')` lúc này được thực thi và xuất ra console

![](https://images.viblo.asia/0d0607f4-a3c0-464c-9b04-905258fd0dd6.png)

10. `console.log('Bye')` sau khi thực thi xong thì được remove khỏi Call Stack

![](https://images.viblo.asia/9cd9eed9-febd-4a03-bb47-51c5185b71fa.png)

11.  Sau mỗi 5000ms, timer chạy xong và nó sẽ đẩy hàm callback `cb1` vào Callback Queue. 

![](https://images.viblo.asia/0ebb94db-d749-447a-b542-824cdf73588b.png)

12.  Event Loop lúc này sẽ lấy hàm `cb1` trong Callback Queue ra và đẩy nó vào Call Stack. 

![](https://images.viblo.asia/72cb0c0e-ccf8-4ed0-91cf-42aca9440a73.png)

13. Hàm `cb1` được thực thi và khi đó `console.log('cb1')` sẽ được add vào Call Stack.

![](https://images.viblo.asia/706a55b4-215b-4ca5-b6a8-e83a16210a87.png)

14. `console.log('cb1')` được thực thi.

![](https://images.viblo.asia/8606f64f-ae73-4bba-b542-bcceebf5af75.png)

15. `console.log('cb1')` bị remove khỏi Call Stack sau khi thực thi xong. 

![](https://images.viblo.asia/c9a98ccd-57c4-4c37-b3e9-b84447ab5cb8.png)

16.  `cb1` được remove khỏi Call Stack.

![](https://images.viblo.asia/3f6ef1a4-d380-404a-a250-cf3a5a0caeab.png)

A quick recap:

![](https://images.viblo.asia/4fd50a40-f1b3-4f69-b06d-751877b871ed.gif)

Một lưu ý thú vị là ES6 chỉ định cách mà event loop hoạt động, điều đó có nghĩa là về mặt kỹ thuật, nó thuộc về phạm vi chịu trách nhiệm của JS Engine, nó không còn đóng vai trò là một hosting environment nữa. Một trong những lý do chính cho sự thay đổi này là việc ra mắt Promises trong ES6 bởi vì các hàm chạy sau đó (later) yêu cầu quyền access vào quyền kiểm soát trược tiếp và chi tiết với các hoạt động về lình trình cho hàng đợi của các event loop (event loop queue). Chúng ta sẽ đi sâu vào vấn đề này sau đó. 

# setTimeout(...) hoạt động  như thế nào

Phải lưu ý một điều quan trọng là `setTimeout(...)` không hề đẩy các callback function vào event loop queue một cách tự động. Nó thiết lập một timer (bộ đếm). Kh timer đếm ngược tới hết thời gian, môi trường hoạt động (lúc này là browser hoặc node.js) sẽ đẩy callback của bạn vào trong event loop. Để một **tick** nào đó bên trong event loop sẽ đón lấy nó và thực thi nó. Hãy cùng nhìn qua đoạn code sau đây:

```
setTimeout(myCallback, 1000);
```

Thực ra không phải `myCallback` sẽ được thực thi sau 1000ms, nó được add vào Callback Queue sau 1000ms. Nhưng lúc đó giả sự CallBack Queue có thể đang có events nào đó được add vào trước, thì lúc đó callback hiện tại của bạn hay nói chính xác là hàm `myCallback` sẽ phải đợi để được thực thi. 

Có khá nhiều bài viết lấy `setTimeout(callback, 0)` làm ví dụ về bất đồng bộ trong JavaScript. Vâng và giờ thì bạn đã biết cách mà API `setTimeout` và event loop hoạt động rồi, gọi hàm `setTimeout` với đối số thứ là bằng 0 chỉ là trì hoãn sự thực thi của hàm callback cho tới khi Call Stack trống thôi. 

Nhìn đoạn code dưới đây: 

```
console.log('Hi');
setTimeout(function() {
    console.log('callback');
}, 0);
console.log('Bye');
```

Và mặc dù thời gian đợi lúc này là 0ms, nhưng console vẫn xuất ra như thế này: 

```
Hi
Bye
callback
```

# Jobs trong ES6 là gì?

Một khái niệm mới đã được giới thiệu trong ES6 gọi là **"Job Queue"**. Nó là lớp trên cùng trong hàng đợi của Event Loop. Bạn rất có thể sẽ va vào nó trong lúc xử lý vấn đề bất đồng bộ trong Promises (chúng ta cũng sẽ nói về nó sau).

Bây giờ chung ta sẽ chỉ chạm vào khái niệm của nó và bàn luận xung quanh vấn đề bất động bộ diễn ra như thế nào trong Promises, sau đó bạn sẽ hiểu được cách mà các action đó hoạt động, cách chúng được sắp xếp và được xử lý như thế nào.

Hình dung như thế này: Job Queue là một queue được đưa vào cuối cùng trong mỗi **tick** (mỗi vòng lập hoạt động của Event loop) của Event Loop queue. Một async actions có thể xãy ra xuyên suốt một **tick** của event loop sẽ không khiến cho toàn bộ event mới của action đó bị add vào Event Loop queue thay vào đó nó sẽ thêm một item (hay còn gọi là Job) vào cái ngăn xếp cuối cùng của cái tick hiện tại. 

Điều này có nghĩa là bạn có thể thêm một chức khác mà bạn muốn thực hiện sau, và yên tâm là nó sẽ được thực hiện ngay sau khi cái tick hiện tại chạy xong. 

Một Job có thể khiến cho nhiều Jobs khác được thêm vào ngắn xếp cuối của cùng cái queue hiện tại. Theo lý thuyết thì việc lặp Jobs cũng có thể xãy ra (khi mà một job có chức năng gọi thêm các jobs khác) và quay vô thời hạn, bởi vì khi mà tài nguyên của chúng đang free lúc đó chúng buộc phải di chuyển qua tick tiếp theo để thực hiện vòng lặp tiếp theo. Về mặt khái niệm thì việc này giống như diễn tả một vòng lập dài vô hạn. (giống while (true) ...) trong code của bạn. 

Jobs cũng giống như `setTimeout(callback, 0)`. Tuy đây là một *trick* nhưng mà nó là một cách khá tốt để có thể triển khai một thứ tự thực hiện được xác định rõ ràng và đảm bảo hơn nhiều: *Later, but as soon as possible* .

# Callbacks

Như bạn đã biết, callbacks là cách phổ biến nhất để giải quyết và quản lý sự bất đồng bộ trong JavaScript. Thật vậy callbacks là một async pattern cơ bản nhất trong JavaScript. Vô số các phần mềm viết JavaScript ngay cả những phần mềm phức tạp nhất cũng không có giải pháp nào khác cho async ngoài callbacks. 

Đương nhiên callback cũng có nhiều hạn chế. Rất nhiều các lập trình viên đã nghiên cứu để tìm ra một async patterns tốt hơn. Tuy nhiều điều này là không thể, bạn không thể sử dụng hiệu quả một khái niệm trừu tượng nào đó mà bạn không hề biết rõ điều gì thực sự xãy ra đằng sau nó. 

Trong chương sau, chúng tôi sẽ tìm hiểu sâu về một số khái niệm trừu tượng này để cho thấy lý do tại sao các async pattern phức tạp hơn (sẽ được thảo luận trong các bài đăng tiếp theo) là cần thiết và thậm chí được khuyến nghị.


# Nested Callbacks
Hãy xem đoạn code dưới đây:

```
listen('click', function (e){
    setTimeout(function(){
        ajax('https://api.example.com/endpoint', function (text){
            if (text == "hello") {
	        doSomething();
	    }
	    else if (text == "world") {
	        doSomethingElse();
            }
        });
    }, 500);
});
```

Hiện tại chúng ta thấy có một chuỗi 3 function nested lồng nhau, mỗi function đểu thể hiện một bước trong chuỗi thực thi bất đồng bộ. 

Đoạn code này thường hay được gọi là **"callback hell"**. Nhưng mà "callback hell" thực tế hầu như không liên quan gì đến nesting/indentation. Nó là một khái niệm phức tạp hơn nhiều. 

Đầu tiên chúng ta thực hiện event **"click"** và đợi cái hàm callback của nó thực thi. Tiếp theo chúng ta đợi tiếp cái setTimeout nó chạy với interval là 500 ms. Rồi tiếp theo đó nữa chúng ta đợi tiếp cái ajax response trong hàm callback của nó. Và có thể bằng một cách nào đó nó sẽ lặp lại vòng lặp này thêm một lần nữa.

Thoạt nhìn, đoạn code này dường như có thể ánh xạ sự không đồng bộ của nó một cách tự nhiên theo các bước liên tiếp như:

```
listen('click', function (e) {
	// ..
});
```

Xong rồi tới:

```
setTimeout(function(){
    // ..
}, 500);
```

Rồi cuối cùng ta có: 

```
if (text == "hello") {
    doSomething();
}
else if (text == "world") {
    doSomethingElse();
}
```

Tuần tự từng step này thì dễ hiểu hẳn ra và là một cách biểu diễn khá tốt nhỉ?

# Promises

Hãy xem đoạn code sau:

```
var x = 1;
var y = 2;
console.log(x + y);
```

Đoạn code rất đơn giản: in ra tổng của x và y. Vậy nếu trường hợp, y hoặc y vẫn chưa xác định thì sao? Có nghĩa là chúng ta phải luôn luôn có cả hai giá trị x và y để có thể thực hiện được việc in ra console.log. Hãy tưởng tượng nếu chúng ta có 2 function `loadX` và `loadY` dùng để load lên 2 biến `x` và `y` tương ứng từ server. Rồi tiếp đó chúng ta có một function `sum` dùng để cộng tổng 2 biến `x` và `y` khi chúng đã được load lên. 

Nó sẽ như thế này (một đoạn code rối rắm, không đẹp đúng ko nào?):

```
function sum(getX, getY, callback) {
    var x, y;
    getX(function(result) {
        x = result;
        if (y !== undefined) {
            callback(x + y);
        }
    });
    getY(function(result) {
        y = result;
        if (x !== undefined) {
            callback(x + y);
        }
    });
}
// A sync or async function that retrieves the value of `x`
function fetchX() {
    // ..
}


// A sync or async function that retrieves the value of `y`
function fetchY() {
    // ..
}
sum(fetchX, fetchY, function(result) {
    console.log(result);
});
```

Có một số lưu ý quan trọng trong đoạn code trên như thế này, chúng ta coi `x` và `y` là hai giá trị trương lai, chúng ta dùng hàm `sum(...)` để tính toán giá trị cuối (hàm gọi từ bên ngoài). Lúc này chúng ta không quan tâm giá trị của `x` và `y` hoặc cả x lẫn y có available cùng lúc hay ko. 

Đương nhiên với cách sử dụng cơ chế hàm callbacks này cũng đáp ứng được yêu cầu của chúng ta. Đây là phần khởi đầu nhỏ nhỏ để chúng ta tiếp cận với lợi ích của việc tính toán các giá trị tương lai mà không cần quan tâm đến việc chúng có giá trị hay chưa hoặc cũng không quan tâm đến thời gian mà chúng sẽ nhận được giá trị trả về. 

# Promise Value

Bây giờ chúng ta thử với idea dùng promises để biểu diễn bài toán `x+y` như trên nhé.
```
function sum(xPromise, yPromise) {
	// `Promise.all([ .. ])` đây là một array chứa các promises,
	// toàn bộ sẽ return về một promises và đợi chờ toàn bộ phải chạy xong thì mới trả về một lần
	return Promise.all([xPromise, yPromise])

    // Khi promise đã được resolved (nghĩa là nhận được giá trị trả về)
    // chúng ta lấy giá trị trả về của `X` và `Y` sau đó cộng chúng lại với nhau
	.then(function(values){
		// `values` là một array các response mà cái array chứa các promisese trên
        // lần lượt trả về
		return values[0] + values[1];
	} );
}

// `fetchX()` and `fetchY()` return promises và trả về các reponse tương ứng
// ( lúc này chứa trong array `values` ), và chúng đã có thể ready for 
// *now* or *later*. 
// nghĩa là các reponse của chúng có thể đã trả về hoặc trả về không quan trọng
sum(fetchX(), fetchY())

// Khi chạy hàm sum(...) chúng ta sẽ nhận được giá trị trả về là một promise 
// và promise đó có reponse là sum của 2 giá trị
// Lúc này chúng ta gọi hàm `then(...)` để đón response trả về từ promise trên
.then(function(sum){
    console.log(sum);
});
```

Chúng ta có 2 promises trong đoạn code trên.

`fetchX()` và `fetchY()` được gọi trực tiếp và reponse trả về của chúng sẽ được bỏ vào trong hàm `sum(...)`. Các giá trị trả về trong 2 promise đó có thể thời điểm trả về của chúng không giống nhau nhưng về mặc chức năng thì action của từng promise là giống nhau. Lập luận này chỉ chú trọng về các thức hoạt động của từng promise chứ không đả động đến thời gian hoạt động của chúng. Chúng ta coi chúng là các giá trị tương lại (future values) hoặc giá trị mang tính chu kỳ. 

Cái pomises thứ hai tôi muốn nhắc tới là `Promise.all([ .. ])` được khởi tạo và trả về bên trong trong hàm `sum(...)` và Promise này được đón giá trị trong hàm `then(...)` của chính nó.  Khi hàm `sum(...)` được thực thi xong, giá trị tương lại `sum` của chúng đã đã ready và xuất ra màn hình. Thực tế chúng ta ẩn cái logic hoạt động của từng promises `fetchX()` và `fetchY()` bởi bản chất hoạt động của nó giống nhau. 

**Notes**: Trong hàm `sum(...)` chúng ta tạo một `Promise.all([ .. ])` và truyền vào đó một array chứa 2 promise `fetchX()` và `fetchY()`. Promises All này sẽ đợi các promise trong array của nó chạy xong và trả về một values (được hứng trong hàm `.then(...)`) là một arrays các reponse tương ứng với từng promise cùng một lúc. Lúc này ta gọi các giá trị ra và cộng chúng lại với nhau `values[0] + values[1]`.

Lưu ý là promise không hề kết thúc ở `.then(...)` nó có thể tạo tiếp một promise mới sau đó. Các promise chuỗi sẽ được đề cập chi tiết hơn ở phần sau. 

Về Promises, `.then()` thức tế có thể xử lý được 2 functions đầu tiên là hứng giá trị trả về sau khi chạy thành công, cái thứ 2 là rejection nếu gặp lỗi. 

```
sum(fetchX(), fetchY())
.then(
    // fullfillment handler
    function(sum) {
        console.log( sum );
    },
    // rejection handler
    function(err) {
    	console.error( err ); // bummer!
    }
);
```

Trong trường hợp getting `x` hoặc `y` bị lỗi vì lý do nào đó trong quá trình thực thi. Promise `sum(...)` sẽ trả về một rejection (trả lỗi) và hàm callback handler thứ 2 sẽ xử lý việc trả về một error. Bởi vì promise đóng gói trạng thái thời gian thực thi (nghĩa là nó sẽ đợi chạy cho xong và trả ra reponse nếu thành công hoặc trả ra lỗi nếu thực thi thất bại) không phụ thụ yếu tố bên ngoài. Promise bản thân nó là một hàm thực thi độc lập. Cho nên nó được thực thi mà không cần quan tâm tới thời gian hay kết quả trả về sau đó. 

Bên cạnh đó, promise một khi đã được resolved thì nó sẽ tồn tại mãi như vậy ( lúc này nó sẽ trở thành một giá trị bất biến) và nó vẫn sẽ đc gọi tới bất cứ khi nào và bao nhiêu lần cũng đc. 

Nó cực kỳ tiện dụng khi bạn có thể gọi một chuỗi các resolved của promise: 

```
function delay(time) {
    return new Promise(function(resolve, reject){
        setTimeout(resolve, time);
    });
}

delay(1000)
.then(function(){
    console.log("after 1000ms");
    return delay(2000);
})
.then(function(){
    console.log("after another 2000ms");
})
.then(function(){
    console.log("step 4 (next Job)");
    return delay(5000);
})
// ...
```

Chúng ta gọi hàm `delay(2000)` để tạo ra một promise sẽ thực thi xong và trả về kết quả sau 2000ms. Kết quả sẽ trả về trong hàm `.then(...)` đầu tiên sau đó nó lại gọi tiếp `delay(2000)` thêm một lần nữa và chúng ta lại có tiếp một hàm `.then(...)` thứ hai để hứng response trả về từ promise mà hàm `.then()` thứ nhất đã gọi. 

Notes: Promise là một hàm độc lập bên ngoài stack và một khi được giải quyết nó sẽ trở nên bất biến, giá trị của nó sẽ được truyền cho bất cứ bên nào vì nó sẽ không bị overwrite một cách bất cẩn nào đó.  Điều này đặc biết đúng khi có nhiều hàm cùng gọi promise và cùng chờ giá trị trả về của nó. Và các hàm đó hoàn toàn độc lập với nhau. Giá trị promise không thay đổi nên các hàm gọi promise sẽ không bị ảnh hưởng bởi nhau. Tính bất biến của promise nghe có vẽ hơi trừu tượng nhưng nó thực sự là cốt lõi giá trị của promise, chung ta không nên bỏ qua lý thuyết này. 

# To Promise or not to Promise?

Một chi tiết quan trọng về promise đó là làm sao phân biệt được một giá trị có phải là một Promise hay không? Nói cách khác, liệu value đó có hoạt động như một Promise hay không?

Chúng ta biết rằng một Promise được tại ra bởi syntax là `new Promise(...)` cho nên chúng ta sẽ nghĩ đơn giản chỉ cần check `p instanceof Promise` là đủ đúng không? Uhm, chưa chắc đâu!

Thực tế thì bạn nhận Promise value từ một browser window khác (thí dụ iframe), và nó có thể có Promise syntax riêng của nó, khác với việc mình gọi Promise ngay browser hay iframe hiện tại và trong trường hợp đó nếu check `instanceof` thì sẽ không là `Promise` được. 

Hơn thế nữa, một số library hoặc framework nó có thể chọn trả về các Promise mà không hề dùng native Promise của ES6. Trong thực tế, đôi khi bạn đang dùng Promise với các thư viện chạy trong các trình duyệt cũ nên khi kiểm tra thì nó không có một Promise nào cả. 

# Swallowing exceptions

Tưởng tượng một gia đoạn nào đó trong quá trình tạo ra Promise, hoặc trong quá trình thực thi của promise diễn ra, JavaScript bị lỗi, thí dụ lỗi `TypeError` hoặc `ReferenceError`, cái exception này sẽ bị bắt lại ngay, và nó bắt buộc Promise sẽ phải nhả ra một rejected. 

Thí dụ: 

```
var p = new Promise(function(resolve, reject){
    foo.bar();	  // `foo` is not defined, so error!
    resolve(374); // never gets here :(
});

p.then(
    function fulfilled(){
        // never gets here :(
    },
    function rejected(err){
        // `err` will be a `TypeError` exception object
	// from the `foo.bar()` line.
    }
);
```

Trong ví dụ trên bạn sẽ thấy, hàm khởi tạo Promise `p` có gọi `foo.bar()`, nhưng `foo` là một giá trị chưa được defined nên nó sẽ bị lỗi, lúc đó hàm `resolve(374)` sẽ không được thực thi. Thúc đó `fullfilled()` đương nhiên sẽ không được thực thi, thay vào đó là hàm `rejected(err)` với `err` luc đó sẽ là lỗi `TypeError` object được nhả ra từ dòng `foo.bar()`

Nhưng điều gì sẽ xãy ra nếu Promise vẫn thực thi thành công, nhưng lại xãy ra lỗi JavaScript trong quá trình đợi response (nghĩa là nó lỗi trong hàm `.then(...)` )? Mặc dù vậy lỗi đó không hề mất đi và nó sẽ được handle bằng một cách khá thú vị. 

```
var p = new Promise( function(resolve,reject){
	resolve(374);
});

p.then(function fulfilled(message){
    foo.bar();
    console.log(message);   // never reached
},
    function rejected(err){
        // never reached
    }
);
```

Tương tự thì ta thấy `foo.bar()` rõ ràng là `undefined`. Và lúc đó hàm `.then(...)` sẽ gọi lại chính nó và return về một promise khác, promise đó sẽ thực thi việc rejected trả ra lỗi `TypeError`. 

# Handling uncaught exceptions

Thực ra cũng có một cách tiếp cận khác mà nhiều người cho là tốt hơn. Có một khuyến nghị cho rằng Promise nên có thêm hàm `.done(...)`, dùng để đánh giấu rằng một cái promise đã kết thúc hoàn toàn trong một phiên thực thi của nó. `.done(...)` sẽ không tạo ra hay trả về một Promise nào khác nữa. Và khi đó hàm callback được bỏ vào `.done(...)` sẽ không còn start thêm một cái Promise chain nào nữa. 

Nó sẽ bắt được các lỗi ngoại lệ mà chúng ta chưa handle trong rejected của các `.then(...)` trước đó. Bất kỳ một `error` nào được `rejected` ở `.done(...)` sẽ được coi như là một lỗi global. 

```
var p = Promise.resolve(374);

p.then(function fulfilled(msg){
    // numbers don't have string functions,
    // so will throw an error
    console.log(msg.toLowerCase());
})
.done(null, function() {
    // If an exception is caused here, it will be thrown globally 
});
```

# What’s happening in ES8? Async/await

JavaScript ES8 cho ra mắt `async/await`, điều này làm cho việc working with Promise trỡ nên dễ dàng hơn bao giờ hết. Bây giờ chúng ta cũng nhìn qua khả năng của `async/await` và làm sao để tận dụng chúng để viết async code. 

Vậy thì hãy xem cách `async/await` hoạt động nhé. 

Bạn khởi tạo một function declaration kiểu asynchronous dùng từ khóa `async`. Function này sẽ return về một  **[AsyncFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)** object. Cái `AsyncFunction` object này biểu diễn các function chạy bất đồng bộ. 

Khi một async function được gọi, nó sẽ trả về một Promise nhưng khi nó return về một value thì value đó không còn là một promise nữa. Bởi Promise lúc này đã được khởi tạo và resolves một cách tự động và trả về một giá trị. Và nếu async function rejected thì nó cũng sẽ tự động trả về một mã lỗi. 

Một async function có chứa một biểu thức `await`, nó sẽ tạm dừng thực thi hàm và chờ cho đến khi Promise thực thi xong và trả về giá trị (dù là resolve hay reject). 

*(Note: đoạn này viết hơi dài dòng và rỗi nên mình gôm ý lại cho dễ hiểu. Các bạn hãy đọc lại bài gốc để biết rõ hơn nhé.)*

Bạn có thể xem Promise trong JavaScript gấn giống với Future trong Java hay Task trong C#

> Mục đích của `async/await` là đơn giản hóa hành vi khi làm việc với Promise

Check thử đoạn code dưới đây nhé:

```
// Funciton javaScript thông thường
function getNumber1() {
    return Promise.resolve('374');
}
// Function với cú pháp async và nó hoạt động y chang cách getNumber1() hoạt động
async function getNumber2() {
    return 374;
}
```

Cũng tương tự như promise thì async function cũng có thể handl việc trả ra một exceptions khi có lỗi xãy ra:

```
function f1() {
    return Promise.reject('Some error');
}
async function f2() {
    throw 'Some error';
}
```

`await` keyword chỉ được sử dụng bên trong `async` functions và nó giúp đợi một Promise ở dạng đồng bộ (Nghĩa là từ việc chạy loạn xạ bất đồng bộ thì bạn tự dưng mong muốn nó chạy theo thứ tự một cách đồng bộ với quy định của riêng bạn thì dùng kyword `await`). Trường hợp bạn sài `Promise` bên ngoài async function thì vẫn phải đón response trả về bởi hàm `.then(res => console.log(res))` như thông thường:

```
async function loadData() {
    // `rp` là một request-promise function. (Tưởng tượng nó là một function helpers hỗ trợ việc gọi một http/https request và trả về một promise)
    var promise1 = rp('https://api.example.com/endpoint1');
    var promise2 = rp('https://api.example.com/endpoint2');
   
    // Lúc này cả hai rp function được gọi đồng thời
    // và giờ thì chúng ta sẽ đợi cho tới khi nó gọi xong thì đón kết quả
    var response1 = await promise1;
    var response2 = await promise2;
    return response1 + ' ' + response2;
}
//Khi nào mà chúng ta không còn nằm trong một `async function` nữa
// lúc đó chúng ta sẽ phải sài `.then()` để đón kết quả sau khi Promise chạy xong
loadData().then(() => console.log('Done'));
```

Ngoài ra bạn cũng có thể định nghĩa async function ở dạng function expression - “async function expression”. Khi khai báo dạng này thì syntax hầu như là không khác biệt. Điều khác biệt chính đó là ở dạng "async function statement" thì có thể lượt qua việc đặt tên function với mục đích tạo ra các anonymous functions. Còn đối với  “async function expression”, nó có thể được dùng như là một IIFE (Immediately Invoked Function Expression), nghĩa là function được gọi ngay sau khi khởi tạo ra.

Tương tự đoạn code dưới đây: 
```
var loadData = async function() {
    // `rp` is a request-promise function.
    var promise1 = rp('https://api.example.com/endpoint1');
    var promise2 = rp('https://api.example.com/endpoint2');
   
    // Currently, both requests are fired, concurrently and
    // now we'll have to wait for them to finish
    var response1 = await promise1;
    var response2 = await promise2;
    return response1 + ' ' + response2;
}
```

Một trong những điều rất quan trọng của `async/await` đó là nó được support cho tất cả các browsers thông dụng hiện nay:

![image.png](https://images.viblo.asia/c5caf308-0f7b-4853-9e41-32b21f9a3b83.png)

Nếu khả năng tương thích không như mong đợi ở một số browsers thì bạn có thể dùng thêm một số trình biên dịch thông dụng hiện nay như Babel hoặc TypeScript. 

Cuối cùng. Trên thực tế thì cũng ta cũng không nên bữa bãi chọn các cách tiếp cận theo "trend" để xử lý bất đồng bộ trong javaScript. Điều cần thiết là bạn phải thực sự hiểu bản chất của bất đồng bộ là như thế nào, lý do vì sao nó quan trọng, và phải hiểu sâu về cơ chế bên trong của phương pháp mà bạn muốn xử dụng. Mọi cách tiếp cận đều có ưu và nhược điểm khác nhau trong javaScript.

# 5 Tips về cách viết code tối ưu với async functions

### 1. Clean code: 
Sử dụng `async/await` giúp bạn viết ít code hơn (đồng nghĩa với ít bug hơn :D). Khi sử dụng chúng thì chúng ta có thể lượt bỏ bớt được vài bước không cần thiết như là `.then()`, `.catch()`, tạo các anonymous function để handle response hoặc phải đặt tên cho response từ các callback function. Thí dụ:

```

// `rp` is a request-promise function.
rp(‘https://api.example.com/endpoint1').then(function(data) {
 // …
});
```

Với `async/await`: 

```
// `rp` is a request-promise function.
var response = await rp(‘https://api.example.com/endpoint1');
```


### 2. Error handling
`async/await` giúp chúng ta handle sync và asnyc error đồng thời trên cùng một cấu trúc code -- ví dụ nổi tiếng nhất chắc là đối với việc sử dụng try/catch statements. Cùng xem đoạn code dưới đây khi sử dụng với `Promises`

```
function loadData() {
    try { // Bắt synchronous errors.
        getJSON().then(function(response) {
            var parsed = JSON.parse(response);
            console.log(parsed);
        }).catch(function(e) { // Bắt asynchronous errors
            console.log(e); 
        });
    } catch(e) {
        console.log(e);
    }
}
```

Với `async/await`: (rất gọn gàng và sạch sẽ)

```
async function loadData() {
    try {
        var data = JSON.parse(await getJSON());
        console.log(data);
    } catch(e) {
        console.log(e);
    }
}
```

### 3. Conditionals:
Viết các biểu thức điều kiện trong `async/await` sẽ cực kỳ đơn giản dễ hiểu, dễ nhìn:

Với promise: 

```
function loadData() {
  return getJSON()
    .then(function(response) {
      if (response.needsAnotherRequest) {
        return makeAnotherRequest(response)
          .then(function(anotherResponse) {
            console.log(anotherResponse)
            return anotherResponse
          })
      } else {
        console.log(response)
        return response
      }
    })
}
```

Với `async/await`i:

```
async function loadData() {
  var response = await getJSON();
  if (response.needsAnotherRequest) {
    var anotherResponse = await makeAnotherRequest(response);
    console.log(anotherResponse)
    return anotherResponse
  } else {
    console.log(response);
    return response;    
  }
}
```

### 4. Stack Frames:
Khi sài promises, chúng ta sẽ không thể nào tracking được lỗi xãy ra ở đâu trong quá trình call của một promise. Nhưng khi sử dụng `async/await` chúng ta hoàn toàn có thể đánh giấu được. 

Với promises: 

```
function loadData() {
  return callAPromise()
    .then(callback1)
    .then(callback2)
    .then(callback3)
    .then(() => {
      throw new Error("boom");
    })
}
loadData()
  .catch(function(e) {
    console.log(err);
// Error: boom at callAPromise.then.then.then.then (index.js:8:13)
});
```


Với `async/await`:

```
async function loadData() {
  await callAPromise1()
  await callAPromise2()
  await callAPromise3()
  await callAPromise4()
  await callAPromise5()
  throw new Error("boom");
}
loadData()
  .catch(function(e) {
    console.log(err);
    // output
    // Error: boom at loadData (index.js:7:9)
});
```

### 5. Debugging: 
Việc debug thực sự là một ác mộng đối với lập trình viên khi sài Promise. Lấy ví dụ, khi bạn đặt một breakpoint bên trong một hàm callback `.then()` và sử dụng debug shortcuts như là “stop-over”, không như dự đoán của bạn, debugger sẽ không chạy vào đó bởi vì nó chỉ là một step trong tiến trình chạy asynchronous.

Đối với  `async/await` bạn có thể đặt chốt chặn ngay `await` để điều khiển việc function chạy theo ý muốn.