Bài viết đầu tiên trong series mình đã giới thiệu sơ lược về các vòng lặp trong **javascript**, và nếu có chú ý thì bạn sẽ thấy trong phần **forEach** mình có bật mí về nội dung của phần tiếp theo. Có thể thấy **forEach** có vẻ có khá nhiều tính năng vượt trội hơn khá nhiều so với những vòng lặp truyền thống, tuy nhiên nó cũng có vài thứ đôi khi khiến dev phải dở khóc dở cười

![](https://images.viblo.asia/d3f92db7-4e58-4ee6-ab75-32cf1badc9a4.jpeg)

Bài viết lần này mình sẽ giới thiệu về những điều có thể lập trình viên **javascripts** chưa biết về **forEach**

## Return không dừng được vòng lặp

Mình sẽ cho các bạn một đoạn code mẫu 

```js
array = [1, 2, 3, 4];
array.forEach(function (element) {
  console.log(element);
  
  if (element === 2) 
    return;
  
});
```

Với đoạn code trên thì bạn sẽ nghĩ output sẽ là gì, liệu có phải là **1**, **2** ?

Nếu nghĩ như vậy thì bạn hãy f12 ngay tại bài viết này và paste đoạn code trên vào phần **Console** để kiểm chứng kết quả.

Để lí giải cho việc này thì các bạn có thể hiểu là chúng ta đã truyền **callback** vào hàm **forEach**, chúng được coi như những hàm thông thường và được apply vào từng phẩn tử trong **forEach**, do đó khi return chúng chỉ return khỏi hàm callback chứ không phá toàn bộ hàm **forEach**.

Hãy thử viết lại đoạn code bên trên :

```js
const array = [1, 2, 3, 4];
const callback = function(element) {
    console.log(element);
    
    if (element === 2) 
      return; // would this make a difference? no.
    console.log(element);
}
for (let i = 0; i < array.length; i++) {
    callback(array[i]);
}
```

Đoạn code bên trên sẽ trả về kết quả 
```js
1
1
2
3
3
4
4
```

Từ kết quả trên có thể thấy return đã phá hàm **callback** ở phần tử **2** tuy nhiên không thể phá toàn bộ vòng lặp ở bên ngoài.

## Không thể 'break'

Không **return** được thì có **break** được không ?
Các bạn có thể thí nghiệm ngay bằng hàm sau 

```js
const array = [1, 2, 3, 4];
array.forEach(function(element) {
  console.log(element);
  
  if (element === 2) 
    break;
});
```

Thậm chí ở đây nó còn hiển thị đống lỗi đỏ lòm cơ **Illegal break statement**

Vậy với những trường hợp như vậy thì sẽ xử lý như thế nào ?

=> Quay lại với những gì sơ khai nhất thôi, một vòng **for** truyền thống có thể giải quyết vấn đề đó :

```js
const array = [1, 2, 3, 4];
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
  
  if (array[i] === 2) 
    break;
}
```

## Và tất nhiên cũng không thể 'continue'

Đến cả **break** và **return** còn gãy thì hẳn continue cũng sẽ không thể có kết cục tốt đẹp hơn được. Nhưng chúng ta cũng thử chạy thử xem nó ra cái gì nhé :

```js
const array = [1, 2, 3, 4];
array.forEach(function (element) {
  if (element === 2) 
    continue;
  
  console.log(element);
});
```

Kết quả là nó cũng báo lỗi y hệt như **break**:
**Illegal continue statement: no surrounding iteration statement**

Vậy thì cách khắc phục cũng sẽ tương tự như break thôi, lại sử dụng vòng **for** truyền thống :
```js
for (let i = 0; i < array.length; i++) {
  if (array[i] === 2) 
    continue;
  
  console.log(array[i]);
}
```

Bài viết của mình có tham khảo từ nguồn và có chỉnh sửa :https://medium.com/front-end-weekly/3-things-you-didnt-know-about-the-foreach-loop-in-js-ff02cec465b1.

Hi vọng có thể giúp ích cho các bạn