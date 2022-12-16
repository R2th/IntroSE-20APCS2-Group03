Chắc hẳn các bạn đã từng sử dụng setTimeout() trong Javascript, thế nhưng các bạn thực sự đã hiểu nó chưa? Khi sử dụng nó có thể mang lại kết quả không mong đợi nếu bạn không hiểu cách hoạt động của nó. Nào bây giờ ta hãy cùng tìm hiểu về nó và trở thành một ninja khi sử dụng `setTimeout()`
## setTimeout()
Đây là một hàm trong JavaScript sẽ làm delay quá trình thực thi đoạn mã trong nó.
## Thành phần của setTimeout()
![](https://images.viblo.asia/0188cbb8-30df-4f79-a34f-b2ccaeeac3bb.png)
SetTimeout có 3 phần:
* Callback
* Các câu lệnh được thực thi bên trong callback
* Thời gian tính bằng mili giây (mili giây)

Đoạn mã trên in “Hello” và “Bye” trong console sau 1 giây (1000ms = 1s).

Có vẻ dễ dàng phải không! Nhưng nếu chúng ta không biết setTimeout () hoạt động như thế nào, chúng ta có thể nhận được một số hành vi không mong muốn.

Ta có 1 số ví dụ sau:
### Ví dụ 1: Single setTimeout()
```
let a = 1;
let b = 2;
console.log("Sum =", a+b);

setTimeout(() => {
  console.log(a,b);
},1000)
```

```
Output:
Sum = 3
1 2
```

Trong ví dụ trên `setTimeout()` có độ trễ là 1 giây. Do đó, chúng tôi nhận được tổng đầu tiên và các giá trị của biến “a” và “b” sau 1 giây

### Ví dụ 2: Blocking vs Non-Blocking
```
let nums = [10,20,30];

console.log("We are learning setTimeout");

setTimeout(() => {
  console.log("After 1 second");
  console.log(nums.length);
  console.log("Statements inside are non-blocking");
},1000)

nums.forEach((num) => {
  console.log(num);
});

console.log("Statements outside are blocking");
```

```
Output:
We are learning setTimeout
10
20
30
Statements outside are blocking
After 1 second
3
Statements inside are non-blocking
```

setTimeout() non-blocking có nghĩa là nó sẽ chạy khi các câu lệnh bên ngoài nó được thực thi và sau đó một giây nó sẽ thực thi. Tất cả các câu lệnh khác không phải là một phần của setTimeout () là blocking, có nghĩa là không có câu lệnh nào khác sẽ thực thi trước khi câu lệnh hiện tại kết thúc.
![](https://images.viblo.asia/6485ebf3-45c3-4c09-ae46-65280df44518.png)

Để thực sự hiểu cách hoạt động của các câu lệnh blocking và non-blocking, chúng ta cần tìm hiểu về `call stack`, `event loop` và `event queue`.
### Call Stack

Xử lý tất cả các câu lệnh blocking và các câu lệnh xuất phát từ event queue.

### Event Loop
Xử lý tất cả các câu lệnh bị trì hoãn, ví dụ. setTimeout (), setInterval (), các events, network call, promises và tất cả các hoạt động không đồng bộ khác. Khi bộ đếm thời gian của `setTimeout` đến 0, các câu lệnh ra khỏi event loop và chuyển đến event queue.

### Event Queue

Khu vực chờ đợi cho các câu lệnh xuất hiện từ event loop và khi tất cả các đoạn mã blocking được thực thi bởi call stack, các câu lệnh này sẽ được gửi đến call stack để thực thi.
![](https://images.viblo.asia/a9c48e7e-26f9-4441-8419-e6ca42a70365.png)

Vậy, hãy xem ví dụ 2 thực thi như thế nào:

Bước 1: Chúng tôi tách các câu lệnh blocking và non-blocking.

Lưu ý: Call stack thực hiện một câu lệnh tại một thời điểm. Để đơn giản, tất cả các câu lệnh blocking đã được đưa vào call stack cùng một lúc.
![](https://images.viblo.asia/a7a7a900-a3b8-47ed-92ce-df48b2caa9d5.png)

```
Output: <empty>
```

Bước 2: Tất cả các câu lệnh blocking trong call stack được thực thi tuần tự trong khi setTimeout() đang chờ.

Khi setTimeout() đợi được 1 giây, nó sẽ di chuyển đến event queue
![](https://images.viblo.asia/55f41db2-9395-4654-84c5-2d93b70cf8cb.png)

```
Output:
We are learning setTimeout
10
20
30
Statements outside are blocking
```

Bước 3: Các câu lệnh chỉ đi ra khỏi event queue và đi đến call stack khi tất cả mã blocking trong call stack đã thực thi và call stack trống. Sau đó, các câu lệnh bên trong setTimeout() được thực thi và do đó chúng ta nhận được kết quả đầu ra.
![](https://images.viblo.asia/edc9a7ca-249f-41c1-8a22-468adbd07683.png)

```
Output:
We are learning setTimeout
10
20
30
Statements outside are blocking
After 1 second
3
Statements inside are non-blocking
```

Bây giờ chúng ta có một số hiểu biết về cách setTimeout() hoạt động. Hãy xem thêm một số ví dụ

### Ví dụ 3: Multiple setTimeout()
```
let a = 10;

setTimeout(() => {
  console.log("After 3 seconds");
},3000)

console.log("a =",a);

setTimeout(() => {
    console.log("After 2 seconds");
},2000)

let b = 20;

setTimeout(() => {
    console.log("After 1 seconds");
},1000)

console.log("b =", b);

let c = 30;

setTimeout(() => {
  //Will run after all blocking statements have executed
    console.log("After 0 seconds");
},0)

console.log("c =",c);
```

```
Output:
a = 10
b = 20
c = 30
After 0 seconds
After 1 seconds
After 2 seconds
After 3 seconds
```

Ví dụ trên là dễ dàng. Hãy nhớ rằng tất cả các câu lệnh blocking được thực thi trước trong khi tất cả setTimeouts đang trong event loop đang chờ. Sau đó, lần lượt từng lệnh đi đến event quêu khi 0s có bộ đếm thời gian thấp nhất nó thực thi đầu tiên, sau đó 1s setTimeout() thực thi, sau đó 2s setTimeout() thực thi và cuối cùng là 3s setTimeout () thực thi.

Nó trông giống như sau:
![](https://images.viblo.asia/32eece3a-6167-4e26-92c1-aaf6be20f73c.png)
SetTimeouts đầu tiên, thứ hai, thứ ba và thứ tư được thực thi tuần tự khi chúng ra khỏi vòng lặp sự kiện vào ngăn xếp cuộc gọi.

### Ví dụ 4: Nested setTimeout()
```
console.log("zero");

//Outer setTimeout
setTimeout(() => {
  console.log("one");
  console.log("two");

//Inner setTimeout
  setTimeout(() => {
    console.log("three");
    console.log("four");
  },2000)

  console.log("five");

},1000)

console.log("six");
```

```
Output:
zero
six
one
two
five
three
four
```

Trong ví dụ trên, mã blocking được thực thi đầu tiên, vì vậy chúng tôi nhận được “zero” và “six” làm đầu ra của chúng ta lúc đầu và setTimeout bên ngoài đợi 1 giây trong event loop, sau đó nó đi đến event queue và sau đó đi ra và thực thi như vậy, bây giờ “one” và “two” được in ra. Nhưng chúng ta thấy "five" cũng được in. Tại sao? Bởi vì ngay sau khi trình biên dịch JS đọc lệnh setTimeout () bên trong (là câu lệnh non-blocking) và gửi nó đến event loop, nơi nó đợi trong 2 giây. Và trong khi setTimeout () bên trong đang đợi, setTimeout () bên ngoài thực thi tất cả các câu lệnh blocking bên trong chính nó. Do đó, "five" được in. Và sau đó, khi bên trong setTimeout () đã đợi, nó sẽ đến `event queue` và thực thi, đó là cách chúng ta lấy “three” và “four” làm đầu ra.

Các số liệu dưới đây cho thấy cách hoạt động của mã trên:
![](https://images.viblo.asia/7e0dd0b7-1386-4eb5-bcd5-2ab4a9717194.png)

### Ví dụ 5: Hành vi kỳ lạ với 0 và 1ms
```
setTimeout(() => {
  console.log("one");
},1)

setTimeout(() => {
  console.log("zero");
},0)
```

```
Output:
one
zero
```

Đầu ra của chúng ta đáng lẽ ra phải là “zero” và “one” vì 0ms nhỏ hơn 1ms. Nhưng thay vào đó nó là "one" và "zero". Lý do là vì 1ms là khoảng thời gian ngắn tương đương với 0ms, do đó nó ngay lập tức chuyển đến `event queue` từ `event loop` và thực hiện đầu tiên thông qua call stack.

### Ví dụ 6: Timeout Overflow
```
setTimeout(() => {
  console.log("one");
},Math.pow(2,31))

setTimeout(() => {
  console.log("zero");
},0)
```

```
Output:
TimeoutOverflowWarning: 2147483648 does not fit into a 32-bit signed integer.
Timeout duration was set to 1.
one
zero
```

Bất kỳ giá trị thời gian nào trên 2³⁰ không phù hợp với số nguyên có dấu 32 bit. Vì vậy, trình biên dịch ném TimeoutOverflowWarning và nó tự động đặt giá trị thời gian thành 1. Và từ ví dụ trước vì 1ms về cơ bản tương đương với 0ms. Nó thực thi đầu tiên và sau đó 0ms setTimeout () thực thi.

### Ví dụ 7: setTimeout and loops

```
for(var i = 0; i < 3; i++){
  setTimeout(() => {
    console.log(i)
  },1000)
}
```

```
Output:
3
3
3
```

Vòng lặp for là một câu lệnh blocking, vì vậy trong khi setTimeout () là non-blocking. Vòng lặp tạo 3 setTimeouts đi đến event loop và sau đó đến event queue. Trong khi tất cả setTimeouts đang đợi trong event queue, giá trị của “i” đã thay đổi thành 3 trong call stack. Và setTimeouts in ra giá trị hiện tại của “i”. Một giải pháp cho vấn đề trên là sử dụng let thay vì var tạo 1 block scope.
```
for(let i = 0; i < 3; i++){
  setTimeout(() => {
    console.log(i)
  },1000)
}
```

```
Output:
0
1
2
```

Một giải pháp khác là tạo một scope function bên ngoài setTimeout, theo đó setTimeout có thể truy cập giá trị chính xác của “i”.

```
for (var i = 0; i < 3; ++i) {
    (function(i) {
        setTimeout(function(){
            console.log(i);
        }, 1000);
    }(i));
}
```

```
Output:
0
1
2
```

### Tài liệu tham khảo
https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout

https://levelup.gitconnected.com/understanding-settimeout-15c7de9e5fd6