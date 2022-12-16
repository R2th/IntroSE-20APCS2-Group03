Trong quá trình coding ắt hẳn chúng ta không ít lần cần đến sự hỗ trợ của console để debugging. Một trong những lệnh hữu ích nhất và phổ biết nhất mà bất kì một lập trình viên nào cũng biết đến là `console.log`. Nhưng có nhiều các phương thức khác hỗ trợ với tính năng đa dạng và giao diện rõ ràng khi hiển thị giúp cho việc `debugging` dễ dàng hơn mà có thể bạn chưa biết đến.
Trong bài viết này mình sẽ chia một số phương thức hữu hiệu với `console` với hy vọng sẽ giúp ích ít nhiều cho các bạn trong quá trình `debugging`.
# 1 Console.log()
đây là phương thức cơ bản để hiển thị một chuỗi hoặc một giá trị lên màn hình console. Ví dụ chúng ta có 2 object lần lượt là
```
var obj1 = { a: 1, b: 2 }
var obj2 = { a: 2, b: 3 }
```
và chúng ta muốn hiện thị giá trị của chúng để so sánh thì thay vì dùng 2 câu lệnh chúng ta có thể dùng `console.log(obj1, obj2)` để có thể dễ dàng so sánh từng attribute song song một cách dễ dàng và giảm thiểu số dòng lệnh.
![](https://images.viblo.asia/6b5fd06a-c0cd-4d2c-a1eb-d147a9a2f21f.PNG)

# 2 Console.table()
Một cách hữu hiệu khác để quan sát các giá trị trong object dễ dàng hơn bằng cách hiển thị ở dạng table.
![](https://images.viblo.asia/4ac2a7dc-17ef-4a30-8c71-1791395ff014.PNG)

# 3 Console.trace()
Javascipt là một ngôn ngữ không có cấu trúc chặt chẽ nên vì thế thật khó để biết được thời điểm xẩy ra của các function lần lượt là như nào, đặc biết là khi chúng ta đang debugging code của một người khác. Đừng lo hãy để `console.trace()` làm việc đó. Ví dụ sau đây sẽ giúp chúng ta hiển thị trace cách mà function thực thi.
```
function a () {
    b();
}

function b () {
    console.trace();
}

a();
```
![](https://images.viblo.asia/b9ec50b7-a12f-4286-a67a-a3cbfa6e78fa.PNG)

# 4 Console.group()
`console.group()` sẽ hữu ích khi chúng ta muốn nhóm các log liên quan đến nhau để có thể dễ dàng quan sát hơn.
```
console.group('company')
console.log('name: mặt trời lặn')
console.log('address: 16 ly thuong kiet')
console.group('members')
console.log('some members')
console.groupEnd()
console.groupEnd()
```
![](https://images.viblo.asia/93b48750-a529-435b-aa1d-b00781f92d6a.PNG)

# 5 Console.time()
Để biết được thời gian để thực hiện một block là bao lâu đặc biệt là các vòng lặp thì đây là phương pháp thật hữu hiệu. Ví dụ
```
console.time('Timer');
var items = [];
for(var i = 0; i < 100000; i++){
   items.push({index: i});
}
console.timeEnd('Timer');
```
![](https://images.viblo.asia/188e4776-108e-45a7-b0c2-ed67850c0c59.PNG)

# 6 Console.count()
Trong trường hợp các function chạy nhiều lần thì bạn có thể đếm xem số lần chạy của nó với `console.count()`. Ví dụ
```
for (i = 0; i < 10; i++) {
  a();
}

function a () { console.count(); }
```
![](https://images.viblo.asia/0a52f84c-6091-40e3-8af2-a6f9a76be260.PNG)


Trên đây là một số các phương thức hữu hiệu khi chúng ta debugging với console hy vọng sẽ giúp các bạn dễ dàng hơn trong việc debugging.