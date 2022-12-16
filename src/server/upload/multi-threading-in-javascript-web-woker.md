### Introduce
Như bạn có thể biết, Javascript là một single thread. Để làm rõ hơn thì điều này có nghĩa là một luồng xử lý vòng lặp sự kiện. Đối với các trình duyệt cũ hơn, toàn bộ trình duyệt đã chia sẻ một luồng giữa tất cả các tab. Các trình duyệt hiện đại đã cải thiện điều này bằng cách sử dụng hoặc xử lý theo từng trang web hoặc các thread khác nhau trên mỗi tab. Mặc dù các luồng chuyên dụng đã cải thiện khả năng phản hồi của các trang web, nhưng nó vẫn khiến mỗi tab không thể xử lý nhiều tập lệnh chạy cùng một lúc.

Vậy tại sao chúng ta cần nhiều tập lệnh chạy cùng một lúc? Bởi vì máy tính cực kỳ nhanh và với mỗi tab sử dụng luồng riêng, các trang web sẽ không gặp vấn đề gì. Điều này đúng với hầu hết các trường hợp cho đến khi trình duyệt của bạn chạy một thuật toán phức tạp hoặc render một hình ảnh phức tạp. Chính những cái này đã chặn luồng chính làm chậm các event và trigger UI. Trong năm 2009 thì JS đã giới thiệu tới chúng ta Web Worker để giải quyết vấn đề multi thread này.

### What's Web Worker?

![](https://images.viblo.asia/18b12e41-e0c3-426f-82d4-f5c174efa5fc.png)
Web Worker là các tập lệnh Javascript được execute từ một trang HTML chạy trên một background thread từ main execute thread chính. Dữ liệu được gửi giữa main thread và worker thông qua tin nhắn. Vì các worker này chạy trên một luồng riêng biệt so với main execute thread, bạn có thể sử dụng các web worker để chạy các task chuyên sâu quy trình từ trình duyệt mà không cần tạo các trường hợp block.

Vậy chúng ta hay thử build nó xem như thế nào nhé?
### Build Web Worker
Để tạo một web worker thì cũng k phức tạp là mấy. Và ở bài viết này mình sẽ build thử một demo send messages nhé. Đầu tiên chúng ta cần 2 file là main.js và một file chứa code của worker. Cần tách ra 2 file là vì worker sẽ cần phải chạy trong một thread riêng biệt. Tạm thời thì mình đặt là main.js và worker.js còn các bạn đặt như thế nào cũng ok cả, :). Giờ thì chúng ta sẽ tạo worker object mới nhé:

```javascript
// in main.js
var worker = new Worker('worker.js');
```
Như vậy là chúng ta đã có một worker rồi, việc tiếp theo đó là gửi tin nhắn. Và để làm như vậy thì chúng ta gọi hàm postMessage của worker object này nhé.
```javascript
// in main.js
worker.postMessage("Have a nice day!")
```
Lưu ý rằng data được gửi giữa main thread và các worker sẽ được copy chứ không phải được share. Giả sử data được gửi giữa main thread và worker là một JSON có property là name và  property này được access được ở main thread và woker tuy nhiên giá trị là khác nhau. Trên thực tế thì data sẽ được serialized trước khi được gửi đến cho các worker và data đó sẽ được de-serialized sau đó. Vậy nên data khi gửi đi sẽ được nhân đôi nên worker khá là tiêu tốn tài nguyên của máy và chúng ta sẽ phải cẩn thận về việc cấp phát bộ nhớ và tốc độ truyền dữ liệu.
```javascript
// in worker.js
self.addEventListener('message', function(e) {
  var message = e.data + 'to myself!';
  self.postMessage(message);
}
```

Khi tệp worker nghe thấy một sự kiện tin nhắn, thì nó sẽ execute code trong block function và hãy gửi lại main thread bằng `postMessage()` , và mình cũng sử dụng luôn data của lần gửi trước làm nội dung của tin nhắn sau này `e.data`
Trong 2 đoạn code trên thì mình đã gửi tin nhắn `"Have a nice day to my self"` trở lại main execute thread. Vậy nên ở main thread cũng cần một sự kiện lắng nghe `postMessage()` đó.
```js
// main.js
var worker = new Worker('worker.js');
worker.addEventListener('message', function(e) {
  console.log(e.data);
}
worker.postMessage("Have a nice day");
```
và đây là một đoạn sưu tầm về việc phân chia worker để xử lý:
```html
<!-- main.html -->
<!DOCTYPE html>
<html>

<head>
  <title>n-queens solver</title>
</head>

<body>
  <script type="src/queenWorker.js"></script>
  <script>
  var num = parseInt(prompt("enter num"));
  var all = (1 << num) - 1;
  count = 0;
  for (var i = 0; i < num; i++) {
    var cols = 2 ** i;
    var ld = 2 ** (i + 1);
    var rd = 0;
    if (i > 0) {
      rd = 2 ** (i - 1);
    }
    var myWorker = new Worker('queenWorker.js');
    myWorker.addEventListener('message', function(e) {
      count += e.data;
      console.log('worker count: ', e.data);
    }, false);
    myWorker.postMessage([ld, cols, rd, all]);
  }
  
  </script>
</body>

</html>
```

```js
// main.js
self.addEventListener('message', function(e) {
  let count = 0;
  var findSolutions = function(ld, cols, rd, all) {
    let poss = ~(ld | cols | rd) & all;
    if (cols === all) {
      count++;
    }
    while (poss) {
      let negPoss = poss * -1;
      let bit = poss & negPoss;
      //let bit = poss & -poss;
      poss = poss - bit;
      findSolutions((ld | bit) << 1, cols | bit, (rd | bit) >> 1, all);
    }
  };
  findSolutions(e.data[0], e.data[1], e.data[2], e.data[3]);
  self.postMessage(count);
}, false);
```
### Summary
Như vậy web worker cũng được coi như là multi thread của JS và chúng hoạt động dựa trên việc main thread gửi thông tin đến các worker thông qua `postMessage()` và khi đó `postMessage` sẽ nhận message or JSON bằng việc lắng nghe message event và truy cập data thông qua `e.data`. 

Trên đây cũng chỉ là một bài viết cơ bản về việc multi thread trong JS là khả thi tuy nhiên web worker vẫn còn một số hạn chế như trong bài viêts trên nên mọi người cũng cân nhắc khi sử dụng nó.

Bài viết con nhiều thiếu sót mong mọi người thông cảm và đóng góp ý kiến để mình cải thiện bà viết này nhé ạ! ;) <3

Tài liệu tham khảo:

https://medium.com/techtrument/multithreading-javascript-46156179cf9a

https://gist.github.com/pengcheng95/cd36e5ca96650e3f3c52c62fc12beeef#file-nqueen-html

https://viblo.asia/p/co-ban-ve-web-workers-ORNZqwpL50n