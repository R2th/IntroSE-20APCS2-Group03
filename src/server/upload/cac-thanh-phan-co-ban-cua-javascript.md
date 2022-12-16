> Bài viết được dịch từ:
> 
>   https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf

## Overview

Ngày nay, JavaScript đã trở nên cực kì phổ biến... Theo thống kê của [GitHut](http://githut.info/), JS vẫn đang đứng đầu về số lượng repository và tổng số lượt push trên github.

![](https://cdn-images-1.medium.com/max/1600/1*Zf4reZZJ9DCKsXf5CSXghg.png)

Hầu hết mọi người đã từng nghe về khái niệm JS Engine, và đều biết rằng JS sử dụng single-thread, event loop và callback queue. Trong bài viết này chúng ta sẽ tìm hiểu chi tiết các khái niệm trên và biết được JS thực sự hoạt động như thế nào. 

## 1. JavaScript Engine
Theo Wikipedia thì
> A JavaScript engine is a program or interpreter which executes JavaScript code.

Hiểu đơn giản thì: JS engine là một chuơng trình hoặc trình thông dịch thực thi mã JS. Một JS engine có thể thông dịch như thường, hoặc biên dịch just-in-time từ JS thành bytecode.

Dưới đây là một số JS engine nổi tiếng:
* **SpiderMonkey** - Ông tổ của JS engine, được dùng trên trình duyệt web đầu tiên trên thế giới - Netscape Navigator, hiện tại đang được sử dụng trên Firefox
* **Chakra** - Là một JS engine cũng khá lâu đời, ban đầu được sử dụng trên Internet Explorer và biên dịch [JScript](https://en.wikipedia.org/wiki/JScript), nay được dùng cho Microsoft Edge
* **Rhino** - Một Engine viết hoàn toàn bằng Java, cũng có lịch sử phát triển lâu đời từ Netscape Navigator, hiện tại được phát triển bởi Mozilla Foundation
* **Google V8** - JS engine phổ biến nhất hiện nay, được sử dụng trên trình duyệt Chrome và lõi của NodeJS

![](https://cdn-images-1.medium.com/max/1600/1*OnH_DlbNAPvB9KLxUCyMsA.png)

Engine bao gồm 2 thành phần chính:
* Memory Heap 
* Call Stack

## 2. Runtime

JS Runtime cung cấp các API cho

![](https://cdn-images-1.medium.com/max/1600/1*4lHHyfEhVB0LnQ3HlhSs8g.png)

## 3. Call Stack
JS là ngôn ngữ lập trình đơn luồng, có nghĩa là nó chỉ có 1 Call Stack. Do đó trong 1 thời điểm, JS chỉ thực thi một công việc duy nhất.

Call Stack là một cấu trúc dữ liệu lưu lại quá trình thực thi chương trình. Nếu một hàm được gọi đến, nó sẽ được đặt lên đầu của stack. Nếu một hàm kết thúc và return giá trị, nó sẽ được lấy ra khỏi stack. Mỗi bản ghi trong Call Stack được gọi là Stack Frame.

Xét ví dụ sau:

```
function multiply(x, y) {
    return x * y;
}
function printSquare(x) {
    var s = multiply(x, x);
    console.log(s);
}
printSquare(5);
```

Khi engine thực thi đoạn code trên, ban đầu Call Stack sẽ rỗng. Sau đó nó lưu trữ các hàm sẽ được gọi như hình bên dưới.

![](https://cdn-images-1.medium.com/max/1600/1*Yp1KOt_UJ47HChmS9y7KXw.png)

Bộ nhớ của Call Stack là hữu hạn. Xét ví dụ dưới đây

```
function foo() {
    foo();
}
foo();
```

Khi đoạn code trên được thực thi, nó sẽ gọi đến hàm `foo()`. Hàm này tự gọi đến chính nó rất nhiều lần và không có điều kiện dừng. Với mỗi bước thực thi, một Stack Frame được thêm vào Call Stack. Chúng ta sẽ gặp với lỗi `stack overflow` huyền thoại

![](https://cdn-images-1.medium.com/max/1600/1*AycFMDy9tlDmNoc5LXd9-g.png)

Khi đó, trình duyệt sẽ báo lỗi

![](https://cdn-images-1.medium.com/max/1600/1*e0nEd59RPKz9coyY8FX-uw.png)

Thực thi code đơn luồng có thể rất dễ dàng vì bạn không phải xử lý các tình huống phức tạp như khi thao tác với môi trường đa luồng, chẳng hạn như [deadlocks](https://vi.wikipedia.org/wiki/Deadlock). Vậy điều gì sẽ xảy ra khi một khối lệnh được xử lý quá chậm?

## 4. Callback queue và Event loop

JS chỉ xử dụng 1 luồng xử lý, tức là chỉ có 1 Call Stack. Khi một khối lệnh được thực thi, trình duyệt sẽ không thể làm việc gì khác, nó sẽ bị block. Điều gì sẽ xảy ra nếu như các khối lệnh trong Call Stack mất rất nhiều thời gian để xử lý? Chẳng hạn như bạn thực hiện một thao tác chỉnh sửa ảnh phức tạp bằng JS trên trình duyệt. Có lẽ ai trong chúng ta đều đã gặp phải lỗi này

![](https://cdn-images-1.medium.com/max/1600/1*WlMXK3rs_scqKTRV41au7g.jpeg)

Để khắc phục vấn đề trên, JS sử dụng lập trình bất đồng bộ (asynchorous). Với những tác vụ có **độ trễ cao** (đọc dữ liệu từ file, db, ajax request,...), ta sử dụng các hàm này như các hàm bất đồng bộ và sẽ được đưa vào một hàng chờ đặc biệt gọi là Callback queue. Các hàm ở Callback queue chỉ được thực thi khi Call Stack đang rỗng. Do đó các hàm ở Call Stack sẽ không bị block khi thực hiện các thao tác mất nhiều thời gian.

## Kết
Hy vọng bài viết giúp các bạn có một cái nhìn rõ nét hơn về ngôn ngữ chúng ta vẫn sử dụng hàng ngày.

Tham khảo
> 
> https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf
>
>https://sotatek.com/blog/nodejs-la-gi/
>
> https://developers.google.com/v8/