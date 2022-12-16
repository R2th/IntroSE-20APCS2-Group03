Khi tìm hiểu về Javascript, ta thường nghe đến một số thuật ngữ như `Engine V8, call stack, single-threaded, non-blocking, asynchronous, concurrent, ...`. Vậy những thuật ngữ này mang ý nghĩa gì? và cách Javascript hoạt động như thế nào thì ta cùng tìm hiểu ở bài viết này nhé.

# Engine V8

![v8.png](https://images.viblo.asia/d5326ab6-8cf0-4991-8895-57e21efb7955.png)

Engine V8 được phát triển bởi Google và viết bằng C++. V8 được sử dụng bởi Chrome và Chromium. Nhờ có sự ra đời của NodeJS mà cái tên V8 đã trở nên rất phổ biến.

V8 Engine có hai thành phần chính đó là: `memory heap` và `call stack`.

![v81.png](https://images.viblo.asia/f831d77f-61c9-4e7d-a8f7-d499e7410b71.png)

* `Memory Heap`: để cấp phát bộ nhớ
* `Call Stack`: cấu trúc dữ liệu chưa các lời gọi hàm mà code Javascript thực thi

Trong code base của V8 Engine, ta sẽ không thể tìm thấy một số thứ ta vẫn hay dùng trong Javascript như `setTimeout, DOM hoặc HTTP request`.  Vì những thứ này không phải của V8 mà chúng thuộc về **Web APIs** cung cấp bởi browser.
# Call Stack

Javascript là một ngôn ngữ đơn luồng (`single-threaded`) nên chỉ có một Call Stack và chỉ có thể thực thi một công việc tại một thời iđiểm.

Trong dev tool của Chrome ta có thể xem Call Stack trong mục Source. Cụ thể khi ta thực thi một hàm trong Javascript thì hàm đó sẽ được đẩy (**push**) vào trong Call Stack và các câu lệnh cũng được đẩy vào theo cấu trúc dữ liệu stack. Khi các câu lệnh hay hàm được thực thi xong chúng sẽ ra khỏi (**pop**) Call Stack.

Để dễ có thể hình dung cách mà Call Stack hoạt động các bạn có thể tham khảo ở [đây](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gZm9vKCkgewogICAgY29uc29sZS5sb2coJ0hlbGxvIFdvcmxkJyk7Cn0KCmZ1bmN0aW9uIHNheUhlbGxvKCkgewogICAgZm9vKCk7CgogICAgY29uc29sZS5sb2coJ0RvbmUnKTsKfQoKc2F5SGVsbG8oKTsK!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D).

```Javascript
function foo() {
    console.log('Hello World');
}

function sayHello() {
    foo();

    console.log('Done');
}

sayHello();
```

![Screenshot from 2021-09-10 14-54-14.png](https://images.viblo.asia/34277ee1-7f8b-4c33-b4d4-91261e69c0f6.png)

Ta có thể thấy khi hàm `sayHello()` được gọi sẽ được đẩy vào Call Stack. VÌ trong hàm `sayHello()` có gọi đến hàm `foo()` nên hàm `foo()` tiếp tục được đẩy vào, tiếp theo t có `console.log('Hello World')` của hàm `foo()`. Cứ tiếp diễn như thế code sẽ được thực thi đến khi trong Call Stack rỗng thì thôi.

Khi đoạn code trên được thực thi ta sẽ có màn console như sau.

```
Hello World
Done
```

Khi log ra một exception, ta có thể thấy một **stack trace** cũng được dựa trên Call Stack.
```Javascript
function fail() {
    throw new Error('Error');
}

function sayHello() {
    fail();
}

sayHello();
```

![Screenshot from 2021-09-10 15-25-53.png](https://images.viblo.asia/bf833bf5-a0d1-4afb-90b7-7345caa9b5fd.png)

Hay lỗi **Stack overlow** xảy ra khi chương trình vượt quá kích thước của Call Stack.
```Javascript
function sayHello() {
    sayHello();
}

sayHello();
```

![Screenshot from 2021-09-10 15-28-00.png](https://images.viblo.asia/b5787a95-05dc-43e5-a7be-f0727d832259.png)


Khi mọi thứ trong Call Stack trở nên châm hơn hay thực thi lâu hơn thì sẽ như thế nào? Các ví dụ trên chỉ đơn giản là log ra console nên code được thực thi rất nhanh nếu logic là các synchronous request thì ta sẽ phải đợi thực thi lần lượt các request.

```Javascript
let items1 = $.sync('foo1.com') // 30 seconds
let items2 = $.sync('foo2.com') // 1 minutes
let items3 = $.sync('foo3.com') // 2 minutes

console.log(items1);
console.log(items2);
console.log(items3);
```

Ở ví dụ trên khi `console.log(items1)` được cho vào Call Stack ta sẽ phải đợi 30 giây rồi tiếp theo là 1 phút và 2 phút, chẳng may khi network có vấn đề thì ta sẽ phải đợi lâu hơn nữa. Đây là một vấn đề lớn khi ta thực thi code trên trình duyệt. Khi có các synchronous request ta sẽ không thể làm gì khác với trình duyệt như click button để hiển thị dialog mà ta phải đợi vì nó không thể chạy các logic code khác hay không thể render nên sẽ ảnh hưởng rất nhiều đến người dùng. Để khắc phục vấn đề này ta sẽ phải dùng đến `non-blocking` function trong trình duyệt là `Asynchronous callback`.

Tiếp theo ta có một ví dụ khác.
```Javascript
function foo() {
    console.log('Hello World');
}

function sayHello() {
    foo();

    console.log('Done');
}

sayHello();

setTimeout(function() {
    console.log('Asynchronous')
}, 2000)

console.log('Final');
```

Màn console ta có.
```
Hello World
Done
Final
Asynchronous
```

Tại sao lại như vậy? Nếu theo Call Stack ta vừa tìm hiểu ở trên thì hàm `setTimeout` sẽ được cho vào Call Stack trước và câu lệnh ` console.log('Asynchronous')` phải được thực thi trước thì `Asynchronous` phải được log ra rồi sau đó đến `Final` chứ tại sao `Final` lại được log ra console trước? Đó là vì hàm `setTimeout` là một `asynchronous` (bất đồng bộ) và để tìm hiểu xem cách thực thi của chúng ta cùng tìm hiểu đến phần bên dưới.

# Javascript Runtime

Như ta đã đề cập ở trên là mốt số API như AJAX, DOM hay setTimeout, ... không thuộc về JS Engine mà nó là của **Web APIs** nên **Javascript Runtime** phức tạp hơn nhiều chứ không gói gọn trong JS Engine. Ở bài viết này ta sẽ tìm hiểu JS runtime trong môi trường browser. Nó bao gồm các thành phần như sau.

![br.png](https://images.viblo.asia/78108076-e8c7-4cc5-9aa8-de299490e0c5.png)

Trong hình ta có thể thấy 2 thành phần đó là **Event Loop** và **Callback Queue** được cung cấp bởi trình duyệt và chúng chạy trên thread riêng và được đảm bảo tính concurrency. Để hiểu rõ hơn về hai thuật ngữ này ta sẽ đi tiếp đến phần bên dưới.
# Event Loop và Callback queue

**Callback queue** là cấu trúc dữ liệu chứa các hàm `async callback`.

**Event Loop** có một nhiệm vụ rất đơn giản đó là quan sát **Call Stack** và **Callback Queue** nếu **Call Stack** rỗng thì sẽ lấy hàm đầu tiên trong queue và đẩy nó vào trong **Call Stack** để thực thi.

Để hiểu rõ hơn về hai khái niệm này ta cùng xét ví dụ bên dưới.
```Javascript
function main() {
    console.log('Start');

    setTimeout(function() {
        console.log('Callback');
    }, 2000)
    
    console.log('Done');
}

main();
```

![Screenshot from 2021-09-10 16-38-44.png](https://images.viblo.asia/ff935696-1f0c-4a00-a964-64a0d9cd13d8.png)

Khi hàm `main()` được gọi nó sẽ được đẩy vào **Call Stack**. Tiếp đến câu lệnh `console.log('Start')` cũng được đẩy vào. 

![Screenshot from 2021-09-10 16-38-58.png](https://images.viblo.asia/5c08b820-7edd-4fe5-926d-5e81e83c91a6.png)

Sau khi đã thực hiện xong câu lệnh `console.log('Start')` thì tiếp đến hàm `setTimeout(function())`.

![Screenshot from 2021-09-10 16-39-15.png](https://images.viblo.asia/a69e9f08-13a8-42c6-a25d-ba57c7e6e9e9.png)

Hàm `setTimeout(function())` được cung cấp bới **Web APIs** nên nó sẽ được chuyển sang `Web APIs` có `timer` để trình duyệt tính toán thời gian chờ thực thi hàm.

![Screenshot from 2021-09-10 16-39-25.png](https://images.viblo.asia/8119c001-4ed4-4ea5-b169-661eb26b367b.png)

Tiếp đến câu lệnh `console.log('Done')` được chuyển vào **Call Stack**. Và `Web APIs` đã `timer` xong thì hàm thực thi sẽ được chuyển vào **Callback Queue** để chờ.

![Screenshot from 2021-09-10 16-39-45.png](https://images.viblo.asia/ce1975c2-0a4e-4902-aca9-3fdb67ad7f6e.png)

Sau khi thực thi xong `console.log('Done')` thì hàm `main()` cũng sẽ được thực thi xong nên được đưa ra khỏi stack. Lúc này **Event Loop** quan sát thấy **Call Stack** đang trống nên sẽ đưa `anonymous function` trong `setTimeout` vào **Call Stack** để Engine V8 tiến hành thực thi. Console lúc này ta sẽ có.
```
Start
Done
Callback
```

Vây là mình giải thích về quá trình đơn giản của **Javascript Runtime**. Bây giờ mình sẽ tiến hành sửa một chút cho hàm `setTimeout` về thời gian chờ thực thi là `0` thì liệu hàm trong đó có được thực thi hay luôn không?.

```Javascript
function main() {
    console.log('Start');

    setTimeout(function() {
        console.log('Callback');
    }, 0)
    
    console.log('Done');
}

main();
```

Nếu các bạn thử sửa và tiến hành chạy code thì sẽ thấy kết quả không hề thay đổi. Điều này lại càng khẳng định cho cách hoạt động của **Event Loop**. Ngoài `setTimeout` thì các **API** khác cũng đều hoạt động như vậy với `async callback`.

# Tổng kết

Qua bài viết này mình và các bạn đã cùng tìm hiểu về **Event Loop** trong Javascript. Những kiến thức trên cũng chỉ là do mình tự tìm hiểu và học từ người khác nếu có sai sót gì mong mọi người có thể góp ý để bài viết hoàn thiện hơn. Hy vọng qua bài viết này các bạn có thể hiểu hơn về cách mà Javascript hoạt động. Cảm ơn các bạn đã theo dõi đến hết bài viết ❤️.